import logging
import os
import re
from contextlib import asynccontextmanager
from pathlib import Path

import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, field_validator
from transformers import AutoModelForSequenceClassification, AutoTokenizer


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("fakeguard")

ROOT_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = Path(
    os.environ.get(
        "FAKEGUARD_MODEL_DIR",
        str(ROOT_DIR / "local-assets" / "models" / "fakeguard"),
    )
).resolve()
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "FAKEGUARD_ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

MAX_TEXT_LENGTH = 20_000
MAX_TOKENS = 512
LABELS = ("Fake", "Real")
PUBLISHER_PATTERN = re.compile(
    r"^[A-Z\s,\.]+\s*\([^)]+\)\s*[-\u2013]\s*",
    re.MULTILINE,
)
URL_PATTERN = re.compile(r"http\S+|www\.\S+|\d{1,3}(?:\.\d{1,3}){3}")
PUNCTUATION_PATTERN = re.compile(r"[^a-zA-Z\s]")


class PredictionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    text: str = Field(min_length=1, max_length=MAX_TEXT_LENGTH)

    @field_validator("text")
    @classmethod
    def text_must_not_be_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Enter some article text to classify.")
        return value


def prepare_text(text: str) -> str:
    body = PUBLISHER_PATTERN.sub("", text).strip()
    normalized = body.lower()
    normalized = URL_PATTERN.sub(" ", normalized)
    normalized = PUNCTUATION_PATTERN.sub(" ", normalized)
    return re.sub(r"\s+", " ", normalized).strip()


def load_artifacts():
    if not (MODEL_DIR / "config.json").is_file():
        raise FileNotFoundError(f"FakeGuard model config not found in {MODEL_DIR}")
    if not (MODEL_DIR / "model.safetensors").is_file():
        raise FileNotFoundError(f"FakeGuard weights not found in {MODEL_DIR}")
    if not (MODEL_DIR / "tokenizer.json").is_file():
        raise FileNotFoundError(f"FakeGuard tokenizer not found in {MODEL_DIR}")

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_DIR,
        local_files_only=True,
        use_fast=True,
    )
    tokenizer.model_max_length = MAX_TEXT_LENGTH + 2
    model = AutoModelForSequenceClassification.from_pretrained(
        MODEL_DIR,
        local_files_only=True,
        use_safetensors=True,
    )
    if model.config.num_labels != len(LABELS):
        raise ValueError(
            f"Expected a {len(LABELS)}-class FakeGuard model, "
            f"found {model.config.num_labels} classes."
        )

    model.to("cpu")
    model.eval()
    return tokenizer, model


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        app.state.tokenizer, app.state.model = load_artifacts()
    except Exception:
        logger.exception("Could not load the FakeGuard model artifacts.")
        raise
    yield
    app.state.tokenizer = None
    app.state.model = None


app = FastAPI(title="FakeGuard inference service", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(request: PredictionRequest):
    prepared_text = prepare_text(request.text)
    if not prepared_text:
        raise HTTPException(
            status_code=422,
            detail="The text contains no words after preprocessing. Enter article text.",
        )

    tokenizer = app.state.tokenizer
    model = app.state.model
    token_count = len(tokenizer.tokenize(prepared_text)) + tokenizer.num_special_tokens_to_add(
        pair=False
    )
    inputs = tokenizer(
        prepared_text,
        return_tensors="pt",
        truncation=True,
        max_length=MAX_TOKENS,
    )

    try:
        with torch.inference_mode():
            logits = model(**inputs).logits[0]
            probabilities = torch.softmax(logits, dim=-1).tolist()
    except Exception as error:
        logger.exception("FakeGuard inference failed.")
        raise HTTPException(
            status_code=500,
            detail="The model could not classify this text. Please try again.",
        ) from error

    class_index = int(torch.argmax(torch.tensor(probabilities)).item())
    return {
        "label": LABELS[class_index],
        "classIndex": class_index,
        "confidence": float(probabilities[class_index]),
        "probabilities": {
            label: float(probabilities[index])
            for index, label in enumerate(LABELS)
        },
        "truncated": token_count > MAX_TOKENS,
    }

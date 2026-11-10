import logging
import os
from contextlib import asynccontextmanager
from io import BytesIO
from pathlib import Path

import torch
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from torchvision import models, transforms
from torch import nn


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("seeflood")

ROOT_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = Path(
    os.environ.get(
        "SEEFLOOD_MODEL_PATH",
        str(ROOT_DIR / "local-assets" / "models" / "seeflood" / "seeflood_01.pth"),
    )
).resolve()
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "SEEFLOOD_ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

LABELS = ("No flood", "Light", "Moderate", "Severe")
MAX_UPLOAD_BYTES = 10 * 1024 * 1024
MAX_IMAGE_PIXELS = 25_000_000

preprocess = transforms.Compose(
    [
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225],
        ),
    ]
)


def load_model() -> nn.Module:
    if not MODEL_PATH.is_file():
        raise FileNotFoundError(f"SeeFlood checkpoint not found: {MODEL_PATH}")

    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, len(LABELS) - 1)
    state_dict = torch.load(MODEL_PATH, map_location="cpu", weights_only=True)
    model.load_state_dict(state_dict)
    model.eval()
    return model


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        app.state.model = load_model()
    except Exception:
        logger.exception("Could not load the SeeFlood model.")
        raise
    yield
    app.state.model = None


app = FastAPI(title="SeeFlood inference service", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(file: UploadFile = File(...)):
    contents = file.file.read(MAX_UPLOAD_BYTES + 1)
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image must be 10 MB or smaller.")
    if not contents:
        raise HTTPException(status_code=422, detail="Choose a non-empty image file.")

    try:
        with Image.open(BytesIO(contents)) as uploaded_image:
            if uploaded_image.format not in {"JPEG", "PNG", "WEBP"}:
                raise HTTPException(
                    status_code=415,
                    detail="Use a JPG, PNG, or WebP image.",
                )
            if uploaded_image.width * uploaded_image.height > MAX_IMAGE_PIXELS:
                raise HTTPException(
                    status_code=413,
                    detail="Image dimensions are too large to process.",
                )
            image = uploaded_image.convert("RGB")
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as error:
        raise HTTPException(status_code=422, detail="The uploaded file is not a readable image.") from error

    model = app.state.model
    input_tensor = preprocess(image).unsqueeze(0)
    with torch.inference_mode():
        threshold_logits = model(input_tensor)[0]
        ordinal_score = torch.sigmoid(threshold_logits).sum()
        class_index = int(torch.round(ordinal_score).clamp(0, len(LABELS) - 1).item())

    return {
        "prediction": LABELS[class_index],
        "classIndex": class_index,
    }

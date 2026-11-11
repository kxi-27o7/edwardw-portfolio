import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("bankguard")

ROOT_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = Path(
    os.environ.get(
        "BANKGUARD_MODEL_DIR",
        str(ROOT_DIR / "local-assets" / "models" / "bankguard"),
    )
).resolve()
MODEL_PATH = MODEL_DIR / "model_maxdepth10.pkl"
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        os.environ.get(
            "BANKGUARD_ALLOWED_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000",
        ),
    ).split(",")
    if origin.strip()
]

from backend.bankguard.feature_engineering import make_features
from backend.bankguard.model_utils import load_model, predict

TRANSACTION_TYPES = ("DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT", "DEBIT")
MAX_AMOUNT = 50_000_000
MAX_BALANCE = 1_000_000_000
MAX_HISTORY = 100
DECISION_THRESHOLD = 0.70
IDR_PER_UGX = 4.36


class Transaction(BaseModel):
    model_config = ConfigDict(extra="forbid")

    transactionType: Literal["DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT", "DEBIT"]
    amount: float = Field(gt=0, le=MAX_AMOUNT, allow_inf_nan=False)
    oldBalance: float = Field(ge=0, le=MAX_BALANCE, allow_inf_nan=False)
    newBalance: float = Field(ge=0, le=MAX_BALANCE, allow_inf_nan=False)


class PredictionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    transaction: Transaction
    history: list[Transaction] = Field(min_length=24, max_length=MAX_HISTORY)


def transaction_to_ugx(transaction: Transaction) -> dict[str, Any]:
    return {
        "transactionType": transaction.transactionType,
        "amount": transaction.amount / IDR_PER_UGX,
        "oldBalance": transaction.oldBalance / IDR_PER_UGX,
        "newBalance": transaction.newBalance / IDR_PER_UGX,
    }


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not MODEL_PATH.is_file():
        raise FileNotFoundError(f"BankGuard model checkpoint not found: {MODEL_PATH}")
    try:
        app.state.model = load_model(str(MODEL_PATH))
    except Exception:
        logger.exception("Could not load the BankGuard model.")
        raise
    yield
    app.state.model = None


app = FastAPI(title="BankGuard demo inference service", lifespan=lifespan)
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
def predict_transaction(request: PredictionRequest):
    transaction = transaction_to_ugx(request.transaction)
    history = [transaction_to_ugx(entry) for entry in request.history]
    features = make_features(transaction, history={"initiator": history})

    try:
        label, probability = predict(
            app.state.model,
            features,
            threshold=DECISION_THRESHOLD,
        )
    except Exception as error:
        logger.exception("BankGuard inference failed.")
        raise HTTPException(
            status_code=500,
            detail="The model could not analyze this transaction. Please try again.",
        ) from error

    return {
        "isFraud": int(label),
        "probability": probability,
        "decisionThreshold": DECISION_THRESHOLD,
    }

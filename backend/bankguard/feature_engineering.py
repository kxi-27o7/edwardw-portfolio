import math
from typing import Any

import numpy as np


def _safe_div(a: float, b: float, default: float = 0.0) -> float:
    try:
        if b == 0 or not math.isfinite(a) or not math.isfinite(b):
            return default
        return float(a) / float(b)
    except (TypeError, ValueError, OverflowError):
        return default


def _window_stats(amounts: list[float], window: int) -> tuple[float, float, int]:
    values = np.asarray(amounts[-window:], dtype=float)
    if values.size == 0:
        return 0.0, 0.0, 0
    std = float(values.std(ddof=0)) if values.size > 1 else 0.0
    return float(values.mean()), std, int(values.size)


def make_features(
    transaction: dict[str, Any],
    history: dict[str, list[dict[str, Any]]] | list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    transaction_type = transaction.get("transactionType", "")
    amount = float(transaction.get("amount", 0.0) or 0.0)
    old_balance = float(
        transaction.get("oldBalance", transaction.get("oldBalInitiator", 0.0)) or 0.0
    )
    new_balance = float(
        transaction.get("newBalance", transaction.get("newBalInitiator", 0.0)) or 0.0
    )

    features: dict[str, Any] = {}
    transaction_types = ("DEBIT", "DEPOSIT", "PAYMENT", "TRANSFER", "WITHDRAWAL")
    for kind in transaction_types:
        features[f"transactionType_{kind}"] = str(transaction_type).upper() == kind

    features["amount"] = amount
    features["oldBalInitiator"] = old_balance
    features["newBalInitiator"] = new_balance
    features["amount_balance_ratio"] = _safe_div(amount, old_balance + 1.0)
    features["balance_error_i"] = float(new_balance - (old_balance - amount))

    if isinstance(history, dict):
        previous_transactions = history.get("initiator", []) or []
    elif isinstance(history, list):
        previous_transactions = history
    else:
        previous_transactions = []

    amounts = [float(item.get("amount", 0.0) or 0.0) for item in previous_transactions]
    amounts.append(amount)
    for window in (6, 12, 24):
        average, _std, _count = _window_stats(amounts, window)
        features[f"INIT_AVG_AMOUNT_TX_{window}"] = average
        features[f"INIT_AMOUNT_DEV_TX_{window}"] = float(amount - average)

    return features

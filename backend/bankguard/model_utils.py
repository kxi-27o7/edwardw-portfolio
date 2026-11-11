from typing import Any

import joblib
import pandas as pd


def load_model(path: str) -> Any:
    return joblib.load(path)


def _to_dataframe_row(features: dict[str, Any], model: Any) -> pd.DataFrame:
    frame = pd.DataFrame([features])
    expected_columns = getattr(model, "feature_names_in_", None)
    if expected_columns is not None:
        for column in expected_columns:
            if column not in frame.columns:
                frame[column] = 0.0
        frame = frame[list(expected_columns)]
    return frame


def predict(
    model: Any,
    features: dict[str, Any],
    threshold: float | None = None,
) -> tuple[int, float | None]:
    row = _to_dataframe_row(features, model)
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(row)[0][1])
        cutoff = 0.25 if threshold is None else threshold
        return (1 if probability >= cutoff else 0), probability
    return int(model.predict(row)[0]), None

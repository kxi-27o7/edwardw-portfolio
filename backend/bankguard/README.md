# BankGuard inference API

This API uses the tracked runtime modules in this directory and loads the
`local-assets/models/bankguard/model_maxdepth10.pkl` artifact. The original
`local-assets/models/bankguard/feature_engineering.py` and `model_utils.py` are
context-only references and are not imported by the deployed service. It does
not import the original Flask app, connect to MongoDB, create accounts, or
persist the submitted synthetic history.

From the repository root, install the combined API dependencies and start all
three model APIs:

```powershell
python -m pip install -r backend\requirements.txt
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```

The BankGuard endpoints are `/api/bankguard/health` and
`/api/bankguard/predict`. The portfolio demos use
`http://localhost:8000` by default in development. Set
`NEXT_PUBLIC_MODEL_API_URL` to override the combined API URL.

The API expects a current transaction and at least 24 previous transactions.
History and the new transaction are sent in the request body and used only for the
prediction. The demo accepts amounts and balances in IDR, then converts the
current transaction and every history entry to UGX at the fixed rate of Rp4.36
per UGX before feature generation. It is not fetched dynamically. The
feature-engineering helper expects UGX inputs.
The model classifies class 1 as fraud at the configured 70% probability threshold.

The model is a pickle artifact. Use a compatible scikit-learn version if loading
emits a version warning or fails; the training environment version is not
recorded alongside the artifact.

For the combined Render deployment of all three model APIs, see
[the backend deployment guide](../README.md#deploy-the-model-api-on-render).

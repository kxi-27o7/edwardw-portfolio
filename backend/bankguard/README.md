# BankGuard local inference service

This service runs the BankGuard model for the portfolio demo. It loads
`local-assets/models/bankguard/model_maxdepth10.pkl` and reuses the supplied
`feature_engineering.py` and `model_utils.py`. It does not import the original
Flask app, connect to MongoDB, create accounts, or persist the submitted synthetic
history.

From the repository root, install the service dependencies and start it:

```powershell
python -m pip install -r backend\bankguard\requirements.txt
python -m uvicorn main:app --app-dir backend\bankguard --host 127.0.0.1 --port 8001 --reload
```

In another terminal, run the portfolio with `npm run dev`. The demo calls
`http://localhost:8001` by default during development. Set
`NEXT_PUBLIC_BANKGUARD_API_URL` to override the URL.

The API expects a current transaction and at least 24 previous transactions.
History and the new transaction are sent in the request body and used only for the
prediction. The demo accepts amounts and balances in IDR, then converts the
current transaction and every history entry to UGX at the fixed rate of Rp4 per
UGX before feature generation. This rate is based on the user's 2024 reference;
it is not fetched dynamically. The feature-engineering helper expects UGX inputs.
The model classifies class 1 as fraud at the configured 70% probability threshold.

The model is a pickle artifact. Use the same scikit-learn version that was used to
create it if loading emits a version warning or fails; the training environment
version is not present in the supplied BankGuard files.

For the combined Render deployment of all three model APIs, see
[the backend deployment guide](../README.md#deploy-all-three-apis-on-render).

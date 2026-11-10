# SeeFlood inference service

The Next.js portfolio calls this Python service to run the local EfficientNet-B0
ordinal classifier. The model checkpoint stays in `local-assets/` and is not served
as a public asset. The checkpoint is stored in Git LFS so Render can retrieve it
during deployment.

From the repository root, install the Python dependencies and start the service:

```powershell
python -m pip install -r backend\seeflood\requirements.txt
python -m uvicorn main:app --app-dir backend\seeflood --host 127.0.0.1 --port 8000 --reload
```

In another terminal, run the portfolio with `npm run dev`. In development, the demo
uses `http://localhost:8000` unless `NEXT_PUBLIC_SEEFLOOD_API_URL` overrides it.

For the combined Render deployment of SeeFlood, BankGuard, and FakeGuard, including
Git LFS setup, Blueprint creation, CORS origins, and frontend API URLs, see
[the backend deployment guide](../README.md#deploy-all-three-apis-on-render).

The Render free service may sleep when idle, so the first prediction after a quiet
period can take longer.

The service resizes images to 224 × 224 and applies ImageNet normalization, matching
the validation transform in `local-assets/models/seeflood/training_model.py`. It
decodes the three ordinal logits using the same sigmoid-sum-and-round rule used by
the training script. This is a demonstration classifier, not an emergency warning.

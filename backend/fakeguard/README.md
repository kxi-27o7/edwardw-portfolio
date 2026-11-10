# FakeGuard DistilBERT inference service

This service loads the local DistilBERT checkpoint and tokenizer from
`local-assets/models/fakeguard`. It accepts article text at `/predict`, returns
Fake/Real probabilities, and does not store submitted text.

The class mapping matches the original FakeGuard app: `LABEL_0` is Fake and
`LABEL_1` is Real. Text preprocessing lowercases text, removes publisher/dateline
headers, URLs, and punctuation, then tokenizes with a 512-token maximum. Longer
inputs are truncated; the response indicates when truncation occurred.

## Run locally

Use an existing Python environment with the dependencies in `requirements.txt`.
From the repository root:

```powershell
python -m pip install -r backend\fakeguard\requirements.txt
python -m uvicorn main:app --app-dir backend\fakeguard --host 127.0.0.1 --port 8002 --reload
```

In another terminal, run the portfolio with `npm run dev`. The demo calls
`http://localhost:8002` in development. Set `NEXT_PUBLIC_FAKEGUARD_API_URL` to
override the URL. The service defaults to allowing the local portfolio origins;
set `FAKEGUARD_ALLOWED_ORIGINS` to a comma-separated list of exact origins when
deploying.

## Render deployment

The model weights are stored with Git LFS. The root Render Blueprint deploys this
API alongside SeeFlood and BankGuard. Follow
[the backend deployment guide](../README.md#deploy-all-three-apis-on-render) to
track the model artifacts, create the Blueprint, configure CORS and frontend API
URLs, and verify all services.

Render's free service may sleep when idle, so the first prediction after a quiet
period can take longer.

This is a machine-learning demo, not a fact-checking service. A model prediction
does not establish whether an article is true; verify claims with reliable sources.

# Portfolio model APIs

All three inference APIs run in one FastAPI process and one Render web service.
Their endpoints are:

| Model | Prediction | Health |
|---|---|---|
| SeeFlood | `/api/seeflood/predict` | `/api/seeflood/health` |
| BankGuard | `/api/bankguard/predict` | `/api/bankguard/health` |
| FakeGuard | `/api/fakeguard/predict` | `/api/fakeguard/health` |

The combined service health check is `/health`.

## Deploy the model API on Render

The root `render.yaml` defines the single service. Before deploying, ensure Git
LFS tracks the SeeFlood checkpoint, FakeGuard weights, and BankGuard pickle, and
push the application code and model artifacts to the connected repository:

```powershell
git lfs install
git add .gitattributes .gitignore
git add local-assets\models\seeflood\seeflood_01.pth
git add local-assets\models\bankguard\model_maxdepth10.pkl
git add local-assets\models\fakeguard\model.safetensors
git lfs ls-files
```

In Render, create or sync a Blueprint from the repository's root `render.yaml`.
Set `ALLOWED_ORIGINS` to the exact public portfolio origin(s), comma-separated
without trailing slashes. In the frontend host's build environment, set
`NEXT_PUBLIC_MODEL_API_URL` to the Render service URL and rebuild the frontend;
`NEXT_PUBLIC_*` values are embedded at build time.

The service loads all three models during startup. Their checkpoint files total
about 275 MiB before Python, ML libraries, and inference memory. A Render Free
instance may not have enough memory; use a larger instance or separate the
heavier models if startup fails or the service is restarted for memory use.
Free services can also spin down when idle, so the first request can be slow.

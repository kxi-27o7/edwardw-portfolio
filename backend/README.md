# Portfolio model APIs

The portfolio uses three independent FastAPI services:

| Render service | Model | Local API port | Health check |
|---|---|---:|---|
| `seeflood-api` | SeeFlood image classifier | 8000 | `/health` |
| `bankguard-api` | BankGuard transaction classifier | 8001 | `/health` |
| `fakeguard-api` | FakeGuard news classifier | 8002 | `/health` |

## Deploy all three APIs on Render

The root `render.yaml` is a Render Blueprint that defines all three web services.
Create or update one Blueprint from the repository to have Render provision and
manage them together. They remain separate services with their own builds,
deploys, health checks, and HTTPS URLs; this is not one combined API process.

Before creating or syncing the Blueprint:

1. Make sure Git LFS is installed and initialized locally, then add the model
   tracking rules and model artifacts:

   ```powershell
   git lfs install
   git add .gitattributes .gitignore
   git add local-assets\models\seeflood\seeflood_01.pth
   git add local-assets\models\bankguard\model_maxdepth10.pkl
   git add local-assets\models\fakeguard\config.json
   git add local-assets\models\fakeguard\tokenizer.json
   git add local-assets\models\fakeguard\tokenizer_config.json
   git add local-assets\models\fakeguard\model.safetensors
   git lfs ls-files
   ```

   Confirm all three model weight files are listed by `git lfs ls-files`. Add and
   commit the application and configuration changes, then push them to GitHub.
   The FakeGuard tokenizer/config files are ordinary Git files; its safetensors
   weights, the SeeFlood checkpoint, and BankGuard pickle are LFS files.

2. In Render, create a Blueprint using this repository's root `render.yaml`.
   Approve creation of the three services and provide each service's
   `*_ALLOWED_ORIGINS` value when prompted. Use the exact public frontend origin(s),
   comma-separated if needed, without trailing slashes. For example:
   `https://your-portfolio.vercel.app,https://your-domain.com`.
3. Wait for the three initial builds to finish. Each build fetches only its model
   directory from Git LFS, installs that service's requirements, and uses `/health`
   for its health check. Copy each service's HTTPS URL from Render and verify its
   `/health` endpoint.
4. In the frontend host's build environment (for example, Vercel project settings),
   set these three variables to the corresponding Render service origins:

   ```text
   NEXT_PUBLIC_SEEFLOOD_API_URL=https://seeflood-api.onrender.com
   NEXT_PUBLIC_BANKGUARD_API_URL=https://bankguard-api.onrender.com
   NEXT_PUBLIC_FAKEGUARD_API_URL=https://fakeguard-api.onrender.com
   ```

   Set them for each frontend environment you use and rebuild/redeploy the
   frontend; `NEXT_PUBLIC_*` values are embedded at build time.
5. Test each model demo from the deployed site. The first request to an idle free
   Render service can be slow while it starts. Free services can also spin down
   when idle, so this setup is suitable for a portfolio demo rather than a
   latency-guaranteed production API.

Render can manage and initially deploy all three services from the same Blueprint,
but each service builds and deploys independently. Later code pushes may trigger
three separate deployments; the Blueprint does not make their releases atomic.
Each service also consumes its own resources and may need a paid plan if its model
does not fit or respond reliably on the selected free instance.

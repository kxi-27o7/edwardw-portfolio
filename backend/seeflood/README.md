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

## Deploy on Render with a Vercel frontend

1. Push the `.gitattributes` change and the actual checkpoint through Git LFS:

   ```powershell
   git add .gitattributes .gitignore render.yaml backend\seeflood src\components\SeeFloodDemo.jsx
   git add data\projects.json src\components\ProjectCard.jsx package.json package-lock.json
   git add local-assets\models\seeflood\seeflood_01.pth
   git lfs ls-files
   git commit -m "Prepare SeeFlood inference deployment"
   git push
   ```

   Confirm `seeflood_01.pth` appears in `git lfs ls-files` before pushing. Git LFS
   stores the model separately from ordinary Git history; GitHub plan quotas may
   apply.

2. In Render, create a Blueprint from this repository and use the root `render.yaml`.
   The build installs the Python dependencies and pulls the LFS checkpoint. The
   service runs FastAPI on Render's `$PORT` and exposes `/health` as its health check.
3. Once Render creates the service, copy its HTTPS origin, for example
   `https://seeflood-api.onrender.com`.
4. In the Render service's environment settings, set
   `SEEFLOOD_ALLOWED_ORIGINS` to the exact public portfolio origin, with no trailing
   slash (for example `https://your-domain.com`). Add the `https://<site>.vercel.app`
   origin too if visitors will use that address. Save and redeploy.
5. In Vercel's project settings, add
   `NEXT_PUBLIC_SEEFLOOD_API_URL=https://seeflood-api.onrender.com`. Set it for
   Production (and Preview if desired), then redeploy the frontend. The frontend
   calls `<configured URL>/predict`.
6. Verify `https://seeflood-api.onrender.com/health`, then try an image from the
   deployed portfolio. Browser requests require HTTPS on both sides.

The Render free service may sleep when idle, so the first prediction after a quiet
period can take longer. If its build log says `git: 'lfs' is not a git command`,
the checkpoint was not fetched; install Git LFS in the service build environment
before `git lfs pull`.

The service resizes images to 224 × 224 and applies ImageNet normalization, matching
the validation transform in `local-assets/models/seeflood/training_model.py`. It
decodes the three ordinal logits using the same sigmoid-sum-and-round rule used by
the training script. This is a demonstration classifier, not an emergency warning.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploying the model API

The Render Blueprint in `render.yaml` deploys the SeeFlood, BankGuard, and FakeGuard APIs as one web service. Their prediction endpoints are `/api/seeflood/predict`, `/api/bankguard/predict`, and `/api/fakeguard/predict`.

Set `ALLOWED_ORIGINS` on the Render service to the deployed portfolio's origin (for example, `https://your-portfolio.example`, without a trailing slash). Set `NEXT_PUBLIC_MODEL_API_URL` in the portfolio's hosting environment to the Render service URL, then rebuild/redeploy the portfolio so the public variable is included in its client bundle.

For local development, run the API from the repository root with `uvicorn backend.app:app --host 0.0.0.0 --port 8000`. Configure `NEXT_PUBLIC_MODEL_API_URL=http://localhost:8000` in the root `.env.local` if needed; the demos default to that URL in development.

This combined service loads all three models at startup. The checkpoints alone total about 275 MiB, before Python, ML libraries, and runtime memory; a Render Free instance may run out of memory. If startup fails or Render restarts the service for memory use, move to a larger instance or host the heavier model separately.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

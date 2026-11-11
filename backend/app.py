import os
from contextlib import AsyncExitStack, asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.bankguard.main import app as bankguard_app
from backend.fakeguard.main import app as fakeguard_app
from backend.seeflood.main import app as seeflood_app


MODEL_APPS = (seeflood_app, bankguard_app, fakeguard_app)
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with AsyncExitStack() as stack:
        for model_app in MODEL_APPS:
            await stack.enter_async_context(model_app.router.lifespan_context(model_app))
        yield


app = FastAPI(title="Portfolio model API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.mount("/api/seeflood", seeflood_app)
app.mount("/api/bankguard", bankguard_app)
app.mount("/api/fakeguard", fakeguard_app)


@app.get("/health")
def health():
    return {"status": "ok"}

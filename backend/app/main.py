from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings

settings=get_settings()
allowed_origins=[origin.strip() for origin in settings.cors_origins.split(",") if origin]

app=FastAPI(title="Game Data API",version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/health")
async def health_check():
    return {"status":"ok","message":"FastAPI backend ready"}

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="AI Project Evaluator")

# Allow CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import auth_router
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)

app.include_router(auth_router.router)

# We will mount the static frontend files later
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.exists(frontend_dir):
    app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "AI Project Evaluator API is running"}

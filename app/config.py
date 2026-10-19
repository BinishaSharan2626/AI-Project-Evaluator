import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Default to sqlite if MySQL is not provided for easy local dev fallback
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ai_evaluator.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-for-dev")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

settings = Settings()

from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    API_URL: str = "http://localhost:8000/api"
    SECRET_KEY: str = "your-secret-key-here"

    # AI API Configuration
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4-turbo-preview"

    DEEPSEEK_API_KEY: str = ""
    DEEPSEEK_MODEL: str = "deepseek-chat"

    DEFAULT_AI_PROVIDER: str = "openai"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:19006"]

    # Database
    DATABASE_URL: str = "sqlite:///./flora_insight.db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings()

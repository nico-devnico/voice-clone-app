from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Voice Clone API"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:5173", "http://localhost:3000"]

    # Security
    SECRET_KEY: str = "your-secret-key-here" # Change in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./voice_clone.db"

    # AI Model Paths
    CKPT_BASE: str = "../ai_model/OpenVoice/checkpoints_v2/base_speakers"
    CKPT_CONVERTER: str = "../ai_model/OpenVoice/checkpoints_v2/converter"

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()

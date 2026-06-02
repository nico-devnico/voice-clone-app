from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, voice, tts

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
api_router.include_router(tts.router, prefix="/tts", tags=["tts"])

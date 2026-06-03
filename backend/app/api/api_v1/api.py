from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, voice, tts, stt

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
api_router.include_router(tts.router, prefix="/tts", tags=["tts"])
api_router.include_router(stt.router, prefix="/stt", tags=["stt"])

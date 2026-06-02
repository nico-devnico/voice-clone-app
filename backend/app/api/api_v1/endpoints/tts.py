from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.voice_service import voice_service
import os
import uuid

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    language: str = "English"
    speed: float = 1.0
    speaker: str = "default"

@router.post("/generate")
async def generate_tts(request: TTSRequest):
    output_dir = "outputs"
    os.makedirs(output_dir, exist_ok=True)
    output_filename = f"{uuid.uuid4()}.wav"
    output_path = os.path.join(output_dir, output_filename)
    
    try:
        result_path = await voice_service.generate_tts(
            text=request.text,
            output_path=output_path,
            speaker=request.speaker,
            language=request.language,
            speed=request.speed
        )
        if result_path:
            return {"message": "TTS generated", "audio_url": f"/downloads/{output_filename}"}
        else:
            raise HTTPException(status_code=500, detail="Model not loaded or generation failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

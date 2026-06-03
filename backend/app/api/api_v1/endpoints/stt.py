from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.voice_service import voice_service
import shutil
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    file_extension = os.path.splitext(file.filename)[1]
    temp_file = os.path.join(UPLOAD_DIR, f"stt_{uuid.uuid4()}{file_extension}")
    
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        result = await voice_service.transcribe_audio(temp_file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.voice_service import voice_service
import shutil
import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/extract-se")
async def extract_se(file: UploadFile = File(...)):
    file_extension = os.path.splitext(file.filename)[1]
    temp_file = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}{file_extension}")
    
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        se = await voice_service.extract_speaker_embedding(temp_file)
        return {"se": "mock_se_data", "message": "Speaker embedding extracted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

@router.post("/clone")
async def clone_voice(
    source_file: UploadFile = File(...),
    reference_file: UploadFile = File(...)
):
    source_ext = os.path.splitext(source_file.filename)[1]
    ref_ext = os.path.splitext(reference_file.filename)[1]
    
    source_path = os.path.join(UPLOAD_DIR, f"src_{uuid.uuid4()}{source_ext}")
    ref_path = os.path.join(UPLOAD_DIR, f"ref_{uuid.uuid4()}{ref_ext}")
    output_dir = "outputs"
    os.makedirs(output_dir, exist_ok=True)
    output_filename = f"clone_{uuid.uuid4()}.wav"
    output_path = os.path.join(output_dir, output_filename)

    try:
        # Save uploaded files
        with open(source_path, "wb") as buffer:
            shutil.copyfileobj(source_file.file, buffer)
        with open(ref_path, "wb") as buffer:
            shutil.copyfileobj(reference_file.file, buffer)
            
        # 1. Extract SE from reference
        target_se = await voice_service.extract_speaker_embedding(ref_path)
        
        # 2. Convert voice
        result_path = await voice_service.convert_voice(source_path, target_se, output_path)
        
        if result_path:
            return {
                "message": "Voice cloned successfully", 
                "audio_url": f"/downloads/{output_filename}"
            }
        else:
            raise HTTPException(status_code=500, detail="Cloning failed")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up temp files
        for p in [source_path, ref_path]:
            if os.path.exists(p):
                os.remove(p)

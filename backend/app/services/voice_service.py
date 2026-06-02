import os
import torch
from openvoice import se_extractor
from openvoice.api import BaseSpeakerTTS, ToneColorConverter
from app.core.config import settings

class VoiceService:
    def __init__(self):
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        self.tone_color_converter = None
        self.base_speaker_tts = None
        self.source_se = None
        
    def load_models(self):
        if self.tone_color_converter is not None:
            return

        try:
            ckpt_base = settings.CKPT_BASE
            ckpt_converter = settings.CKPT_CONVERTER
            
            # Load Base Speaker TTS
            self.base_speaker_tts = BaseSpeakerTTS(f'{ckpt_base}/config.json', device=self.device)
            self.base_speaker_tts.load_ckpt(f'{ckpt_base}/checkpoint.pth')
            
            # Load Tone Color Converter
            self.tone_color_converter = ToneColorConverter(f'{ckpt_converter}/config.json', device=self.device)
            self.tone_color_converter.load_ckpt(f'{ckpt_converter}/checkpoint.pth')
            
            # Load Source SE
            self.source_se = torch.load(f'{ckpt_base}/en_default_se.pth').to(self.device)
            
            print("Models loaded successfully")
        except Exception as e:
            print(f"Error loading models: {e}")
            # In a real scenario, we might want to raise this or handle it better
            pass

    async def extract_speaker_embedding(self, audio_path: str):
        self.load_models()
        if self.tone_color_converter is None:
            return None
            
        target_se, audio_name = se_extractor.get_se(
            audio_path, 
            self.tone_color_converter, 
            target_dir='processed', 
            vad=True
        )
        return target_se

    async def generate_tts(self, text: str, output_path: str, speaker: str = "default", language: str = "English", speed: float = 1.0):
        self.load_models()
        if self.base_speaker_tts is None:
            return None
            
        self.base_speaker_tts.tts(
            text, 
            output_path, 
            speaker=speaker, 
            language=language, 
            speed=speed
        )
        return output_path

    async def convert_voice(self, source_audio_path: str, target_se, output_path: str):
        self.load_models()
        if self.tone_color_converter is None or self.source_se is None:
            return None
            
        self.tone_color_converter.convert(
            source_audio_path, 
            src_se=self.source_se, 
            tgt_se=target_se, 
            output_path=output_path
        )
        return output_path

voice_service = VoiceService()

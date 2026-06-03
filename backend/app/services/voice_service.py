import os
import torch
import librosa
from faster_whisper import WhisperModel
try:
    from openvoice import se_extractor
    from openvoice.api import ToneColorConverter
    from melo.api import TTS
except ImportError:
    print("Warning: OpenVoice or MeloTTS dependencies not found. Voice features will be disabled.")
    se_extractor = None
    ToneColorConverter = None
    TTS = None

from app.core.config import settings

class VoiceService:
    def __init__(self):
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        self.tone_color_converter = None
        self.tts_models = {} # Cache for different languages
        self.stt_model = None
        
    def load_converter(self):
        if self.tone_color_converter is not None:
            return

        try:
            ckpt_converter = settings.CKPT_CONVERTER
            
            if not os.path.exists(ckpt_converter):
                raise Exception(f"Converter checkpoints not found at {ckpt_converter}. Please ensure OpenVoice V2 models are downloaded.")

            conv_config_path = f'{ckpt_converter}/config.json'
            conv_checkpoint_path = f'{ckpt_converter}/checkpoint.pth'
            
            if not os.path.exists(conv_config_path) or not os.path.exists(conv_checkpoint_path):
                raise Exception(f"Converter config or checkpoint missing in {ckpt_converter}")

            self.tone_color_converter = ToneColorConverter(conv_config_path, device=self.device)
            self.tone_color_converter.load_ckpt(conv_checkpoint_path)
            
            print("OpenVoice V2 ToneColorConverter loaded successfully")
        except Exception as e:
            print(f"Error loading ToneColorConverter: {e}")
            raise e

    def get_tts_model(self, language: str):
        lang_code = self._get_lang_code(language)
        if lang_code in self.tts_models:
            return self.tts_models[lang_code]
        
        try:
            print(f"Loading MeloTTS model for {lang_code}...")
            model = TTS(language=lang_code, device=self.device)
            self.tts_models[lang_code] = model
            return model
        except Exception as e:
            print(f"Error loading MeloTTS for {lang_code}: {e}")
            raise e

    def _get_lang_code(self, language: str):
        # Map long language names to MeloTTS codes
        mapping = {
            "english": "EN",
            "spanish": "ES",
            "french": "FR",
            "chinese": "ZH",
            "japanese": "JP",
            "korean": "KR"
        }
        return mapping.get(language.lower(), "EN")

    def load_stt_model(self):
        if self.stt_model is not None:
            return
        try:
            self.stt_model = WhisperModel("base", device=self.device, compute_type="float32" if self.device == "cpu" else "float16")
            print("STT model loaded successfully")
        except Exception as e:
            print(f"Error loading STT model: {e}")
            raise e

    async def transcribe_audio(self, audio_path: str):
        self.load_stt_model()
        segments, info = self.stt_model.transcribe(audio_path, beam_size=5)
        text = " ".join([segment.text for segment in segments])
        return {
            "text": text.strip(),
            "language": info.language,
            "language_probability": info.language_probability
        }

    async def extract_speaker_embedding(self, audio_path: str):
        self.load_converter()
        if self.tone_color_converter is None:
            raise Exception("ToneColorConverter not loaded")
            
        target_se, audio_name = se_extractor.get_se(
            audio_path, 
            self.tone_color_converter, 
            vad=True
        )
        return target_se

    async def generate_tts(self, text: str, output_path: str, speaker: str = "default", language: str = "English", speed: float = 1.0):
        model = self.get_tts_model(language)
        
        # In MeloTTS, we use the speaker_id from the model's hps
        speaker_ids = model.hps.speakers
        # If speaker is "default", try to find a suitable one
        if speaker == "default" or speaker not in speaker_ids:
            # For EN, there are multiple speakers like 'EN-Default', 'EN-US', etc.
            # Just take the first one available
            speaker = list(speaker_ids.keys())[0]
            
        model.tts_to_file(text, speaker_ids[speaker], output_path, speed=speed)
        return output_path

    async def convert_voice(self, source_audio_path: str, target_se, output_path: str, language: str = "English"):
        self.load_converter()
        if self.tone_color_converter is None:
            raise Exception("ToneColorConverter not loaded")
        
        # In V2, we need the source_se corresponding to the MeloTTS speaker used
        lang_code = self._get_lang_code(language)
        # Checkpoints for source SEs are usually in checkpoints_v2/ses/
        se_path = os.path.join(settings.CKPT_BASE, "..", "ses", f"{lang_code.lower()}.pth")
        
        if not os.path.exists(se_path):
            # Fallback to a default one if exists
            se_path = os.path.join(settings.CKPT_BASE, "..", "ses", "en.pth")
            
        if not os.path.exists(se_path):
            raise Exception(f"Source SE not found at {se_path}. Cannot perform voice conversion.")
            
        source_se = torch.load(se_path).to(self.device)
            
        self.tone_color_converter.convert(
            source_audio_path, 
            src_se=source_se, 
            tgt_se=target_se, 
            output_path=output_path
        )
        return output_path

voice_service = VoiceService()

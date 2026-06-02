import sys
import os

# Add ai_model to path to find openvoice
sys.path.append(os.path.join(os.getcwd(), 'ai_model', 'OpenVoice'))

def test_imports():
    print("Checking OpenVoice imports...")
    try:
        import torch
        print(f"✓ Torch version: {torch.__version__}")
        
        from openvoice.api import BaseSpeakerTTS, ToneColorConverter
        print("✓ OpenVoice API classes imported")
        
        from openvoice import se_extractor
        print("✓ SE Extractor imported")
        
        import librosa
        print(f"✓ Librosa version: {librosa.__version__}")
        
        print("\nSUCCESS: All critical OpenVoice dependencies are present.")
        return True
    except ImportError as e:
        print(f"\nFAILURE: Missing dependency: {e}")
        return False
    except Exception as e:
        print(f"\nFAILURE: Unexpected error: {e}")
        return False

if __name__ == "__main__":
    test_imports()

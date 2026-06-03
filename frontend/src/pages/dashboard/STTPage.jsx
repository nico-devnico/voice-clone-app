import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFileText, FiCopy, FiCheckCircle, FiMic } from 'react-icons/fi';
import { voiceService } from '../../services/api';
import '../../styles/VoiceClone.css';

/**
 * Page de Transcription (Speech-To-Text)
 */
const STTPage = () => {
  const [file, setFile] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTranscribe = async () => {
    if (!file) return;
    setIsTranscribing(true);
    
    try {
      console.log("Transcription de :", file.name);
      const response = await voiceService.transcribe(file);
      setTranscription(response.text);
      setIsTranscribing(false);
    } catch (error) {
      console.error("Erreur STT:", error);
      setIsTranscribing(false);
      alert("Erreur lors de la transcription. Vérifiez que le serveur backend est lancé avec les dépendances nécessaires.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="voice-clone-page">
      <header className="page-header">
        <h1>Transcription</h1>
        <p className="text-secondary">Convertissez vos fichiers audio en texte avec une précision chirurgicale.</p>
      </header>

      <div className="clone-container-dashboard">
        <div className="clone-main">
          <div className="input-section">
            <div className="section-title">
              <FiMic className="icon" />
              <h3>Fichier Audio</h3>
            </div>
            
            <div className={`upload-area ${file ? 'has-file' : ''}`}>
              <input 
                type="file" 
                id="stt-upload" 
                onChange={handleFileUpload}
                accept="audio/*"
                hidden
              />
              <label htmlFor="stt-upload" className="upload-label">
                {file ? (
                  <div className="file-ready">
                    <FiCheckCircle className="success-icon" />
                    <span>{file.name}</span>
                    <button onClick={() => setFile(null)} className="btn-text">Supprimer</button>
                  </div>
                ) : (
                  <>
                    <FiUpload className="upload-icon" />
                    <span>Uploadez l'audio à transcrire</span>
                    <span className="upload-hint">MP3, WAV, M4A, FLAC</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <button 
            className={`btn-generate ${isTranscribing ? 'loading' : ''}`}
            onClick={handleTranscribe}
            disabled={!file || isTranscribing}
          >
            {isTranscribing ? 'Transcription en cours...' : 'Lancer la transcription'}
          </button>

          {transcription && (
            <motion.div 
              className="input-section mt-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="section-title">
                <FiFileText className="icon" />
                <h3>Transcription</h3>
                <button onClick={copyToClipboard} className="btn-icon-text" style={{ marginLeft: 'auto' }}>
                  {copied ? <FiCheckCircle color="var(--success)" /> : <FiCopy />}
                  {copied ? ' Copié !' : ' Copier'}
                </button>
              </div>
              <textarea 
                className="text-input" 
                style={{ minHeight: '150px' }}
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                readOnly={!transcription}
              />
            </motion.div>
          )}
        </div>

        <div className="clone-sidebar">
          <div className="content-card">
            <h3>Conseils</h3>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginTop: '1rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Utilisez des fichiers de bonne qualité.</li>
              <li style={{ marginBottom: '0.5rem' }}>Réduisez les bruits de fond pour une meilleure précision.</li>
              <li>La ponctuation est gérée automatiquement.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STTPage;

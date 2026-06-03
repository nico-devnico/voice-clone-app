import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiMic, FiType, FiPlay, FiDownload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { voiceService } from '../../services/api';
import '../../styles/VoiceClone.css';

/**
 * Page de Clonage Vocal (Dashboard)
 * Interface principale pour créer un clone de voix à partir d'un fichier audio.
 */
const VoiceClone = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const languages = ['English', 'Spanish', 'French', 'Chinese', 'Japanese', 'Korean'];

  // Gère le téléchargement du fichier audio
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Gère le processus de génération
  const handleGenerate = async () => {
    if (!file && !prompt) return;
    setIsGenerating(true);
    setError(null);
    
    try {
      let response;
      if (file && prompt) {
        response = await voiceService.cloneTTS(prompt, file, language);
      } else if (prompt) {
        response = await voiceService.generateTTS(prompt, language);
      }
      
      setResult({
        name: "Résultat généré",
        duration: "0:05",
        url: `http://localhost:8000${response.audio_url}`
      });
      setIsGenerating(false);
      
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      setError(error.response?.data?.detail || "Une erreur est survenue lors de la génération.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="voice-clone-page">
      {/* En-tête de la page */}
      <header className="page-header">
        <h1>Studio Vocal</h1>
        <p className="text-secondary">Clonez une voix à partir d'un audio ou générez du texte avec une voix existante.</p>
      </header>

      <div className="clone-container-dashboard">
        {/* Colonne Principale : Entrées */}
        <div className="clone-main">
          {/* Section 1 : Voix de Référence (Optionnel pour TTS seul) */}
          <div className="input-section">
            <div className="section-title">
              <FiMic className="icon" />
              <h3>Voix de Référence (Optionnel)</h3>
            </div>
            
            <div className={`upload-area ${file ? 'has-file' : ''}`}>
              <input 
                type="file" 
                id="voice-upload" 
                onChange={handleFileUpload}
                accept="audio/*"
                hidden
              />
              <label htmlFor="voice-upload" className="upload-label">
                {file ? (
                  <div className="file-ready">
                    <FiCheckCircle className="success-icon" />
                    <span>{file.name}</span>
                    <button onClick={() => setFile(null)} className="btn-text">Supprimer</button>
                  </div>
                ) : (
                  <>
                    <FiUpload className="upload-icon" />
                    <span>Uploadez un fichier audio pour cloner une voix</span>
                    <span className="upload-hint">WAV, MP3, M4A jusqu'à 10 Mo</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Section 2 : Script (Optionnel pour Analyse seule) */}
          <div className="input-section mt-xl">
            <div className="section-title">
              <FiType className="icon" />
              <h3>Langue et Texte</h3>
            </div>
            <select 
              className="text-input" 
              style={{ marginBottom: '1rem', height: 'auto', padding: '0.75rem' }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <textarea 
              className="text-input"
              placeholder="Entrez le texte que la voix doit prononcer..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Bouton d'action principal */}
          {error && (
            <div className="error-message" style={{ color: 'var(--error)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}
          <button 
            className={`btn-generate ${isGenerating ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={(!file && !prompt) || isGenerating}
          >
            {isGenerating ? 'Traitement en cours...' : 'Générer'}
          </button>
        </div>

        {/* Colonne Latérale : Résultats et Historique */}
        <div className="clone-sidebar">
          {/* Carte de Résultat */}
          <div className="result-card-dashboard">
            <h3>Résultat</h3>
            {!result && !isGenerating ? (
              <div className="empty-result-dashboard">
                <FiPlay className="icon-placeholder" />
                <p className="text-tertiary">Les résultats apparaîtront ici</p>
              </div>
            ) : isGenerating ? (
              <div className="loading-result">
                <div className="pulse-circle"></div>
                <p>Synthèse audio en cours...</p>
              </div>
            ) : (
              <div className="result-ready">
                <div className="audio-info">
                  <span className="name">{result.name}</span>
                  <span className="duration text-tertiary">{result.duration}</span>
                </div>
                <div className="audio-controls">
                  <button className="btn-icon-play"><FiPlay /></button>
                  <div className="waveform-placeholder"></div>
                </div>
                <button className="btn-download">
                  <FiDownload />
                  Télécharger l'audio
                </button>
              </div>
            )}
          </div>
          
          {/* Mini Historique */}
          <div className="history-mini">
            <h3>Clones Récents</h3>
            <div className="mini-list empty-state">
              <p className="text-tertiary" style={{ fontSize: '0.75rem' }}>Aucun clone récent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceClone;

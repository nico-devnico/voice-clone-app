import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiType, FiPlay, FiDownload, FiVolume2, FiGlobe } from 'react-icons/fi';
import '../../styles/VoiceClone.css';

/**
 * Page de Synthèse Vocale (Text-To-Speech)
 */
const TTSPage = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('emma');
  const [language, setLanguage] = useState('fr');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const voices = [
    { id: 'emma', name: 'Emma', style: 'Professionnel' },
    { id: 'lucas', name: 'Lucas', style: 'Décontracté' },
    { id: 'olivia', name: 'Olivia', style: 'Chaleureux' },
  ];

  const handleGenerate = async () => {
    if (!text) return;
    setIsGenerating(true);
    
    try {
      console.log("Génération TTS :", { text, voice, language });
      // Ici l'appel API réel
    } catch (error) {
      console.error("Erreur TTS:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="voice-clone-page">
      <header className="page-header">
        <h1>Synthèse Vocale</h1>
        <p className="text-secondary">Transformez vos textes en paroles réalistes avec nos voix IA.</p>
      </header>

      <div className="clone-container-dashboard">
        <div className="clone-main">
          <div className="input-section">
            <div className="section-title">
              <FiGlobe className="icon" />
              <h3>Configuration</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <select 
                className="settings-select" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: '100%', height: '45px' }}
              >
                <option value="fr">Français (FR)</option>
                <option value="en">English (US)</option>
                <option value="es">Español (ES)</option>
              </select>
              <select 
                className="settings-select" 
                value={voice} 
                onChange={(e) => setVoice(e.target.value)}
                style={{ width: '100%', height: '45px' }}
              >
                {voices.map(v => (
                  <option key={v.id} value={v.id}>{v.name} ({v.style})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-section mt-xl">
            <div className="section-title">
              <FiType className="icon" />
              <h3>Texte à synthétiser</h3>
            </div>
            <textarea 
              className="text-input"
              placeholder="Entrez le texte que vous souhaitez convertir en audio..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button 
            className={`btn-generate ${isGenerating ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={!text || isGenerating}
          >
            {isGenerating ? 'Synthèse en cours...' : 'Générer l\'audio'}
          </button>
        </div>

        <div className="clone-sidebar">
          <div className="result-card-dashboard">
            <h3>Résultat</h3>
            {!result && !isGenerating ? (
              <div className="empty-result-dashboard">
                <FiVolume2 className="icon-placeholder" />
                <p className="text-tertiary">L'audio généré apparaîtra ici</p>
              </div>
            ) : isGenerating ? (
              <div className="loading-result">
                <div className="pulse-circle"></div>
                <p>Création de la voix...</p>
              </div>
            ) : (
              <div className="result-ready">
                <div className="audio-info">
                  <span className="name">TTS_Output.mp3</span>
                  <span className="duration text-tertiary">0:15</span>
                </div>
                <button className="btn-download">
                  <FiDownload />
                  Télécharger
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSPage;

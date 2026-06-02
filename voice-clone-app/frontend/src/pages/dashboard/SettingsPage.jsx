import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiMoon, FiSun, FiGlobe, FiBell, FiLock } from 'react-icons/fi';
import '../../styles/Settings.css';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="settings-page">
      <header className="page-header">
        <h1>Paramètres</h1>
        <p className="text-secondary">Personnalisez votre expérience VoiceClone AI.</p>
      </header>

      <div className="settings-list">
        {/* Apparence */}
        <div className="content-card settings-group">
          <div className="group-header">
            <FiSun className="icon" />
            <div className="group-info">
              <h3>Apparence</h3>
              <p className="text-secondary">Choisissez le thème de l'interface.</p>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span>Mode Sombre</span>
              <p className="text-tertiary">Activer le thème sombre pour reposer vos yeux.</p>
            </div>
            <button 
              className={`toggle-switch ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className="switch-knob"></div>
            </button>
          </div>
        </div>

        {/* Langue */}
        <div className="content-card settings-group">
          <div className="group-header">
            <FiGlobe className="icon" />
            <div className="group-info">
              <h3>Langue</h3>
              <p className="text-secondary">Définissez votre langue préférée.</p>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span>Langue de l'interface</span>
            </div>
            <select className="settings-select">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="content-card settings-group">
          <div className="group-header">
            <FiBell className="icon" />
            <div className="group-info">
              <h3>Notifications</h3>
              <p className="text-secondary">Gérez vos alertes et emails.</p>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span>Emails de génération</span>
              <p className="text-tertiary">Recevoir un email quand une voix est prête.</p>
            </div>
            <button 
              className={`toggle-switch ${notifications ? 'active' : ''}`}
              onClick={() => setNotifications(!notifications)}
            >
              <div className="switch-knob"></div>
            </button>
          </div>
        </div>

        {/* Confidentialité */}
        <div className="content-card settings-group">
          <div className="group-header">
            <FiLock className="icon" />
            <div className="group-info">
              <h3>Confidentialité</h3>
              <p className="text-secondary">Contrôlez vos données.</p>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <span>Partage anonyme</span>
              <p className="text-tertiary">Aider à améliorer nos modèles avec vos données anonymisées.</p>
            </div>
            <button className="toggle-switch">
              <div className="switch-knob"></div>
            </button>
          </div>
          <div className="setting-danger">
            <button className="btn-danger">Supprimer mon compte</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

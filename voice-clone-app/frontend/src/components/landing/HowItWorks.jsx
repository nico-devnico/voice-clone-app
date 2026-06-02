import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiType, FiZap, FiDownload } from 'react-icons/fi';
import '../../styles/HowItWorks.css';

/**
 * Section Comment ça marche - Explique le processus en 4 étapes simples
 */
const HowItWorks = () => {
  const steps = [
    {
      icon: <FiUpload />,
      title: 'Uploadez une voix',
      description: 'Envoyez un clip audio de 30 secondes de la voix que vous souhaitez cloner.'
    },
    {
      icon: <FiType />,
      title: 'Écrivez votre texte',
      description: 'Tapez ou collez le script que vous souhaitez faire lire par cette voix.'
    },
    {
      icon: <FiZap />,
      title: 'Générez l\'audio',
      description: 'Notre moteur neuronal synthétise la parole en temps réel.'
    },
    {
      icon: <FiDownload />,
      title: 'Téléchargez',
      description: 'Exportez votre audio de qualité studio au format WAV ou MP3.'
    }
  ];

  return (
    <section className="how-it-works section-padding bg-primary">
      <div className="container">
        {/* En-tête */}
        <div className="section-header text-center">
          <span className="badge">Processus Simple</span>
          <h2>Comment ça marche</h2>
          <p className="text-secondary">Transformez du texte en parole en quatre étapes faciles.</p>
        </div>

        {/* Grille des étapes */}
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{i + 1}</div>
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p className="text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

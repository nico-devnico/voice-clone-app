import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiMic, FiType, FiGlobe, 
  FiZap, FiAward, FiCode, FiFileText 
} from 'react-icons/fi';
import '../../styles/Features.css';

/**
 * Section Fonctionnalités - Présente les points clés du produit
 */
const Features = () => {
  const features = [
    {
      icon: <FiMic />,
      title: 'Clonage Vocal',
      description: 'Clonage instantané avec seulement 30 secondes d\'audio de référence.'
    },
    {
      icon: <FiType />,
      title: 'Synthèse Vocale (TTS)',
      description: 'Générez une parole réaliste à partir de n\'importe quel texte avec une prosodie parfaite.'
    },
    {
      icon: <FiGlobe />,
      title: 'Multi-langues',
      description: 'Support de plus de 20 langues avec des accents natifs naturels.'
    },
    {
      icon: <FiZap />,
      title: 'Temps Réel',
      description: 'Génération à ultra-basse latence pour les applications interactives.'
    },
    {
      icon: <FiAward />,
      title: 'Qualité Studio',
      description: 'Sortie audio haute fidélité prête pour un usage professionnel.'
    },
    {
      icon: <FiFileText />,
      title: 'Transcription (STT)',
      description: 'Convertissez vos fichiers audio en texte avec une précision chirurgicale.'
    },
    {
      icon: <FiCode />,
      title: 'Accès API',
      description: 'API simple et puissante pour intégrer la voix dans vos propres applications.'
    }
  ];

  return (
    <section id="features" className="section-padding bg-secondary">
      <div className="container">
        {/* En-tête de section */}
        <div className="section-header text-center">
          <span className="badge">Capacités Puissantes</span>
          <h2>Conçu pour les Professionnels</h2>
          <p className="text-secondary">Tout ce dont vous avez besoin pour une synthèse vocale de pointe.</p>
        </div>
        
        {/* Grille des fonctionnalités */}
        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className="feature-card"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

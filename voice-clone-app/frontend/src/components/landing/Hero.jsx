import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/Hero.css';

/**
 * Composant Hero - Section d'introduction de la Landing Page
 * Style inspiré par Apple et Linear : épuré, typographie forte, animations subtiles.
 */
const Hero = () => {
  return (
    <section className="hero-landing section-padding">
      <div className="container hero-content">
        {/* Colonne Gauche : Texte et Actions */}
        <motion.div 
          className="hero-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge">Accès Bêta Disponible</span>
          <h1>Créez des voix IA <br /> ultra-réalistes</h1>
          <p className="text-secondary">
            Clonez n'importe quelle voix et générez une parole naturelle en quelques secondes. 
            La nouvelle génération de synthèse vocale est arrivée.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-primary">Commencer gratuitement</Link>
            <a href="#demo" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Voir la démo</a>
          </div>
        </motion.div>
        
        {/* Colonne Droite : Visualisation Audio */}
        <motion.div 
          className="hero-visual"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="audio-visualizer">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="bar"
                animate={{ height: [20, 40, 60, 30, 50, 20] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

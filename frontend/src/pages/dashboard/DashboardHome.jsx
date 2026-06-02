import React from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiType, FiTrendingUp, FiClock } from 'react-icons/fi';
import '../../styles/DashboardHome.css';

/**
 * Page d'accueil du Dashboard
 * Présente un résumé des statistiques et de l'activité récente.
 */
const DashboardHome = () => {
  // Données initiales pour les statistiques
  const stats = [
    { label: 'Générations', value: '0', icon: <FiTrendingUp />, trend: '—' },
    { label: 'Voix Créées', value: '0', icon: <FiMic />, trend: '—' },
    { label: 'Audio Généré', value: '0h', icon: <FiType />, trend: '—' },
    { label: 'Utilisation API', value: '0%', icon: <FiClock />, trend: 'Stable' },
  ];

  return (
    <div className="dashboard-home">
      {/* En-tête de bienvenue */}
      <header className="dashboard-header">
        <h1>Bon retour, Alex</h1>
        <p className="text-secondary">Voici ce qui se passe avec vos projets vocaux.</p>
      </header>

      {/* Grille des Statistiques */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            className="stat-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
            <div className="stat-trend">{stat.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Section Contenu : Activité et Graphique */}
      <div className="dashboard-content-grid">
        {/* Liste des activités récentes */}
        <div className="content-card recent-activity">
          <h3>Générations Récentes</h3>
          <div className="activity-list empty-state">
            <p className="text-tertiary">Aucune activité récente. Commencez par cloner une voix !</p>
          </div>
        </div>

        {/* Aperçu de l'utilisation de l'API */}
        <div className="content-card api-overview">
          <h3>Utilisation de l'API</h3>
          <div className="usage-chart-placeholder">
            <div className="placeholder-text text-tertiary">Visualisation de l'utilisation à venir</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

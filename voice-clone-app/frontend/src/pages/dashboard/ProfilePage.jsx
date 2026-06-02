import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCamera, FiEdit2, FiShield } from 'react-icons/fi';
import '../../styles/Profile.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <header className="page-header">
        <h1>Mon Profil</h1>
        <p className="text-secondary">Gérez vos informations personnelles et votre compte.</p>
      </header>

      <div className="profile-grid">
        {/* Colonne Gauche : Avatar et Infos de base */}
        <div className="profile-main">
          <div className="content-card profile-card">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <div className="avatar-placeholder">AD</div>
                <button className="btn-camera"><FiCamera /></button>
              </div>
              <div className="avatar-info">
                <h2>Alex Dupont</h2>
                <span className="badge">Membre Pro</span>
              </div>
            </div>

            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input type="text" defaultValue="Alex" />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" defaultValue="Dupont" />
                </div>
              </div>

              <div className="form-group">
                <label>Adresse e-mail</label>
                <div className="input-with-icon">
                  <FiMail />
                  <input type="email" defaultValue="alex.dupont@exemple.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea placeholder="Parlez-nous de vous..." defaultValue="Créateur de contenu passionné par l'IA et les nouvelles technologies."></textarea>
              </div>

              <button type="submit" className="btn-primary">Enregistrer les modifications</button>
            </form>
          </div>
        </div>

        {/* Colonne Droite : Sécurité et Abonnement */}
        <div className="profile-sidebar">
          <div className="content-card subscription-card">
            <h3>Abonnement</h3>
            <div className="plan-info">
              <span className="plan-name">Plan Pro</span>
              <span className="plan-price">29€ / mois</span>
            </div>
            <p className="text-secondary">Votre prochain renouvellement est le 12 Juillet 2026.</p>
            <button className="btn-outline">Gérer l'abonnement</button>
          </div>

          <div className="content-card security-card">
            <div className="card-title">
              <FiShield />
              <h3>Sécurité</h3>
            </div>
            <div className="security-item">
              <span>Mot de passe</span>
              <button className="btn-text">Modifier</button>
            </div>
            <div className="security-item">
              <span>Double authentification</span>
              <button className="btn-text">Activer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

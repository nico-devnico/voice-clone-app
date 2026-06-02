import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';
import '../styles/Footer.css';

/**
 * Composant Footer - Pied de page du site
 * Contient les liens de navigation, les ressources et les réseaux sociaux.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Structure des liens du footer
  const footerLinks = [
    {
      title: 'Produit',
      links: [
        { label: 'Fonctionnalités', href: '#features' },
        { label: 'Clonage Vocal', href: '#' },
        { label: 'Synthèse Vocale', href: '#' },
        { label: 'API', href: '#' },
      ]
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Centre d\'aide', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'Communauté', href: '#' },
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '#' },
        { label: 'Confidentialité', href: '#' },
        { label: 'Conditions', href: '#' },
        { label: 'Contact', href: '#' },
      ]
    }
  ];

  return (
    <footer className="footer bg-secondary">
      <div className="container footer-content">
        {/* Marque et Réseaux Sociaux */}
        <div className="footer-brand">
          <Link to="/" className="nav-logo">
            <div className="logo-dot"></div>
            <span>VoiceClone AI</span>
          </Link>
          <p className="text-secondary">
            Synthèse vocale IA de nouvelle génération pour les créateurs et les développeurs.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Github"><FiGithub /></a>
            <a href="#" aria-label="Linkedin"><FiLinkedin /></a>
          </div>
        </div>

        {/* Grille de Liens */}
        <div className="footer-links-grid">
          {footerLinks.map((section) => (
            <div key={section.title} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="container footer-bottom">
        <p className="text-tertiary">
          © {currentYear} VoiceClone AI. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

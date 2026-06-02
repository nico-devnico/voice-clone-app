import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

/**
 * Composant Navbar - Barre de navigation principale
 * Gère le scroll pour l'effet de flou et le menu mobile.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Détecte le scroll pour changer le style de la barre
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Ne pas afficher la Navbar sur le Dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="logo-dot"></div>
          <span>VoiceClone AI</span>
        </Link>

        {/* Menu Desktop */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">{link.label}</a>
          ))}
          <div className="nav-divider"></div>
          <Link to="/login" className="nav-link">Connexion</Link>
          <Link to="/register" className="btn-nav">Essayer Gratuitement</Link>
        </div>

        {/* Toggle Mobile */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Connexion</Link>
            <Link to="/register" className="btn-mobile-nav" onClick={() => setIsMobileMenuOpen(false)}>Essayer Gratuitement</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import '../../styles/Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici on naviguerait vers le dashboard après authentification
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <div className="logo-dot"></div>
            <span>VoiceClone AI</span>
          </Link>
          <h1>Bon retour parmi nous</h1>
          <p className="text-secondary">Connectez-vous pour continuer votre projet vocal.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adresse e-mail</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input 
                type="email" 
                placeholder="nom@exemple.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Mot de passe</label>
              <Link to="/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Oublié ?
              </Link>
            </div>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-primary">
            Se connecter <FiArrowRight />
          </button>
        </form>

        <div className="auth-divider">
          <span>ou continuer avec</span>
        </div>

        <button className="btn-auth-google">
          <FcGoogle /> Google
        </button>

        <p className="auth-footer">
          Pas encore de compte ? <Link to="/register">S'inscrire gratuitement</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

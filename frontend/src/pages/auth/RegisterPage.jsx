import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import '../../styles/Auth.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h1>Créer un compte</h1>
          <p className="text-secondary">Rejoignez des milliers de créateurs aujourd'hui.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                placeholder="Alex Dupont" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          </div>

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
            <label>Mot de passe</label>
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
            <p className="input-hint">Minimum 8 caractères, incluant un chiffre.</p>
          </div>

          <button type="submit" className="btn-auth-primary">
            S'inscrire <FiArrowRight />
          </button>
        </form>

        <div className="auth-divider">
          <span>ou s'inscrire avec</span>
        </div>

        <button className="btn-auth-google">
          <FcGoogle /> Google
        </button>

        <p className="auth-footer">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiGrid, FiMic, FiType, FiFolder, 
  FiClock, FiKey, FiSettings, FiUser, FiFileText 
} from 'react-icons/fi';
import '../../styles/Sidebar.css';

/**
 * Composant Sidebar - Navigation latérale du Dashboard
 * Fournit des liens vers toutes les fonctionnalités de l'application.
 */
const Sidebar = () => {
  // Configuration des menus principaux
  const menuItems = [
    { icon: <FiGrid />, label: 'Tableau de bord', path: '/dashboard' },
    { icon: <FiMic />, label: 'Studio Vocal', path: '/dashboard/clone' },
    { icon: <FiType />, label: 'Synthèse Vocale', path: '/dashboard/tts' },
    { icon: <FiFileText />, label: 'Transcription', path: '/dashboard/stt' },
    { icon: <FiFolder />, label: 'Bibliothèque', path: '/dashboard/library' },
    { icon: <FiClock />, label: 'Historique', path: '/dashboard/history' },
    { icon: <FiKey />, label: 'Clés API', path: '/dashboard/api-keys' },
  ];

  // Configuration des menus du bas (paramètres)
  const bottomItems = [
    { icon: <FiSettings />, label: 'Paramètres', path: '/dashboard/settings' },
    { icon: <FiUser />, label: 'Profil', path: '/dashboard/profile' },
  ];

  return (
    <aside className="sidebar">
      {/* Zone Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon"></div>
        <span>VoiceClone AI</span>
      </div>
      
      <nav className="sidebar-nav">
        {/* Navigation Principale */}
        <div className="nav-section">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              end
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          ))}
        </div>
        
        {/* Navigation Bas de page */}
        <div className="nav-section bottom">
          {bottomItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

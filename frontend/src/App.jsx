import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardHome from './pages/dashboard/DashboardHome';
import VoiceClone from './pages/dashboard/VoiceClone';
import TTSPage from './pages/dashboard/TTSPage';
import STTPage from './pages/dashboard/STTPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Placeholder pages for now
const LibraryPage = () => <div className="content-card"><h2>Bibliothèque de voix</h2><p>Prochainement...</p></div>;
const HistoryPage = () => <div className="content-card"><h2>Historique</h2><p>Prochainement...</p></div>;
const APIKeysPage = () => <div className="content-card"><h2>Clés API</h2><p>Prochainement...</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="clone" element={<VoiceClone />} />
          <Route path="tts" element={<TTSPage />} />
          <Route path="stt" element={<STTPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="api-keys" element={<APIKeysPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

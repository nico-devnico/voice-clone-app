import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 'var(--space-2xl)', backgroundColor: 'var(--bg-secondary)' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

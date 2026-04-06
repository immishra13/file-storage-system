import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import FilesView from './DashboardViews/FilesView';
import FoldersView from './DashboardViews/FoldersView';
import SharedView from './DashboardViews/SharedView';
import './Dashboard.css';

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <div className={`sidebar-wrapper ${mobileOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      
      {mobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      <main className="dashboard-main">
        <Navbar toggleSidebar={() => setMobileOpen(!mobileOpen)} />
        
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<FilesView />} />
            <Route path="/folders" element={<FoldersView />} />
            <Route path="/shared" element={<SharedView />} />
            <Route path="/folder/:folderId" element={<FilesView inFolder={true} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

import React, { useState } from 'react';
import { Menu, Search, Plus, UploadCloud } from 'lucide-react';
import UploadModal from './UploadModal';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <header className="top-navbar">
        <div className="flex items-center gap-4">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            <Menu size={24} color="var(--text-main)" />
          </button>
          
          <h1 className="page-title">My Files</h1>
        </div>

        <div className="navbar-actions">
          {/* Search Bar - Stylized */}
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input type="text" placeholder="Search files..." />
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <UploadCloud size={18} /> Upload
          </button>
        </div>
      </header>
      
      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </>
  );
}

export default Navbar;

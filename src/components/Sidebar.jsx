import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, Folder, File, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header flex items-center gap-2">
        <Cloud size={28} color="var(--primary-color)" fill="var(--primary-color)" />
        <span className="logo-text">CloudDrive</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>
              <File size={20} /> My Files
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/folders" className={({ isActive }) => isActive ? 'active' : ''}>
              <Folder size={20} /> Folders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/shared" className={({ isActive }) => isActive ? 'active' : ''}>
              <Users size={20} /> Shared Files
            </NavLink>
          </li>
        </ul>

        <div className="sidebar-bottom">
          <ul>
            <li>
              <button className="sidebar-btn" onClick={() => {}}>
                <Settings size={20} /> Profile
              </button>
            </li>
            <li>
              <button className="sidebar-btn text-danger" onClick={logout}>
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

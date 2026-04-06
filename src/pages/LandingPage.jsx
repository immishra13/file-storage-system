import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Shield, FolderGit2, Share2, ChevronRight } from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container animate-fade-in">
      <nav className="landing-nav container">
        <div className="logo flex items-center gap-2">
          <Cloud size={24} color="var(--primary-color)" fill="var(--primary-color)" />
          <span className="logo-text">CloudDrive</span>
        </div>
        <div className="nav-links flex items-center gap-4">
          <Link to="/login" className="btn btn-outline">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Sign up</Link>
        </div>
      </nav>

      <main className="landing-main container">
        <section className="hero text-center">
          <h1 className="hero-title pt-8">Your Personal Cloud Storage</h1>
          <p className="hero-subtitle">
            Securely store, organize, and share your files with a beautiful, minimal platform inspired by modern productivity apps.
          </p>
          <div className="hero-actions flex justify-center gap-4 mt-8">
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started <ChevronRight size={18} />
            </Link>
          </div>
        </section>

        <section className="features-grid mt-8 pt-8">
          <div className="feature-card card">
            <div className="feature-icon bg-blue">
              <Shield size={24} color="var(--primary-color)" />
            </div>
            <h3>Secure Storage</h3>
            <p>Your files are safely stored using enterprise-grade security and modern encryption standards.</p>
          </div>
          
          <div className="feature-card card">
            <div className="feature-icon bg-green">
              <FolderGit2 size={24} color="var(--success-color)" />
            </div>
            <h3>File Organization</h3>
            <p>Keep everything tidy with our intuitive folder system tailored for structured organization.</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon bg-red">
              <Share2 size={24} color="var(--danger-color)" />
            </div>
            <h3>Easy Sharing</h3>
            <p>Generate secure public links instantly to share large files or documents with anyone.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;

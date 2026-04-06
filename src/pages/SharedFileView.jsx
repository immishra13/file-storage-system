import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Cloud, File as FileIcon, Image as ImageIcon, FileText, Video, Music, Archive, Loader2, Code, ArrowRight } from 'lucide-react';
import './SharedFileView.css';

function SharedFileView() {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const docRef = doc(db, "files", fileId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFile({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Project file not found or has been removed.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching project details.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFile();
  }, [fileId]);

  const getIcon = () => {
    switch (file?.category) {
      case 'Image': return <ImageIcon size={48} color="#3b82f6" />;
      case 'Document': return <FileText size={48} color="#ef4444" />;
      case 'Video': return <Video size={48} color="#8b5cf6" />;
      case 'Audio': return <Music size={48} color="#f59e0b" />;
      case 'Archive': return <Archive size={48} color="#b45309" />;
      default: return <FileIcon size={48} color="#64748b" />;
    }
  };

  if (loading) {
    return (
      <div className="shared-loader-container">
        <Loader2 className="shared-spinner" size={48} />
        <p className="shared-loading-text">Loading project details...</p>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="shared-error-container">
        <div className="shared-error-card">
          <div className="shared-error-accent"></div>
          <h2>Oops!</h2>
          <p>{error}</p>
          <Link to="/" className="shared-btn-primary">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shared-page-wrapper">
      
      {/* Navbar Layout */}
      <nav className="shared-navbar">
        <div className="shared-nav-container">
          <Link to="/" className="shared-logo">
            <div className="shared-logo-icon">
              <Cloud size={24} color="#2563eb" fill="currentColor" />
            </div>
            <span className="shared-logo-text">CloudDrive</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="shared-main-content">
        <div className="shared-premium-card">
          
          <div className="shared-card-header">
            <div className="shared-header-left">
              <div className="shared-icon-box">
                {getIcon()}
              </div>
              <div className="shared-title-area">
                <h1 className="shared-main-title">{file.fileName}</h1>
                <div className="shared-meta-tags">
                  <span className="shared-tag-category">{file.category}</span>
                  <span className="shared-meta-dot">•</span>
                  <span className="shared-tag-date">Added {new Date(file.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

             {/* Top Action Buttons (Floating Actions) */}
            <div className="shared-header-actions">
              {file.githubLink && (
                <a href={file.githubLink} target="_blank" rel="noopener noreferrer" className="shared-btn-outline">
                  <Code size={18} /> Source Code
                </a>
              )}
              <a href={file.fileURL} target="_blank" rel="noopener noreferrer" className="shared-btn-primary">
                See Working Project <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="shared-divider"></div>

          <div className="shared-card-body">
            <h3 className="shared-description-label">Description & Context</h3>
            {file.description ? (
              <div className="shared-description-text">
                {file.description}
              </div>
            ) : (
              <div className="shared-description-empty">
                No description was provided for this project.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default SharedFileView;

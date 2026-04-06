import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Cloud, ExternalLink, File as FileIcon, Image as ImageIcon, FileText, Video, Music, Archive, Loader2, Code, ArrowRight } from 'lucide-react';
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
          setError("File link not found or has been removed.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching file details.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFile();
  }, [fileId]);

  const getIcon = () => {
    switch (file.category) {
      case 'Image': return <ImageIcon size={42} color="#0066cc" />;
      case 'Document': return <FileText size={42} color="#ff3b30" />;
      case 'Video': return <Video size={42} color="#9c27b0" />;
      case 'Audio': return <Music size={42} color="#ff9800" />;
      case 'Archive': return <Archive size={42} color="#795548" />;
      default: return <FileIcon size={42} color="#86868b" />;
    }
  };

  if (loading) {
    return (
      <div className="shared-layout flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={48} color="var(--primary-color)" />
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="shared-layout flex flex-col justify-center items-center h-screen">
        <div className="card p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p className="text-muted mb-6">{error}</p>
          <Link to="/" className="btn btn-primary">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shared-layout animate-fade-in">
      <nav className="landing-nav container">
        <Link to="/" className="logo flex items-center gap-2">
          <Cloud size={24} color="var(--primary-color)" fill="var(--primary-color)" />
          <span className="logo-text text-main">CloudDrive</span>
        </Link>
      </nav>

      <main className="shared-main container flex justify-center items-start mt-12 pb-20">
        <div className="shared-premium-card card animate-slide-up">
          
          {/* Header Area with Floating Alignments */}
          <div className="premium-header flex justify-between items-start flex-wrap gap-6">
            <div className="flex items-center gap-5">
              <div className="premium-icon-box">
                {getIcon()}
              </div>
              <div className="premium-title-box">
                <h1 className="text-3xl font-bold text-main leading-tight mb-2">
                  {file.fileName}
                </h1>
                <div className="premium-meta flex items-center gap-3 text-sm text-muted">
                  <span className="tag-badge bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                    {file.category}
                  </span>
                  <span>•</span>
                  <span>Added {new Date(file.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="premium-actions flex gap-3">
              {file.githubLink && (
                <a 
                  href={file.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline flex items-center gap-2"
                >
                  <Code size={18} /> View on GitHub
                </a>
              )}
              <a 
                href={file.fileURL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center gap-2 shadow-sm"
              >
                See Working Project <ArrowRight size={18} />
              </a>
            </div>
          </div>
          
          {/* Divider */}
          <div className="premium-divider my-8"></div>
          
          {/* Content Area */}
          <div className="premium-body">
            <h3 className="text-lg font-bold text-main mb-4">Description & Context</h3>
            {file.description ? (
              <div className="premium-description-box">
                {file.description}
              </div>
            ) : (
              <div className="premium-empty text-muted italic p-10 text-center bg-gray-50 rounded-xl border border-gray-100">
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

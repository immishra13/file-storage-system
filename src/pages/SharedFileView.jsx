import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Cloud, ExternalLink, File as FileIcon, Image as ImageIcon, FileText, Video, Music, Archive, Loader2 } from 'lucide-react';
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
      case 'Image': return <ImageIcon size={64} color="#0066cc" />;
      case 'Document': return <FileText size={64} color="#ff3b30" />;
      case 'Video': return <Video size={64} color="#9c27b0" />;
      case 'Audio': return <Music size={64} color="#ff9800" />;
      case 'Archive': return <Archive size={64} color="#795548" />;
      default: return <FileIcon size={64} color="#86868b" />;
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

      <main className="shared-main container flex justify-center items-center mt-12">
        <div className="card shared-card">
          <div className="shared-card-preview bg-gray-50 flex items-center justify-center py-12">
            {getIcon()}
          </div>
          
          <div className="shared-card-content">
            <h3 className="shared-filename truncate" title={file.fileName}>{file.fileName}</h3>
            {file.description && (
              <p className="text-muted mb-4 text-sm">{file.description}</p>
            )}
            <p className="shared-meta text-muted mb-6">
              Category: {file.category} • Added: {new Date(file.uploadDate).toLocaleDateString()}
            </p>
            
            <a 
              href={file.fileURL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary w-full justify-center btn-large"
            >
              <ExternalLink size={20} /> Open External Link
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SharedFileView;

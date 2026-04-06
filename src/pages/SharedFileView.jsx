import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Cloud, ExternalLink, File as FileIcon, Image as ImageIcon, FileText, Video, Music, Archive, Loader2, Code, ArrowRight, Calendar, Tag } from 'lucide-react';
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
    switch (file?.category) {
      case 'Image': return <ImageIcon size={56} className="text-blue-500" />;
      case 'Document': return <FileText size={56} className="text-red-500" />;
      case 'Video': return <Video size={56} className="text-purple-500" />;
      case 'Audio': return <Music size={56} className="text-yellow-500" />;
      case 'Archive': return <Archive size={56} className="text-amber-700" />;
      default: return <FileIcon size={56} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="shared-layout flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-muted font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="shared-layout flex flex-col justify-center items-center h-screen">
        <div className="glass-card p-12 text-center max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-pink-500"></div>
          <h2 className="text-3xl font-extrabold mb-4 text-gray-800">Oops!</h2>
          <p className="text-gray-500 mb-8">{error}</p>
          <Link to="/" className="btn-glow px-8 py-3 rounded-full font-bold text-white shadow-lg inline-block hover:-translate-y-1 transition-all">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shared-layout">
      {/* Dynamic Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <nav className="glass-nav container flex justify-center py-6 relative z-10">
        <Link to="/" className="logo flex items-center gap-3 decoration-none hover:opacity-80 transition-opacity">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <Cloud size={28} className="text-blue-600" fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            CloudDrive
          </span>
        </Link>
      </nav>

      <main className="shared-main container flex justify-center mt-12 pb-24 relative z-10">
        <div className="glass-card presentation-card w-full max-w-4xl animate-slide-up">
          
          {/* Top Banner Area with Gradient */}
          <div className="card-banner h-32 w-full absolute top-0 left-0"></div>

          <div className="card-content-wrapper relative pt-20 px-8 md:px-16 pb-16">
            
            {/* Header / Hero Section */}
            <div className="hero-section flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              
              <div className="hero-left flex gap-6 items-end">
                <div className="hero-icon-container bg-white shadow-xl flex items-center justify-center border border-gray-100">
                  {getIcon()}
                </div>
                
                <div className="hero-titles pb-2">
                  <h1 className="hero-title text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                    {file.fileName}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                    <span className="pill-badge bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                      <Tag size={16} /> {file.category}
                    </span>
                    <span className="pill-badge bg-gray-50 text-gray-600 ring-1 ring-gray-200">
                      <Calendar size={16} /> {new Date(file.uploadDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Top Right */}
              <div className="hero-actions flex flex-col sm:flex-row gap-4 pb-2">
                {file.githubLink && (
                  <a 
                    href={file.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-neo btn-secondary group"
                  >
                    <Code size={20} className="group-hover:scale-110 transition-transform" /> 
                    <span>Source Code</span>
                  </a>
                )}
                <a 
                  href={file.fileURL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-neo btn-primary group"
                >
                  <span>Launch Project</span> 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

            {/* Content Divider */}
            <hr className="border-gray-200/60 my-10" />

            {/* Description Area */}
            <div className="description-section">
              <h3 className="section-heading flex items-center gap-2 mb-6 text-gray-400 font-bold uppercase tracking-widest text-sm">
                About this Project
              </h3>
              
              {file.description ? (
                <div className="rich-text-container text-gray-700 text-lg leading-relaxed">
                  {file.description}
                </div>
              ) : (
                <div className="empty-state bg-gray-50/50 border border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <p className="text-gray-400 italic text-lg">No additional details were provided.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default SharedFileView;

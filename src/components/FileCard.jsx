import React, { useState } from 'react';
import { FileText, Image as ImageIcon, File as FileIcon, MoreVertical, Download, Trash2, Share2, Video, Music, Archive } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import './CardStyles.css';

function FileCard({ file, onUpdate }) {
  const [showMenu, setShowMenu] = useState(false);

  // Pick icon based on category
  const getIcon = () => {
    switch (file.category) {
      case 'Image': return <ImageIcon size={32} color="#0066cc" />;
      case 'Document': return <FileText size={32} color="#ff3b30" />;
      case 'Video': return <Video size={32} color="#9c27b0" />;
      case 'Audio': return <Music size={32} color="#ff9800" />;
      case 'Archive': return <Archive size={32} color="#795548" />;
      default: return <FileIcon size={32} color="#86868b" />;
    }
  };

  const handleDownload = () => {
    window.open(file.fileURL, '_blank');
    setShowMenu(false);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/share/${file.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
    setShowMenu(false);
  };

  const handleDelete = async () => {
    try {
      // Delete document only since external files sit on external servers
      await deleteDoc(doc(db, "files", file.id));
      toast.success('File link deleted');
      if(onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
      toast.error('Error deleting file link');
    }
  };

  return (
    <div className="file-card card" onClick={handleDownload} title="Click to view file">
      <div className="file-card-preview bg-gray-50 flex items-center justify-center">
        {getIcon()}
      </div>
      
      <div className="file-card-info">
        <h4 className="file-name truncate" title={file.fileName}>{file.fileName}</h4>
        
        {file.description && (
          <p className="file-description truncate-2-lines" title={file.description}>
            {file.description}
          </p>
        )}

        <div className="file-meta flex justify-between items-center text-muted mt-auto" style={{ marginTop: 'auto' }}>
          <span className="truncate" style={{maxWidth: '80px'}} title={file.category}>{file.category}</span>
          <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="file-card-actions" onClick={(e) => e.stopPropagation()}>
        <button 
          className="btn-icon-only relative"
          onClick={() => setShowMenu(!showMenu)}
          onBlur={() => setTimeout(() => setShowMenu(false), 200)}
          title="More options"
        >
          <MoreVertical size={16} />
        </button>

        {showMenu && (
          <div className="context-menu animate-fade-in">
            <button onMouseDown={handleDownload}><Download size={14} /> Open Link</button>
            <button onMouseDown={handleShare}><Share2 size={14} /> Share View Link</button>
            <button onMouseDown={handleDelete} className="text-danger"><Trash2 size={14} /> Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileCard;

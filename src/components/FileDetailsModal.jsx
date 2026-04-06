import React from 'react';
import { X, ExternalLink, Calendar, Tag, FileText, Image as ImageIcon, File as FileIcon, Video, Music, Archive, Code } from 'lucide-react';

function FileDetailsModal({ file, onClose }) {
  if (!file) return null;

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card animate-fade-in card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>File Details</h3>
          <button onClick={onClose} className="btn-icon-only">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-gray-50 border border-gray-100">
            {getIcon()}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="font-bold text-main" style={{ wordBreak: 'break-word' }}>{file.fileName}</h3>
              <div className="flex gap-4 mt-1">
                <a href={file.fileURL} target="_blank" rel="noopener noreferrer" className="text-primary text-sm flex items-center gap-1 hover:underline">
                  <ExternalLink size={14} /> Open Link
                </a>
                {file.githubLink && (
                  <a href={file.githubLink} target="_blank" rel="noopener noreferrer" className="text-muted text-sm flex items-center gap-1 hover:underline">
                    <Code size={14} /> View GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 className="text-sm font-bold text-main mb-2">Description</h4>
            <div className="text-muted text-sm p-3 rounded-lg border border-gray-100 bg-gray-50" style={{ maxHeight: '150px', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              {file.description || <span className="italic text-gray-400">No description provided</span>}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2 text-muted text-sm border border-gray-100 p-2 rounded-md flex-1">
              <Tag size={16} />
              <span>{file.category}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted text-sm border border-gray-100 p-2 rounded-md flex-1">
              <Calendar size={16} />
              <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn btn-outline w-full" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileDetailsModal;

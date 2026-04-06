import React from 'react';
import { Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CardStyles.css';

function FolderCard({ folder }) {
  const navigate = useNavigate();

  return (
    <div 
      className="folder-card card" 
      onClick={() => navigate(`/dashboard/folder/${folder.id}`)}
    >
      <div className="folder-icon-wrapper">
        <Folder size={32} color="var(--primary-color)" fill="rgba(0, 102, 204, 0.2)" />
      </div>
      <div className="folder-info">
        <h4 className="folder-name truncate" title={folder.folderName}>{folder.folderName}</h4>
        <p className="folder-meta text-muted text-sm">
          {new Date(folder.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default FolderCard;

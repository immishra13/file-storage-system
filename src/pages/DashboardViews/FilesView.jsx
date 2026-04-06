import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import FileCard from '../../components/FileCard';
import EditFileModal from '../../components/EditFileModal';
import FileDetailsModal from '../../components/FileDetailsModal';
import { Loader2 } from 'lucide-react';

function FilesView({ inFolder }) {
  const { currentUser } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingFile, setEditingFile] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);

  const fetchFiles = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "files"), 
        where("uploadedBy", "==", currentUser.uid),
        // If we implement folder navigation, we would filter by folderId here.
        // For simplicity, we just fetch all my files if not in a specific folder.
        // where("folderId", "==", inFolder ? specificFolderId : "root")
      );
      
      const querySnapshot = await getDocs(q);
      const filesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFiles(filesList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-primary" size={32} color="var(--primary-color)" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="mb-4 text-xl font-semibold">My Files</h2>
      
      {files.length === 0 ? (
        <div className="empty-state text-center mt-16">
          <p className="text-muted">No files found. Upload a file to get started.</p>
        </div>
      ) : (
        <div className="files-grid">
          {files.map(file => (
            <FileCard 
              key={file.id} 
              file={file} 
              onUpdate={fetchFiles}
              onEdit={(fileToEdit) => setEditingFile(fileToEdit)}
              onViewDetails={(fileToView) => setViewingFile(fileToView)}
            />
          ))}
        </div>
      )}

      {editingFile && (
        <EditFileModal 
          file={editingFile} 
          onClose={() => setEditingFile(null)} 
          onSuccess={fetchFiles} 
        />
      )}

      {viewingFile && (
        <FileDetailsModal 
          file={viewingFile} 
          onClose={() => setViewingFile(null)} 
        />
      )}
    </div>
  );
}

export default FilesView;

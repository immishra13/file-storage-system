import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import FolderCard from '../../components/FolderCard';
import { Loader2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

function FoldersView() {
  const { currentUser } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const fetchFolders = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "folders"), 
        where("createdBy", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const foldersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFolders(foldersList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [currentUser]);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    
    try {
      await addDoc(collection(db, "folders"), {
        folderName: newFolderName.trim(),
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      setNewFolderName('');
      setIsCreating(false);
      toast.success('Folder created');
      fetchFolders();
    } catch (error) {
      toast.error('Error creating folder');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-primary" size={32} color="var(--primary-color)" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Folders</h2>
        <button 
          className="btn btn-outline"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={16} /> New Folder
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateFolder} className="mb-6 flex gap-2">
          <input 
            type="text" 
            className="input-field flex-1" 
            placeholder="Folder Name"
            autoFocus
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Create</button>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={() => setIsCreating(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {folders.length === 0 ? (
        <div className="empty-state text-center mt-16">
          <p className="text-muted">No folders found. Create one to organize files.</p>
        </div>
      ) : (
        <div className="files-grid">
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FoldersView;

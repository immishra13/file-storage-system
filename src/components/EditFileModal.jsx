import React, { useState } from 'react';
import { X, PencilLine } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

function EditFileModal({ file, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fileName: file.fileName || '',
    description: file.description || '',
    category: file.category || 'Document',
    fileURL: file.fileURL || ''
  });
  const [uploading, setUploading] = useState(false);

  const categories = ['Document', 'Image', 'Video', 'Audio', 'Archive', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.fileName || !formData.fileURL) {
      return toast.error('File Name and URL are required.');
    }
    
    try {
      new URL(formData.fileURL);
    } catch {
      return toast.error('Please enter a valid URL (including http:// or https://)');
    }

    setUploading(true);
    
    try {
      const docRef = doc(db, "files", file.id);
      await updateDoc(docRef, {
        fileName: formData.fileName,
        description: formData.description,
        category: formData.category,
        fileURL: formData.fileURL,
      });

      toast.success('File link updated successfully!');
      if(onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error updating file link");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card animate-fade-in card">
        <div className="modal-header">
          <h3>Edit File Details</h3>
          <button onClick={onClose} className="btn-icon-only" disabled={uploading}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="link-icon-header flex items-center justify-center mb-6">
            <div className="feature-icon bg-blue" style={{ marginBottom: 0 }}>
              <PencilLine size={32} color="var(--primary-color)" />
            </div>
          </div>

          <div className="upload-form">
            <div className="input-group">
              <label className="input-label">File Name *</label>
              <input 
                type="text" 
                name="fileName"
                className="input-field" 
                placeholder="E.g., Project Report"
                value={formData.fileName}
                onChange={handleChange}
                disabled={uploading}
              />
            </div>

            <div className="input-group">
              <label className="input-label">External File URL *</label>
              <input 
                type="url" 
                name="fileURL"
                className="input-field" 
                placeholder="https://drive.google.com/..."
                value={formData.fileURL}
                onChange={handleChange}
                disabled={uploading}
              />
            </div>

            <div className="flex gap-4">
              <div className="input-group flex-1">
                <label className="input-label">Category</label>
                <select 
                  name="category"
                  className="input-field"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={uploading}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Description (Optional)</label>
              <textarea 
                name="description"
                className="input-field" 
                placeholder="Add some details..."
                value={formData.description}
                onChange={handleChange}
                disabled={uploading}
                rows={2}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose} disabled={uploading}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={uploading || !formData.fileName || !formData.fileURL}
          >
            {uploading ? 'Updating...' : 'Update File'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFileModal;

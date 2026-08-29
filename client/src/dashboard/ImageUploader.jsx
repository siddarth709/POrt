import React, { useState } from 'react';
import api from '../api/axios';

// Reusable image upload control used everywhere in the dashboard.
// Uploads to Cloudinary via the backend and returns the resulting URL through onUploaded.
export default function ImageUploader({ label, value, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/upload', formData);
      onUploaded(res.data.url);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="text-xs text-muted block mb-1.5">{label}</label>}
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="w-14 h-14 rounded-lg object-cover border border-white/10" />}
        <label className="cursor-pointer text-xs px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent2 hover:bg-accent/20">
          {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

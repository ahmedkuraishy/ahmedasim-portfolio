'use client';

import React from 'react';

interface ProjectsFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
  token: string | null;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, saving, onUpdate, token }) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Show loading or temp state if desired
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const { imageUrl } = await res.json();
        // Update the hidden input that holds the actual URL to be saved
        const input = document.getElementById(`project_img_input_${idx}`) as HTMLInputElement;
        if (input) {
           input.value = imageUrl;
           // Also update preview if possible
           const preview = document.getElementById(`project_img_preview_${idx}`) as HTMLImageElement;
           if (preview) preview.src = imageUrl;
        }
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage Projects
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          {data?.map((proj: any, idx: number) => (
            <div key={idx} className="list-item-card">
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Project Title</label>
                <input name={`project_title_${idx}`} type="text" defaultValue={proj.title} className="form-control" />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Category</label>
                <input name={`project_cat_${idx}`} type="text" defaultValue={proj.category} className="form-control" />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label>Project Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, idx)}
                    className="form-control"
                    style={{ padding: '0.5rem' }}
                  />
                  <input 
                    id={`project_img_input_${idx}`}
                    name={`project_img_${idx}`} 
                    type="hidden" 
                    defaultValue={proj.image} 
                  />
                </div>
                <div className="img-preview-box">
                   <img 
                    id={`project_img_preview_${idx}`}
                    src={proj.image || 'https://via.placeholder.com/150'} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Projects'}
        </button>
      </form>
    </div>
  );
};

export default ProjectsForm;

'use client';

import React, { useState } from 'react';
import ImageCropper from './ImageCropper';

interface ProjectsFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
  token: string | null;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, saving, onUpdate, token }) => {
  const [cropperState, setCropperState] = useState<{ src: string; index: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropperState({ src: reader.result as string, index });
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = async (croppedBlob: Blob) => {
    if (!cropperState || !token) return;
    const { index } = cropperState;

    const file = new File([croppedBlob], `project-${index}.jpg`, { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const { imageUrl } = await res.json();
        const input = document.getElementById(`project_img_input_${index}`) as HTMLInputElement;
        if (input) {
          input.value = imageUrl;
          const preview = document.getElementById(`project_img_preview_${index}`) as HTMLImageElement;
          if (preview) preview.src = imageUrl;
        }
        setCropperState(null);
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
                    onChange={(e) => handleFileChange(e, idx)}
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
      {cropperState && (
        <ImageCropper
          image={cropperState.src}
          aspect={4 / 3}
          onCropComplete={onCropComplete}
          onCancel={() => setCropperState(null)}
        />
      )}
    </div>
  );
};

export default ProjectsForm;

'use client';

import React from 'react';

interface HeroFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
  token: string | null;
}

const HeroForm: React.FC<HeroFormProps> = ({ data, saving, onUpdate, token }) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const { imageUrl } = await res.json();
        const input = document.getElementById(`hero_img_input_${idx}`) as HTMLInputElement;
        if (input) input.value = imageUrl;
        const preview = document.getElementById(`hero_img_preview_${idx}`) as HTMLImageElement;
        if (preview) preview.src = imageUrl;
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Edit Hero Slides
      </h3>
      <form onSubmit={onUpdate}>
        {data?.map((slide: any, idx: number) => (
          <div key={idx} className="list-item-card">
            <div className="form-grid">
              <div className="form-group">
                <label>Slide Subheading</label>
                <input name={`hero_sub_${idx}`} type="text" defaultValue={slide.subheading} className="form-control" />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label>Background Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, idx)}
                    className="form-control"
                    style={{ padding: '0.5rem' }}
                  />
                  <input 
                    id={`hero_img_input_${idx}`}
                    name={`hero_img_${idx}`} 
                    type="hidden" 
                    defaultValue={slide.bgImage} 
                  />
                </div>
                <div className="img-preview-box">
                   <img 
                    id={`hero_img_preview_${idx}`}
                    src={slide.bgImage || 'https://via.placeholder.com/150'} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                   />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Main Title</label>
              <textarea name={`hero_title_${idx}`} rows={2} defaultValue={slide.title} className="form-control"></textarea>
            </div>
          </div>
        ))}
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Hero Section'}
        </button>
      </form>
    </div>
  );
};

export default HeroForm;

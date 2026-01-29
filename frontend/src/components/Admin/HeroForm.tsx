'use client';

import React from 'react';

interface HeroFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const HeroForm: React.FC<HeroFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#3b82f6', borderRadius: '1rem', marginRight: '1rem' }}></span>
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
              <div className="form-group">
                <label>Background Image Path</label>
                <input name={`hero_img_${idx}`} type="text" defaultValue={slide.bgImage} className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label>Main Title</label>
              <textarea name={`hero_title_${idx}`} rows={2} defaultValue={slide.title} className="form-control"></textarea>
            </div>
          </div>
        ))}
        <button type="submit" disabled={saving} className="btn-save" style={{ background: '#3b82f6' }}>
          {saving ? 'Saving...' : 'Update Hero Section'}
        </button>
      </form>
    </div>
  );
};

export default HeroForm;

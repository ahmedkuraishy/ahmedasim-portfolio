'use client';

import React from 'react';

interface ServicesFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#ec4899', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage Services
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          {data?.map((service: any, idx: number) => (
            <div key={idx} className="list-item-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Service Title</label>
                <input name={`service_title_${idx}`} type="text" defaultValue={service.title} className="form-control" />
              </div>
              <div className="form-group">
                <label>Icon Class (e.g. flaticon-analysis)</label>
                <input name={`service_icon_${idx}`} type="text" defaultValue={service.icon} className="form-control" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name={`service_desc_${idx}`} rows={3} defaultValue={service.description} className="form-control" />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save" style={{ background: '#ec4899' }}>
          {saving ? 'Saving...' : 'Update Services'}
        </button>
      </form>
    </div>
  );
};

export default ServicesForm;

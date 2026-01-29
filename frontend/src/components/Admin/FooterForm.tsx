'use client';

import React from 'react';

interface FooterFormProps {
  data: any;
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const FooterForm: React.FC<FooterFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#374151', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Footer Customization
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          <div className="form-group">
            <label>Footer About Title</label>
            <input name="footer_about_title" type="text" defaultValue={data?.about?.title} className="form-control" />
          </div>
          <div className="form-group">
            <label>Copyright Text</label>
            <input name="footer_copy" type="text" defaultValue={data?.copyright} className="form-control" />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Footer About Text</label>
          <textarea name="footer_about_text" rows={3} defaultValue={data?.about?.text} className="form-control" />
        </div>
        <button type="submit" disabled={saving} className="btn-save" style={{ background: '#374151' }}>
          {saving ? 'Saving...' : 'Update Footer'}
        </button>
      </form>
    </div>
  );
};

export default FooterForm;

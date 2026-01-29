'use client';

import React from 'react';

interface NavbarFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const NavbarForm: React.FC<NavbarFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage Header Navigation
      </h3>
      <form onSubmit={onUpdate}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {data?.map((item: any, idx: number) => (
            <div key={idx} className="navbar-grid">
              <div className="form-group">
                <label>Link Label</label>
                <input name={`nav_name_${idx}`} type="text" defaultValue={item.name} className="form-control" />
              </div>
              <div className="form-group">
                <label>URL / ID</label>
                <input name={`nav_url_${idx}`} type="text" defaultValue={item.url} className="form-control" />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Navbar'}
        </button>
      </form>
    </div>
  );
};

export default NavbarForm;

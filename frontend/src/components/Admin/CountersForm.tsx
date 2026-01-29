'use client';

import React from 'react';

interface CountersFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const CountersForm: React.FC<CountersFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#14b8a6', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage Stats Counters
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          {data?.map((counter: any, idx: number) => (
            <div key={idx} className="list-item-card">
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Label</label>
                <input name={`counter_label_${idx}`} type="text" defaultValue={counter.label} className="form-control" />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Value</label>
                  <input name={`counter_val_${idx}`} type="number" defaultValue={counter.number} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Icon Class</label>
                  <input name={`counter_icon_${idx}`} type="text" defaultValue={counter.icon} className="form-control" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save" style={{ background: '#14b8a6' }}>
          {saving ? 'Saving...' : 'Update Stats'}
        </button>
      </form>
    </div>
  );
};

export default CountersForm;

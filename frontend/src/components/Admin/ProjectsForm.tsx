'use client';

import React from 'react';

interface ProjectsFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#8b5cf6', borderRadius: '1rem', marginRight: '1rem' }}></span>
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
              <div className="form-group">
                <label>Image URL</label>
                <input name={`project_img_${idx}`} type="text" defaultValue={proj.image} className="form-control" />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save" style={{ background: '#8b5cf6' }}>
          {saving ? 'Saving...' : 'Update Projects'}
        </button>
      </form>
    </div>
  );
};

export default ProjectsForm;

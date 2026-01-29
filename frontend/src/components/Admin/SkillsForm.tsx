'use client';

import React from 'react';

interface SkillsFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage My Skills
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          {data?.map((skill: any, idx: number) => (
            <div key={idx} className="navbar-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Skill Name</label>
                <input name={`skill_name_${idx}`} type="text" defaultValue={skill.name} className="form-control" />
              </div>
              <div className="form-group">
                <label>Percentage ({skill.value}%)</label>
                <input name={`skill_value_${idx}`} type="range" min="0" max="100" defaultValue={skill.value} className="form-control" />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Save Skills'}
        </button>
      </form>
    </div>
  );
};

export default SkillsForm;

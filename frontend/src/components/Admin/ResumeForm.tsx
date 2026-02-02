'use client';

import React from 'react';

interface ResumeFormProps {
    data: any;
    saving: boolean;
    onUpdate: (e: React.FormEvent) => Promise<void>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, saving, onUpdate }) => {
    return (
        <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#9333ea', borderRadius: '1rem', marginRight: '1rem' }}></span>
                Manage Resume
            </h3>
            <form onSubmit={onUpdate}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Education Section */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Education</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data?.education?.map((item: any, idx: number) => (
                                <div key={`edu-${idx}`} className="list-item-card" style={{ padding: '1.5rem', border: '1px solid #333' }}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Year</label>
                                            <input name={`edu_year_${idx}`} type="text" defaultValue={item.year} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Degree</label>
                                            <input name={`edu_degree_${idx}`} type="text" defaultValue={item.degree} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Institution</label>
                                        <input name={`edu_inst_${idx}`} type="text" defaultValue={item.institution} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea name={`edu_desc_${idx}`} rows={2} defaultValue={item.description} className="form-control" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Experience</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data?.experience?.map((item: any, idx: number) => (
                                <div key={`exp-${idx}`} className="list-item-card" style={{ padding: '1.5rem', border: '1px solid #333' }}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Year</label>
                                            <input name={`exp_year_${idx}`} type="text" defaultValue={item.year} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Degree/Title</label>
                                            <input name={`exp_degree_${idx}`} type="text" defaultValue={item.degree} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Company/Institution</label>
                                        <input name={`exp_inst_${idx}`} type="text" defaultValue={item.institution} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea name={`exp_desc_${idx}`} rows={2} defaultValue={item.description} className="form-control" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={saving} className="btn-save" style={{ marginTop: '2rem' }}>
                    {saving ? 'Saving...' : 'Update Resume Section'}
                </button>
            </form>
        </div>
    );
};

export default ResumeForm;

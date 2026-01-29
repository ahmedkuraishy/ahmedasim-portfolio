'use client';

import React from 'react';

interface ContactFormProps {
  data: any;
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Contact Page Settings
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          <div className="form-group">
            <label>Subheading</label>
            <input name="contact_sub" type="text" defaultValue={data?.subheading} className="form-control" />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input name="contact_title" type="text" defaultValue={data?.title} className="form-control" />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Short Description</label>
          <textarea name="contact_desc" rows={2} defaultValue={data?.description} className="form-control" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Physical Address</label>
            <input name="contact_addr" type="text" defaultValue={data?.address} className="form-control" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="contact_phone" type="text" defaultValue={data?.phone} className="form-control" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Email Address</label>
            <input name="contact_email" type="email" defaultValue={data?.email} className="form-control" />
          </div>
          <div className="form-group">
            <label>Website URL</label>
            <input name="contact_web" type="text" defaultValue={data?.website} className="form-control" />
          </div>
        </div>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Contact Info'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

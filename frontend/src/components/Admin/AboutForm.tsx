'use client';

import React, { useState } from 'react';
import ImageCropper from './ImageCropper';

interface AboutFormProps {
  data: any;
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

const AboutForm: React.FC<AboutFormProps> = ({ data, saving, onUpdate, selectedFile, setSelectedFile }) => {
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropperSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedBlob: Blob) => {
    const file = new File([croppedBlob], 'profile.jpg', { type: 'image/jpeg' });
    setSelectedFile(file);
    setCropperSrc(null);
  };
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Quick Edit: About Section
      </h3>
      <form onSubmit={onUpdate}>
        <div className="form-grid">
          <div className="form-group">
            <label>Section Heading</label>
            <input name="heading" type="text" defaultValue={data?.heading} className="form-control" />
          </div>
          <div className="form-group">
            <label>Section Subheading</label>
            <input name="subheading" type="text" defaultValue={data?.subheading} className="form-control" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label>Profile Image Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control"
                style={{ padding: '0.5rem' }}
              />
              {cropperSrc && (
                <ImageCropper
                  image={cropperSrc}
                  aspect={1}
                  onCropComplete={onCropComplete}
                  onCancel={() => setCropperSrc(null)}
                />
              )}
            </div>
            <div className="img-preview-box">
              {(selectedFile || data?.image) ? (
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : data?.image}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>No Image</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" type="text" defaultValue={data?.name} className="form-control" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" defaultValue={data?.email} className="form-control" />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input name="dob" type="text" defaultValue={data?.dob} className="form-control" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" type="text" defaultValue={data?.phone} className="form-control" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" type="text" defaultValue={data?.address} className="form-control" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Zip Code</label>
            <input name="zip" type="text" defaultValue={data?.zip} className="form-control" />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Description</label>
          <textarea name="description" rows={4} defaultValue={data?.description} className="form-control"></textarea>
        </div>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AboutForm;

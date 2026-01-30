'use client';

import React from 'react';

interface BlogFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
  token: string | null;
}

const BlogForm: React.FC<BlogFormProps> = ({ data, saving, onUpdate, token }) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const { imageUrl } = await res.json();
        const input = document.getElementById(`blog_img_input_${idx}`) as HTMLInputElement;
        if (input) input.value = imageUrl;
        const preview = document.getElementById(`blog_img_preview_${idx}`) as HTMLImageElement;
        if (preview) preview.src = imageUrl;
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage Blog Posts
      </h3>
      <form onSubmit={onUpdate}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {data?.map((post: any, idx: number) => (
            <div key={idx} className="list-item-card">
              <div className="form-grid">
                <div className="form-group">
                  <label>Post Title</label>
                  <input name={`blog_title_${idx}`} type="text" defaultValue={post.title} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input name={`blog_date_${idx}`} type="text" defaultValue={post.date} className="form-control" />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Author</label>
                  <input name={`blog_author_${idx}`} type="text" defaultValue={post.author} className="form-control" />
                </div>
                <div className="form-group" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label>Thumbnail</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, idx)}
                      className="form-control"
                      style={{ padding: '0.5rem' }}
                    />
                    <input 
                      id={`blog_img_input_${idx}`}
                      name={`blog_img_${idx}`} 
                      type="hidden" 
                      defaultValue={post.image} 
                    />
                  </div>
                  <div className="img-preview-box">
                    <img 
                      id={`blog_img_preview_${idx}`}
                      src={post.image || 'https://via.placeholder.com/150'} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Short Excerpt</label>
                <textarea name={`blog_excerpt_${idx}`} rows={2} defaultValue={post.excerpt} className="form-control" />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Blog Section'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

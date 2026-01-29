'use client';

import React from 'react';

interface BlogFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (e: React.FormEvent) => Promise<void>;
}

const BlogForm: React.FC<BlogFormProps> = ({ data, saving, onUpdate }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#6366f1', borderRadius: '1rem', marginRight: '1rem' }}></span>
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
                <div className="form-group">
                  <label>Thumbnail URL</label>
                  <input name={`blog_img_${idx}`} type="text" defaultValue={post.image} className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>Short Excerpt</label>
                <textarea name={`blog_excerpt_${idx}`} rows={2} defaultValue={post.excerpt} className="form-control" />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={saving} className="btn-save" style={{ background: '#6366f1' }}>
          {saving ? 'Saving...' : 'Update Blog Section'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

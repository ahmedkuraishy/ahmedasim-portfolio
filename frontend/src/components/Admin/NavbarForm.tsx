'use client';

import React, { useState, useEffect } from 'react';

interface NavbarItem {
  id?: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
}

interface NavbarFormProps {
  data: NavbarItem[];
  saving: boolean;
  onUpdate: (items: NavbarItem[]) => Promise<void>;
}

const NavbarForm: React.FC<NavbarFormProps> = ({ data, saving, onUpdate }) => {
  const [items, setItems] = useState<NavbarItem[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setItems(data.map(item => ({ 
        ...item, 
        status: (item.status && item.status.toLowerCase() === 'inactive') ? 'inactive' : 'active' 
      })));
    }
  }, [data]);

  const handleAddItem = () => {
    setItems([...items, { name: '', url: '#', status: 'active' }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index: number, field: keyof NavbarItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    // Prevent dragging when interacting with form inputs
    const target = e.target as HTMLElement;
    if (['INPUT', 'SELECT', 'BUTTON', 'OPTION'].includes(target.tagName)) {
      e.preventDefault();
      return;
    }
    
    setDraggedItemIndex(index);
    // Required for Firefox
    e.dataTransfer.effectAllowed = 'move';
    // Set a dummy image or data to ensure drag starts cleanly
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedItemIndex];
    newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setDraggedItemIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(items);
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Manage Header Navigation
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="navbar-grid" 
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '30px 1fr 1fr 100px 40px', 
                gap: '0.5rem', 
                alignItems: 'end', 
                padding: '0.5rem', 
                backgroundColor: '#2a2a2a', 
                borderRadius: '0.5rem',
                border: draggedItemIndex === idx ? '2px dashed #9333ea' : 'none',
                opacity: draggedItemIndex === idx ? 0.5 : 1,
                cursor: 'grab'
              }}
            >
              {/* Drag Handle */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '36px', 
                  cursor: 'grab', 
                  color: '#6b7280' 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>Link Label</label>
                <input 
                  type="text" 
                  value={item.name} 
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  className="form-control"
                  style={{ height: '36px', fontSize: '0.875rem' }}
                  placeholder="e.g. Home"
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>URL / ID</label>
                <input 
                  type="text" 
                  value={item.url} 
                  onChange={(e) => handleChange(idx, 'url', e.target.value)}
                  className="form-control"
                  style={{ height: '36px', fontSize: '0.875rem' }}
                  placeholder="e.g. #home"
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>Status</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label 
                    style={{ 
                      position: 'relative', 
                      display: 'inline-block', 
                      width: '48px', 
                      height: '24px',
                      cursor: 'pointer'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={item.status === 'active'}
                      onChange={(e) => handleChange(idx, 'status', e.target.checked ? 'active' : 'inactive')}
                      style={{ 
                        opacity: 0, 
                        width: 0, 
                        height: 0 
                      }}
                    />
                    <span 
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: item.status === 'active' ? '#10b981' : '#6b7280',
                        transition: '0.3s',
                        borderRadius: '24px'
                      }}
                    ></span>
                    <span 
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        content: '',
                        height: '18px',
                        width: '18px',
                        left: item.status === 'active' ? '27px' : '3px',
                        bottom: '3px',
                        backgroundColor: 'white',
                        transition: '0.3s',
                        borderRadius: '50%'
                      }}
                    ></span>
                  </label>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => handleRemoveItem(idx)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.35rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  height: '36px',
                  width: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Remove Item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={handleAddItem}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Link
          </button>
        </div>

        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Navbar'}
        </button>
      </form>
    </div>
  );
};
export default NavbarForm;

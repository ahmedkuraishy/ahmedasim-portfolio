'use client';

import React, { useState, useEffect } from 'react';
import ImageCropper from './ImageCropper';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface HeroSlide {
  id: string; // for dnd-kit
  subheading: string;
  title: string;
  bgImage: string;
}

interface HeroFormProps {
  data: any[];
  saving: boolean;
  onUpdate: (data: any[]) => Promise<void>;
  token: string | null;
}

const SortableSlide = ({ slide, index, onRemove, onUpdateSlide, handleFileChange, token, draggedItemIndex }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    background: '#2a2a2a',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    display: 'grid',
    gridTemplateColumns: '30px 1fr 40px',
    gap: '0.5rem',
    alignItems: 'end',
    border: draggedItemIndex === index ? '2px dashed #9333ea' : 'none',
  };

  return (
    <div ref={setNodeRef} style={style} className="list-item-card">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
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

      <div style={{ flex: 1 }}>
        <div className="form-grid">
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>Slide Subheading</label>
            <input
              type="text"
              value={slide.subheading}
              onChange={(e) => onUpdateSlide(index, 'subheading', e.target.value)}
              className="form-control"
              style={{ height: '36px', fontSize: '0.875rem' }}
              placeholder="e.g. Creative Designer"
            />
          </div>
          <div className="form-group" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>Background Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
                className="form-control"
                style={{ padding: '0.5rem', height: '36px', fontSize: '0.875rem' }}
              />
            </div>
            <div className="img-preview-box" style={{ width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #333' }}>
              <img
                src={slide.bgImage || 'https://via.placeholder.com/150'}
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>Main Title</label>
          <textarea
            rows={2}
            value={slide.title}
            onChange={(e) => onUpdateSlide(index, 'title', e.target.value)}
            className="form-control"
            style={{ fontSize: '0.875rem' }}
            placeholder="e.g. I am a Freelancer"
          ></textarea>
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(index)}
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
        title="Remove Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  );
};

const HeroForm: React.FC<HeroFormProps> = ({ data, saving, onUpdate, token }) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [cropperState, setCropperState] = useState<{ src: string; index: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropperState({ src: reader.result as string, index });
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = async (croppedBlob: Blob) => {
    if (!cropperState || !token) return;
    const { index } = cropperState;

    const file = new File([croppedBlob], `hero-slide-${index}.jpg`, { type: 'image/jpeg' });
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
        handleUpdateSlideField(index, 'bgImage', imageUrl);
        setCropperState(null);
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setSlides(data.map((slide, idx) => ({
        ...slide,
        id: slide._id || `slide-${idx}-${Date.now()}`
      })));
    } else {
      setSlides([{ id: `slide-0-${Date.now()}`, subheading: '', title: '', bgImage: '' }]);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSlides((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddSlide = () => {
    setSlides([...slides, {
      id: `slide-${slides.length}-${Date.now()}`,
      subheading: '',
      title: '',
      bgImage: ''
    }]);
  };

  const handleRemoveSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
  };

  const handleUpdateSlideField = (index: number, field: keyof HeroSlide, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove the temporary 'id' before sending to server
    const dataToSave = slides.map(({ id, ...rest }) => rest);
    onUpdate(dataToSave);
  };

  return (
    <div className="card">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '0.5rem', height: '2rem', backgroundColor: '#666666', borderRadius: '1rem', marginRight: '1rem' }}></span>
        Edit Hero Slides
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={slides.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {slides.map((slide, idx) => (
                <SortableSlide
                  key={slide.id}
                  slide={slide}
                  index={idx}
                  onRemove={handleRemoveSlide}
                  onUpdateSlide={handleUpdateSlideField}
                  handleFileChange={handleFileChange}
                  token={token}
                  draggedItemIndex={draggedItemIndex}
                />
              ))}
            </SortableContext>
          </DndContext>

          <button
            type="button"
            onClick={handleAddSlide}
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
            Add New Slide
          </button>
        </div>

        <button type="submit" disabled={saving} className="btn-save">
          {saving ? 'Saving...' : 'Update Hero Section'}
        </button>
      </form>
      {cropperState && (
        <ImageCropper
          image={cropperState.src}
          aspect={16 / 9}
          onCropComplete={onCropComplete}
          onCancel={() => setCropperState(null)}
        />
      )}
    </div>
  );
};

export default HeroForm;

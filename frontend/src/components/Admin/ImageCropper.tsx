'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

interface ImageCropperProps {
    image: string;
    aspect: number;
    onCropComplete: (croppedImage: Blob) => void;
    onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, aspect, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropAreaComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                console.log('Image loaded successfully for canvas');
                resolve(image);
            });
            image.addEventListener('error', (error) => {
                console.error('Image load failed for canvas', error);
                reject(error);
            });
            // Only set crossOrigin if it's not a data URL or blob URL
            if (!url.startsWith('data:') && !url.startsWith('blob:')) {
                image.setAttribute('crossOrigin', 'anonymous');
            }
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: Area
    ): Promise<Blob | null> => {
        console.log('getCroppedImg started', { imageSrc, pixelCrop });
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Failed to get canvas context');
            return null;
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                console.log('Canvas toBlob completed', blob);
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const handleDone = async () => {
        console.log('handleDone clicked', { croppedAreaPixels });
        if (croppedAreaPixels) {
            try {
                const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
                if (croppedBlob) {
                    onCropComplete(croppedBlob);
                } else {
                    alert('Cropping failed: Blob is null');
                }
            } catch (err: any) {
                alert('Error during cropping: ' + err.message);
                console.error('Error in handleDone', err);
            }
        } else {
            alert('Please wait for the image to load or adjust the crop area.');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                height: '400px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={onCropChange}
                    onCropComplete={onCropAreaComplete}
                    onZoomChange={onZoomChange}
                />
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px',
                width: '100%',
                maxWidth: '600px',
                justifyContent: 'center'
            }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'white', fontSize: '14px' }}>Zoom:</span>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        style={{ flex: 1 }}
                    />
                </div>
                <button
                    onClick={onCancel}
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#4b5563',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleDone}
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#9333ea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Crop & Save
                </button>
            </div>
        </div>
    );
};

export default ImageCropper;

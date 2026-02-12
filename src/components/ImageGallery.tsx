import { useState } from 'react';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

export function ImageGallery({ images, alt = 'Gallery image' }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openModal(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal(index)}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="gallery-modal"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <button
            className="modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                className="modal-nav modal-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                className="modal-nav modal-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex]}
              alt={`${alt} ${selectedIndex + 1}`}
            />
            <div className="modal-counter">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

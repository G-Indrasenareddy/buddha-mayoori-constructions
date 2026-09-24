import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export const ImageLightbox = ({ images = [], currentIndex = 0, isOpen = false, onClose, onNavigate }) => {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (!images.length) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (!images.length) return;
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentImage) return null;

  const imageUrl = typeof currentImage === 'string' ? currentImage : currentImage.url;
  const imageCaption = typeof currentImage === 'string' ? '' : (currentImage.caption || currentImage.title || '');
  const imageCategory = typeof currentImage === 'object' ? currentImage.category : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 transition-all duration-200">
      {/* Lightbox Header Bar */}
      <div className="flex items-center justify-between text-white z-10 w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            {currentIndex + 1} / {images.length}
          </span>
          {imageCategory && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
              <Tag className="w-3 h-3" /> {imageCategory}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation - Left */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-slate-900/70 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {/* Displayed Image */}
        <img
          src={imageUrl}
          alt={imageCaption || 'Project Gallery Photograph'}
          className="max-h-[78vh] max-w-full object-contain rounded shadow-2xl transition-transform duration-200"
        />

        {/* Navigation - Right */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-slate-900/70 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </div>

      {/* Lightbox Footer Bar / Caption */}
      <div className="w-full max-w-4xl mx-auto text-center text-slate-300 text-xs sm:text-sm z-10 min-h-[1.5rem]">
        {imageCaption && (
          <p className="bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 inline-block max-w-full truncate">
            {imageCaption}
          </p>
        )}
      </div>
    </div>
  );
};

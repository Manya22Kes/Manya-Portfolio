import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { playTactileClick } from '../../utils/soundEffects';

/**
 * ProjectImageSlider
 * Sleek, interactive touch-and-click image slider for project preview screenshots.
 * Supports desktop arrow navigation, indicator dot jumping, mobile touch-swipe gestures,
 * and audio feedback.
 */
export default function ProjectImageSlider({ images = [], title = '', onImageClick }) {
  const slideList = Array.isArray(images) && images.length > 0 ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);

  if (slideList.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0609',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-m)',
          fontSize: '0.8rem',
        }}
      >
        No preview available
      </div>
    );
  }

  const prevSlide = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playTactileClick();
    setCurrentIndex((prev) => (prev === 0 ? slideList.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playTactileClick();
    setCurrentIndex((prev) => (prev === slideList.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (idx, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playTactileClick();
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e) => {
    const t = e.touches && e.touches[0];
    if (t) {
      touchStartRef.current = t.clientX;
      touchDeltaRef.current = 0;
    }
  };

  const handleTouchMove = (e) => {
    const t = e.touches && e.touches[0];
    if (t) {
      touchDeltaRef.current = touchStartRef.current - t.clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchDeltaRef.current > 35) {
      nextSlide(e);
    } else if (touchDeltaRef.current < -35) {
      prevSlide(e);
    }
    touchDeltaRef.current = 0;
  };

  const currentSrc = slideList[currentIndex] || slideList[0];

  return (
    <div
      className="project-image-slider"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#0a0609',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Image with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSrc}
          src={currentSrc}
          alt={`${title} screenshot ${currentIndex + 1}`}
          initial={{ opacity: 0.25, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.25 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            cursor: onImageClick ? 'pointer' : 'default',
          }}
          onError={(e) => {
            const target = e.currentTarget;
            const original = target.src;
            if (original.includes('%20') || original.includes(' ')) {
              const hyphenated = original.replace(/%20| /g, '-').toLowerCase();
              if (target.src !== hyphenated) {
                target.src = hyphenated;
                return;
              }
            }
            if (original.includes('-')) {
              const spaced = original.replace(/-/g, '%20');
              if (target.src !== spaced) {
                target.src = spaced;
                return;
              }
            }
          }}
          onClick={(e) => {
            if (onImageClick) {
              e.stopPropagation();
              onImageClick(currentIndex);
            }
          }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Screenshot Counter Badge (Top Right) */}
      <div
        className="project-slider-badge"
        style={{
          position: 'absolute',
          top: '9px',
          right: '9px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0.2rem 0.55rem',
          borderRadius: '999px',
          background: 'rgba(12, 8, 11, 0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 231, 231, 0.22)',
          color: '#ffe7e7',
          fontFamily: 'var(--font-m)',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
          zIndex: 4,
        }}
      >
        <Camera size={10} style={{ opacity: 0.85 }} />
        <span>
          0{currentIndex + 1} / 0{slideList.length}
        </span>
      </div>

      {/* Prev Navigation Button */}
      {slideList.length > 1 && (
        <button
          type="button"
          onClick={prevSlide}
          className="project-slider-btn project-slider-prev"
          aria-label="Previous screenshot"
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(12, 8, 11, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 231, 231, 0.26)',
            color: '#ffe7e7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 5,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
          }}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Next Navigation Button */}
      {slideList.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          className="project-slider-btn project-slider-next"
          aria-label="Next screenshot"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(12, 8, 11, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 231, 231, 0.26)',
            color: '#ffe7e7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 5,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
          }}
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Indicator Dots Bar (Bottom Center) */}
      {slideList.length > 1 && (
        <div
          className="project-slider-dots-wrap"
          style={{
            position: 'absolute',
            bottom: '9px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.24rem 0.55rem',
            borderRadius: '999px',
            background: 'rgba(12, 8, 11, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 231, 231, 0.18)',
            zIndex: 5,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
          }}
        >
          {slideList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => goToSlide(idx, e)}
              className="project-slider-dot"
              aria-label={`Go to screenshot ${idx + 1}`}
              style={{
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                height: '5px',
                width: idx === currentIndex ? '18px' : '6px',
                borderRadius: '999px',
                background: idx === currentIndex ? 'var(--wine)' : 'rgba(255, 255, 255, 0.38)',
                boxShadow: idx === currentIndex ? '0 0 8px rgba(148, 78, 99, 0.9)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

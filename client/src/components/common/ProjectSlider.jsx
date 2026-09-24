import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchHomepageSlider } from '../../services/api';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';

export const ProjectSlider = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasApiError, setHasApiError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const loadHomepageSliderMedia = async () => {
      try {
        setLoading(true);
        setHasApiError(false);
        const res = await fetchHomepageSlider();

        if (!isMounted) return;

        if (res && res.success && Array.isArray(res.data)) {
          setMediaList(res.data);
        } else {
          setMediaList([]);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('HomePage ProjectSlider API Error:', err.message || err);
          setHasApiError(true);
          setMediaList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHomepageSliderMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  // Autoplay Effect (5 Seconds interval for 2+ items, paused on hover/touch)
  useEffect(() => {
    if (mediaList.length < 2 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [mediaList.length, isPaused]);

  // Navigation Handlers
  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
  };

  // Focused Carousel Container Keyboard Navigation Handler
  const handleKeyDown = (e) => {
    if (mediaList.length < 2) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNextSlide();
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (mediaList.length < 2) return;

    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // 1. Loading State (Skeletal Placeholder)
  if (loading) {
    return (
      <Section background="default" padding="default">
        <Container>
          <div className="w-full aspect-16/9 max-h-[460px] rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
        </Container>
      </Section>
    );
  }

  // 2. Zero Published Selected Photos OR API/Network Error -> Return null cleanly
  if (hasApiError || mediaList.length === 0) {
    return null;
  }

  const currentMedia = mediaList[currentIndex];
  const isMultiSlide = mediaList.length >= 2;

  return (
    <Section background="default" padding="default">
      <Container>
        <SectionHeading
          badgeText="Portfolio Showcase"
          title="Recent Construction & Site Progress"
          subtitle="Verified site progress and completed elevation photography from Buddha Mayoori Construction."
        />

        {/* Focusable Carousel Container */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Recent Construction Projects Carousel"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          {/* Main Slide Image Frame */}
          <div className="relative w-full aspect-16/9 max-h-[500px] overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src={currentMedia.url}
              alt={currentMedia.caption || currentMedia.projectTitle || 'Construction Site Photo'}
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Dark Gradient Overlay for Caption Metadata */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-4 sm:p-6 lg:p-8">
              <div className="max-w-3xl">
                {currentMedia.projectCategory && (
                  <Badge variant="amber" className="mb-2 shadow-xs">
                    {currentMedia.projectCategory}
                  </Badge>
                )}

                {currentMedia.projectTitle && (
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                    {currentMedia.projectTitle}
                  </h3>
                )}

                {currentMedia.caption && (
                  <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium line-clamp-2">
                    {currentMedia.caption}
                  </p>
                )}

                {currentMedia.projectLocation && (
                  <p className="mt-2 text-xs text-amber-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{currentMedia.projectLocation}</span>
                  </p>
                )}

                {currentMedia.projectSlug && (
                  <div className="mt-3">
                    <Link
                      to={`/projects/${currentMedia.projectSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      View Project Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Previous / Next Arrows (Multi-slide only) */}
          {isMultiSlide && (
            <>
              <button
                type="button"
                onClick={goToPrevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 flex items-center justify-center border border-slate-700/80 shadow-md backdrop-blur-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next Slide"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 flex items-center justify-center border border-slate-700/80 shadow-md backdrop-blur-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Pagination Dots (Multi-slide only) */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {mediaList.map((media, idx) => (
                  <button
                    key={media.id || idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      idx === currentIndex
                        ? 'bg-amber-500 w-6'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
};

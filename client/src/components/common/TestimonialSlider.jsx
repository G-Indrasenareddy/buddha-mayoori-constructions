import React, { useState, useEffect, useRef } from 'react';
import { fetchPublicReviews } from '../../services/api';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, ChevronLeft, ChevronRight, User, MapPin } from 'lucide-react';

const ReviewCard = ({ review, className = '' }) => {
  if (!review) return null;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-8 text-center relative flex flex-col justify-between h-full transition-all duration-300 overflow-hidden ${className}`}>
      {/* Top-Left Opening Quotation Mark */}
      <svg
        className="w-9 h-9 sm:w-11 sm:h-11 text-amber-500/30 absolute top-3 left-4 sm:top-4 sm:left-5 pointer-events-none select-none shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.211 1.8.428 2.9.22 2.9 4.12 0 1.353-.51 2.617-1.42 3.513-1.077 1.063-2.617 1.15-4.482.077zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.211 1.8.428 2.9.22 2.9 4.12 0 1.353-.51 2.617-1.42 3.513-1.077 1.063-2.617 1.15-4.482.077z" />
      </svg>

      {/* Bottom-Right Closing Quotation Mark */}
      <svg
        className="w-9 h-9 sm:w-11 sm:h-11 text-amber-500/30 absolute bottom-3 right-4 sm:bottom-4 sm:right-5 pointer-events-none select-none shrink-0 rotate-180"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.211 1.8.428 2.9.22 2.9 4.12 0 1.353-.51 2.617-1.42 3.513-1.077 1.063-2.617 1.15-4.482.077zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.211 1.8.428 2.9.22 2.9 4.12 0 1.353-.51 2.617-1.42 3.513-1.077 1.063-2.617 1.15-4.482.077z" />
      </svg>

      <div>
        {/* Dynamic 1–5 Star Rating */}
        <div
          className="flex items-center justify-center gap-1 mb-3"
          aria-label={`Rating: ${review.rating || 5} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                star <= (review.rating || 5)
                  ? 'text-amber-500 fill-amber-500'
                  : 'text-slate-200 fill-slate-100'
              }`}
            />
          ))}
        </div>

        {/* Customer Photo / Avatar Fallback */}
        <div className="mb-4 flex justify-center">
          {review.customerPhoto?.url ? (
            <img
              src={review.customerPhoto.url}
              alt={`Photo of ${review.customerName}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-500/30 shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.display = 'flex';
                }
              }}
            />
          ) : null}

          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-amber-500/30 shadow-md items-center justify-center text-slate-400 ${
              review.customerPhoto?.url ? 'hidden' : 'flex'
            }`}
            aria-hidden="true"
          >
            <User className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </div>

        {/* Customer Name */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-1">
          {review.customerName}
        </h3>

        {/* Customer Location */}
        {review.location && (
          <p className="text-xs sm:text-sm font-semibold text-amber-700 flex items-center justify-center gap-1 mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{review.location}</span>
          </p>
        )}

        {/* Review Text */}
        <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed relative z-10 max-w-md mx-auto">
          "{review.reviewText}"
        </p>
      </div>
    </div>
  );
};

export const TestimonialSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasApiError, setHasApiError] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive breakpoint listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        setLoading(true);
        setHasApiError(false);
        const res = await fetchPublicReviews();

        if (!isMounted) return;

        if (res && res.success && Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews([]);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('HomePage TestimonialSlider API Error:', err.message || err);
          setHasApiError(true);
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const pageSize = isMobile ? 1 : 2;

  // Group reviews into non-overlapping pages
  const pages = [];
  for (let i = 0; i < reviews.length; i += pageSize) {
    pages.push(reviews.slice(i, i + pageSize));
  }
  const totalPages = pages.length;

  // Reset pageIndex if out of bounds on viewport resize or data change
  useEffect(() => {
    if (pageIndex >= totalPages) {
      setPageIndex(0);
    }
  }, [totalPages, pageIndex]);

  // Autoplay Effect (5 Seconds interval, non-looping: stops at final page)
  useEffect(() => {
    if (totalPages <= 1 || isPaused || pageIndex >= totalPages - 1) return;

    const timer = setInterval(() => {
      setPageIndex((prev) => {
        if (prev >= totalPages - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages, isPaused, pageIndex]);

  // Navigation Handlers (Clamped without looping)
  const goToPrevSlide = () => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Keyboard Navigation Handler
  const handleKeyDown = (e) => {
    if (totalPages <= 1) return;
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
    if (totalPages <= 1) return;

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
      <Section background="white" padding="default" className="border-t border-slate-100">
        <Container>
          <div className="w-full max-w-4xl mx-auto h-48 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
        </Container>
      </Section>
    );
  }

  // 2. Zero Published Reviews OR API/Network Error -> Return null cleanly
  if (hasApiError || reviews.length === 0) {
    return null;
  }

  const isMultiSlide = totalPages > 1;

  return (
    <Section background="white" padding="default" className="border-y border-slate-200/80 bg-slate-50/50">
      <Container>
        <SectionHeading
          badgeText="WHAT OUR CUSTOMERS SAY"
          title="Customer Reviews & Testimonials"
          subtitle="Trusted by customers for quality construction, professional service, and lasting results."
        />

        <div
          tabIndex={0}
          role="region"
          aria-label="Customer Reviews Carousel"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-5xl lg:max-w-6xl mx-auto focus:outline-none px-4 sm:px-8"
        >
          {/* Stable Track-Based Carousel Viewport */}
          <div className="relative overflow-hidden w-full py-2">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {pages.map((pageReviews, pIdx) => (
                <div key={pIdx} className="w-full shrink-0 flex-none px-1 flex justify-center items-stretch">
                  {pageSize === 2 ? (
                    pageReviews.length === 2 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl lg:max-w-5xl mx-auto items-stretch">
                        <div className="w-full flex flex-col h-full">
                          <ReviewCard review={pageReviews[0]} />
                        </div>
                        <div className="w-full flex flex-col h-full">
                          <ReviewCard review={pageReviews[1]} />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl lg:max-w-5xl mx-auto items-stretch">
                        <div className="w-full flex flex-col h-full col-span-1 md:col-span-2 max-w-md mx-auto">
                          <ReviewCard review={pageReviews[0]} />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="w-full max-w-md mx-auto flex flex-col h-full">
                      <ReviewCard review={pageReviews[0]} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Previous / Next Chevron Buttons */}
          {isMultiSlide && (
            <>
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={pageIndex === 0}
                aria-label="Previous Reviews"
                className={`absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center border border-slate-200/90 shadow-md backdrop-blur-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 z-20 ${
                  pageIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200 shadow-none'
                    : 'hover:text-amber-600 hover:border-amber-400/80 hover:shadow-lg hover:scale-[1.03] cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goToNextSlide}
                disabled={pageIndex === totalPages - 1}
                aria-label="Next Reviews"
                className={`absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center border border-slate-200/90 shadow-md backdrop-blur-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 z-20 ${
                  pageIndex === totalPages - 1
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200 shadow-none'
                    : 'hover:text-amber-600 hover:border-amber-400/80 hover:shadow-lg hover:scale-[1.03] cursor-pointer'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPageIndex(idx)}
                    aria-label={`Go to carousel page ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === pageIndex
                        ? 'bg-amber-600 w-6'
                        : 'bg-slate-300 hover:bg-slate-400 w-2.5'
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

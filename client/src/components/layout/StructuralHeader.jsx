import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_INFO } from '../../utils/constants';

/**
 * Structural Header Foundation
 * Contains structural top contact bar and nav links skeleton.
 */
export const StructuralHeader = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* Structural Top Contact Bar */}
      <div className="bg-slate-900 text-slate-200 py-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span>📞 Call: <a href={`tel:${CONTACT_INFO.phones[0].raw}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.phones[0].display}</a></span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">✉️ <a href={`mailto:${CONTACT_INFO.emails[0].address}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.emails[0].address}</a></span>
          </div>
          <div className="text-amber-400 font-medium">
            📍 {CONTACT_INFO.location.primary} | {COMPANY_INFO.establishedLabel}
          </div>
        </div>
      </div>

      {/* Basic Navigation Header Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-lg sm:text-xl">
          <span className="w-8 h-8 rounded bg-amber-600 text-slate-900 font-extrabold flex items-center justify-center text-sm">
            BMC
          </span>
          <span>{COMPANY_INFO.name}</span>
        </Link>

        {/* Desktop Nav Skeleton Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-amber-600 transition-colors">About</Link>
          <Link to="/services" className="hover:text-amber-600 transition-colors">Services</Link>
          <Link to="/projects" className="hover:text-amber-600 transition-colors">Projects</Link>
          <Link to="/team" className="hover:text-amber-600 transition-colors">Team</Link>
          <Link to="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
        </nav>

        {/* Primary CTA Skeleton */}
        <div className="flex items-center gap-3">
          <Link
            to="/request-a-quote"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md bg-amber-600 text-slate-900 hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[44px]"
          >
            Request a Building Estimate
          </Link>
        </div>
      </div>
    </header>
  );
};

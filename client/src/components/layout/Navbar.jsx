import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_INFO } from '../../utils/constants';
import logoImg from '../../assets/buddha-mayoori-logo.jpg';
import { MobileDrawer } from './MobileDrawer';

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Structural Top Contact Bar */}
        <div className="bg-slate-900 text-slate-200 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <span>📞 <a href={`tel:${CONTACT_INFO.phones[0].raw}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.phones[0].display}</a></span>
              <span className="hidden md:inline text-slate-700">|</span>
              <span className="hidden md:inline">📞 <a href={`tel:${CONTACT_INFO.phones[1].raw}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.phones[1].display}</a></span>
              <span className="hidden lg:inline text-slate-700">|</span>
              <span className="hidden lg:inline">✉️ <a href={`mailto:${CONTACT_INFO.emails[0].address}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.emails[0].address}</a></span>
            </div>
            <div className="text-amber-400 font-medium text-[11px] sm:text-xs">
              📍 {CONTACT_INFO.location.primary} | {COMPANY_INFO.establishedLabel}
            </div>
          </div>
        </div>

        {/* Main Header Bar with Prominent Logo Display */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex justify-between items-center">
          {/* Prominently Sized Official Logo and Brand Title */}
          <Link to="/" className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded">
            <img
              src={logoImg}
              alt="Buddha Mayoori Constructions Official Logo"
              className="h-11 w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain rounded-md border border-slate-200 bg-white shadow-2xs group-hover:border-amber-400 transition-all duration-200 shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight tracking-tight">
                {COMPANY_INFO.name}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-wide mt-0.5">
                {COMPANY_INFO.establishedLabel} • Koodal, Pathanamthitta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Desktop Navigation" className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'border-amber-600 text-amber-700 font-bold'
                    : 'border-transparent text-slate-700 hover:text-amber-600 hover:border-amber-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Primary CTA and Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/request-a-quote"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-md bg-amber-600 text-slate-900 hover:bg-amber-500 active:bg-amber-700 transition-colors shadow-xs min-h-[44px]"
            >
              Request a Building Estimate
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Mobile Navigation Menu"
              aria-expanded={isDrawerOpen}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

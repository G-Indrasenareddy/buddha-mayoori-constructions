import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_INFO } from '../../utils/constants';
import logoImg from '../../assets/buddha-mayoori-logo.jpg';

export const MobileDrawer = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();

  // Prevent body scroll when mobile drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col justify-between overflow-y-auto">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Buddha Mayoori Construction Logo"
                className="h-12 w-12 object-contain rounded-md border border-slate-200 shrink-0"
              />
              <span className="font-bold text-slate-900 text-sm leading-tight">{COMPANY_INFO.name}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links List */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`px-4 py-3 rounded-md text-base font-semibold transition-colors flex items-center justify-between min-h-[48px] ${
                  isActive(link.path)
                    ? 'bg-amber-50 text-amber-900 border-l-4 border-amber-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-slate-400 text-sm">→</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <Link
              to="/request-a-quote"
              onClick={onClose}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-md bg-amber-600 text-slate-900 hover:bg-amber-500 active:bg-amber-700 transition-colors shadow-xs min-h-[48px]"
            >
              Request a Building Estimate
            </Link>
          </div>
        </div>

        {/* Contact info bottom box */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-900">Direct Contact Options:</p>
          <p>📞 <a href={`tel:${CONTACT_INFO.phones[0].raw}`} className="hover:underline font-medium text-slate-800">{CONTACT_INFO.phones[0].display}</a></p>
          <p>💬 WhatsApp 1: <a href={`https://wa.me/${CONTACT_INFO.whatsapp[0].raw}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-emerald-700">{CONTACT_INFO.whatsapp[0].display}</a></p>
          <p>💬 WhatsApp 2: <a href={`https://wa.me/${CONTACT_INFO.whatsapp[1].raw}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-emerald-700">{CONTACT_INFO.whatsapp[1].display}</a></p>
          <p className="pt-2 text-[11px] text-slate-500">📍 {CONTACT_INFO.location.primary}</p>
        </div>
      </div>
    </div>
  );
};

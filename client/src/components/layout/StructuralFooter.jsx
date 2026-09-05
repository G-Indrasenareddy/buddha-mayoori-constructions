import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_INFO, CANONICAL_SERVICES } from '../../utils/constants';

/**
 * Structural Footer Foundation
 * Reusable multi-column structural footer skeleton.
 */
export const StructuralFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">{COMPANY_INFO.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Delivering professional civil construction and engineering services across Kerala {COMPANY_INFO.establishedLabel}.
            </p>
            <p className="text-amber-400 text-xs font-semibold">
              📍 {CONTACT_INFO.location.primary}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
              <li><Link to="/services" className="hover:text-amber-400">Services</Link></li>
              <li><Link to="/projects" className="hover:text-amber-400">Projects</Link></li>
              <li><Link to="/team" className="hover:text-amber-400">Team</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Canonical Services */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Our Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CANONICAL_SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="hover:text-amber-400">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Directory */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact Information</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>📞 {CONTACT_INFO.phones[0].display}</p>
              <p>📞 {CONTACT_INFO.phones[1].display}</p>
              <p>✉️ {CONTACT_INFO.emails[0].address}</p>
              <p>✉️ {CONTACT_INFO.emails[1].address}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. | Built for performance & accessibility.</p>
        </div>
      </div>
    </footer>
  );
};

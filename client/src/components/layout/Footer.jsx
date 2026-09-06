import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_INFO, CANONICAL_SERVICES } from '../../utils/constants';
import logoImg from '../../assets/buddha-mayoori-logo.jpg';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImg}
                alt="Buddha Mayoori Constructions Official Logo"
                className="h-10 w-10 object-contain rounded border border-slate-700 bg-white"
              />
              <div>
                <h3 className="text-white font-bold text-base leading-tight">{COMPANY_INFO.name}</h3>
                <span className="text-amber-400 text-xs font-semibold">{COMPANY_INFO.establishedLabel}</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Providing civil construction and structural designing services across Kerala since 1990.
            </p>
            <p className="text-amber-400 text-xs font-medium">
              📍 Primary Location: {CONTACT_INFO.location.primary}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link></li>
              <li><Link to="/team" className="hover:text-amber-400 transition-colors">Team</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/request-a-quote" className="hover:text-amber-400 transition-colors">Request a Building Estimate</Link></li>
            </ul>
          </div>

          {/* Col 3: Canonical Services */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Our Canonical Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CANONICAL_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Directory & WhatsApp */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact Directory</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>📞 Phone 1: <a href={`tel:${CONTACT_INFO.phones[0].raw}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.phones[0].display}</a></p>
              <p>📞 Phone 2: <a href={`tel:${CONTACT_INFO.phones[1].raw}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.phones[1].display}</a></p>
              <p>📞 Phone 3: <a href={`tel:${CONTACT_INFO.phones[2].raw}`} className="hover:text-amber-400 font-medium">{CONTACT_INFO.phones[2].display}</a></p>
              <div className="pt-1 border-t border-slate-800 space-y-1">
                <p>💬 WhatsApp 1: <a href={`https://wa.me/${CONTACT_INFO.whatsapp[0].raw}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-medium">{CONTACT_INFO.whatsapp[0].display}</a></p>
                <p>💬 WhatsApp 2: <a href={`https://wa.me/${CONTACT_INFO.whatsapp[1].raw}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-medium">{CONTACT_INFO.whatsapp[1].display}</a></p>
              </div>
              <div className="pt-1 border-t border-slate-800 space-y-1">
                <p>✉️ <a href={`mailto:${CONTACT_INFO.emails[0].address}`} className="hover:text-amber-400">{CONTACT_INFO.emails[0].address}</a></p>
                <p>✉️ <a href={`mailto:${CONTACT_INFO.emails[1].address}`} className="hover:text-amber-400">{CONTACT_INFO.emails[1].address}</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Working Sites Note */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">{CONTACT_INFO.location.label}:</p>
          <p className="text-slate-400">{CONTACT_INFO.location.sites.join(' • ')}</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. | Built for quality, performance, and accessibility.</p>
        </div>
      </div>
    </footer>
  );
};

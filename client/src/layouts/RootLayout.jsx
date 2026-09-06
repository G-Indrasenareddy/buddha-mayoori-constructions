import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { WhatsAppCTA } from '../components/layout/WhatsAppCTA';
import { ScrollToTop } from '../components/common/ScrollToTop';

/**
 * Root Layout incorporating Navbar, Footer, WhatsApp floating CTA, and ScrollToTop
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppCTA />
    </div>
  );
};

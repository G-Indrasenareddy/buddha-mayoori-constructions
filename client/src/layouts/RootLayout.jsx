import React from 'react';
import { Outlet } from 'react-router-dom';
import { StructuralHeader } from '../components/layout/StructuralHeader';
import { StructuralFooter } from '../components/layout/StructuralFooter';
import { ScrollToTop } from '../components/common/ScrollToTop';

/**
 * Main Root Layout Wrapper
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <ScrollToTop />
      <StructuralHeader />
      <main id="main-content" className="flex-1 w-full">
        <Outlet />
      </main>
      <StructuralFooter />
    </div>
  );
};

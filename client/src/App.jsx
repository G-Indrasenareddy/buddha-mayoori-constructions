import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { RootLayout } from './layouts/RootLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="request-a-quote" element={<QuotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Standalone Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="team" element={<AdminTeamPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

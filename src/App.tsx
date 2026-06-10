import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import AuthModal from './components/AuthModal';
import BackToTop from './components/BackToTop';

// Sections
import Hero from './sections/Hero';
import Features from './sections/Features';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';

import AboutIntro from './sections/AboutIntro';
import Values from './sections/Values';
import Team from './sections/Team';

import ServicesGrid from './sections/ServicesGrid';
import Benefits from './sections/Benefits';
import Process from './sections/Process';

import PortfolioShowcase from './sections/PortfolioShowcase';
import ContactSection from './sections/ContactSection';
import FAQAccordion from './sections/FAQAccordion';
import Newsletter from './sections/Newsletter';

// Auth Sections
import DashboardSection from './sections/DashboardSection';
import AdminPanel from './sections/AdminPanel';

// New Pages
import FeaturesPage from './sections/FeaturesPage';
import FAQPage from './sections/FAQPage';
import PrivacyPolicy from './sections/PrivacyPolicy';
import TermsOfService from './sections/TermsOfService';
import NotFoundPage from './sections/NotFoundPage';

export default function App() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [initialModalTab, setInitialModalTab] = useState<string>( 'assessment');
  
  // Authentication Modal States
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register' | 'forgot'>('login');

  const openDemo = (demoTab: string) => {
    setInitialModalTab(demoTab);
    setModalOpen(true);
  };

  const closeDemo = () => {
    setModalOpen(false);
  };

  const openAuth = (view: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  // Safe navigation helper
  const handleNavigate = (pageId: string) => {
    if (pageId === 'home') {
      navigate('/');
    } else {
      navigate(`/${pageId}`);
    }
  };

  // Route Guard Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return (
        <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Loading session details...</p>
        </div>
      );
    }
    if (!isAuthenticated) {
      setTimeout(() => openAuth('login'), 100);
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  // Admin Route Guard Component
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return (
        <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Verifying administrator credentials...</p>
        </div>
      );
    }
    if (!isAuthenticated) {
      setTimeout(() => openAuth('login'), 100);
      return <Navigate to="/" replace />;
    }
    if (!isAdmin) {
      alert('Access restricted. Admin authorization required.');
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  };

  // Map active path for navbar highlight
  const getActivePageId = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar Header */}
      <Navbar 
        activePage={getActivePageId()} 
        setActivePage={handleNavigate} 
        openDemo={openDemo} 
        openAuth={openAuth}
      />

      {/* Main Routing Panel */}
      <main className="flex-grow pt-4">
        <Routes>
          {/* Landing / Home Pages */}
          <Route path="/" element={
            <>
              <Hero openDemo={openDemo} setActivePage={handleNavigate} />
              <Features />
              <Testimonials />
              <CTA openDemo={openDemo} />
              <FAQAccordion />
            </>
          } />

          <Route path="/about" element={
            <>
              <AboutIntro />
              <Values />
              <Team />
              <CTA openDemo={openDemo} />
            </>
          } />

          <Route path="/services" element={
            <>
              <ServicesGrid openDemo={openDemo} />
              <Benefits />
              <Process />
              <CTA openDemo={openDemo} />
            </>
          } />

          <Route path="/features" element={
            <FeaturesPage openDemo={openDemo} />
          } />

          <Route path="/faq" element={
            <FAQPage />
          } />

          <Route path="/privacy" element={
            <PrivacyPolicy />
          } />

          <Route path="/terms" element={
            <TermsOfService />
          } />

          <Route path="/portfolio" element={
            <>
              <PortfolioShowcase />
              <Testimonials />
              <CTA openDemo={openDemo} />
            </>
          } />

          <Route path="/contact" element={
            <>
              <ContactSection />
              <FAQAccordion />
            </>
          } />

          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardSection openDemo={openDemo} />
            </ProtectedRoute>
          } />

          {/* Protected Admin Route */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Newsletter block */}
      <Newsletter />

      {/* Footer Container */}
      <Footer 
        setActivePage={handleNavigate} 
        openDemo={openDemo} 
      />

      {/* Scroll to Top floating arrow */}
      <BackToTop />

      {/* SaaS AI Simulations Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={closeDemo} 
        initialTab={initialModalTab} 
      />

      {/* Authentication Gateway Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authModalView}
      />
    </div>
  );
}

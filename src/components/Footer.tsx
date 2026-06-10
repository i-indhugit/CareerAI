import React from 'react';
import { BrainCircuit, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
  openDemo: (demoTab: string) => void;
}

export default function Footer({ setActivePage, openDemo }: FooterProps) {
  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Brand details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl text-white">
              <BrainCircuit className="w-5.5 h-5.5" />
            </div>
            <span className="font-title text-xl font-extrabold tracking-tight text-white">
              Career<span className="text-primary-500">AI</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-slate-500">
            Empowering students and professionals to unlock their full career potential through Artificial Intelligence, predictive compatibility analysis, and customized learning structures.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center justify-center w-9 h-9 bg-slate-900 hover:bg-primary-600 hover:text-white rounded-full transition-all duration-200" aria-label="LinkedIn">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 bg-slate-900 hover:bg-primary-600 hover:text-white rounded-full transition-all duration-200" aria-label="Twitter">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 bg-slate-900 hover:bg-primary-600 hover:text-white rounded-full transition-all duration-200" aria-label="Facebook">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 bg-slate-900 hover:bg-primary-600 hover:text-white rounded-full transition-all duration-200" aria-label="Instagram">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><button onClick={() => handleNavClick('home')} className="hover:text-primary-500 transition-colors">Home</button></li>
            <li><button onClick={() => handleNavClick('features')} className="hover:text-primary-500 transition-colors">Features</button></li>
            <li><button onClick={() => handleNavClick('services')} className="hover:text-primary-500 transition-colors">Services</button></li>
            <li><button onClick={() => handleNavClick('about')} className="hover:text-primary-500 transition-colors">About Us</button></li>
            <li><button onClick={() => handleNavClick('contact')} className="hover:text-primary-500 transition-colors">Contact</button></li>
          </ul>
        </div>

        {/* Services mapping */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><button onClick={() => openDemo('assessment')} className="hover:text-primary-500 text-left transition-colors">Career Assessment</button></li>
            <li><button onClick={() => openDemo('resume')} className="hover:text-primary-500 text-left transition-colors">Resume Analysis</button></li>
            <li><button onClick={() => openDemo('assessment')} className="hover:text-primary-500 text-left transition-colors">Skill Gap Reports</button></li>
            <li><button onClick={() => openDemo('assessment')} className="hover:text-primary-500 text-left transition-colors">Learning Paths</button></li>
            <li><button onClick={() => openDemo('interview')} className="hover:text-primary-500 text-left transition-colors">AI Interview Coach</button></li>
          </ul>
        </div>

        {/* Contact info column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact Info</h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="w-4.5 h-4.5 text-primary-500 shrink-0 mt-0.5" />
              <a href="mailto:contact@careerai.com" className="hover:text-primary-500 break-all transition-colors">contact@careerai.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4.5 h-4.5 text-primary-500 shrink-0" />
              <a href="tel:+15551234567" className="hover:text-primary-500 transition-colors">+1 (555) 123-4567</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-primary-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">San Francisco, California</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Credit and Copyright footer */}
      <div className="border-t border-slate-900 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span>&copy; 2026 CareerAI. All Rights Reserved.</span>
            <button onClick={() => handleNavClick('privacy')} className="hover:text-slate-400 transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavClick('terms')} className="hover:text-slate-400 transition-colors">Terms of Service</button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-slate-400 transition-colors">FAQ</button>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Designed & Developed by</span>
            <span className="text-primary-500 font-semibold tracking-wide hover:text-primary-400 transition-colors cursor-pointer">
              Indhu Priya Yanamala
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

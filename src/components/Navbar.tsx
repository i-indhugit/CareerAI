import React, { useState, useEffect } from 'react';
import { BrainCircuit, Menu, X, LogOut, User as UserIcon, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  openDemo: (demoTab: string) => void;
  openAuth: (view?: 'login' | 'register' | 'forgot') => void;
}

export default function Navbar({ activePage, setActivePage, openDemo, openAuth }: NavbarProps) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Success Stories' },
    { id: 'contact', label: 'Contact' }
  ];

  // Conditional user dashboard and admin links
  if (isAuthenticated) {
    navLinks.push({ id: 'dashboard', label: 'Dashboard' });
    if (isAdmin) {
      navLinks.push({ id: 'admin', label: 'Admin Panel' });
    }
  }

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 ${
      scrolled 
        ? 'h-16 bg-white/95 backdrop-blur-md shadow-md' 
        : 'h-20 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200/50'
    }`}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 focus:outline-none">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl text-white shadow-md shadow-primary-500/25">
            <BrainCircuit className="w-5.5 h-5.5" />
          </div>
          <span className="font-title text-xl font-extrabold tracking-tight text-slate-900">
            Career<span className="text-primary-600">AI</span>
          </span>
        </button>

        {/* Desktop Menu links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-medium text-[0.925rem] px-4 py-2 rounded-lg transition-all focus:outline-none ${
                activePage === link.id
                  ? 'text-primary-600 bg-primary-50/70 font-semibold'
                  : 'text-slate-500 hover:text-primary-600 hover:bg-slate-100/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => openAuth('login')} 
                className="text-slate-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-slate-100 transition focus:outline-none"
              >
                Log In
              </button>
              <button 
                onClick={() => openAuth('register')}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all focus:outline-none"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Profile Thumbnail */}
              <button 
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 border border-slate-200 bg-slate-50 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition focus:outline-none"
              >
                <img 
                  src={user?.photo || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Default'} 
                  alt="" 
                  className="w-7.5 h-7.5 rounded-full border bg-white"
                />
                <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">{user?.name.split(' ')[0]}</span>
              </button>
              
              {/* Logout button */}
              <button 
                onClick={logout}
                className="text-slate-400 hover:text-rose-500 p-2 hover:bg-slate-100 rounded-xl transition focus:outline-none"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="p-2 -mr-2 text-slate-700 md:hidden hover:bg-slate-200/50 rounded-lg transition focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-x-0 top-16 md:hidden bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`} style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="flex flex-col gap-2 p-6 h-full">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left text-lg font-medium p-3.5 rounded-xl transition-all focus:outline-none ${
                activePage === link.id
                  ? 'text-primary-600 bg-primary-50 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('login'); }}
                  className="w-full py-3.5 text-center text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition focus:outline-none"
                >
                  Log In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openAuth('register'); }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all focus:outline-none"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setMobileMenuOpen(false); handleNavClick('dashboard'); }}
                  className="w-full py-3.5 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-xl transition focus:outline-none flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-5 h-5" /> View Dashboard
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold py-3.5 rounded-xl transition-all focus:outline-none flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

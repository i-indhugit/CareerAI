import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register' | 'forgot';
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>(initialView);
  const { login, register, forgotPassword } = useAuth();
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Status states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (view === 'login') {
        await login(email, password);
        setSuccess('Logged in successfully!');
        setTimeout(() => {
          onClose();
        }, 1000);
      } else if (view === 'register') {
        if (!name.trim()) throw new Error('Please enter your name.');
        await register(name, email, password);
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        await forgotPassword(email);
        setSuccess('Reset instructions sent to your email.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'linkedin') => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Simulate OAuth flow redirect & callback response
    setTimeout(async () => {
      try {
        const dummyName = provider === 'google' ? 'Google Developer' : provider === 'github' ? 'GitHub Coder' : 'LinkedIn Professional';
        const dummyEmail = `${provider}-user@careerai.com`;
        const dummyPassword = `oauth-pass-${provider}`;

        try {
          // Try to log in first
          await login(dummyEmail, dummyPassword);
        } catch {
          // If login fails, register them
          await register(dummyName, dummyEmail, dummyPassword);
        }

        setSuccess(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)} successfully!`);
        setTimeout(() => {
          onClose();
        }, 1000);
      } catch (err: any) {
        setError(err.message || 'OAuth authentication failed.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Auth Card Container */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close trigger */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition focus:outline-none"
          aria-label="Close authentication modal"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Heading */}
        <div className="p-6 pb-4 border-b border-slate-100 text-center">
          <span className="font-title text-2xl font-black text-slate-900 tracking-tight">
            Career<span className="text-primary-600">AI</span>
          </span>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">
            {view === 'login' ? 'Welcome back! Sign in to access your dashboard' :
             view === 'register' ? 'Create a secure account to save assessments' :
             'Recover password instructions'}
          </p>
        </div>

        {/* Form area */}
        <div className="p-6 space-y-4">
          
          {/* Notification Alerts */}
          {error && (
            <div className="flex items-start gap-2 bg-rose-50 border border-rose-100 text-rose-700 text-xs p-3 rounded-xl">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs p-3 rounded-xl text-center font-semibold animate-pulse">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {view === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="jane.doe@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {view !== 'forgot' && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Password</label>
                  {view === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-xs font-semibold text-primary-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/15 hover:shadow-primary-500/25 transition-all focus:outline-none disabled:opacity-40"
            >
              {loading ? 'Processing...' : view === 'login' ? 'Login' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          {/* Social Logins SSO divider */}
          {view !== 'forgot' && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-150"></div>
                <span className="flex-shrink mx-4 text-[0.675rem] font-bold text-slate-400 uppercase tracking-wider">Or Sign In With</span>
                <div className="flex-grow border-t border-slate-150"></div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Google Sign In */}
                <button
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loading}
                  type="button"
                  className="flex items-center justify-center p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition focus:outline-none"
                  aria-label="Login with Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.62 14.98 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.85 2.99C6.27 7.4 8.91 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.72-4.92 3.72-8.55z" />
                    <path fill="#FBBC05" d="M5.35 10.49c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.5 3.92C.54 5.86 0 8.04 0 10.4c0 2.36.54 4.54 1.5 6.48l3.85-2.99c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29z" />
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.34 1.1-4.26 1.1-3.09 0-5.73-2.36-6.66-5.45l-3.85 2.99C3.39 20.35 7.35 23 12 23z" />
                  </svg>
                </button>

                {/* Github Sign In */}
                <button
                  onClick={() => handleOAuthLogin('github')}
                  disabled={loading}
                  type="button"
                  className="flex items-center justify-center p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition focus:outline-none"
                  aria-label="Login with GitHub"
                >
                  <svg className="w-5 h-5 text-slate-900 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </button>

                {/* LinkedIn Sign In */}
                <button
                  onClick={() => handleOAuthLogin('linkedin')}
                  disabled={loading}
                  type="button"
                  className="flex items-center justify-center p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition focus:outline-none"
                  aria-label="Login with LinkedIn"
                >
                  <svg className="w-5 h-5 text-[#0A66C2] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Toggle View Link */}
          <div className="pt-4 text-center text-xs font-semibold text-slate-500">
            {view === 'login' ? (
              <span>Don't have an account? <button onClick={() => setView('register')} className="text-primary-600 hover:underline">Sign Up</button></span>
            ) : view === 'register' ? (
              <span>Already have an account? <button onClick={() => setView('login')} className="text-primary-600 hover:underline">Log In</button></span>
            ) : (
              <button onClick={() => setView('login')} className="text-primary-600 hover:underline">Back to Login</button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

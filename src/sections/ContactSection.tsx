import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            Get In Touch
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Contact Us
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Have questions or want to partner with CareerAI? Fill out the form below or reach out directly.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left panel: Info */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between h-full min-h-[440px]">
            <div>
              <h3 className="font-title text-xl font-bold mb-3">Contact Information</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-10">
                We'd love to hear from you. Feel free to contact our support or corporate partnership teams.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-primary-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.68rem] text-slate-500 font-bold uppercase tracking-wider mb-1">Email Us</span>
                    <a href="mailto:contact@careerai.com" className="text-sm font-semibold hover:text-primary-450 break-all transition-colors">
                      contact@careerai.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-primary-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.68rem] text-slate-500 font-bold uppercase tracking-wider mb-1">Call Us</span>
                    <a href="tel:+15551234567" className="text-sm font-semibold hover:text-primary-450 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-primary-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.68rem] text-slate-500 font-bold uppercase tracking-wider mb-1">Our Headquarters</span>
                    <span className="text-sm font-semibold text-white">San Francisco, California</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6 mt-10">
              <span className="block text-[0.7rem] text-slate-500 font-bold uppercase tracking-wider mb-3">Follow Our Community</span>
              <div className="flex items-center gap-2.5">
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-600 text-white flex items-center justify-center transition-all duration-200" aria-label="LinkedIn">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-600 text-white flex items-center justify-center transition-all duration-200" aria-label="Twitter">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-600 text-white flex items-center justify-center transition-all duration-200" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary-600 text-white flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-primary-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-primary-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-bold text-slate-700">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-primary-600 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-700">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  placeholder="How can we help your career journey?"
                  required
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-primary-600 focus:bg-white transition-all resize-y"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary-500/10 transition-all focus:outline-none disabled:bg-slate-300 disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-xs font-bold text-green-500 text-center mt-2 animate-in fade-in duration-200">
                  Thank you! Your message was sent successfully. We will get back to you shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs font-bold text-red-500 text-center mt-2 animate-in fade-in duration-200">
                  Please fill out all required fields.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Vector SVG Map Mockup Coordinates */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 flex flex-col gap-4 max-w-5xl mx-auto mt-16 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-600" />
            <span className="font-title text-sm font-bold text-slate-850">Our San Francisco Coordinates</span>
          </div>
          
          <div className="relative w-full h-[220px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/50 flex items-center justify-center">
            {/* Stylized Map Vector */}
            <svg className="w-full h-full opacity-65" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
              <path d="M 0,200 C 150,150 250,120 320,100 C 390,80 430,40 500,0 L 500,200 Z" fill="#E0F2FE" opacity="0.6" />
              <line x1="100" y1="0" x2="150" y2="200" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#FFFFFF" strokeWidth="8" />
              <line x1="280" y1="0" x2="310" y2="200" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="100" y1="0" x2="150" y2="200" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#CBD5E1" strokeWidth="2.5" />
              <line x1="280" y1="0" x2="310" y2="200" stroke="#CBD5E1" strokeWidth="1" />
              <g transform="translate(300, 120)">
                <circle cx="0" cy="0" r="16" fill="rgba(37, 99, 235, 0.15)" className="pulsing" />
                <circle cx="0" cy="0" r="8" fill="rgba(37, 99, 235, 0.3)" />
                <circle cx="0" cy="0" r="4" fill="#2563EB" />
              </g>
            </svg>
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-md text-[0.675rem] font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-ping"></span>
              Corporate Headquarters: Market Street, SF
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

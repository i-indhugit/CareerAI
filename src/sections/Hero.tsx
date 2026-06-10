import React from 'react';
import { LayoutDashboard, Compass, FileText, Mic, CheckCircle2, TrendingUp } from 'lucide-react';
import useAnimatedCounter from '../hooks/useAnimatedCounter';

interface HeroProps {
  openDemo: (demoTab: string) => void;
  setActivePage: (page: string) => void;
}

export default function Hero({ openDemo, setActivePage }: HeroProps) {
  // Trigger animations for statistics counters
  const studentsCount = useAnimatedCounter(50000, 2000);
  const resumesCount = useAnimatedCounter(10000, 2000);
  const pathsCount = useAnimatedCounter(100, 1500);

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-radial-gradient">
      {/* Background soft glowing blur shapes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:min-h-[500px]">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 shadow-sm rounded-full text-xs font-semibold text-slate-800 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <span>AI-Powered Career Intelligence v2.0</span>
          </div>

          <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Navigate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Artificial Intelligence</span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
            Discover career paths, identify skill gaps, optimize your resume, and prepare for your dream job using advanced AI-powered guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <button 
              onClick={() => openDemo('assessment')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-[0.95rem] px-8 py-3.5 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all text-center focus:outline-none"
            >
              Get Started
            </button>
            <button 
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-slate-50 text-primary-600 border border-slate-200 font-semibold text-[0.95rem] px-8 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all text-center focus:outline-none"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Column App mockup dashboard */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[440px] sm:max-w-[480px] h-[340px] sm:h-[360px] bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Header controls bar */}
            <div className="h-9 bg-slate-100/90 border-b border-slate-200/60 flex items-center px-4 gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
              <div className="flex-grow max-w-[200px] mx-auto bg-white border border-slate-200/60 rounded-md text-[0.625rem] text-slate-400 py-0.5 text-center font-medium shadow-sm">
                career-ai.com/copilot
              </div>
            </div>

            {/* Body */}
            <div className="flex-grow flex overflow-hidden">
              {/* Sidebar */}
              <aside className="w-28 bg-slate-50/80 border-r border-slate-200/60 p-3 flex flex-col gap-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/60">
                  <div className="w-5 h-5 rounded-full bg-primary-600 text-white font-title text-[0.55rem] font-bold flex items-center justify-center">
                    JD
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[0.55rem] font-semibold text-slate-800">John Doe</span>
                    <span className="text-[0.45rem] text-slate-400">Pro Tier</span>
                  </div>
                </div>
                <nav className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-[0.55rem] font-bold text-primary-600 bg-primary-50/80 p-1.5 rounded-lg">
                    <LayoutDashboard className="w-3 h-3" /> Dashboard
                  </span>
                  <span className="flex items-center gap-2 text-[0.55rem] font-medium text-slate-400 p-1.5 rounded-lg">
                    <Compass className="w-3 h-3" /> Assessment
                  </span>
                  <span className="flex items-center gap-2 text-[0.55rem] font-medium text-slate-400 p-1.5 rounded-lg">
                    <FileText className="w-3 h-3" /> Resume Audit
                  </span>
                  <span className="flex items-center gap-2 text-[0.55rem] font-medium text-slate-400 p-1.5 rounded-lg">
                    <Mic className="w-3 h-3" /> Interview
                  </span>
                </nav>
              </aside>

              {/* Workspace workspace */}
              <div className="flex-grow p-4 flex flex-col gap-3.5 bg-slate-50/20 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 flex flex-col gap-1.5">
                    <span className="text-[0.5rem] font-semibold text-slate-400 uppercase tracking-wider">ATS Rating</span>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#E2E8F0" strokeWidth="3"/>
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="94.2" strokeDashoffset="11.3"/>
                      </svg>
                      <span className="text-xs font-bold text-slate-800">88%</span>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 flex flex-col gap-1.5">
                    <span className="text-[0.5rem] font-semibold text-slate-400 uppercase tracking-wider">Skill Match</span>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#E2E8F0" strokeWidth="3"/>
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#10B981" strokeWidth="3" stroke-dasharray="94.2" stroke-dashoffset="5.6"/>
                      </svg>
                      <span className="text-xs font-bold text-slate-800">94%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/60 rounded-xl p-3 flex flex-col gap-2">
                  <span className="text-[0.55rem] font-semibold text-slate-400">Skills Fit Progression</span>
                  <svg className="w-full h-auto" viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="hero-chart-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="rgba(37, 99, 235, 0.18)" />
                        <stop offset="100%" stop-color="rgba(37, 99, 235, 0)" />
                      </linearGradient>
                    </defs>
                    <path d="M 0,60 Q 30,40 60,48 T 120,28 T 180,18 T 220,10 L 220,70 L 0,70 Z" fill="url(#hero-chart-grad)"/>
                    <path d="M 0,60 Q 30,40 60,48 T 120,28 T 180,18 T 220,10" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="60" cy="48" r="2.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="0.8"/>
                    <circle cx="120" cy="28" r="2.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="0.8"/>
                    <circle cx="180" cy="18" r="2.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="0.8"/>
                  </svg>
                </div>

                <div className="bg-slate-900 rounded-xl p-3 text-white">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full pulsing"></span>
                    <span className="text-[0.5rem] font-bold text-slate-400 uppercase">Copilot Recommendation</span>
                  </div>
                  <p className="text-[0.75rem] font-bold">Cloud Infrastructure Engineer</p>
                  <p className="text-[0.55rem] text-slate-400">Next: Master Terraform config workflows</p>
                </div>
              </div>
            </div>

            {/* Overlapping float widgets */}
            <div className="absolute top-10 -right-4 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-lg flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-7 h-7 bg-green-50 text-green-500 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[0.625rem] font-extrabold text-slate-800">Resume Audited</span>
                <span className="text-[0.5rem] text-slate-400 mt-0.5">ATS optimization complete</span>
              </div>
            </div>

            <div className="absolute bottom-8 -left-6 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-lg flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1s' }}>
              <div className="w-7 h-7 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[0.625rem] font-extrabold text-slate-800">Market Demand</span>
                <span className="text-[0.5rem] text-slate-400 mt-0.5">AI Skills growth +34%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Statistics Block */}
      <div className="mt-16 border-t border-slate-200/60 bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="font-title text-3xl font-black text-slate-900">
              {studentsCount.toLocaleString()}+
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Students Guided</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-title text-3xl font-black text-slate-900">
              {resumesCount.toLocaleString()}+
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Resumes Analyzed</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-title text-3xl font-black text-slate-900">
              95%
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Satisfaction Rate</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-title text-3xl font-black text-slate-900">
              {pathsCount.toLocaleString()}+
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Paths Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}

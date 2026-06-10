import React from 'react';

interface CTAProps {
  openDemo: (demoTab: string) => void;
}

export default function CTA({ openDemo }: CTAProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 rounded-3xl p-10 sm:p-16 text-center shadow-xl">
          {/* Subtle decoration shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Ready to Build Your Future?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Start your AI-powered career journey today and unlock your full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => openDemo('assessment')}
                className="bg-white hover:bg-slate-100 text-primary-600 font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none"
              >
                Get Started Now
              </button>
              <button 
                onClick={() => openDemo('interview')}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold text-sm px-8 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all focus:outline-none"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

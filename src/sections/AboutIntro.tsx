import React from 'react';
import { Target, Eye } from 'lucide-react';

export default function AboutIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            Who We Are
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            About CareerAI
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            CareerAI was created to bridge the gap between education and employment through intelligent career guidance. By leveraging artificial intelligence, the platform helps users understand their strengths, identify opportunities, and build successful career paths.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 sm:p-10 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-title text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empower individuals through data-driven career decisions, helping them identify and achieve their highest potential using AI intelligence.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 sm:p-10 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-title text-xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Become the world's most trusted AI-powered career companion, transforming the landscape of career navigation and talent placement.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

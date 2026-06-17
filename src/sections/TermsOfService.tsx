import React from 'react';
import { Scale, FileText, AlertTriangle, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-6 space-y-12 animate-in fade-in duration-350">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto border border-primary-100">
          <Scale className="w-6 h-6" />
        </div>
        <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Last Updated: June 10, 2026
        </p>
      </div>

      {/* Terms Details */}
      <div className="border border-slate-200/80 bg-white p-8 sm:p-10 rounded-3xl shadow-sm space-y-8 text-slate-600 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600 shrink-0" /> 1. Acceptable Use
          </h2>
          <p>
            CareerAI provides interactive career discovery, ATS analysis, and educational tracker modules for personal enrichment and informational purposes. By creating an account (in live or demo mode), you agree not to exploit diagnostic systems, feed harmful scripts, or spam form submissions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary-600 shrink-0" /> 2. Disclaimers of Warranty
          </h2>
          <p>
            Career recommendations and fit metrics are generated via mathematical weight mappings based on user answers. We do not warrant that our recommendations guarantee employment, admissions, or specific career promotions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-600 shrink-0" /> 3. Open-Source Contributions
          </h2>
          <p>
            As a platform built entirely on free and open-source stacks (React, Vite, Tailwind, Recharts), you are free to inspect, fork, or modify the layout code for personal portfolio or academic purposes.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <span>&copy; 2026 CareerAI. All rights reserved.</span>
          <span>Designed & Developed by Indhu Priya Yanamala</span>
        </div>
      </div>

    </div>
  );
}

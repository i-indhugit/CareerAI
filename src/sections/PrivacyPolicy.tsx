import React from 'react';
import { ShieldCheck, Lock, Eye, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-6 space-y-12 animate-in fade-in duration-350">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto border border-primary-100">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Last Updated: June 10, 2026
        </p>
      </div>

      {/* Policy Details */}
      <div className="border border-slate-200/80 bg-white p-8 sm:p-10 rounded-3xl shadow-sm space-y-8 text-slate-600 text-sm leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-600 shrink-0" /> 1. Data Collection & Security
          </h2>
          <p>
            At CareerAI, we value your privacy above all. We collect and store minimal data required to build user accounts, track assessment answers, and display analytics reports. When connected to Supabase databases, all transfers are encrypted with HTTPS protocols and records are restricted via Postgres Row-Level Security policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary-600 shrink-0" /> 2. Resume & Upload Integrity
          </h2>
          <p>
            When utilizing the resume scan features, PDF contents are parsed locally or sent to isolated serverless matching engines. We do not index, share, redistribute, or utilize your resumes or CV transcripts for training third-party advertising algorithms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-600 shrink-0" /> 3. Cookies & Session Management
          </h2>
          <p>
            The website utilizes authentication tokens, cookies, and local database storage (`localStorage`) to manage user states, diagnostic points, achievements, and custom roadmaps. You can clear your sessions at any time by logging out of the application.
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

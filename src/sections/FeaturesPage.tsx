import React from 'react';
import { 
  Cpu, FileText, Compass, Award, Shield, 
  Activity, Users, Zap, CheckCircle2 
} from 'lucide-react';

export default function FeaturesPage({ openDemo }: { openDemo: (tab: string) => void }) {
  const coreFeatures = [
    {
      icon: Cpu,
      title: 'AI-Powered Psychometrics',
      desc: 'Advanced Likert-scale diagnostic matching interest, personality traits, and work style preferences with real-world job roles.',
      color: 'text-primary-600 bg-primary-50 border-primary-100',
      tag: 'Core System'
    },
    {
      icon: FileText,
      title: 'Resume Scanner & ATS Match',
      desc: 'Scan resumes against specific vacancy postings to evaluate compatibility, formatting flags, and keywords to beat the system.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      tag: 'Integrations'
    },
    {
      icon: Compass,
      title: 'Dynamic Learning Pathways',
      desc: 'Construct structured milestones specifying the exact certifications, skills, and target timelines needed for promotion or transition.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      tag: 'Career Growth'
    },
    {
      icon: Award,
      title: 'Interactive Skill Analytics',
      desc: 'Visual representations (Recharts Radar and Line charts) showing how user skills align with industry expectations over time.',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      tag: 'Analytics'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      desc: 'Row-Level Security policies and secure cookies protect your records. Zero sharing or unauthorized redistribution of CVs.',
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      tag: 'Security'
    },
    {
      icon: Zap,
      title: 'Instant Local Fallback',
      desc: 'Even without live Supabase database keys, the app works flawlessly out of the box in Local Demo Mode via localStorage.',
      color: 'text-sky-600 bg-sky-50 border-sky-100',
      tag: 'Developer Experience'
    }
  ];

  return (
    <div className="py-16 space-y-20 animate-in fade-in duration-350">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30">
          The Suite
        </span>
        <h1 className="font-title text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-none">
          Everything you need to <span className="text-primary-600">accelerate</span> your career
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Unlock predictive analytics, AI coaching modules, and adaptive trackers designed to bridge the gap between where you are and where you want to be.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreFeatures.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div 
              key={index} 
              className="border border-slate-200/80 bg-white p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-350 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color} group-hover:scale-110 transition-transform duration-350`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[0.625rem] font-bold tracking-wider uppercase text-slate-400">{feat.tag}</span>
                  <h3 className="font-title text-lg font-bold text-slate-800">{feat.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button 
                  onClick={() => openDemo(feat.title.includes('Resume') ? 'resume' : 'assessment')} 
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Launch Demo Tool &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Showcase Segment */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <span className="text-[0.675rem] font-extrabold text-primary-400 uppercase tracking-widest block">Gamified Success System</span>
            <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight">
              Maintain your streak, earn points, and build certifications
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We believe skill development shouldn\'t feel like a chore. Our platform tracks active streaks, assigns Experience Points (XP) for answering assessment indicators, and rewards progress with milestone badges.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
                <span>Double-weighted aptitude alignment metrics</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
                <span>Responsive, interactive 5-point Likert scale</span>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
                <span>Automated PDF certificate builder</span>
              </li>
            </ul>
          </div>

          <div className="relative border border-slate-800 bg-slate-950/80 p-6 sm:p-10 rounded-3xl shadow-2xl">
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="pt-6 space-y-6">
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center font-bold">
                    🚀
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block">Assessment Milestone</span>
                    <span className="text-[10px] text-slate-400">Excellent (94% Fit Rating)</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Unlocked</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                    🔥
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block">10-Question Streak</span>
                    <span className="text-[10px] text-slate-400">Streak active multiplier x1.5</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">250 XP</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

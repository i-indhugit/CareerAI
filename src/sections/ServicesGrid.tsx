import React from 'react';
import { Compass, FileText, ShieldAlert, GitBranch, Mic, Briefcase, ArrowRight } from 'lucide-react';

interface ServicesGridProps {
  openDemo: (demoTab: string) => void;
}

export default function ServicesGrid({ openDemo }: ServicesGridProps) {
  const servicesList = [
    {
      id: 'assessment',
      icon: Compass,
      title: 'AI Career Assessment',
      desc: 'Evaluate strengths, interests, and career compatibility with industry trends.',
      color: 'text-blue-500 bg-blue-50/50 hover:bg-blue-600',
      actionLabel: 'Try Assessment'
    },
    {
      id: 'resume',
      icon: FileText,
      title: 'Resume Analysis',
      desc: 'Receive AI-powered feedback, score indices, and ATS format optimization suggestions.',
      color: 'text-green-500 bg-green-50/50 hover:bg-green-600',
      actionLabel: 'Scan Resume'
    },
    {
      id: 'assessment',
      icon: ShieldAlert,
      title: 'Skill Gap Analysis',
      desc: 'Identify missing coding, statistical, or management skills required for target roles.',
      color: 'text-yellow-500 bg-yellow-50/50 hover:bg-yellow-600',
      actionLabel: 'Find Gaps'
    },
    {
      id: 'assessment',
      icon: GitBranch,
      title: 'Learning Roadmaps',
      desc: 'Personalized course checklists and certification recommendations tailored to your goals.',
      color: 'text-purple-500 bg-purple-50/50 hover:bg-purple-600',
      actionLabel: 'Generate Path'
    },
    {
      id: 'interview',
      icon: Mic,
      title: 'Interview Preparation',
      desc: 'AI-generated mock interview dialogue transcripts, feedback, and grading.',
      color: 'text-red-500 bg-red-50/50 hover:bg-red-600',
      actionLabel: 'Start Coach'
    },
    {
      id: 'assessment',
      icon: Briefcase,
      title: 'Job Matching',
      desc: 'Connect your parsed skills catalog directly with open remote or local opportunities.',
      color: 'text-cyan-500 bg-cyan-50/50 hover:bg-cyan-600',
      actionLabel: 'Match Jobs'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            AI Services
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Our Specialized Modules
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Leverage our custom trained artificial intelligence models to diagnose and accelerate your career progression.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/60 rounded-3xl p-8 flex flex-col items-start shadow-sm hover:shadow-lg hover:border-primary-500/25 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${srv.color} group-hover:text-white`}>
                  <IconComponent className="w-5.5 h-5.5" />
                </div>
                
                <h3 className="font-title text-lg font-bold text-slate-900 mb-3">{srv.title}</h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {srv.desc}
                </p>

                <button 
                  onClick={() => openDemo(srv.id)}
                  className="flex items-center gap-1.5 font-semibold text-[0.875rem] text-primary-600 hover:text-primary-800 transition-colors focus:outline-none"
                >
                  <span>{srv.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

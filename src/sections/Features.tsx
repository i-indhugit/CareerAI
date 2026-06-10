import React from 'react';
import { 
  BotMessageSquare, LineChart, Sparkles, Activity, 
  Gauge, LayoutDashboard, Terminal, UserPlus 
} from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: BotMessageSquare,
      title: 'Personalized AI Recommendations',
      desc: 'Our advisor tailors suggestions specifically around your hobbies, work style preference, and study focus.'
    },
    {
      icon: LineChart,
      title: 'Real-Time Career Insights',
      desc: 'Get hourly updates on median salary expectations, job openings, and market competitiveness statistics.'
    },
    {
      icon: Sparkles,
      title: 'Industry Trend Analysis',
      desc: 'Stay ahead of technological disruptions and see which skills will dominate the workspace in the coming years.'
    },
    {
      icon: Activity,
      title: 'Skill Development Tracking',
      desc: 'Build a digital skills passport and watch your proficiency score climb as you complete courses and verify projects.'
    },
    {
      icon: Gauge,
      title: 'Resume Scoring System',
      desc: 'Check how readable your resume is to automated ATS filters and get recommendations on bullet descriptions.'
    },
    {
      icon: LayoutDashboard,
      title: 'Career Progress Dashboard',
      desc: 'A unified interface tracking applications, mock interview grades, roadmap items, and target roles.'
    },
    {
      icon: Terminal,
      title: 'Learning Path Suggestions',
      desc: 'AI scans thousands of online courses on Coursera, Udemy, and edX to suggest top-tier tutorials for you.'
    },
    {
      icon: UserPlus,
      title: 'AI Interview Coach',
      desc: 'Practice with interactive voice and text roleplay scenarios customized to specific job descriptions.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            System Core
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Why Choose CareerAI?
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We combine state-of-the-art LLMs with global job market indices to deliver unparalleled career advisory precision.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-500/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-5.25 h-5.25" />
                </div>
                <h4 className="font-title text-base font-bold text-slate-900 mb-2.5">
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

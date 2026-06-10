import React from 'react';
import { Lightbulb, Globe, UserCheck, TrendingUp, BookOpen } from 'lucide-react';

export default function Values() {
  const valueItems = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      desc: 'Constantly refining algorithms to match contemporary industries.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      desc: 'Providing premium career analysis tools to users globally, for free.'
    },
    {
      icon: UserCheck,
      title: 'Personalization',
      desc: "Tailoring guides and mock environments to each individual's journey."
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      desc: 'Fostering step-by-step career progression and skills uplift.'
    },
    {
      icon: BookOpen,
      title: 'Lifelong Learning',
      desc: 'Promoting continuous skill acquisitions to stay relevant.'
    }
  ];

  return (
    <div className="border-t border-slate-200/60 bg-slate-50/30 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-title text-2xl font-bold text-center text-slate-900 mb-12">Our Core Values</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {valueItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/50 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 hover:border-primary-500/20 hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary-50 text-primary-600 mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="font-title text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-[0.775rem] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Shield, Clock, Brain } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      desc: 'Practice mock interviews, upload new resumes, and refresh salary trend metrics at any time of day.'
    },
    {
      icon: Shield,
      title: 'Bias-Free Analysis',
      desc: 'Our algorithms grade candidate responses and resume keywords strictly on objective industry fits, eliminating standard demographic biases.'
    },
    {
      icon: Brain,
      title: 'Big-Data Driven Insights',
      desc: 'Instead of outdated manual guidelines, our AI indexing scans millions of real open roles, active salary bands, and bootcamp paths daily.'
    }
  ];

  return (
    <div className="border-t border-slate-200/60 bg-slate-50/30 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-title text-2xl font-bold text-center text-slate-900 mb-12">The AI Advantage</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/50 rounded-3xl p-8 flex gap-5 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-title text-base font-bold text-slate-900 mb-2">{b.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

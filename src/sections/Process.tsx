import React from 'react';
import { UserPlus2, Edit3, Sparkle, Award, Send } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: 1,
      icon: UserPlus2,
      title: 'Create Your Profile',
      desc: 'Sign up, enter your current background, academic level, and areas of scientific or operational interest.'
    },
    {
      num: 2,
      icon: Edit3,
      title: 'Complete AI Assessment',
      desc: 'Answer a few interactive questions to map out your primary psychological drivers and career motivators.'
    },
    {
      num: 3,
      icon: Sparkle,
      title: 'Receive Recommendations',
      desc: 'Our algorithms generate matching careers, detailed salary ranges, market scores, and skill requirements.'
    },
    {
      num: 4,
      icon: Award,
      title: 'Develop Skills',
      desc: 'Access custom roadmaps targeting your skills gaps, checking off elements as you progress.'
    },
    {
      num: 5,
      icon: Send,
      title: 'Apply with Confidence',
      desc: 'Polish your resume, complete AI mock interviews, and send optimization-tested profiles directly to recruiter portals.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            Our Workflow
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            How It Works
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Follow our streamlined five-step timeline to secure your dream career pathway.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full"></div>

          <div className="space-y-12">
            {steps.map((s, idx) => {
              const IconComponent = s.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Marker */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-primary-600 bg-white text-primary-600 font-title font-black flex items-center justify-center z-10 shadow-sm hover:bg-primary-600 hover:text-white transition-colors duration-300">
                    {s.num}
                  </div>

                  {/* Left spacer / right content box depending on alternate layout */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0 sm:px-10">
                    <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-primary-500/10 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-title text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>

                  {/* Empty space filler for desktop spacing */}
                  <div className="hidden sm:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

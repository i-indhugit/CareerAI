import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      text: "CareerAI helped me transition from a non-technical background into data analytics within six months. The generated roadmaps showed me exactly what core libraries to focus on.",
      name: "Sarah Johnson",
      title: "Data Analyst at Stripe",
      initials: "SJ",
      color: "bg-blue-600"
    },
    {
      text: "The resume analysis feature significantly improved my interview success rate. It flagged formatting errors my human eyes missed, boosting my application response by 40%.",
      name: "Michael Chen",
      title: "Software Engineer at Google",
      initials: "MC",
      color: "bg-green-600"
    },
    {
      text: "I discovered career opportunities I had never considered before. The AI assessments matched my system design interest with Product Management, and it fit perfectly!",
      name: "Priya Sharma",
      title: "APM at Salesforce",
      initials: "PS",
      color: "bg-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            Success Stories
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Testimonials from Achievers
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative border border-slate-200/60 bg-slate-50/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-sm overflow-hidden min-h-[260px] flex flex-col justify-between">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-500/5 pointer-events-none" />

          {/* Slider wrapper */}
          <div className="relative overflow-hidden flex-grow flex items-center">
            {testimonials.map((item, idx) => (
              <div 
                key={idx}
                className={`w-full transition-all duration-500 absolute ${
                  idx === activeSlide 
                    ? 'opacity-100 translate-x-0 relative' 
                    : 'opacity-0 translate-x-12 pointer-events-none'
                }`}
              >
                <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed mb-8">
                  &ldquo;{item.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full ${item.color} text-white font-title text-sm font-bold flex items-center justify-center shadow-md`}>
                    {item.initials}
                  </div>
                  <div className="leading-none">
                    <h4 className="font-title text-sm font-bold text-slate-900 mb-0.5">{item.name}</h4>
                    <span className="text-[0.75rem] text-slate-400 font-medium">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator links */}
          <div className="flex justify-center gap-2 mt-8 pt-4 border-t border-slate-200/50">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                  idx === activeSlide 
                    ? 'w-6 bg-primary-600' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

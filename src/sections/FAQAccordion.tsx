import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqList = [
    {
      q: 'How does CareerAI work?',
      a: 'CareerAI uses advanced AI algorithms and natural language processing models to analyze your background, goals, and interests, comparing them against hundreds of thousands of job descriptions, salary brackets, and market trends to deliver tailored recommendations.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, user privacy and data security are top priorities. We encrypt all uploaded resumes, profiles, and conversation files in transit and at rest. We do not sell or distribute your data to third-party advertisers.'
    },
    {
      q: 'Can CareerAI help with career transitions?',
      a: 'Absolutely. CareerAI is specifically designed to support both students, fresh graduates, and active professionals. If you seek a transition, our Skill Gap Analyzer identifies transferable skills and lists the precise certifications or modules you need to acquire to stand out in a new industry.'
    },
    {
      q: 'Do I need technical knowledge?',
      a: 'No technical background is required. CareerAI is highly intuitive and features simple forms, drag-and-drop systems, and natural conversational chat options suitable for individuals in fields ranging from humanities, design, healthcare, and engineering.'
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            Any Questions?
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {faqList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary-600 bg-white shadow-sm' 
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-350'
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-title text-[1rem] sm:text-lg font-bold text-slate-900 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary-600' : ''
                  }`} />
                </button>

                <div 
                  className={`transition-all duration-300 ease-out overflow-hidden`}
                  style={{ maxHeight: isOpen ? '160px' : '0' }}
                >
                  <p className="px-5 pb-5 text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

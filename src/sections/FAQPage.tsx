import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'assessments' | 'security'>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'general', label: 'General' },
    { id: 'assessments', label: 'Assessments & Algorithms' },
    { id: 'security', label: 'Security & Privacy' }
  ];

  const faqData = [
    {
      category: 'general',
      q: 'How does CareerAI work?',
      a: 'CareerAI uses advanced matching algorithms to analyze your interests, personality, and skills (collected via a 5-point Likert scale). We cross-reference your answers with detailed career blueprints and index parameters to find your ideal career fit rating.'
    },
    {
      category: 'general',
      q: 'Do I need a credit card to use the platform?',
      a: 'No, CareerAI is fully open-source and free to use. There are no hidden tiers, required upgrades, or pricing walls. All tools (assessments, resume matching, learning tracks, interview simulations) are accessible for free.'
    },
    {
      category: 'assessments',
      q: 'How accurate is the Career Assessment?',
      a: 'The assessment evaluates 50 metrics spanning interests, personality traits, and work style preferences. While it serves as a highly robust diagnostic advisor, it should be treated as an initial matching compass alongside your own career exploration.'
    },
    {
      category: 'assessments',
      q: 'Can I retake the assessments?',
      a: 'Yes! You can retake the assessments as many times as you like. Your dashboard maintains a dynamic timeline tracking your previous score outputs so you can observe how your career alignment adapts over time.'
    },
    {
      category: 'security',
      q: 'Is my data secure?',
      a: 'Yes. User security and confidentiality are absolute priorities. All of your profiles, assessments, and saved reports are stored strictly in your own local browser\'s localStorage. Your data never leaves your device and is not shared with any third party.'
    },
    {
      category: 'security',
      q: 'How is user authentication managed?',
      a: 'Authentication is powered entirely through a secure in-browser Demo Authentication system. Credentials and sessions are managed directly using localStorage databases to allow full, instant testing of pages without any external network dependency.'
    }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="py-16 max-w-4xl mx-auto px-6 space-y-12 animate-in fade-in duration-350">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto border border-primary-100">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Support Center & FAQs
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Find answers to frequently asked questions about assessments, algorithm math, data security, and platform integrations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search FAQs by keywords..."
          className="w-full pl-12 pr-4 py-3 border border-slate-200 bg-white rounded-2xl focus:outline-none focus:border-primary-600 shadow-sm text-sm"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id as any);
              setOpenIdx(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition focus:outline-none ${
              activeCategory === cat.id
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordions */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          No FAQs match your search or filter parameters. Try another term!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-350 ${
                  isOpen 
                    ? 'border-primary-600 bg-white shadow-sm' 
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-title text-sm sm:text-base font-bold text-slate-900 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-350 ${
                    isOpen ? 'rotate-180 text-primary-600' : ''
                  }`} />
                </button>

                <div 
                  className="transition-all duration-300 ease-out overflow-hidden"
                  style={{ maxHeight: isOpen ? '200px' : '0' }}
                >
                  <p className="px-5 pb-5 text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

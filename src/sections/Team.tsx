import React from 'react';
import { Mail } from 'lucide-react';

export default function Team() {
  const members = [
    {
      name: 'Dr. Aris Thorne',
      role: 'CEO & Co-founder',
      bio: 'Former AI Research lead at Stanford. Passionate about mapping cognitive competencies to industry datasets.',
      initials: 'AT',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Elena Rostova',
      role: 'CTO & Infrastructure Lead',
      bio: 'Ex-Infrastructure Architect at Netflix. Specializes in real-time predictive models and auto-scaling clusters.',
      initials: 'ER',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Career Coaching',
      bio: 'Industrial Psychologist with 12+ years experience. Former recruiting strategist at McKinsey & Co.',
      initials: 'MV',
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-title text-2xl font-bold text-center text-slate-900 mb-12">Meet Our Leadership Team</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {members.map((m, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Profile Avatar placeholder */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${m.gradient} text-white font-title text-2xl font-black flex items-center justify-center mb-6 shadow-md shadow-slate-200/50`}>
                {m.initials}
              </div>
              
              <h4 className="font-title text-lg font-bold text-slate-900 mb-1">{m.name}</h4>
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-4">{m.role}</span>
              
              <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-xs">
                {m.bio}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3.5 mt-auto">
                <a href="#" className="text-slate-400 hover:text-primary-650 transition-colors" aria-label="LinkedIn">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary-650 transition-colors" aria-label="Twitter">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary-650 transition-colors" aria-label="Email">
                  <Mail className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

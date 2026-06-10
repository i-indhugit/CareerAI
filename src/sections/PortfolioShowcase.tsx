import React from 'react';
import { Award, Briefcase, TrendingUp } from 'lucide-react';

export default function PortfolioShowcase() {
  const placements = [
    {
      name: 'Sarah Johnson',
      role: 'Junior Data Analyst at Stripe',
      prev: 'BA in English Literature',
      duration: '6 Months',
      hike: '+45%',
      imgText: 'SJ',
      gradient: 'from-blue-500 to-indigo-600',
      case: 'Sarah completed the CareerAI assessment which identified her strong logical reasoning and communication. The system mapped out a path covering SQL, Tableau, and basic Python. By utilizing the Resume Analyzer, she passed automated screeners and secured a placement at Stripe.'
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer at Google',
      prev: 'CS Student at State College',
      duration: '4 Months',
      hike: 'Placement',
      imgText: 'MC',
      gradient: 'from-cyan-500 to-blue-600',
      case: 'Michael had a solid coding foundation but struggled with ATS screeners and behavioral interviews. CareerAI adjusted his resume structure to highlight specific scalable API metrics and guided him through 8 mock interview turn rounds on the AI Interview Coach.'
    },
    {
      name: 'Priya Sharma',
      role: 'Associate Product Manager',
      prev: 'Business Operations Associate',
      duration: '5 Months',
      hike: '+35%',
      imgText: 'PS',
      gradient: 'from-purple-500 to-pink-600',
      case: 'Priya wanted a product role but lacked technical product metrics experience. CareerAI identified her product logic gap and recommended A/B testing bootcamps. The system generated mock product case challenges that she reviewed and polished to show to recruiters.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary-100/30 mb-4">
            Candidate Showcase
          </span>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Our Placements & Case Studies
          </h2>
          <div className="w-12 h-1 bg-primary-600 mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            See how CareerAI guides candidates through career pivots, interview stages, and successful hires.
          </p>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 text-center shadow-sm">
            <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <h4 className="font-title text-2xl font-black text-slate-900">42% Avg. Hike</h4>
            <p className="text-[0.725rem] text-slate-400 mt-1 uppercase tracking-wider">Salary increase post-coaching</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 text-center shadow-sm">
            <Award className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <h4 className="font-title text-2xl font-black text-slate-900">92% ATS Pass</h4>
            <p className="text-[0.725rem] text-slate-400 mt-1 uppercase tracking-wider">Passes screener stage successfully</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 text-center shadow-sm">
            <Briefcase className="w-8 h-8 text-primary-600 mx-auto mb-3" />
            <h4 className="font-title text-2xl font-black text-slate-900">10,000+ Placed</h4>
            <p className="text-[0.725rem] text-slate-400 mt-1 uppercase tracking-wider">Candidates placed worldwide</p>
          </div>
        </div>

        {/* Case Studies grid */}
        <div className="space-y-10 max-w-5xl mx-auto">
          {placements.map((p, idx) => (
            <div 
              key={idx}
              className="bg-slate-50/50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-all duration-300"
            >
              {/* Initials circle */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} text-white font-title text-xl font-bold flex items-center justify-center shrink-0 shadow-md`}>
                {p.imgText}
              </div>

              {/* Case study details */}
              <div className="flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-title text-lg font-bold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-primary-600 font-semibold">{p.role}</p>
                  </div>
                  <div className="flex gap-3 text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                    <span>Prev: {p.prev}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Hike: {p.hike}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {p.case}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <span>Pivot Duration: {p.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

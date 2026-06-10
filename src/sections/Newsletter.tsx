import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate database update
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
    }, 800);
  };

  return (
    <section className="bg-slate-900 border-t border-slate-800 py-16 text-center text-white">
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 mb-5">
          <Mail className="w-6 h-6" />
        </div>
        
        <h3 className="font-title text-2xl font-bold tracking-tight text-white mb-2">Subscribe to Career Insights</h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-sm">
          Get weekly updates on hot technology sectors, new job matching boards, and exclusive ATS templates.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-grow px-4 py-3 bg-white/5 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-primary-600 focus:bg-white/10 transition-all placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 transition-all focus:outline-none shrink-0"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 text-green-400 font-semibold text-sm animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Thank you! You have subscribed to our mailing list.</span>
          </div>
        )}
      </div>
    </section>
  );
}

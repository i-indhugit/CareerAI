import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-12 text-center space-y-8 animate-in fade-in duration-300">
      
      {/* 404 Illustration Badge */}
      <div className="relative">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 animate-bounce duration-1000 shadow-lg shadow-primary-500/5">
          <Compass className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <span className="absolute -top-3 -right-3 px-3 py-1 bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md">
          404 Error
        </span>
      </div>

      {/* Description Text */}
      <div className="space-y-3 max-w-md">
        <h1 className="font-title text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
          Page Lost in Direction
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          The career pathway you are looking for doesn\'t exist or has been moved to a new route direction. Let\'s steer back.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-primary-500/20 transition-all focus:outline-none"
        >
          <Home className="w-4 h-4" /> Return Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm px-6 py-3 rounded-xl transition focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Compass, FileText, Mic } from 'lucide-react';
import CareerMatcher from './CareerMatcher';
import ResumeScanner from './ResumeScanner';
import InterviewCoach from './InterviewCoach';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: string;
}

export default function Modal({ isOpen, onClose, initialTab }: ModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'assessment', label: 'Career Matcher', icon: Compass },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'interview', label: 'Interview Coach', icon: Mic },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition focus:outline-none z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex bg-slate-50 border-b border-slate-200 pr-12">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-5 text-sm font-semibold border-b-2 transition focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-primary-600 bg-white'
                    : 'text-slate-500 border-transparent hover:text-primary-600 hover:bg-primary-50/10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-grow bg-white">
          {activeTab === 'assessment' && <CareerMatcher />}
          {activeTab === 'resume' && <ResumeScanner />}
          {activeTab === 'interview' && <InterviewCoach />}
        </div>
      </div>
    </div>
  );
}

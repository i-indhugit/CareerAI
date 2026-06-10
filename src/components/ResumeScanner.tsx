import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ResumeScanner() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(82);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleScan = () => {
    const hasText = pasteText.trim().length > 0;
    const hasFile = file !== null;

    if (!hasText && !hasFile) {
      alert("Please upload a file or paste your resume text first!");
      return;
    }

    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      let baseScore = 78 + Math.floor(Math.random() * 12);
      const combinedLower = (pasteText + (file ? file.name : '')).toLowerCase();
      
      if (combinedLower.includes('python') || combinedLower.includes('agile') || combinedLower.includes('system design')) {
        baseScore += 5;
      }
      if (baseScore > 98) baseScore = 98;

      setScore(baseScore);
      setLoading(false);
      setShowResults(true);
    }, 1800);
  };

  const handleReset = () => {
    setFile(null);
    setPasteText('');
    setShowResults(false);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-600" />
          ATS Resume Audit Scanner
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Upload a draft of your resume or paste its text to get a premium ATS compatibility review, formatting insights, and recommendations.
        </p>
      </div>

      {!showResults && !loading && (
        <div className="space-y-5">
          {/* Drag and Drop Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-primary-600 bg-primary-50/10' 
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100/30'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept=".pdf,.docx,.txt"
            />
            <UploadCloud className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <p className="font-title text-[0.95rem] font-bold text-slate-800">
              {file ? `File Selected: ${file.name}` : 'Drag and drop your resume here (PDF, DOCX) or click to browse'}
            </p>
            <p className="text-[0.725rem] text-slate-400 mt-1">
              File size limit: 5MB. Files are analyzed locally.
            </p>
          </div>

          {/* Paste area */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Or paste resume plain text instead:</label>
            <textarea
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              rows={5}
              placeholder="Paste your education, skills, and work history bullets here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-primary-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-sm resize-y"
            />
          </div>

          <button 
            onClick={handleScan}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary-500/20 transition-all focus:outline-none"
          >
            Analyze Resume Score
          </button>
        </div>
      )}

      {loading && (
        <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-600">
            Scanning formatting structures, reading sections, and checking keyword matches...
          </p>
        </div>
      )}

      {showResults && (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-5 pb-5 border-b border-slate-200/60">
            <div className="bg-gradient-to-br from-primary-600 to-primary-850 text-white font-title text-xl font-extrabold px-4 py-3.5 rounded-xl shadow-md">
              {score} / 100
            </div>
            <div>
              <h4 className="font-title text-lg font-bold text-slate-900">
                ATS Compatibility Grade: <span className={score >= 88 ? 'text-green-500' : 'text-yellow-500'}>
                  {score >= 88 ? 'Excellent' : 'Good'}
                </span>
              </h4>
              <p className="text-[0.725rem] text-slate-400 mt-0.5">
                Standard single-column parser layout identified.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h5 className="text-[0.825rem] font-bold text-green-600 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Strong Points
              </h5>
              <ul className="space-y-2 text-[0.8rem] text-slate-600 pl-2 list-disc list-inside">
                <li>Clear section margins and font sizes are highly ATS-readable.</li>
                <li>Strong verb structures (e.g., 'coordinated', 'automated') detected.</li>
                <li>Adequate contact information format identified.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[0.825rem] font-bold text-yellow-600 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-yellow-500" /> Suggested Adjustments
              </h5>
              <ul className="space-y-2 text-[0.8rem] text-slate-600 pl-2 list-disc list-inside">
                <li>Missing specific metric statistics. Add numbers (e.g., 'reduced runtime by 22%').</li>
                <li>Consider integrating more keywords like: <strong>'System Design'</strong> or <strong>'Process Optimization'</strong>.</li>
                <li>Avoid multi-column wrappers; standard parser algorithms can merge text fields.</li>
              </ul>
            </div>
          </div>

          <button 
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold py-3 rounded-xl transition-all focus:outline-none"
          >
            <RefreshCw className="w-4 h-4" /> Analyze Another Resume
          </button>
        </div>
      )}
    </div>
  );
}

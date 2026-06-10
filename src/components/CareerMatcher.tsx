import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, ArrowLeft, ArrowRight, Share2, Download, 
  RefreshCw, TrendingUp, DollarSign, CheckCircle2, Award, 
  BookOpen, Star, ShieldCheck, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';
import { questions, careerProfiles } from '../data/assessmentQuestions';
import type { CareerProfile, Question } from '../data/assessmentQuestions';
import { apiService } from '../services/api';

export default function CareerMatcher() {
  // Assessment State
  const [step, setStep] = useState<'start' | 'quiz' | 'analyzing' | 'results'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Results & UI State
  const [topMatch, setTopMatch] = useState<CareerProfile | null>(null);
  const [topScore, setTopScore] = useState(0);
  const [allMatches, setAllMatches] = useState<{ profile: CareerProfile; score: number }[]>([]);
  const [domainScores, setDomainScores] = useState<Record<string, number>>({});
  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToDashboard = async () => {
    if (!topMatch) return;
    try {
      const savedToken = localStorage.getItem('careerai_auth_token');
      if (!savedToken) {
        alert('Please login or register to save career matches to your dashboard.');
        return;
      }
      if (isSaved) {
        await apiService.unsaveCareer(topMatch.id);
        setIsSaved(false);
      } else {
        await apiService.saveCareer(topMatch.id, topMatch.title, topScore, 'Integrated career path goal. Master standard certifications.');
        setIsSaved(true);
      }
    } catch (e) {
      console.error('Error toggling saved career:', e);
    }
  };

  // Load saved results from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('careerai_assessment_results');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.topMatch && parsed.allMatches && parsed.domainScores) {
          setTopMatch(parsed.topMatch);
          setTopScore(parsed.topScore || 0);
          setAllMatches(parsed.allMatches);
          setDomainScores(parsed.domainScores);
          setAnswers(parsed.answers || {});
          setPoints(parsed.points || 0);
          setStep('results');
        }
      } catch (e) {
        console.error('Error loading cached results:', e);
      }
    }
  }, []);

  // Likert Option Mapping
  const likertOptions = [
    { value: -2, label: 'Strongly Disagree', size: 'w-12 h-12', color: 'border-rose-500 text-rose-500 hover:bg-rose-50 hover:text-rose-600 peer-checked:bg-rose-500 peer-checked:border-rose-500' },
    { value: -1, label: 'Disagree', size: 'w-9.5 h-9.5', color: 'border-orange-400 text-orange-500 hover:bg-orange-50 hover:text-orange-500 peer-checked:bg-orange-400 peer-checked:border-orange-400' },
    { value: 0, label: 'Neutral', size: 'w-8.5 h-8.5', color: 'border-slate-300 text-slate-400 hover:bg-slate-100 hover:text-slate-600 peer-checked:bg-slate-400 peer-checked:border-slate-400' },
    { value: 1, label: 'Agree', size: 'w-9.5 h-9.5', color: 'border-emerald-400 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-500 peer-checked:bg-emerald-400 peer-checked:border-emerald-400' },
    { value: 2, label: 'Strongly Agree', size: 'w-12 h-12', color: 'border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600 peer-checked:bg-primary-500 peer-checked:border-primary-500' }
  ];

  // Start Assessment
  const handleStart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setStreak(0);
    setMaxStreak(0);
    setPoints(0);
    setStartTime(Date.now());
    setStep('quiz');
  };

  // Record Answer
  const handleAnswer = (value: number) => {
    const q = questions[currentIdx];
    const prevAnswer = answers[q.id];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    // Gamification: Point computation & Streaks
    // If the answer is positive for "agree/strongly agree", it adds to streak if they align with positive initiative.
    // To make it simple and fun, any selection other than neutral triggers a "streak" multiplier.
    if (value !== 0) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      
      // Speed multiplier
      const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 5;
      const speedBonus = timeSpent < 3 ? 50 : timeSpent < 6 ? 20 : 0;
      
      // Calculate points
      const basePoints = Math.abs(value) * 100;
      const streakMultiplier = Math.min(3, 1 + (newStreak * 0.1));
      setPoints(prev => Math.round(prev + (basePoints + speedBonus) * streakMultiplier));
    } else {
      setStreak(0);
      setPoints(prev => prev + 50); // small neutral points
    }

    setStartTime(Date.now()); // reset question start timer

    // Auto proceed with brief delay for fluid experience
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        triggerAnalysis(newAnswers);
      }
    }, 250);
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setStreak(0); // reset current active streak on backtrack
    }
  };

  // Trigger analysis simulation
  const triggerAnalysis = (finalAnswers: Record<number, number>) => {
    setStep('analyzing');
    
    // Simulate AI computing
    setTimeout(() => {
      calculateMatchingResults(finalAnswers);
    }, 2000);
  };

  // Score Calculation logic
  const calculateMatchingResults = (finalAnswers: Record<number, number>) => {
    // 1. Calculate scores for the 6 domains
    const domains = ['technology', 'business', 'creative', 'education', 'healthcare', 'socialImpact'];
    const rawDomainScores: Record<string, number> = {};
    const maxDomainPossible: Record<string, number> = {};
    const minDomainPossible: Record<string, number> = {};

    domains.forEach(d => {
      rawDomainScores[d] = 0;
      maxDomainPossible[d] = 0;
      minDomainPossible[d] = 0;
    });

    questions.forEach(q => {
      const response = finalAnswers[q.id] || 0; // -2 to +2
      
      Object.entries(q.weights).forEach(([domain, weight]) => {
        if (weight) {
          rawDomainScores[domain] += weight * response;
          maxDomainPossible[domain] += Math.abs(weight) * 2;
          minDomainPossible[domain] += Math.abs(weight) * -2;
        }
      });
    });

    const normalizedDomainScores: Record<string, number> = {};
    domains.forEach(d => {
      const max = maxDomainPossible[d];
      const min = minDomainPossible[d];
      const raw = rawDomainScores[d];
      if (max === min) {
        normalizedDomainScores[d] = 50;
      } else {
        normalizedDomainScores[d] = Math.round(((raw - min) / (max - min)) * 100);
      }
    });

    // Map keys of normalized domain scores to Profile Category names
    const categoryMapping: Record<string, string> = {
      technology: 'Technology',
      business: 'Business',
      creative: 'Creative',
      education: 'Education',
      healthcare: 'Healthcare',
      socialImpact: 'Social Impact'
    };

    // 2. Calculate compatibility score for each of the 28 careers
    const careerMatches = careerProfiles.map(profile => {
      // Find parent domain key
      const domainKey = Object.keys(categoryMapping).find(
        key => categoryMapping[key] === profile.category
      ) || 'technology';
      
      const parentDomainScore = normalizedDomainScores[domainKey];

      // Calculate key questions score
      let rawKeyScore = 0;
      let maxKeyScore = 0;
      let minKeyScore = 0;

      Object.entries(profile.keyQuestionWeights).forEach(([qIdStr, weight]) => {
        const qId = parseInt(qIdStr);
        const response = finalAnswers[qId] || 0;
        rawKeyScore += weight * response;
        maxKeyScore += Math.abs(weight) * 2;
        minKeyScore += Math.abs(weight) * -2;
      });

      let keyScorePercent = 50;
      if (maxKeyScore !== minKeyScore) {
        keyScorePercent = Math.round(((rawKeyScore - minKeyScore) / (maxKeyScore - minKeyScore)) * 100);
      }

      // Final weighted career match score: 30% Domain score + 70% Specific key questions score
      const finalScore = Math.min(99, Math.max(35, Math.round((parentDomainScore * 0.3) + (keyScorePercent * 0.7))));

      return {
        profile,
        score: finalScore
      };
    });

    // Sort descending
    careerMatches.sort((a, b) => b.score - a.score);

    const topMatchResult = careerMatches[0].profile;
    const topScoreVal = careerMatches[0].score;

    setTopMatch(topMatchResult);
    setTopScore(topScoreVal);
    setAllMatches(careerMatches);
    setDomainScores(normalizedDomainScores);
    setStep('results');

    // Save to local storage
    const resultPayload = {
      topMatch: topMatchResult,
      topScore: topScoreVal,
      allMatches: careerMatches.map(m => ({ id: m.profile.id, score: m.score })),
      domainScores: normalizedDomainScores,
      answers: finalAnswers,
      points
    };
    localStorage.setItem('careerai_assessment_results', JSON.stringify({
      topMatch: topMatchResult,
      topScore: topScoreVal,
      allMatches: careerMatches,
      domainScores: normalizedDomainScores,
      answers: finalAnswers,
      points
    }));

    // Save to database if authenticated
    const savedToken = localStorage.getItem('careerai_auth_token');
    if (savedToken) {
      apiService.saveAssessment(resultPayload).catch(err => {
        console.error('Failed to save assessment to database:', err);
      });
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  };

  // Reset/Retake
  const handleReset = () => {
    localStorage.removeItem('careerai_assessment_results');
    setAnswers({});
    setTopMatch(null);
    setAllMatches([]);
    setDomainScores({});
    setStep('start');
  };

  // Clipboard Share
  const handleShare = () => {
    if (topMatch) {
      const shareText = `I just unlocked my AI Career Report on CareerAI! My top match is ${topMatch.title} (${topScore}% fit). Discover your career path: ${window.location.origin}`;
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  };

  // PDF / Print Layout Generation
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    if (!topMatch) return;

    // Create a new window containing a print-friendly document
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocker is enabled. Please allow pop-ups to download the PDF report.');
      setIsDownloading(false);
      return;
    }

    const currentYear = new Date().getFullYear();

    // Prepare print HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CareerAI Professional Discovery Report - ${topMatch.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            line-height: 1.5;
            margin: 0;
            padding: 40px;
            background: #fff;
          }
          h1, h2, h3, h4 {
            font-family: 'Outfit', sans-serif;
            color: #0f172a;
            margin-top: 0;
          }
          .header-banner {
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .brand-logo {
            font-size: 24px;
            font-weight: 800;
            color: #2563eb;
          }
          .document-title {
            font-size: 14px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .hero-card {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 1px solid #bfdbfe;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .fit-circle {
            width: 90px;
            height: 90px;
            background: #2563eb;
            color: white;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
          }
          .fit-value {
            font-size: 28px;
            line-height: 1;
          }
          .fit-label {
            font-size: 10px;
            text-transform: uppercase;
            font-weight: 600;
            opacity: 0.9;
          }
          .career-title {
            font-size: 26px;
            font-weight: 800;
            color: #1e3a8a;
            margin-bottom: 8px;
          }
          .career-cat {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: #2563eb;
            background: #dbeafe;
            padding: 4px 10px;
            border-radius: 9999px;
            display: inline-block;
            margin-bottom: 12px;
          }
          .stats-grid {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-box {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            background: #f8fafc;
          }
          .stat-lbl {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            color: #64748b;
          }
          .stat-val {
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
            margin-top: 4px;
          }
          .section-title {
            font-size: 18px;
            border-left: 4px solid #2563eb;
            padding-left: 10px;
            margin-bottom: 16px;
            margin-top: 24px;
          }
          .list-item {
            display: flex;
            margin-bottom: 10px;
            align-items: flex-start;
          }
          .list-bullet {
            color: #2563eb;
            font-weight: 700;
            margin-right: 10px;
            font-size: 16px;
            line-height: 1;
            margin-top: 3px;
          }
          .domain-bar {
            margin-bottom: 12px;
          }
          .domain-header {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          .bar-outer {
            height: 8px;
            background: #e2e8f0;
            border-radius: 9999px;
            overflow: hidden;
          }
          .bar-inner {
            height: 100%;
            background: #2563eb;
            border-radius: 9999px;
          }
          .cert-tag {
            display: inline-block;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 500;
            margin-right: 8px;
            margin-bottom: 8px;
            background: #f1f5f9;
          }
          .certificate-border {
            border: 10px double #2563eb;
            padding: 30px;
            margin-top: 50px;
            border-radius: 8px;
            text-align: center;
            background: #faf5ff;
            page-break-inside: avoid;
          }
          .cert-title {
            font-family: 'Outfit', sans-serif;
            font-size: 28px;
            font-weight: 800;
            color: #1e3a8a;
            margin-bottom: 15px;
          }
          .footer-credit {
            margin-top: 50px;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 11px;
            color: #94a3b8;
            text-align: center;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header-banner">
          <div class="brand-logo">CareerAI</div>
          <div class="document-title">Official Career Diagnostics Report</div>
        </div>

        <div class="hero-card">
          <div>
            <div class="career-cat">${topMatch.category}</div>
            <div class="career-title">${topMatch.title}</div>
            <div style="font-size: 14px; color: #475569; max-width: 480px;">
              ${topMatch.description}
            </div>
          </div>
          <div class="fit-circle">
            <div class="fit-value">${topScore}%</div>
            <div class="fit-label">Match</div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-lbl">Average Salary Range</div>
            <div class="stat-val">${topMatch.salary}</div>
          </div>
          <div class="stat-box">
            <div class="stat-lbl">Projected Job Growth</div>
            <div class="stat-val">${topMatch.growth}</div>
          </div>
        </div>

        <h3 class="section-title">Cognitive Strengths Analysis</h3>
        <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          ${topMatch.strengths.map(str => `
            <div style="padding: 10px; border-left: 3px solid #10b981; background: #ecfdf5; font-size: 13px; font-weight: 500;">
              ${str}
            </div>
          `).join('')}
        </div>

        <h3 class="section-title">Field Aptitude Breakdowns</h3>
        <div style="margin-bottom: 30px;">
          ${Object.entries(domainScores).map(([domain, score]) => {
            const label = domain === 'technology' ? 'Technology' :
                          domain === 'business' ? 'Business' :
                          domain === 'creative' ? 'Creative' :
                          domain === 'education' ? 'Education' :
                          domain === 'healthcare' ? 'Healthcare' : 'Social Impact';
            return `
              <div class="domain-bar">
                <div class="domain-header">
                  <span>${label} Aptitude</span>
                  <span>${score}%</span>
                </div>
                <div class="bar-outer">
                  <div class="bar-inner" style="width: ${score}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="page-break-before: always;"></div>

        <div class="header-banner">
          <div class="brand-logo">CareerAI</div>
          <div class="document-title">Skill & Certification Roadmap</div>
        </div>

        <h3 class="section-title">Suggested Learning Roadmap</h3>
        <div style="margin-bottom: 25px;">
          ${topMatch.learningPath.map((step, idx) => `
            <div class="list-item">
              <div class="list-bullet">${idx + 1}.</div>
              <div style="font-size: 13px;">${step}</div>
            </div>
          `).join('')}
        </div>

        <h3 class="section-title">Required Skillsets</h3>
        <div style="margin-bottom: 25px;">
          ${topMatch.skills.map(skill => `
            <span class="cert-tag">${skill}</span>
          `).join('')}
        </div>

        <h3 class="section-title">Recommended Certifications</h3>
        <div style="margin-bottom: 35px;">
          ${topMatch.certifications.map(cert => `
            <span class="cert-tag" style="background:#eff6ff; border-color: #bfdbfe; color:#1e40af;">${cert}</span>
          `).join('')}
        </div>

        <div class="certificate-border">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #475569; margin-bottom: 10px;">Certificate of Fit Profile</div>
          <div class="cert-title">AI Career Alignment</div>
          <p style="font-size: 14px; max-width: 500px; margin: 0 auto 20px;">
            This documents that the candidate shows high numerical and behavioral compatibility for the target role of
          </p>
          <div style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: #2563eb; border-bottom: 1px solid #bfdbfe; display: inline-block; padding-bottom: 5px; margin-bottom: 20px;">
            ${topMatch.title}
          </div>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">
            Issued by CareerAI Diagnostic Systems &bull; Validation Metric: ${topScore}% Accuracy
          </p>
        </div>

        <div class="footer-credit">
          Designed & Developed by Indhu Priya Yanamala &bull; &copy; ${currentYear} CareerAI. All rights reserved.
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setIsDownloading(false);
  };

  // Radar Chart computation values
  const radarRadius = 80;
  const radarCenter = 120;
  const categories = [
    { key: 'technology', label: 'Technology' },
    { key: 'business', label: 'Business' },
    { key: 'creative', label: 'Creative' },
    { key: 'education', label: 'Education' },
    { key: 'healthcare', label: 'Healthcare' },
    { key: 'socialImpact', label: 'Social Impact' }
  ];

  // Calculate hexagon grid coordinates
  const getGridPoints = (fraction: number) => {
    return categories.map((cat, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      const r = radarRadius * fraction;
      const x = radarCenter + r * Math.cos(angle);
      const y = radarCenter + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // User score coordinates for polygon
  const getScorePoints = () => {
    return categories.map((cat, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      const val = domainScores[cat.key] || 0;
      const r = radarRadius * (val / 100);
      const x = radarCenter + r * Math.cos(angle);
      const y = radarCenter + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Label coordinate offset calculations
  const getLabelCoords = (i: number) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
    const offset = 18;
    const r = radarRadius + offset;
    const x = radarCenter + r * Math.cos(angle);
    const y = radarCenter + r * Math.sin(angle);
    
    // adjust text alignment anchor points depending on coordinate quadrant
    let anchor = 'middle';
    if (Math.cos(angle) > 0.1) anchor = 'start';
    if (Math.cos(angle) < -0.1) anchor = 'end';
    
    return { x, y, anchor };
  };

  // Perform Level Check
  const getPerformanceLevel = (pct: number) => {
    if (pct >= 90) return { title: 'Excellent Fit', color: 'text-primary-600 bg-primary-50 border-primary-200' };
    if (pct >= 75) return { title: 'Very Good Fit', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (pct >= 60) return { title: 'Good Fit', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { title: 'Moderate Fit', color: 'text-slate-500 bg-slate-50 border-slate-200' };
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        
        {/* START SCREEN VIEW */}
        {step === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center text-center p-4 border border-slate-200/50 bg-slate-50/50 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/10 mb-4">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-title text-2xl font-black text-slate-900 tracking-tight">
                AI Career Discovery Assessment
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-lg leading-relaxed">
                Take our advanced 50-question diagnostic matrix to scan your Interests, Personality, Technical Skills, Creative Capacities, and Work Preferences. Let the AI calculate matches across 28 high-demand modern careers.
              </p>
            </div>

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-slate-100 p-5 rounded-xl bg-white shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-slate-400">Total Questions</span>
                  <span className="text-lg font-bold text-slate-800">50 Questions</span>
                </div>
              </div>
              
              <div className="border border-slate-100 p-5 rounded-xl bg-white shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-slate-400">Careers Indexed</span>
                  <span className="text-lg font-bold text-slate-800">28 Career Profiles</span>
                </div>
              </div>

              <div className="border border-slate-100 p-5 rounded-xl bg-white shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-slate-400">Test Standard</span>
                  <span className="text-lg font-bold text-slate-800">Psychometric Ratio</span>
                </div>
              </div>
            </div>

            {/* Categories Overview list */}
            <div className="border border-slate-200/60 rounded-xl bg-white p-5 space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-widest">Assessment Categories Included:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                {[
                  { label: 'Interests', count: '10 Qs', bg: 'bg-blue-50 text-blue-700' },
                  { label: 'Personality', count: '10 Qs', bg: 'bg-rose-50 text-rose-700' },
                  { label: 'Technical Skills', count: '10 Qs', bg: 'bg-emerald-50 text-emerald-700' },
                  { label: 'Creative Skills', count: '10 Qs', bg: 'bg-amber-50 text-amber-700' },
                  { label: 'Work Preferences', count: '10 Qs', bg: 'bg-purple-50 text-purple-700' }
                ].map((cat, i) => (
                  <div key={i} className={`p-3 rounded-xl border border-transparent ${cat.bg} text-center`}>
                    <span className="block text-sm font-bold">{cat.label}</span>
                    <span className="text-[0.725rem] opacity-75 font-semibold mt-0.5 block">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleStart}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/25 transition-all text-base focus:outline-none flex items-center justify-center gap-2 group"
            >
              Start Discovery Assessment 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* ACTIVE QUESTION VIEW */}
        {step === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header info */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-primary-600 tracking-wider">
                Category: {questions[currentIdx].category.toUpperCase()}
              </span>
              <span className="text-xs font-extrabold text-slate-400">
                QUESTION {currentIdx + 1} OF {questions.length}
              </span>
            </div>

            {/* Custom Progress Bar */}
            <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Gamified Live Counter HUD */}
            <div className="flex justify-between items-center bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500">Live Points:</span>
                <span className="font-extrabold text-primary-600 text-sm">{points} XP</span>
              </div>
              {streak > 1 && (
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-amber-100 border border-amber-200 text-amber-800 font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1.5 animate-pulse"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-600" />
                  <span>{streak}x STREAK MULTIPLIER!</span>
                </motion.div>
              )}
            </div>

            {/* Question Text Deck */}
            <div className="min-h-[120px] flex items-center justify-center px-4 py-6 text-center">
              <h4 className="font-title text-xl md:text-2xl font-extrabold text-slate-800 leading-relaxed max-w-2xl">
                {questions[currentIdx].text}
              </h4>
            </div>

            {/* 16personalities format Likert Input Deck */}
            <div className="flex flex-col items-center space-y-8 pt-4">
              <div className="w-full flex items-center justify-between max-w-md px-2">
                <span className="text-xs font-bold text-rose-500 uppercase">Disagree</span>
                <span className="text-xs font-bold text-emerald-500 uppercase">Agree</span>
              </div>

              <div className="flex items-center justify-between w-full max-w-md px-2 gap-1.5">
                {likertOptions.map((opt) => {
                  const isChecked = answers[questions[currentIdx].id] === opt.value;
                  return (
                    <label 
                      key={opt.value} 
                      className="flex flex-col items-center cursor-pointer relative group"
                    >
                      <input 
                        type="radio" 
                        name={`q-${questions[currentIdx].id}`}
                        checked={isChecked}
                        onChange={() => handleAnswer(opt.value)}
                        className="sr-only peer"
                      />
                      <div className={`
                        ${opt.size} rounded-full border-2 flex items-center justify-center 
                        transition-all duration-200 ${opt.color} 
                        shadow-sm hover:scale-110 active:scale-95 focus-within:ring-2 focus-within:ring-offset-2
                      `}>
                        {isChecked && (
                          <motion.div 
                            layoutId="checkedCircle"
                            className="w-1/2 h-1/2 bg-white rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          />
                        )}
                      </div>
                      
                      {/* Tooltip on hover */}
                      <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[0.625rem] text-slate-500 whitespace-nowrap font-medium pointer-events-none">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step navigation triggers */}
            <div className="flex justify-between items-center pt-12 border-t border-slate-100">
              <button
                onClick={handlePrevious}
                disabled={currentIdx === 0}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-sm font-bold focus:outline-none"
              >
                <ArrowLeft className="w-4 h-4" /> BACK
              </button>

              <button
                onClick={() => {
                  if (currentIdx < questions.length - 1) {
                    setCurrentIdx(prev => prev + 1);
                  } else {
                    triggerAnalysis(answers);
                  }
                }}
                disabled={answers[questions[currentIdx].id] === undefined}
                className="flex items-center gap-1.5 text-primary-600 hover:text-primary-800 disabled:opacity-30 disabled:pointer-events-none text-sm font-bold focus:outline-none"
              >
                SKIP <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PROCESSING SCREEN */}
        {step === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 flex flex-col items-center justify-center text-center gap-6"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-t-primary-600 border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <Compass className="w-10 h-10 text-primary-600 animate-pulse" />
            </div>

            <div className="space-y-2.5">
              <h4 className="font-title text-xl font-bold text-slate-800">
                Analyzing Path Alignments...
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Evaluating Likert choices, correlating domain affinities, and comparing strengths indices across 28 global corporate career tracks.
              </p>
            </div>
          </motion.div>
        )}

        {/* COMPREHENSIVE RESULTS VIEW */}
        {step === 'results' && topMatch && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Top Match Header Panel */}
            <div className="border border-slate-200/75 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 opacity-15 pointer-events-none">
                <svg className="h-full w-auto aspect-square text-white" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                </svg>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary-600 text-white font-bold text-[0.675rem] tracking-widest uppercase px-3 py-1 rounded-full border border-primary-500">
                      {topMatch.category} Top Match
                    </span>
                    <button
                      onClick={handleSaveToDashboard}
                      className="text-[0.65rem] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-2 py-0.5 rounded-lg border border-slate-700 transition focus:outline-none flex items-center gap-1 shadow-sm"
                    >
                      <Star className={`w-3 h-3 ${isSaved ? 'fill-amber-400 stroke-amber-500' : ''}`} />
                      {isSaved ? 'Saved' : 'Save Match'}
                    </button>
                  </div>
                  
                  {/* Performance fit level pill */}
                  <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getPerformanceLevel(topScore).color}`}>
                    {getPerformanceLevel(topScore).title}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-title text-2xl md:text-3.5xl font-black tracking-tight mt-1">
                      {topMatch.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-xl mt-2.5">
                      {topMatch.description}
                    </p>
                  </div>

                  {/* Matching percentage ring */}
                  <div className="relative w-22 h-22 flex items-center justify-center shrink-0 bg-slate-800/40 rounded-full border border-slate-700/60 p-2 self-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" stroke="#334155" strokeWidth="6" fill="transparent"/>
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="34" 
                        stroke="#2563EB" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 34} 
                        strokeDashoffset={2 * Math.PI * 34 - (2 * Math.PI * 34 * (topScore / 100))}
                      />
                    </svg>
                    <span className="absolute font-title text-lg font-black text-primary-400">{topScore}%</span>
                  </div>
                </div>

                {/* Micro salary insights strip */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-sm mt-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="block text-[0.675rem] text-slate-400 uppercase font-semibold">Median Salary Bracket</span>
                      <span className="font-bold text-slate-100">{topMatch.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-400 shrink-0" />
                    <div>
                      <span className="block text-[0.675rem] text-slate-400 uppercase font-semibold">Job Market Growth</span>
                      <span className="font-bold text-slate-100">{topMatch.growth}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart and Top matches layout grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Custom SVG Radar Chart */}
              <div className="border border-slate-200/80 rounded-2xl bg-white p-5 shadow-sm flex flex-col items-center">
                <h4 className="text-sm font-bold text-slate-800 mb-4 self-start flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary-600 fill-primary-100" />
                  Your Field Aptitude Wheel
                </h4>

                <div className="w-full max-w-[240px] aspect-square relative">
                  <svg className="w-full h-full" viewBox="0 0 240 240">
                    {/* Background Grid Hexagons */}
                    {[0.25, 0.5, 0.75, 1.0].map((frac, i) => (
                      <polygon
                        key={i}
                        points={getGridPoints(frac)}
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        strokeDasharray={i === 3 ? 'none' : '2 2'}
                      />
                    ))}

                    {/* Axis Lines */}
                    {categories.map((cat, i) => {
                      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
                      const x2 = radarCenter + radarRadius * Math.cos(angle);
                      const y2 = radarCenter + radarRadius * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1={radarCenter}
                          y1={radarCenter}
                          x2={x2}
                          y2={y2}
                          stroke="#E2E8F0"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Actual user score values polygon */}
                    <polygon
                      points={getScorePoints()}
                      fill="rgba(37, 99, 235, 0.16)"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />

                    {/* Vertices dot points */}
                    {categories.map((cat, i) => {
                      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
                      const val = domainScores[cat.key] || 0;
                      const r = radarRadius * (val / 100);
                      const x = radarCenter + r * Math.cos(angle);
                      const y = radarCenter + r * Math.sin(angle);
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#2563EB"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      );
                    })}

                    {/* Axis Text Labels */}
                    {categories.map((cat, i) => {
                      const { x, y, anchor } = getLabelCoords(i);
                      const val = domainScores[cat.key] || 0;
                      return (
                        <text
                          key={i}
                          x={x}
                          y={y + 3}
                          fill="#64748B"
                          fontSize="9.5"
                          fontWeight="700"
                          textAnchor={anchor as any}
                        >
                          {cat.label} ({val}%)
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Top 5 Matches Comparison Drawer */}
              <div className="border border-slate-200/80 rounded-2xl bg-white p-5 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary-600" />
                  Top 5 Recommended Careers
                </h4>
                
                <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-1 scrollbar-thin">
                  {allMatches.slice(0, 5).map((match, idx) => {
                    const isExpanded = expandedCareerId === match.profile.id;
                    return (
                      <div 
                        key={match.profile.id}
                        className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-all"
                      >
                        <button
                          onClick={() => setExpandedCareerId(isExpanded ? null : match.profile.id)}
                          className="w-full p-3.5 flex items-center justify-between text-left focus:outline-none"
                        >
                          <div>
                            <span className="text-xs font-bold text-primary-600">{idx + 1}. {match.profile.category}</span>
                            <span className="block font-bold text-slate-800 text-sm mt-0.5">{match.profile.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-title text-sm font-black text-slate-700 bg-white border border-slate-100 px-2 py-0.5 rounded-lg shadow-sm">
                              {match.score}% fit
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden border-t border-slate-100 bg-white text-xs text-slate-600 p-3.5 space-y-2.5"
                            >
                              <p className="leading-relaxed">{match.profile.description}</p>
                              
                              <div className="grid grid-cols-2 gap-2 text-[0.675rem]">
                                <div>
                                  <span className="font-bold text-slate-500 uppercase block">Median Salary:</span>
                                  <span className="font-semibold text-slate-800">{match.profile.salary}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-500 uppercase block">Growth Outlook:</span>
                                  <span className="font-semibold text-slate-800">{match.profile.growth}</span>
                                </div>
                              </div>

                              <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
                                <span className="font-bold text-slate-700 block uppercase text-[0.625rem]">Core Skills Needed:</span>
                                <div className="flex flex-wrap gap-1">
                                  {match.profile.skills.map((skill, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Strengths, Skills & Path Insights panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Personality & Strengths */}
              <div className="border border-slate-200/80 rounded-2xl bg-white p-5 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Star className="w-4 h-4 text-emerald-500" />
                  Strengths & Personality Profile
                </h4>
                
                <div className="space-y-3.5">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <span className="text-[0.675rem] font-bold text-emerald-700 uppercase tracking-wider block">Personality Style:</span>
                    <span className="text-xs font-semibold text-emerald-900 block mt-1">{topMatch.personalityType}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[0.675rem] font-extrabold text-slate-400 uppercase tracking-wider block">Identified Core Strengths:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {topMatch.strengths.map((str, i) => (
                        <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-xs font-bold text-slate-700">{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Skills & Certifications */}
              <div className="border border-slate-200/80 rounded-2xl bg-white p-5 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary-600" />
                  Target Skills & Credentials
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-2">
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider block text-[0.675rem]">Key Skills to Learn:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {topMatch.skills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="font-extrabold text-slate-400 uppercase tracking-wider block text-[0.675rem]">Suggested Certifications:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {topMatch.certifications.map((cert, i) => (
                        <span key={i} className="px-2.5 py-1 bg-primary-50 border border-primary-100 rounded-lg font-bold text-primary-700">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Suggested Learning Path Timelines */}
            <div className="border border-slate-200/80 rounded-2xl bg-white p-5 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary-600" />
                Actionable Career Accelerator Roadmap
              </h4>

              <div className="relative pl-6 space-y-5 border-l-2 border-slate-100 ml-3">
                {topMatch.learningPath.map((path, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle bullet node */}
                    <div className="absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full bg-primary-600 border-2 border-white flex items-center justify-center text-[0.55rem] font-bold text-white shadow-md">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Phase {idx + 1}</span>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{path}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-150">
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-primary-500/10 focus:outline-none"
              >
                <Download className="w-4.5 h-4.5" /> 
                {isDownloading ? 'Structuring PDF...' : 'Download Career Report PDF'}
              </button>

              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold px-6 py-3 rounded-xl transition-all focus:outline-none"
              >
                {copied ? <Check className="w-4.5 h-4.5 text-green-500" /> : <Share2 className="w-4.5 h-4.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Results'}</span>
              </button>

              <button 
                onClick={handleReset}
                className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold px-6 py-3 rounded-xl transition-all focus:outline-none"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                <span>Retake</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

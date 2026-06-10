import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, Calendar, Compass, Star, CheckCircle, 
  Award, TrendingUp, Download, RefreshCw, Edit, Save, 
  Trash2, BookOpen, AlertCircle, Search, Bell, Settings,
  Volume2, Sliders, CheckSquare, BellOff, ArrowRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { careerProfiles } from '../data/assessmentQuestions';

export default function DashboardSection({ openDemo }: { openDemo: (tab: string) => void }) {
  const { user, welcomeBackMessage, updateProfile } = useAuth();
  
  // Tab control state
  const [activeTab, setActiveTab] = useState<'overview' | 'search' | 'notifications' | 'settings'>('overview');

  // History & Plan States
  const [assessments, setAssessments] = useState<any[]>([]);
  const [savedCareers, setSavedCareers] = useState<any[]>([]);
  const [learningPlan, setLearningPlan] = useState<any>(null);
  
  // Profile edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhoto, setEditPhoto] = useState(user?.photo || '');
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // Notes state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Search tab states
  const [careerSearch, setCareerSearch] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');

  // Notifications states
  const [notifications, setNotifications] = useState<any[]>([]);

  // Settings states
  const [newsletterSub, setNewsletterSub] = useState(true);
  const [milestoneSounds, setMilestoneSounds] = useState(true);
  const [recommendationsActive, setRecommendationsActive] = useState(true);

  // Initialize notifications from localStorage or default
  useEffect(() => {
    const storedNotifs = localStorage.getItem('careerai_notifications');
    if (storedNotifs) {
      setNotifications(JSON.parse(storedNotifs));
    } else {
      const defaultNotifs = [
        { id: 'n1', text: 'Welcome to CareerAI! Take the assessment to unlock tailored learning roadmaps.', date: new Date().toLocaleDateString(), read: false, type: 'info' },
        { id: 'n2', text: 'Achievement Unlocked: Started your discovery journey. Answer questions to raise your streak!', date: new Date(Date.now() - 1000 * 60 * 60 * 4).toLocaleDateString(), read: false, type: 'success' },
        { id: 'n3', text: 'SaaS Recharts engine initialized. Dynamic charts are now active in your dashboard.', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toLocaleDateString(), read: true, type: 'success' },
        { id: 'n4', text: 'Welcome-back system active. Our AI algorithm greets you based on your past diagnostic fits.', date: new Date(Date.now() - 1000 * 60 * 60 * 48).toLocaleDateString(), read: true, type: 'info' }
      ];
      localStorage.setItem('careerai_notifications', JSON.stringify(defaultNotifs));
      setNotifications(defaultNotifs);
    }
  }, []);

  const saveNotifications = (newNotifs: any[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('careerai_notifications', JSON.stringify(newNotifs));
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const hist = await apiService.getAssessments();
      setAssessments(hist);

      const saved = await apiService.getSavedCareers();
      setSavedCareers(saved);

      try {
        const plan = await apiService.getLearningPlan();
        setLearningPlan(plan);
      } catch {
        setLearningPlan(null);
      }
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  // Handle Profile Update
  const handleSaveProfile = async () => {
    try {
      await updateProfile({ name: editName, photo: editPhoto });
      setProfileMessage('Profile updated successfully!');
      setIsEditingProfile(false);
      
      // Add notification
      const newNotif = {
        id: `n-${Date.now()}`,
        text: 'User profile updated successfully.',
        date: new Date().toLocaleDateString(),
        read: false,
        type: 'info'
      };
      saveNotifications([newNotif, ...notifications]);

      setTimeout(() => setProfileMessage(null), 3000);
    } catch (e: any) {
      setProfileMessage(e.message || 'Profile update failed.');
    }
  };

  // Handle Note Save for Saved Career
  const handleSaveNotes = async (careerId: string) => {
    try {
      const career = savedCareers.find(c => c.careerId === careerId);
      if (career) {
        await apiService.saveCareer(careerId, career.careerName, career.matchPercentage, tempNotes);
        setEditingNotesId(null);
        fetchDashboardData();
      }
    } catch (e) {
      console.error('Failed to save notes:', e);
    }
  };

  // Handle Unsave Career
  const handleUnsave = async (careerId: string) => {
    try {
      await apiService.unsaveCareer(careerId);
      fetchDashboardData();
    } catch (e) {
      console.error('Failed to unsave career:', e);
    }
  };

  // Handle Save Career from Search
  const handleSaveCareerFromSearch = async (profile: typeof careerProfiles[0]) => {
    try {
      await apiService.saveCareer(profile.id, profile.title, 85, 'Saved from global search.');
      fetchDashboardData();

      // Add notification
      const newNotif = {
        id: `n-${Date.now()}`,
        text: `Saved career path: ${profile.title} to your profile bookmarks.`,
        date: new Date().toLocaleDateString(),
        read: false,
        type: 'success'
      };
      saveNotifications([newNotif, ...notifications]);
    } catch (e) {
      console.error('Failed to save career:', e);
    }
  };

  // Handle Progress increments
  const handleIncrementSkill = async (skillName: string, currentVal: number) => {
    if (!learningPlan) return;
    const newVal = Math.min(100, currentVal + 10);
    
    const updatedSkills = { ...learningPlan.skillsProgress };
    updatedSkills[skillName] = newVal;

    try {
      await apiService.updateLearningPlan({ skillsProgress: updatedSkills });
      fetchDashboardData();

      if (newVal === 100) {
        // Add achievement notification
        const newNotif = {
          id: `n-${Date.now()}`,
          text: `Milestone Achieved: Mastered skill "${skillName}"!`,
          date: new Date().toLocaleDateString(),
          read: false,
          type: 'success'
        };
        saveNotifications([newNotif, ...notifications]);
      }
    } catch (e) {
      console.error('Failed to update skill progress:', e);
    }
  };

  // Handle Certifications Toggle
  const handleToggleCert = async (certName: string, currentStatus: string) => {
    if (!learningPlan) return;
    
    const statusCycle: Record<string, string> = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    const nextStatus = statusCycle[currentStatus] || 'not-started';

    const updatedCerts = { ...learningPlan.certificationsStatus };
    updatedCerts[certName] = nextStatus;

    try {
      await apiService.updateLearningPlan({ certificationsStatus: updatedCerts });
      fetchDashboardData();

      if (nextStatus === 'completed') {
        const newNotif = {
          id: `n-${Date.now()}`,
          text: `Certification Completed: ${certName}`,
          date: new Date().toLocaleDateString(),
          read: false,
          type: 'success'
        };
        saveNotifications([newNotif, ...notifications]);
      }
    } catch (e) {
      console.error('Failed to update certification status:', e);
    }
  };

  // Download PDF Report
  const handleDownloadPastReport = (assessment: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CareerAI Discovery Report - ${assessment.topMatch?.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; color: #1e293b; padding: 40px; }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-family: 'Outfit', sans-serif; font-size: 24px; color: #2563eb; font-weight: 850; }
          .report-meta { font-size: 11px; text-transform: uppercase; color: #64748b; }
          .card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; margin: 30px 0; }
          .career-title { font-family: 'Outfit', sans-serif; font-size: 22px; color: #1e3a8a; }
          .fit-circle { font-size: 24px; font-weight: 800; color: #2563eb; }
          .section-title { font-size: 16px; border-left: 4px solid #2563eb; padding-left: 8px; margin: 20px 0 10px 0; font-family: 'Outfit', sans-serif; }
          .tag { display: inline-block; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 11px; margin-right: 6px; margin-bottom: 6px; }
          .footer-credit { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; text-align: center; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">CareerAI</div>
          <div class="report-meta">Past Assessment Result: ${new Date(assessment.createdAt).toLocaleDateString()}</div>
        </div>
        <div class="card">
          <div class="career-title">${assessment.topMatch?.title}</div>
          <div class="fit-circle">${assessment.topScore}% Fit Score</div>
          <p style="font-size: 12px; color: #475569;">${assessment.topMatch?.description}</p>
        </div>
        <h4 class="section-title">Aptitudes Score:</h4>
        <div style="font-size: 12px; margin-bottom: 20px;">
          Technology: ${assessment.domainScores?.technology || 0}% &bull; 
          Business: ${assessment.domainScores?.business || 0}% &bull; 
          Creative: ${assessment.domainScores?.creative || 0}% &bull; 
          Education: ${assessment.domainScores?.education || 0}% &bull; 
          Healthcare: ${assessment.domainScores?.healthcare || 0}% &bull; 
          Social Impact: ${assessment.domainScores?.socialImpact || 0}%
        </div>
        <h4 class="section-title">Core Skills:</h4>
        <div>${assessment.topMatch?.skills?.map((s: string) => `<span class="tag">${s}</span>`).join('')}</div>
        <h4 class="section-title">Recommended Certifications:</h4>
        <div>${assessment.topMatch?.certifications?.map((c: string) => `<span class="tag" style="background:#dbeafe; color:#1e40af;">${c}</span>`).join('')}</div>
        <div class="footer-credit">Designed & Developed by Indhu Priya Yanamala</div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Reset local database settings
  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all mock databases? This will clear your assessment history and saved bookmarks.')) {
      localStorage.removeItem('mock_db_assessments');
      localStorage.removeItem('mock_db_saved_careers');
      localStorage.removeItem('mock_db_learning_plans');
      localStorage.removeItem('careerai_notifications');
      
      const resetNotif = [{
        id: 'n-reset',
        text: 'Database structures reset. All mock tables initialized.',
        date: new Date().toLocaleDateString(),
        read: false,
        type: 'info'
      }];
      setNotifications(resetNotif);
      localStorage.setItem('careerai_notifications', JSON.stringify(resetNotif));
      
      fetchDashboardData();
      alert('Mock database tables cleared.');
      window.location.reload();
    }
  };

  // Convert timeline history for Recharts
  const chartData = assessments.slice().reverse().map(a => ({
    date: new Date(a.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    Score: a.topScore
  }));

  // Convert skill map for Radar Chart
  const radarData = learningPlan ? Object.entries(learningPlan.skillsProgress).map(([skill, val]) => ({
    subject: skill,
    Aptitude: val as number
  })) : [];

  // Filter career profiles inside search
  const filteredProfiles = careerProfiles.filter(profile => {
    const matchesSearch = profile.title.toLowerCase().includes(careerSearch.toLowerCase()) || 
                          profile.description.toLowerCase().includes(careerSearch.toLowerCase()) ||
                          profile.skills.some(s => s.toLowerCase().includes(careerSearch.toLowerCase()));
    const matchesDomain = selectedDomainFilter === 'All' || profile.category === selectedDomainFilter;
    return matchesSearch && matchesDomain;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* AI Memory Message Banner */}
      {welcomeBackMessage && activeTab === 'overview' && (
        <div className="bg-primary-50 border border-primary-150 p-4.5 rounded-2xl flex items-start gap-3.5 shadow-sm text-primary-900 animate-in fade-in slide-in-from-top-4 duration-350">
          <AlertCircle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[0.675rem] uppercase text-primary-600 tracking-wider">AI Platform Memory Active</span>
            <p className="text-sm font-semibold mt-0.5 leading-relaxed">{welcomeBackMessage}</p>
          </div>
        </div>
      )}

      {/* Dashboard Submenu Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition focus:outline-none ${
              activeTab === 'overview'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" /> Overview Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition focus:outline-none ${
              activeTab === 'search'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" /> Search Careers
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition focus:outline-none relative ${
              activeTab === 'notifications'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4 h-4" /> 
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border border-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition focus:outline-none ${
              activeTab === 'settings'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Profile & Saves */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* User Profile Card */}
            <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-primary-600" /> Profile Information
              </h4>
              
              {profileMessage && (
                <div className="text-center text-xs font-semibold p-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
                  {profileMessage}
                </div>
              )}

              {!isEditingProfile ? (
                <div className="flex flex-col items-center text-center space-y-4">
                  <img 
                    src={user?.photo || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Default'} 
                    alt={user?.name} 
                    className="w-20 h-20 rounded-full border border-slate-200 bg-slate-50"
                  />
                  <div>
                    <h3 className="font-title text-lg font-bold text-slate-800">{user?.name}</h3>
                    <span className="text-xs text-slate-400 font-medium">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditName(user?.name || '');
                      setEditPhoto(user?.photo || '');
                      setIsEditingProfile(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold py-2.5 rounded-xl transition text-xs focus:outline-none"
                  >
                    <Edit className="w-4 h-4" /> Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Profile Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Avatar Seed URL</label>
                    <input
                      type="text"
                      value={editPhoto}
                      onChange={e => setEditPhoto(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 flex items-center justify-center gap-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-xl transition text-xs focus:outline-none"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold py-2.5 rounded-xl transition text-xs focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Saved Career Matches */}
            <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-100" /> Saved Career Options
              </h4>

              {savedCareers.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No saved career paths yet. Search careers or take assessments to bookmark fit recommendations.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {savedCareers.map(career => (
                    <div key={career.careerId} className="border border-slate-100 p-3 rounded-xl bg-slate-50/50 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-800 text-sm block">{career.careerName}</span>
                          <span className="text-[0.675rem] font-bold text-primary-600">{career.matchPercentage}% match fit</span>
                        </div>
                        <button 
                          onClick={() => handleUnsave(career.careerId)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-white transition"
                          aria-label="Remove career"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Notes editor */}
                      {editingNotesId === career.careerId ? (
                        <div className="space-y-2">
                          <textarea
                            value={tempNotes}
                            onChange={e => setTempNotes(e.target.value)}
                            placeholder="Add notes about your plans for this career..."
                            className="w-full p-2 border border-slate-200 bg-white rounded-lg text-xs focus:outline-none focus:border-primary-600"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveNotes(career.careerId)}
                              className="bg-primary-600 text-white font-bold px-2.5 py-1 text-[0.675rem] rounded-md"
                            >
                              Save Notes
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="border border-slate-200 text-slate-500 px-2.5 py-1 text-[0.675rem] rounded-md"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs">
                          <p className="text-slate-500 italic bg-white p-2 border border-slate-100 rounded-lg">
                            {career.notes || 'No custom notes added. Write down your planning ideas.'}
                          </p>
                          <button
                            onClick={() => {
                              setEditingNotesId(career.careerId);
                              setTempNotes(career.notes || '');
                            }}
                            className="text-primary-600 font-bold hover:underline mt-1.5 inline-block text-[0.675rem]"
                          >
                            Edit Notes
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Learning Tracker & History */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Active Learning Progress Tracker */}
            <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-primary-600" /> Career Accelerator Tracker
              </h4>

              {!learningPlan ? (
                <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-3">
                  <Compass className="w-8 h-8 text-slate-400 mx-auto animate-pulse" />
                  <p className="text-xs text-slate-500">Take the Career Match Assessment to automatically configure an active roadmap!</p>
                  <button
                    onClick={() => openDemo('assessment')}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-primary-500/20"
                  >
                    Start Assessment
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Recharts Radar Chart */}
                  <div className="flex flex-col items-center border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <span className="text-[0.675rem] font-extrabold text-slate-400 uppercase tracking-widest block mb-2 self-start">Aptitude Wheel</span>
                    <div className="w-full h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 605 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                          <Radar name="Aptitude" dataKey="Aptitude" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} />
                          <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Skills progress tracker */}
                  <div className="space-y-3.5">
                    <span className="text-[0.675rem] font-extrabold text-slate-400 uppercase tracking-widest block">Skills Acquisition Progress:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(learningPlan.skillsProgress).map(([skill, val]) => (
                        <div key={skill} className="border border-slate-100 p-3 rounded-xl bg-slate-50/50 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-700">{skill}</span>
                            <span className="font-semibold text-primary-600 bg-white border px-2 py-0.5 rounded-md shadow-sm">{(val as number)}%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-primary-600 rounded-full" style={{ width: `${(val as number)}%` }}></div>
                            </div>
                            <button
                              onClick={() => handleIncrementSkill(skill, val as number)}
                              disabled={(val as number) >= 100}
                              className="bg-white hover:bg-slate-100 border text-slate-600 hover:text-slate-800 text-[0.65rem] font-bold px-2 py-1 rounded-md shadow-sm transition disabled:opacity-40 disabled:pointer-events-none"
                            >
                              Study +10%
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications status checkboxes */}
                  <div className="space-y-3 pt-4 border-t border-slate-150">
                    <span className="text-[0.675rem] font-extrabold text-slate-400 uppercase tracking-widest block">Certifications Milestones:</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {Object.entries(learningPlan.certificationsStatus).map(([cert, status]) => (
                        <div 
                          key={cert}
                          onClick={() => handleToggleCert(cert, status as string)}
                          className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-5 h-5 rounded border flex items-center justify-center transition-all
                              ${(status as string) === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 
                                (status as string) === 'in-progress' ? 'bg-amber-50 border-amber-200 text-amber-700 font-bold' : 'border-slate-300'}
                            `}>
                              {(status as string) === 'completed' && <CheckCircle className="w-3.5 h-3.5 fill-white stroke-emerald-500" />}
                              {(status as string) === 'in-progress' && <TrendingUp className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-xs font-semibold text-slate-700">{cert}</span>
                          </div>
                          
                          {/* Status Label Pill */}
                          <span className={`
                            text-[0.625rem] font-bold px-2 py-0.5 rounded-md uppercase border
                            ${(status as string) === 'completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                              (status as string) === 'in-progress' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-100 border-slate-200 text-slate-600'}
                          `}>
                            {(status as string) === 'completed' ? 'Completed' : (status as string) === 'in-progress' ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Assessment History & Timeline graph */}
            <div className="border border-slate-200/80 rounded-2xl bg-white p-6 shadow-sm space-y-5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-primary-600" /> Assessment History & Progress
              </h4>

              {assessments.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No past assessments found. Take the assessment to generate diagnostics.
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Recharts LineChart over time */}
                  {assessments.length > 1 && (
                    <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 flex flex-col items-center">
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase mb-3 align-self-start">Career Match score trend over time</span>
                      <div className="w-full h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 9 }} />
                            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="Score" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 1.5, fill: '#fff' }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* History list */}
                  <div className="space-y-3">
                    <span className="text-[0.675rem] font-extrabold text-slate-400 uppercase tracking-widest block">Completed Diagnostics Logs:</span>
                    <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                      {assessments.map((item, idx) => (
                        <div key={item.id || idx} className="border border-slate-100 p-4 rounded-xl bg-white flex items-center justify-between shadow-sm">
                          <div>
                            <span className="text-xs font-bold text-primary-600 block">{new Date(item.createdAt).toLocaleDateString()}</span>
                            <span className="font-bold text-slate-800 text-sm block mt-0.5">{item.topMatch?.title}</span>
                            <span className="text-xs text-slate-400 font-medium">Match Fit: {item.topScore}%</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDownloadPastReport(item)}
                              className="flex items-center gap-1.5 text-slate-500 hover:text-primary-600 border border-slate-200 bg-white hover:bg-primary-50 hover:border-primary-100 p-2 rounded-xl text-xs font-bold transition focus:outline-none"
                              title="Download PDF"
                            >
                              <Download className="w-4.5 h-4.5" />
                              <span className="hidden sm:inline">Report</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {activeTab === 'search' && (
        <div className="border border-slate-200/80 bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary-600" /> Career Profile Explorer
              </h3>
              <p className="text-xs text-slate-400 mt-1">Search or filter through 28 premium industry roadmap templates.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search query box */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={careerSearch}
                  onChange={e => setCareerSearch(e.target.value)}
                  placeholder="Search skills, titles..."
                  className="pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-primary-600 w-full sm:w-48"
                />
              </div>

              {/* Domain Filter list */}
              <select
                value={selectedDomainFilter}
                onChange={e => setSelectedDomainFilter(e.target.value)}
                className="p-2 border border-slate-200 bg-slate-50 rounded-xl text-xs focus:outline-none"
              >
                <option value="All">All Domains</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Creative">Creative</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Social Impact">Social Impact</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
            {filteredProfiles.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-400 text-xs">
                No matching career profiles found. Try a different query!
              </div>
            ) : (
              filteredProfiles.map(profile => {
                const isBookmarked = savedCareers.some(sc => sc.careerId === profile.id);
                return (
                  <div key={profile.id} className="border border-slate-150 p-5 rounded-2xl hover:border-slate-350 bg-slate-50/30 flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{profile.category}</span>
                          <h4 className="font-title text-base font-extrabold text-slate-800">{profile.title}</h4>
                        </div>
                        <button
                          onClick={() => {
                            if (isBookmarked) {
                              handleUnsave(profile.id);
                            } else {
                              handleSaveCareerFromSearch(profile);
                            }
                          }}
                          className={`p-2 rounded-lg border transition ${
                            isBookmarked 
                              ? 'bg-amber-50 border-amber-200 text-amber-500' 
                              : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
                          }`}
                          title={isBookmarked ? 'Unsave Career' : 'Bookmark Career'}
                        >
                          <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>
                      
                      <p className="text-xs text-slate-500 leading-relaxed">{profile.description}</p>
                      
                      <div className="flex gap-4 text-xs font-bold text-slate-700 bg-white border border-slate-100 p-2.5 rounded-xl shadow-sm">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block">Median Salary</span>
                          <span>{profile.salary}</span>
                        </div>
                        <div className="border-l border-slate-150 pl-4">
                          <span className="text-[9px] uppercase text-slate-400 block">Growth Outlook</span>
                          <span className="text-emerald-600">{profile.growth}</span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400">Core Skills</span>
                        <div className="flex flex-wrap gap-1">
                          {profile.skills.slice(0, 3).map(sk => (
                            <span key={sk} className="text-[10px] bg-slate-100 border text-slate-600 px-2 py-0.5 rounded-md">{sk}</span>
                          ))}
                        </div>
                      </div>

                    </div>

                    <button
                      onClick={() => openDemo('assessment')}
                      className="w-full text-center py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-350 text-[10px] font-extrabold rounded-xl transition"
                    >
                      Assess Fit For This Role &rarr;
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="border border-slate-200/80 bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary-600" /> Notifications Drawer
              </h3>
              <p className="text-xs text-slate-400 mt-1">Receive system alerts, score reports, and milestones.</p>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={() => {
                  const readAll = notifications.map(n => ({ ...n, read: true }));
                  saveNotifications(readAll);
                }}
                className="text-[10px] font-bold text-primary-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No alerts or notifications in your inbox.
              </div>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id}
                  onClick={() => {
                    const toggled = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                    saveNotifications(toggled);
                  }}
                  className={`border p-4 rounded-2xl flex items-start justify-between gap-4 transition cursor-pointer ${
                    notif.read 
                      ? 'bg-slate-50/40 border-slate-100 opacity-70' 
                      : 'bg-primary-50/20 border-primary-100 shadow-sm'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold
                      ${notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50/80 text-primary-600'}
                    `}>
                      {notif.type === 'success' ? '🎉' : '🔔'}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed">{notif.text}</p>
                      <span className="text-[9px] font-bold text-slate-400 block mt-1">{notif.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const filtered = notifications.filter(n => n.id !== notif.id);
                      saveNotifications(filtered);
                    }}
                    className="text-slate-400 hover:text-rose-500 p-1 hover:bg-slate-100 rounded"
                    title="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="border border-slate-200/80 bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 max-w-2xl">
          <div>
            <h3 className="font-title text-xl font-bold text-slate-800 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary-600" /> Platform Preferences
            </h3>
            <p className="text-xs text-slate-400 mt-1">Toggle mock system configurations, databases, and newsletters.</p>
          </div>

          <div className="space-y-6">
            
            {/* Newsletter */}
            <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
              <div>
                <span className="font-bold text-xs text-slate-800 block">Weekly Newsletter subscription</span>
                <span className="text-[10px] text-slate-400">Receive career trends, blog posts, and site logs weekly.</span>
              </div>
              <button
                onClick={() => setNewsletterSub(!newsletterSub)}
                className={`w-11 h-6 rounded-full transition relative ${
                  newsletterSub ? 'bg-primary-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  newsletterSub ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Sounds */}
            <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
              <div>
                <span className="font-bold text-xs text-slate-800 block flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-slate-500" /> Play sounds on achievements
                </span>
                <span className="text-[10px] text-slate-400">Sound prompts play when leveling up skills or unlocking badges.</span>
              </div>
              <button
                onClick={() => setMilestoneSounds(!milestoneSounds)}
                className={`w-11 h-6 rounded-full transition relative ${
                  milestoneSounds ? 'bg-primary-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  milestoneSounds ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* AI Recommendation engine */}
            <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
              <div>
                <span className="font-bold text-xs text-slate-800 block flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-slate-500" /> Enable AI recommendation system
                </span>
                <span className="text-[10px] text-slate-400">Algorithm dynamically maps past results to suggest new paths.</span>
              </div>
              <button
                onClick={() => setRecommendationsActive(!recommendationsActive)}
                className={`w-11 h-6 rounded-full transition relative ${
                  recommendationsActive ? 'bg-primary-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  recommendationsActive ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Clear database */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div>
                <span className="font-bold text-xs text-rose-600 block">Clear mock database tables</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Clears all diagnostic logs, saved bookmarks, and custom roadmap configurations stored locally in localStorage.</span>
              </div>
              <button
                onClick={handleResetData}
                className="flex items-center gap-2 border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 font-bold px-4 py-2.5 rounded-xl text-xs transition focus:outline-none"
              >
                <RefreshCw className="w-4 h-4" /> Reset Mock Data
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

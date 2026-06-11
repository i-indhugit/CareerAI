// --- 100% LOCAL STORAGE DATABASE SERVICE ---

export const getAuthToken = async () => {
  return localStorage.getItem('careerai_auth_token');
};

const getMockDB = () => {
  const users = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
  const assessments = JSON.parse(localStorage.getItem('mock_db_assessments') || '[]');
  const savedCareers = JSON.parse(localStorage.getItem('mock_db_saved_careers') || '[]');
  const learningPlans = JSON.parse(localStorage.getItem('mock_db_learning_plans') || '{}');
  return { users, assessments, savedCareers, learningPlans };
};

const saveMockDB = (db: ReturnType<typeof getMockDB>) => {
  localStorage.setItem('mock_db_users', JSON.stringify(db.users));
  localStorage.setItem('mock_db_assessments', JSON.stringify(db.assessments));
  localStorage.setItem('mock_db_saved_careers', JSON.stringify(db.savedCareers));
  localStorage.setItem('mock_db_learning_plans', JSON.stringify(db.learningPlans));
};

// Initialize default mock admin and users if empty
const initMockDB = () => {
  const db = getMockDB();
  if (db.users.length === 0) {
    db.users.push({
      id: 'mock-admin-id',
      name: 'Indhu Priya Yanamala',
      email: 'admin@careerai.com',
      password: 'password',
      photo: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin',
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    
    // Add mock assessments for analytics charts
    const mockAssessments = [
      {
        id: 'a1',
        userId: 'mock-admin-id',
        answers: {},
        topScore: 94,
        topMatch: { id: 'software-engineer', title: 'Software Engineer', category: 'Technology' },
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a2',
        userId: 'mock-user-1',
        answers: {},
        topScore: 88,
        topMatch: { id: 'ui-ux-designer', title: 'UI/UX Designer', category: 'Creative' },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'a3',
        userId: 'mock-user-2',
        answers: {},
        topScore: 78,
        topMatch: { id: 'product-manager', title: 'Product Manager', category: 'Business' },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    db.assessments.push(...mockAssessments);
    saveMockDB(db);
  }
};
initMockDB();

// Helper to resolve active user id from token
const getActiveUserId = () => {
  const token = localStorage.getItem('careerai_auth_token') || '';
  return token.replace('mock-token-', '') || 'guest';
};

// --- EXPORTED API METHODS ---
export const apiService = {
  // Authentication
  async register(name: string, email: string, password: string) {
    const db = getMockDB();
    if (db.users.find((u: any) => u.email === email.toLowerCase())) {
      throw new Error('Email address is already in use.');
    }
    const newUser = {
      id: `mock-user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password, 
      photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      role: db.users.length === 1 ? 'admin' : 'user', 
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveMockDB(db);
    
    const token = `mock-token-${newUser.id}`;
    localStorage.setItem('careerai_auth_token', token);
    return { token, user: { id: newUser.id, name: newUser.name, email: newUser.email, photo: newUser.photo, role: newUser.role } };
  },

  async login(email: string, password: string) {
    const db = getMockDB();
    const user = db.users.find((u: any) => u.email === email.toLowerCase());
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }
    const token = `mock-token-${user.id}`;
    localStorage.setItem('careerai_auth_token', token);
    return { token, user: { id: user.id, name: user.name, email: user.email, photo: user.photo, role: user.role } };
  },

  async logout() {
    localStorage.removeItem('careerai_auth_token');
  },

  async forgotPassword(email: string) {
    const db = getMockDB();
    const user = db.users.find((u: any) => u.email === email.toLowerCase());
    if (!user) throw new Error('Email not found.');
    return { message: 'Password reset instructions sent.' };
  },

  async resetPassword(newPass: string) {
    const db = getMockDB();
    const userId = getActiveUserId();
    const user = db.users.find((u: any) => u.id === userId);
    if (!user) throw new Error('User session expired.');
    user.password = newPass;
    saveMockDB(db);
    return { message: 'Password reset successfully.' };
  },

  async getProfile() {
    const userId = getActiveUserId();
    const db = getMockDB();
    const user = db.users.find((u: any) => u.id === userId);
    if (!user) throw new Error('Session expired');
    return user;
  },

  async updateProfile(profileData: { name?: string; email?: string; photo?: string }) {
    const userId = getActiveUserId();
    const db = getMockDB();
    const user = db.users.find((u: any) => u.id === userId);
    if (!user) throw new Error('Session expired');
    
    if (profileData.name) user.name = profileData.name;
    if (profileData.email) user.email = profileData.email;
    if (profileData.photo) user.photo = profileData.photo;
    saveMockDB(db);
    return user;
  },

  // Assessments
  async saveAssessment(payload: any) {
    const userId = getActiveUserId();
    const db = getMockDB();
    
    const newAssessment = {
      id: `mock-assessment-${Date.now()}`,
      userId,
      answers: payload.answers,
      career_scores: payload.allMatches,
      topMatch: payload.topMatch,
      topScore: payload.topScore,
      domainScores: payload.domainScores,
      points: payload.points,
      createdAt: new Date().toISOString()
    };
    
    db.assessments.push(newAssessment);
    
    // Auto update mock learning plan
    const initialSkills: Record<string, number> = {};
    const initialCerts: Record<string, string> = {};
    payload.topMatch.skills?.forEach((s: string) => { initialSkills[s] = 10; });
    payload.topMatch.certifications?.forEach((c: string) => { initialCerts[c] = 'not-started'; });
    
    db.learningPlans[userId] = {
      careerId: payload.topMatch.id,
      skillsProgress: initialSkills,
      certificationsStatus: initialCerts,
      goals: [`Complete certifications for ${payload.topMatch.title}`, `Master fundamental skills in ${payload.topMatch.title}`],
      updatedAt: new Date().toISOString()
    };
    
    saveMockDB(db);
    return newAssessment;
  },

  async getAssessments() {
    const userId = getActiveUserId();
    const db = getMockDB();
    return db.assessments.filter((a: any) => a.userId === userId).reverse();
  },

  // Saved Careers
  async getSavedCareers() {
    const userId = getActiveUserId();
    const db = getMockDB();
    return db.savedCareers.filter((sc: any) => sc.userId === userId);
  },

  async saveCareer(careerId: string, careerName: string, matchPercentage: number, notes?: string) {
    const userId = getActiveUserId();
    const db = getMockDB();
    
    const existingIdx = db.savedCareers.findIndex((c: any) => c.userId === userId && c.careerId === careerId);
    if (existingIdx > -1) {
      db.savedCareers[existingIdx].notes = notes || '';
    } else {
      db.savedCareers.push({
        id: `mock-saved-${Date.now()}`,
        userId,
        careerId,
        careerName,
        matchPercentage,
        notes: notes || '',
        createdAt: new Date().toISOString()
      });
    }
    saveMockDB(db);
    return { success: true };
  },

  async unsaveCareer(careerId: string) {
    const userId = getActiveUserId();
    const db = getMockDB();
    db.savedCareers = db.savedCareers.filter((c: any) => !(c.userId === userId && c.careerId === careerId));
    saveMockDB(db);
    return { success: true };
  },

  // Learning Plan
  async getLearningPlan() {
    const userId = getActiveUserId();
    const db = getMockDB();
    const plan = db.learningPlans[userId];
    if (!plan) throw new Error('Learning plan not found');
    return plan;
  },

  async updateLearningPlan(planData: { skillsProgress?: Record<string, number>; certificationsStatus?: Record<string, string>; goals?: string[] }) {
    const userId = getActiveUserId();
    const db = getMockDB();
    const plan = db.learningPlans[userId];
    if (!plan) throw new Error('Plan not found');
    
    if (planData.skillsProgress) plan.skillsProgress = planData.skillsProgress;
    if (planData.certificationsStatus) plan.certificationsStatus = planData.certificationsStatus;
    if (planData.goals) plan.goals = planData.goals;
    plan.updatedAt = new Date().toISOString();
    
    saveMockDB(db);
    return plan;
  },

  // Admin Analytics
  async getAdminStats() {
    const db = getMockDB();
    const categoriesCount: Record<string, number> = {};
    const careerCount: Record<string, number> = {};
    
    db.assessments.forEach((a: any) => {
      const cat = a.topMatch?.category || 'Unknown';
      categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
      
      const title = a.topMatch?.title || 'Unknown';
      careerCount[title] = (careerCount[title] || 0) + 1;
    });
    
    const matchDistribution = Object.entries(categoriesCount).map(([category, count]) => ({ category, count }));
    const careerDistribution = Object.entries(careerCount)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Create a mock signups timeline
    const signupsTimeline = [
      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 1 },
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 3 },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 2 },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 5 },
      { date: new Date().toISOString().split('T')[0], count: db.users.length }
    ];

    return {
      totalUsers: db.users.length,
      totalAssessments: db.assessments.length,
      averageScore: 84,
      matchDistribution,
      careerDistribution,
      signupsTimeline
    };
  }
};

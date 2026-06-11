import { supabase, isSupabaseConfigured } from './supabase';

// Helper to get headers/token for compatibility (if needed)
export const getAuthToken = async () => {
  if (isSupabaseConfigured) {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  }
  return localStorage.getItem('careerai_auth_token');
};

// --- MOCK DATABASE FALLBACK ENGINE ---
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

// --- EXPORTED API METHODS ---
export const apiService = {
  // Authentication
  async register(name: string, email: string, password: string) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      if (error) throw new Error(error.message);
      
      const session = data.session;
      const user = data.user;
      
      if (!user) throw new Error('Registration failed. Try again.');

      // Wait a moment for trigger to create public user profile
      let profile = null;
      let retries = 5;
      while (retries > 0 && !profile) {
        const { data: prof } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        if (prof) {
          profile = prof;
        } else {
          await new Promise(r => setTimeout(r, 400));
          retries--;
        }
      }

      // Fallback profile if database triggers are running slow or delayed
      if (!profile) {
        profile = {
          id: user.id,
          name,
          email: user.email!,
          photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
          role: 'user'
        };
      }

      return { token: session?.access_token || 'supabase-token', user: profile };
    } else {
      // Mock flow
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
    }
  },

  async login(email: string, password: string) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);

      const session = data.session;
      const user = data.user;

      if (!user) throw new Error('Login failed.');

      // Fetch profile details from users table
      const { data: profile, error: profErr } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profErr || !profile) {
        // Fallback user profile
        return {
          token: session?.access_token || 'supabase-token',
          user: {
            id: user.id,
            name: user.user_metadata.name || 'User Account',
            email: user.email!,
            photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.email!)}`,
            role: 'user'
          }
        };
      }

      return { token: session?.access_token || 'supabase-token', user: profile };
    } else {
      // Mock flow
      const db = getMockDB();
      const user = db.users.find((u: any) => u.email === email.toLowerCase());
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password.');
      }
      const token = `mock-token-${user.id}`;
      localStorage.setItem('careerai_auth_token', token);
      return { token, user: { id: user.id, name: user.name, email: user.email, photo: user.photo, role: user.role } };
    }
  },

  async logout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('careerai_auth_token');
    }
  },

  async forgotPassword(email: string) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset`
      });
      if (error) throw new Error(error.message);
      return { message: 'Password reset instructions sent.' };
    } else {
      const db = getMockDB();
      const user = db.users.find((u: any) => u.email === email.toLowerCase());
      if (!user) throw new Error('Email not found.');
      return { message: 'Password reset instructions sent.' };
    }
  },

  async resetPassword(newPass: string) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.updateUser({ password: newPass });
      if (error) throw new Error(error.message);
      return { message: 'Password reset successfully.' };
    } else {
      const db = getMockDB();
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '');
      const user = db.users.find((u: any) => u.id === userId);
      if (!user) throw new Error('User session expired.');
      user.password = newPass;
      saveMockDB(db);
      return { message: 'Password reset successfully.' };
    }
  },

  async getProfile() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User session expired.');

      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        return {
          id: user.id,
          name: user.user_metadata.name || 'User Account',
          email: user.email!,
          photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.email!)}`,
          role: 'user'
        };
      }
      return profile;
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '');
      const db = getMockDB();
      const user = db.users.find((u: any) => u.id === userId);
      if (!user) throw new Error('Session expired');
      return user;
    }
  },

  async updateProfile(profileData: { name?: string; email?: string; photo?: string }) {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Session expired');

      const { data, error } = await supabase
        .from('users')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '');
      const db = getMockDB();
      const user = db.users.find((u: any) => u.id === userId);
      if (!user) throw new Error('Session expired');
      
      if (profileData.name) user.name = profileData.name;
      if (profileData.email) user.email = profileData.email;
      if (profileData.photo) user.photo = profileData.photo;
      saveMockDB(db);
      return user;
    }
  },

  // Assessments
  async saveAssessment(payload: any) {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User session not active');

      const dbPayload = {
        user_id: user.id,
        answers: payload.answers,
        career_scores: payload.allMatches,
        top_match: payload.topMatch,
        top_score: payload.topScore,
        domain_scores: payload.domainScores,
        points: payload.points
      };

      const { data, error } = await supabase
        .from('assessments')
        .insert(dbPayload)
        .select()
        .single();

      if (error) throw new Error(error.message);

      // Auto upsert learning plan preferences
      const initialSkills: Record<string, number> = {};
      const initialCerts: Record<string, string> = {};
      payload.topMatch.skills?.forEach((s: string) => { initialSkills[s] = 10; });
      payload.topMatch.certifications?.forEach((c: string) => { initialCerts[c] = 'not-started'; });

      const planData = {
        career_id: payload.topMatch.id,
        skills_progress: initialSkills,
        certifications_status: initialCerts,
        goals: [`Complete certifications for ${payload.topMatch.title}`, `Master fundamental skills in ${payload.topMatch.title}`]
      };

      await supabase
        .from('preferences')
        .upsert({ user_id: user.id, ...planData });

      return data;
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
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
    }
  },

  async getAssessments() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      
      // Map back database names to frontend names
      return data.map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        answers: item.answers,
        allMatches: item.career_scores,
        topMatch: item.top_match,
        topScore: item.top_score,
        domainScores: item.domain_scores,
        points: item.points,
        createdAt: item.created_at
      }));
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
      const db = getMockDB();
      return db.assessments.filter((a: any) => a.userId === userId).reverse();
    }
  },

  // Saved Careers
  async getSavedCareers() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('saved_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      
      return data.map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        careerId: item.career_id,
        careerName: item.career_name,
        matchPercentage: item.match_percentage,
        notes: item.notes,
        createdAt: item.created_at
      }));
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
      const db = getMockDB();
      return db.savedCareers.filter((sc: any) => sc.userId === userId);
    }
  },

  async saveCareer(careerId: string, careerName: string, matchPercentage: number, notes?: string) {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Auth session invalid');

      const { data, error } = await supabase
        .from('saved_reports')
        .upsert({
          user_id: user.id,
          career_id: careerId,
          career_name: careerName,
          match_percentage: matchPercentage,
          notes: notes || ''
        })
        .select();

      if (error) throw new Error(error.message);
      return data;
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
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
    }
  },

  async unsaveCareer(careerId: string) {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Auth session invalid');

      const { error } = await supabase
        .from('saved_reports')
        .delete()
        .eq('user_id', user.id)
        .eq('career_id', careerId);

      if (error) throw new Error(error.message);
      return { success: true };
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
      const db = getMockDB();
      db.savedCareers = db.savedCareers.filter((c: any) => !(c.userId === userId && c.careerId === careerId));
      saveMockDB(db);
      return { success: true };
    }
  },

  // Learning Plan
  async getLearningPlan() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Session not active');

      const { data, error } = await supabase
        .from('preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) throw new Error('Learning plan not found');
      
      return {
        id: data.id,
        userId: data.user_id,
        careerId: data.career_id,
        skillsProgress: data.skills_progress,
        certificationsStatus: data.certifications_status,
        goals: data.goals,
        updatedAt: data.updated_at
      };
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
      const db = getMockDB();
      const plan = db.learningPlans[userId];
      if (!plan) throw new Error('Learning plan not found');
      return plan;
    }
  },

  async updateLearningPlan(planData: { skillsProgress?: Record<string, number>; certificationsStatus?: Record<string, string>; goals?: string[] }) {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Session not active');

      const dbPayload: any = {};
      if (planData.skillsProgress) dbPayload.skills_progress = planData.skillsProgress;
      if (planData.certificationsStatus) dbPayload.certifications_status = planData.certificationsStatus;
      if (planData.goals) dbPayload.goals = planData.goals;
      dbPayload.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('preferences')
        .update(dbPayload)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    } else {
      const token = localStorage.getItem('careerai_auth_token') || '';
      const userId = token.replace('mock-token-', '') || 'guest';
      const db = getMockDB();
      const plan = db.learningPlans[userId];
      if (!plan) throw new Error('Plan not found');
      
      if (planData.skillsProgress) plan.skillsProgress = planData.skillsProgress;
      if (planData.certificationsStatus) plan.certificationsStatus = planData.certificationsStatus;
      if (planData.goals) plan.goals = planData.goals;
      plan.updatedAt = new Date().toISOString();
      
      saveMockDB(db);
      return plan;
    }
  },

  // Admin Analytics
  async getAdminStats() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Auth required');

      // Double check role
      const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
      if (!profile || profile.role !== 'admin') throw new Error('Access denied. Administrator role required.');

      // Pull queries
      const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { count: totalAssessments } = await supabase.from('assessments').select('*', { count: 'exact', head: true });
      
      const { data: assessments } = await supabase.from('assessments').select('top_match, top_score, created_at');

      const totalAssessmentsVal = totalAssessments || 0;
      const totalUsersVal = totalUsers || 0;
      
      const categoriesCount: Record<string, number> = {};
      const careerCount: Record<string, number> = {};
      let totalScoresSum = 0;

      assessments?.forEach((a: any) => {
        const cat = a.top_match?.category || 'Unknown';
        categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;

        const title = a.top_match?.title || 'Unknown';
        careerCount[title] = (careerCount[title] || 0) + 1;

        totalScoresSum += a.top_score || 0;
      });

      const averageScore = assessments && assessments.length > 0 
        ? Math.round(totalScoresSum / assessments.length)
        : 0;

      const matchDistribution = Object.entries(categoriesCount).map(([category, count]) => ({ category, count }));
      const careerDistribution = Object.entries(careerCount)
        .map(([title, count]) => ({ title, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Group signups timeline by date
      const { data: usersList } = await supabase.from('users').select('created_at');
      const signupsByDate: Record<string, number> = {};
      usersList?.forEach((u: any) => {
        const d = u.created_at.split('T')[0];
        signupsByDate[d] = (signupsByDate[d] || 0) + 1;
      });

      const signupsTimeline = Object.entries(signupsByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-7); // Last 7 days with registrations

      return {
        totalUsers: totalUsersVal,
        totalAssessments: totalAssessmentsVal,
        averageScore,
        matchDistribution,
        careerDistribution,
        signupsTimeline
      };
    } else {
      // Mock stats compilation
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
  }
};

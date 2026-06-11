import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  welcomeBackMessage: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name?: string; email?: string; photo?: string }) => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  setWelcomeBackMessage: (msg: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [welcomeBackMessage, setWelcomeBackMessage] = useState<string | null>(null);

  // Initialize auth session
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('careerai_auth_token');
      if (savedToken) {
        try {
          setToken(savedToken);
          const profile = await apiService.getProfile();
          setUser(profile as UserProfile);
          
          const history = await apiService.getAssessments();
          if (history && history.length > 0) {
            setWelcomeBackMessage(
              `Welcome back, ${profile.name}! Based on your previous assessments, we have loaded your persistent recommendations and skill roadmaps.`
            );
          }
        } catch (e) {
          console.error('Failed to load profile on mount:', e);
          localStorage.removeItem('careerai_auth_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiService.login(email, password);
      setToken(data.token);
      setUser(data.user as any);
      
      const history = await apiService.getAssessments();
      if (history && history.length > 0) {
        setWelcomeBackMessage(
          `Welcome back, ${data.user.name}! Based on your previous assessments, we have loaded your persistent recommendations and skill roadmaps.`
        );
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiService.register(name, email, password);
      setToken(data.token);
      setUser(data.user as any);
      setWelcomeBackMessage(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiService.logout();
      setUser(null);
      setToken(null);
      setWelcomeBackMessage(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data: { name?: string; email?: string; photo?: string }) => {
    try {
      const updatedUser = await apiService.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        welcomeBackMessage,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        forgotPassword: apiService.forgotPassword,
        setWelcomeBackMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

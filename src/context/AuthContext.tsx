import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'Free' | 'Premium' | 'Family';
  childName: string;
  childAge: number;
  notificationsEnabled: boolean;
  preferredVoice: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
  authMode: 'login' | 'register' | 'forgot' | 'otp';
  setAuthMode: (mode: 'login' | 'register' | 'forgot' | 'otp') => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-1',
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  plan: 'Premium',
  childName: 'Leo',
  childAge: 5,
  notificationsEnabled: true,
  preferredVoice: 'Mother'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot' | 'otp'>('login');

  const login = (email: string) => {
    setUser({
      ...DEFAULT_USER,
      email
    });
    setOpenAuthModal(false);
  };

  const register = (name: string, email: string) => {
    setUser({
      ...DEFAULT_USER,
      name,
      email
    });
    setOpenAuthModal(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        openAuthModal,
        setOpenAuthModal,
        authMode,
        setAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

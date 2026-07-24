import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlobalDreamBackground } from '../components/common/GlobalDreamBackground';

export const AuthPage: React.FC = () => {
  const { login, register, authMode, setAuthMode } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      register(name || 'Happy Parent', email || 'parent@example.com');
    } else {
      login(email || 'parent@example.com');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <GlobalDreamBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-md bg-[#152454]/90 backdrop-blur-2xl border-2 border-dream-purple/40 rounded-3xl p-8 shadow-glass-magic shadow-glow-purple space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-dream-purple via-dream-pink to-dream-gold p-0.5 mx-auto mb-2 shadow-glow-purple">
            <div className="w-full h-full bg-[#0E1A40] rounded-[14px] flex items-center justify-center text-2xl">
              🌙
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            {authMode === 'register' ? 'Create DreamVerse Account' : 'Welcome to DreamVerse'}
          </h2>
          <p className="text-xs text-slate-300">
            Sign in to start crafting custom bedtime stories for your child tonight.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-dream-cream mb-1">
                Parent Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input-dream text-xs text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-dream-cream mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input-dream text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-dream-cream mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input-dream text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-magic text-white font-extrabold text-sm shadow-glow-purple hover:scale-105 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{authMode === 'register' ? 'Create Account' : 'Sign In Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-xs font-bold text-dream-gold hover:underline"
          >
            {authMode === 'login' ? "Don't have an account? Create one" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

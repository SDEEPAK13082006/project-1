import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { openAuthModal, setOpenAuthModal, authMode, setAuthMode, login, register } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!openAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(email || 'parent@example.com');
    } else if (authMode === 'register') {
      register(name || 'Happy Parent', email || 'parent@example.com');
    } else if (authMode === 'forgot') {
      setAuthMode('otp');
    } else if (authMode === 'otp') {
      login(email || 'parent@example.com');
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setOpenAuthModal(false)}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-dream-purple via-dream-pink to-dream-yellow p-0.5 mx-auto mb-3">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-dream-purple" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {authMode === 'login' && 'Welcome Back!'}
            {authMode === 'register' && 'Create Your Account'}
            {authMode === 'forgot' && 'Reset Password'}
            {authMode === 'otp' && 'Enter Verification Code'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {authMode === 'login' && 'Sign in to access your saved bedtime stories'}
            {authMode === 'register' && 'Start crafting unlimited bedtime tales for your child'}
            {authMode === 'forgot' && 'Enter your email to receive a password reset link'}
            {authMode === 'otp' && 'We sent a 4-digit code to your email address'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        {(authMode === 'login' || authMode === 'register') && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                authMode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-dream-purple shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                authMode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-dream-purple shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Parent Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-sm text-slate-800 dark:text-white"
                />
              </div>
            </div>
          )}

          {(authMode === 'login' || authMode === 'register' || authMode === 'forgot') && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-sm text-slate-800 dark:text-white"
                />
              </div>
            </div>
          )}

          {(authMode === 'login' || authMode === 'register') && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-xs text-dream-purple hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-sm text-slate-800 dark:text-white"
                />
              </div>
            </div>
          )}

          {authMode === 'otp' && (
            <div className="flex justify-center gap-3 my-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-12 text-center font-bold text-lg rounded-2xl glass-input text-dream-purple dark:text-dream-pink"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-dream text-white font-semibold text-sm shadow-md hover:shadow-glow-purple transition-all flex items-center justify-center gap-2 mt-2"
          >
            {authMode === 'login' && 'Sign In to DreamTales'}
            {authMode === 'register' && 'Create Account'}
            {authMode === 'forgot' && 'Send Verification Code'}
            {authMode === 'otp' && 'Verify & Continue'}
          </button>
        </form>

        {/* Secondary Back Action */}
        {(authMode === 'forgot' || authMode === 'otp') && (
          <button
            onClick={() => setAuthMode('login')}
            className="w-full text-center text-xs text-slate-500 hover:text-dream-purple mt-4"
          >
            ← Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
};

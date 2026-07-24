import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  LogOut, 
  Check, 
  Sparkles,
  Smile
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [childName, setChildName] = useState(user?.childName || 'Leo');
  const [childAge, setChildAge] = useState(user?.childAge || 5);
  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [voicePref, setVoicePref] = useState(user?.preferredVoice || 'Mother');

  const avatars = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      childName,
      childAge,
      notificationsEnabled: notifications,
      preferredVoice: voicePref
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center glass-card p-8 rounded-3xl space-y-4">
        <User className="w-12 h-12 text-dream-purple mx-auto" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Please Sign In</h3>
        <p className="text-xs text-slate-500">You must be logged in to view your profile settings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-sans text-slate-800 dark:text-white">
            Profile & Settings
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your parent account, child defaults, and bedtime app preferences.
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-500 font-semibold text-xs border border-red-200 dark:border-red-900 flex items-center gap-2 hover:bg-red-100 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Avatar & Basic Info Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dream-purple flex items-center gap-2">
            <User className="w-4 h-4" />
            Parent Account Info
          </h4>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-dream-purple/40 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-dream text-white text-[10px] font-bold shadow-sm">
                {user.plan}
              </span>
            </div>

            <div className="space-y-3 w-full">
              <span className="text-xs font-semibold text-slate-500 block">Select Profile Avatar</span>
              <div className="flex gap-3">
                {avatars.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateProfile({ avatar: img })}
                    className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all ${
                      user.avatar === img ? 'border-dream-purple scale-105 shadow-md' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parent Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Child Defaults */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dream-pink flex items-center gap-2">
            <Smile className="w-4 h-4" />
            Child Profile Defaults
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Child's Default Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Child's Age
              </label>
              <input
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Preferences & Toggles */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dream-blue flex items-center gap-2">
            <Settings className="w-4 h-4" />
            App Preferences & Theme
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="w-5 h-5 text-amber-300" /> : <Sun className="w-5 h-5 text-dream-purple" />}
                <div>
                  <h5 className="text-sm font-bold text-slate-800 dark:text-white">Dark Mode Theme</h5>
                  <p className="text-xs text-slate-400">Soft starry theme for nighttime reading</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  isDarkMode ? 'bg-dream-purple justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-dream-pink" />
                <div>
                  <h5 className="text-sm font-bold text-slate-800 dark:text-white">Bedtime Reminders</h5>
                  <p className="text-xs text-slate-400">Receive gentle daily story notifications</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  notifications ? 'bg-dream-purple justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-dream text-white font-bold text-sm shadow-lg hover:shadow-glow-purple transition-all flex items-center gap-2"
          >
            {savedSuccess ? <Check className="w-5 h-5 text-emerald-300" /> : <Sparkles className="w-5 h-5" />}
            <span>{savedSuccess ? 'Settings Saved!' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Castle, 
  Sparkles, 
  BookOpen, 
  Headphones, 
  Trophy, 
  Users,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const FloatingDock: React.FC = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, setOpenAuthModal } = useAuth();

  const navItems = [
    { name: 'Room', path: '/', icon: Castle, emoji: '🛏️' },
    { name: 'Worlds', path: '/worlds', icon: Globe, emoji: '🌍' },
    { name: 'Create', path: '/create', icon: Sparkles, emoji: '✨', highlight: true },
    { name: 'Library', path: '/library', icon: BookOpen, emoji: '📚' },
    { name: 'Rewards', path: '/rewards', icon: Trophy, emoji: '🏆' },
    { name: 'Parent', path: '/parents', icon: Users, emoji: '👨‍👩‍👧' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex items-center justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-auto flex items-center gap-1 sm:gap-2.5 p-2 sm:p-2.5 rounded-full bg-[#152454]/85 backdrop-blur-2xl border border-dream-purple/40 shadow-glass-magic shadow-glow-purple"
      >
        {navItems.map((item) => {
          const active = isActive(item.path);

          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 sm:py-2.5 rounded-full bg-gradient-magic text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-glow-purple hover:scale-110 active:scale-95 transition-all"
              >
                <span className="text-base">{item.emoji}</span>
                <span className="hidden sm:inline">Create</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                active
                  ? 'bg-dream-purple text-white shadow-md scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-base">{item.emoji}</span>
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}

        {/* Quick Theme Toggle in Dock */}
        <button
          onClick={toggleDarkMode}
          title="Toggle Night Theme"
          className="p-2 rounded-full bg-white/10 text-dream-gold hover:scale-110 transition-all ml-1 border border-white/10"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-dream-gold" /> : <Moon className="w-4 h-4 text-dream-sky" />}
        </button>

        {/* User Profile Avatar / Sign In */}
        {user ? (
          <Link
            to="/profile"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-dream-pink hover:scale-110 transition-all shrink-0"
          >
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </Link>
        ) : (
          <button
            onClick={() => setOpenAuthModal(true)}
            className="p-2 rounded-full bg-dream-purple/30 text-white text-xs font-bold hover:bg-dream-purple transition-all"
          >
            Sign In
          </button>
        )}
      </motion.nav>
    </div>
  );
};

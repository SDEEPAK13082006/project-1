import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  Moon, 
  Sun, 
  User, 
  Menu, 
  X, 
  Award, 
  BarChart3, 
  Image as ImageIcon,
  HelpCircle,
  Mail,
  DollarSign
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useStory } from '../../context/StoryContext';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, setOpenAuthModal } = useAuth();
  const { stories } = useStory();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Generate Story', path: '/generate', icon: Sparkles, highlight: true },
    { name: 'My Stories', path: '/my-stories', count: stories.length },
    { name: 'Parent Dashboard', path: '/parents', icon: BarChart3 },
    { name: 'Achievements', path: '/achievements', icon: Award },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Pricing', path: '/pricing', icon: DollarSign },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 bg-white/70 dark:bg-slate-900/75 backdrop-blur-xl border-b border-purple-100/50 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dream-purple via-dream-pink to-dream-yellow p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-dream-purple dark:text-dream-pink" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-sans tracking-tight text-gradient-primary">
              DreamTales
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
              Bedtime Generator
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            if (link.highlight) {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="ml-2 px-4 py-2 rounded-2xl bg-gradient-dream text-white font-semibold text-sm shadow-md hover:shadow-glow-purple hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>Generate Story</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  active 
                    ? 'bg-purple-100/80 dark:bg-purple-950/60 text-dream-purple dark:text-dream-soft font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.name}</span>
                {link.count !== undefined && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-dream-purple/10 text-dream-purple dark:bg-dream-purple/30 dark:text-dream-pink">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:scale-105 transition-all border border-slate-200/60 dark:border-slate-700/60"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-dream-purple" />}
          </button>

          {/* User Auth Profile / Button */}
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 hover:bg-purple-100/70 transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-dream-purple/40"
              />
              <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200">
                {user.name.split(' ')[0]}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:border-dream-purple transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-2xl text-base font-medium flex items-center justify-between ${
                isActive(link.path)
                  ? 'bg-dream-purple/10 text-dream-purple dark:bg-dream-purple/20 dark:text-dream-pink font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon && <link.icon className="w-5 h-5 text-dream-purple" />}
                <span>{link.name}</span>
              </div>
              {link.count !== undefined && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-dream-purple/20 text-dream-purple">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

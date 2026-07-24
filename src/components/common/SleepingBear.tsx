import React from 'react';
import { motion } from 'framer-motion';

export const SleepingBear: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center">
      {/* Glow aura */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-dream-purple/30 via-dream-pink/20 to-dream-yellow/40 blur-2xl animate-breathe" />

      {/* Floating ZZZ animation */}
      <motion.div
        animate={{ y: [-5, -25, -45], opacity: [0, 1, 0], scale: [0.8, 1.1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeOut' }}
        className="absolute -top-4 right-12 text-dream-purple dark:text-dream-pink font-bold text-2xl font-handwriting select-none"
      >
        Z z z ...
      </motion.div>

      <motion.div
        animate={{ y: [-2, -20, -35], opacity: [0, 0.8, 0], scale: [0.6, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: 'easeOut' }}
        className="absolute top-4 right-6 text-dream-blue font-bold text-xl font-handwriting select-none"
      >
        Z z ...
      </motion.div>

      {/* Bear SVG Card container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full p-4 rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 shadow-glass flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-900 dark:text-purple-100">
          {/* Moon cloud pillow */}
          <ellipse cx="100" cy="150" rx="75" ry="30" fill="url(#cloudGrad)" />
          
          {/* Bear Body */}
          <ellipse cx="100" cy="125" rx="45" ry="35" fill="#D97706" />
          
          {/* Bear Head */}
          <circle cx="100" cy="85" r="32" fill="#D97706" />
          
          {/* Bear Ears */}
          <circle cx="75" cy="62" r="11" fill="#B45309" />
          <circle cx="75" cy="62" r="6" fill="#FDE68A" />
          <circle cx="125" cy="62" r="11" fill="#B45309" />
          <circle cx="125" cy="62" r="6" fill="#FDE68A" />

          {/* Bear Snout */}
          <ellipse cx="100" cy="92" rx="14" ry="10" fill="#FEF3C7" />
          <ellipse cx="100" cy="88" rx="6" ry="4" fill="#78350F" />

          {/* Sleeping Eyes (Curved Lines) */}
          <path d="M 85 82 Q 90 87 95 82" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 105 82 Q 110 87 115 82" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cute Rosy Cheeks */}
          <circle cx="82" cy="90" r="5" fill="#F43F5E" opacity="0.5" />
          <circle cx="118" cy="90" r="5" fill="#F43F5E" opacity="0.5" />

          {/* Nightcap */}
          <path d="M 75 68 Q 100 45 135 60 Q 120 40 90 48 Z" fill="#8B5CF6" />
          <circle cx="135" cy="60" r="7" fill="#FDE68A" />

          {/* Hugged Glowing Star */}
          <polygon points="100,115 103,123 112,123 105,128 107,136 100,131 93,136 95,128 88,123 97,123" fill="#FBBF24" />

          {/* Gradients */}
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};

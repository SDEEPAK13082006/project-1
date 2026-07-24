import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';
import { MagicalSparkles } from '../common/MagicalSparkles';

export const MagicBookLoader: React.FC = () => {
  const messages = [
    "Writing Story...",
    "Creating Characters...",
    "Painting Illustrations...",
    "Adding Magic...",
    "Recording Voice...",
    "Creating Happy Ending..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0E1A40]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in overflow-hidden">
      
      {/* Background Magic Particles */}
      <MagicalSparkles count={25} />

      {/* Floating Glowing Moon Overlay */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="w-32 h-32 rounded-full bg-gradient-to-tr from-dream-gold via-amber-200 to-white shadow-glow-gold flex items-center justify-center mb-8 border-4 border-white/40"
      >
        <Wand2 className="w-14 h-14 text-purple-950 animate-bounce" />
      </motion.div>

      {/* Huge Opening 3D Book SVG Graphics */}
      <motion.div
        animate={{ rotateY: [0, -180, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="relative w-64 h-44 sm:w-80 sm:h-56 bg-gradient-to-r from-dream-purple to-indigo-900 rounded-2xl shadow-2xl border-4 border-dream-gold p-4 flex items-center justify-between mb-8 overflow-hidden"
      >
        {/* Book spine */}
        <div className="w-4 h-full bg-amber-500/40 rounded-sm" />
        
        <div className="flex-1 px-4 space-y-2 text-left">
          <div className="h-3 bg-dream-gold/60 rounded-full w-3/4 animate-pulse" />
          <div className="h-2.5 bg-dream-cream/40 rounded-full w-full animate-pulse" />
          <div className="h-2.5 bg-dream-sky/40 rounded-full w-5/6 animate-pulse" />
          <div className="h-2.5 bg-dream-pink/40 rounded-full w-2/3 animate-pulse" />
        </div>

        <div className="text-3xl animate-pulse">✨</div>
      </motion.div>

      {/* Cycling Status Messages */}
      <AnimatePresence mode="wait">
        <motion.h3
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-dream-gold via-dream-pink to-dream-sky tracking-wide"
        >
          {messages[messageIndex]}
        </motion.h3>
      </AnimatePresence>

      <p className="text-xs sm:text-sm text-slate-300 max-w-sm mt-3 font-sans">
        Preparing tonight's magical bedtime story with your child's name and favorite animal!
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-white/10 rounded-full overflow-hidden mt-6 border border-white/20">
        <div className="w-full h-full bg-gradient-magic animate-pulse" />
      </div>
    </div>
  );
};

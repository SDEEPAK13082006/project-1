import React from 'react';
import { motion } from 'framer-motion';

export const FloatingStars: React.FC = () => {
  // Generate star coordinates
  const stars = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 85)}%`,
    left: `${Math.floor(Math.random() * 95)}%`,
    size: Math.random() * 12 + 8,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Moon */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-10 right-10 md:top-16 md:right-24 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300 dark:from-yellow-200 dark:to-amber-400 shadow-glow-yellow flex items-center justify-center border-4 border-white/30 backdrop-blur-md opacity-90"
      >
        {/* Moon craters */}
        <div className="w-6 h-6 rounded-full bg-amber-300/40 absolute top-4 left-6" />
        <div className="w-4 h-4 rounded-full bg-amber-300/40 absolute bottom-6 right-8" />
        <div className="w-3 h-3 rounded-full bg-amber-300/40 absolute top-12 right-6" />
        
        {/* Soft night glow ring */}
        <div className="absolute -inset-4 rounded-full bg-yellow-300/20 blur-xl -z-10" />
      </motion.div>

      {/* Floating Clouds */}
      <motion.div
        animate={{ x: ['-20%', '110%'] }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
        className="absolute top-20 left-0 opacity-40 dark:opacity-20"
      >
        <div className="w-48 h-16 bg-white dark:bg-purple-900 rounded-full blur-sm shadow-lg" />
      </motion.div>

      <motion.div
        animate={{ x: ['110%', '-20%'] }}
        transition={{ repeat: Infinity, duration: 55, ease: 'linear' }}
        className="absolute top-48 right-0 opacity-30 dark:opacity-15"
      >
        <div className="w-64 h-20 bg-sky-200 dark:bg-indigo-900 rounded-full blur-md" />
      </motion.div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut"
          }}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          className="absolute text-amber-300 dark:text-yellow-200 drop-shadow-md select-none"
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

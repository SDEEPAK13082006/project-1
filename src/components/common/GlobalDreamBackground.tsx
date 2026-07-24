import React from 'react';
import { motion } from 'framer-motion';

export const GlobalDreamBackground: React.FC = () => {
  // Firefly dots with random positions & float keyframes
  const fireflies = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 85)}%`,
    left: `${Math.floor(Math.random() * 95)}%`,
    size: Math.random() * 6 + 4,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 3,
  }));

  // Twinkling star positions
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 70)}%`,
    left: `${Math.floor(Math.random() * 98)}%`,
    size: Math.random() * 10 + 6,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#0B132B] via-[#0E1A40] to-[#1C1236]">
      
      {/* Animated Glowing Moon */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute top-8 right-8 md:top-14 md:right-20 w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#FFF7E8] via-[#FFD95E] to-[#F59E0B] shadow-glow-gold flex items-center justify-center border-4 border-white/20 backdrop-blur-md opacity-95 z-10"
      >
        <div className="w-8 h-8 rounded-full bg-amber-300/30 absolute top-5 left-7" />
        <div className="w-5 h-5 rounded-full bg-amber-300/30 absolute bottom-8 right-9" />
        <div className="w-4 h-4 rounded-full bg-amber-300/30 absolute top-14 right-7" />
        
        {/* Soft Moon Glow Aura */}
        <div className="absolute -inset-6 rounded-full bg-dream-gold/20 blur-2xl -z-10" />
      </motion.div>

      {/* Floating Clouds */}
      <motion.div
        animate={{ x: ['-20%', '110%'] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
        className="absolute top-16 left-0 opacity-30 z-10"
      >
        <div className="w-64 h-20 bg-dream-sky rounded-full blur-md" />
      </motion.div>

      <motion.div
        animate={{ x: ['110%', '-20%'] }}
        transition={{ repeat: Infinity, duration: 65, ease: 'linear' }}
        className="absolute top-44 right-0 opacity-20 z-10"
      >
        <div className="w-80 h-24 bg-dream-pink rounded-full blur-lg" />
      </motion.div>

      {/* Floating Fireflies */}
      {fireflies.map((ff) => (
        <motion.div
          key={ff.id}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: ff.duration,
            delay: ff.delay,
            ease: 'easeInOut'
          }}
          style={{
            top: ff.top,
            left: ff.left,
            width: `${ff.size}px`,
            height: `${ff.size}px`,
          }}
          className="absolute rounded-full bg-dream-gold shadow-glow-gold z-20"
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: 'easeInOut'
          }}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          className="absolute text-dream-gold drop-shadow-md select-none z-10"
        >
          ✦
        </motion.div>
      ))}

      {/* Soft Fog Layers */}
      <div className="absolute inset-x-0 bottom-24 h-40 bg-gradient-to-t from-dream-purple/10 to-transparent blur-xl pointer-events-none z-10" />

      {/* Parallax Forest Silhouette at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-40 z-10 flex items-end justify-between pointer-events-none">
        <svg viewBox="0 0 1200 120" className="w-full h-full text-[#070D22] fill-current">
          <path d="M0,120 L0,60 Q150,20 300,70 T600,40 T900,80 T1200,50 L1200,120 Z" />
          <polygon points="100,120 130,40 160,120" />
          <polygon points="250,120 280,30 310,120" />
          <polygon points="450,120 480,20 510,120" />
          <polygon points="700,120 730,35 760,120" />
          <polygon points="950,120 980,25 1010,120" />
        </svg>
      </div>
    </div>
  );
};

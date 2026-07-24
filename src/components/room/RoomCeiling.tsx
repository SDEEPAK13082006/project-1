import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';

export const RoomCeiling: React.FC = () => {
  const { reduceMotion } = useEnvironment();
  const [shootingStar, setShootingStar] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShootingStar(true);
      setTimeout(() => setShootingStar(false), 1500);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    delay: Math.random() * 4,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div className="absolute inset-x-0 top-0 h-[28%] overflow-hidden pointer-events-none z-10">
      {/* Deep ceiling gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070d2a] via-[#0e1a40] to-[#1a1240]/0" />

      {/* Aurora layer */}
      {!reduceMotion && (
        <>
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], x: ['-5%', '5%', '-5%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-[10%] w-[40%] h-[80%] rounded-full bg-purple-500/10 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.35, 0.1], x: ['5%', '-5%', '5%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-0 right-[10%] w-[35%] h-[70%] rounded-full bg-sky-400/10 blur-3xl"
          />
        </>
      )}

      {/* Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          animate={reduceMotion ? {} : { opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`
          }}
        />
      ))}

      {/* Shooting Star */}
      <AnimatePresence>
        {shootingStar && (
          <motion.div
            key="shooting-star"
            initial={{ x: '-5%', y: '10%', opacity: 0 }}
            animate={{ x: '110%', y: '80%', opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'linear' }}
            className="absolute top-[5%] left-0 w-24 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #FFD95E, white)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export const MagicalSparkles: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const sparkles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 90)}%`,
    left: `${Math.floor(Math.random() * 90)}%`,
    size: Math.random() * 16 + 10,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 1.5,
    color: ['#8B5CF6', '#EC4899', '#38BDF8', '#FBBF24'][i % 4]
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.4, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            repeat: Infinity,
            duration: sp.duration,
            delay: sp.delay,
            ease: "easeInOut"
          }}
          style={{
            top: sp.top,
            left: sp.left,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            color: sp.color
          }}
          className="absolute font-bold drop-shadow-sm select-none flex items-center justify-center"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

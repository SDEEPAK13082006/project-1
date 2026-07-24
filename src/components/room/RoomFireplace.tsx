import React from 'react';
import { motion } from 'framer-motion';

const FLAME_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: -15 + (i % 5) * 8,
  delay: i * 0.18,
  duration: 1.2 + Math.random() * 0.6,
  size: 8 + Math.random() * 12,
}));

export const RoomFireplace: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Fireplace mantle */}
      <div
        className="w-52 h-6 rounded-t-sm shadow-xl z-10"
        style={{ background: 'linear-gradient(to bottom, #e8d0b0, #c8a870)', border: '2px solid #8B6914' }}
      />

      {/* Fireplace Frame */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: '192px',
          height: '130px',
          borderRadius: '8px 8px 4px 4px',
          background: 'linear-gradient(to bottom, #5C3810, #3D2408)',
          border: '8px solid #5C3810',
          boxShadow: '0 0 0 3px #3D2408, 0 10px 40px rgba(0,0,0,0.6)'
        }}
      >
        {/* Inner firebox */}
        <div
          className="absolute inset-2 rounded-sm"
          style={{ background: 'linear-gradient(to top, #1a0a02 0%, #3d1a06 50%, #4a1a06 100%)' }}
        />

        {/* Fire glow on walls */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, #F59E0B44 0%, transparent 70%)' }}
        />

        {/* Ember base */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #FF4500, #FF6B35, transparent)', filter: 'blur(3px)' }}
        />

        {/* Flame particles */}
        {FLAME_PARTICLES.map(f => (
          <motion.div
            key={f.id}
            animate={{
              y: [0, -50 - Math.random() * 20, -80],
              x: [f.x, f.x + (Math.random() - 0.5) * 20],
              opacity: [0.9, 0.7, 0],
              scale: [1, 0.8, 0.3],
            }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              bottom: 12,
              left: `50%`,
              marginLeft: f.x,
              width: f.size,
              height: f.size * 1.5,
              background: f.id % 3 === 0
                ? 'radial-gradient(circle, #FFF176, #FF4500)'
                : f.id % 3 === 1
                  ? 'radial-gradient(circle, #FFD700, #FF6B35)'
                  : 'radial-gradient(circle, #FF6B35, #FF4500)',
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Log */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full"
          style={{ background: 'linear-gradient(to right, #3D2408, #5C3810, #3D2408)' }}
        />

        {/* Room glow from fire */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #F59E0B33, transparent 60%)' }}
        />
      </div>

      {/* Fireplace base */}
      <div
        className="w-56 h-5 rounded-b-sm shadow-xl"
        style={{ background: 'linear-gradient(to bottom, #5C3810, #3D2408)' }}
      />

      {/* Decorative items on mantle */}
      <div className="absolute top-0 inset-x-0 flex justify-around items-end px-2" style={{ height: 24 }}>
        <span className="text-sm">🕯️</span>
        <span className="text-sm">⭐</span>
        <span className="text-sm">🕯️</span>
      </div>

      {/* Floor glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 1.1, repeat: Infinity }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F59E0B33, transparent)', filter: 'blur(8px)' }}
      />
    </div>
  );
};

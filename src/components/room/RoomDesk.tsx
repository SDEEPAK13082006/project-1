import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  angle: (i / 24) * 360,
  radius: 70 + Math.random() * 20,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
}));

export const RoomDesk: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleStoryClick = () => {
    setIsOpen(true);
    // Spawn burst sparkles
    const burst = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 160 - 80,
      y: Math.random() * 160 - 80,
    }));
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 1200);
    setTimeout(() => navigate('/create'), 700);
  };

  return (
    <div className="relative flex flex-col items-center">

      {/* Floating particles ring around storybook */}
      <div className="relative" style={{ width: 200, height: 200 }}>
        {/* Burst sparkles */}
        <AnimatePresence>
          {sparkles.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-dream-gold pointer-events-none z-50"
              style={{ boxShadow: '0 0 8px #FFD95E' }}
            />
          ))}
        </AnimatePresence>

        {/* Orbiting particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={{ rotate: 360 }}
            transition={{ duration: 8 + p.delay, repeat: Infinity, ease: 'linear', delay: p.delay }}
            className="absolute inset-0 flex items-start justify-center pointer-events-none"
          >
            <div
              className="rounded-full bg-dream-gold/60"
              style={{
                width: p.size, height: p.size,
                marginTop: (100 - p.radius),
                boxShadow: `0 0 ${p.size * 2}px #FFD95E66`
              }}
            />
          </motion.div>
        ))}

        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-dream-gold/30"
          style={{ boxShadow: '0 0 40px #FFD95E44, inset 0 0 40px #FFD95E22' }}
        />

        {/* The Magic Storybook */}
        <motion.button
          id="magic-storybook"
          onClick={handleStoryClick}
          animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, y: -15 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer focus:outline-none"
          style={{
            width: 110, height: 140,
            background: 'linear-gradient(135deg, #1a0a3d 0%, #2d1b69 40%, #4c1d95 100%)',
            borderRadius: '8px 4px 4px 8px',
            boxShadow: `
              0 0 40px #7C3AED88,
              0 0 80px #4C1D9544,
              inset 0 0 30px rgba(167,139,250,0.2),
              4px 0 8px rgba(0,0,0,0.5)
            `,
            border: '2px solid #7C3AEDaa',
          }}
        >
          {/* Book pages right side */}
          <div className="absolute -right-2 top-2 bottom-2 w-2 rounded-r-sm bg-gradient-to-b from-[#FFF7E8] to-[#FDE68A] opacity-70" />

          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-2 rounded-l-sm bg-gradient-to-b from-[#1a0a3d] to-[#0a0520]" />

          {/* Glowing runes */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >📖</motion.div>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1, 0.9] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-dream-gold text-[9px] font-bold text-center leading-tight"
            >
              ✨ DREAM<br />STORYBOOK ✨
            </motion.div>
            <div className="flex gap-1 mt-1">
              {['⭐', '🌙', '💫'].map((s, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                  className="text-[10px]"
                >{s}</motion.span>
              ))}
            </div>
          </div>

          {/* Book surface glow */}
          <div className="absolute inset-0 rounded-l-lg pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 40% 30%, rgba(167,139,250,0.3) 0%, transparent 70%)' }}
          />
        </motion.button>
      </div>

      {/* CTA Label */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-center text-dream-gold text-xs font-bold mt-1 tracking-widest uppercase drop-shadow"
        style={{ textShadow: '0 0 10px #FFD95E88' }}
      >
        ✨ Click to Begin Your Story
      </motion.div>

      {/* Round wooden table top */}
      <div
        className="mt-3 shadow-2xl"
        style={{
          width: '220px',
          height: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, #7C4A1E, #5C3810)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
        }}
      />

      {/* Table leg */}
      <div className="w-6 h-20 rounded-b-lg shadow-xl"
        style={{ background: 'linear-gradient(to right, #5C3810, #7C4A1E, #5C3810)' }}
      />
    </div>
  );
};

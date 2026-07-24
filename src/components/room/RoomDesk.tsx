import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ambientSynth } from '../../services/audioNarration';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  angle: (i / 20) * 360,
  radius: 65 + Math.random() * 25,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
}));

const BUTTERFLIES = [
  { id: 1, emoji: '🦋', startX: -40, startY: -20, delay: 0 },
  { id: 2, emoji: '🦋', startX: 45,  startY: -40, delay: 1.5 },
];

export const RoomDesk: React.FC = () => {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleStoryClick = () => {
    ambientSynth.playSoundEffect('pageturn');
    setIsOpening(true);

    // Spawn burst sparkles
    const burst = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
    }));
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 1200);

    // Zoom camera transition before navigation
    setTimeout(() => navigate('/create'), 600);
  };

  return (
    <div className="relative flex flex-col items-center">

      {/* Upward Light Rays */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-36 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: 140,
          height: 180,
          background: 'linear-gradient(to top, rgba(255,217,94,0.35) 0%, rgba(167,139,250,0.15) 50%, transparent 100%)',
          clipPath: 'polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Flying Butterflies */}
      {BUTTERFLIES.map(b => (
        <motion.div
          key={b.id}
          animate={{
            x: [b.startX, b.startX + 20, b.startX - 15, b.startX],
            y: [b.startY, b.startY - 25, b.startY + 10, b.startY],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 6,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-xl pointer-events-none z-30 select-none drop-shadow-md"
        >
          {b.emoji}
        </motion.div>
      ))}

      {/* Storybook container */}
      <div className="relative" style={{ width: 200, height: 200 }}>
        {/* Burst sparkles */}
        <AnimatePresence>
          {sparkles.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-dream-gold pointer-events-none z-50"
              style={{ boxShadow: '0 0 12px #FFD95E' }}
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
              className="rounded-full bg-dream-gold/70"
              style={{
                width: p.size, height: p.size,
                marginTop: (100 - p.radius),
                boxShadow: `0 0 ${p.size * 2.5}px #FFD95E`
              }}
            />
          </motion.div>
        ))}

        {/* Outer glow aura */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-dream-gold/40"
          style={{ boxShadow: '0 0 50px rgba(255,217,94,0.5), inset 0 0 30px rgba(255,217,94,0.2)' }}
        />

        {/* The Magic Storybook Hero Trigger */}
        <motion.button
          id="magic-storybook"
          onClick={handleStoryClick}
          animate={isOpening ? { scale: 1.4, rotateY: 180, opacity: 0 } : { y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] }}
          transition={isOpening ? { duration: 0.6 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.14, y: -16 }}
          whileTap={{ scale: 0.94 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer focus:outline-none"
          style={{
            width: 116, height: 146,
            background: 'linear-gradient(135deg, #1a0a3d 0%, #2d1b69 40%, #4c1d95 100%)',
            borderRadius: '8px 4px 4px 8px',
            boxShadow: `
              0 0 45px #7C3AEDaa,
              0 0 90px #4C1D9566,
              inset 0 0 30px rgba(255,217,94,0.3),
              4px 0 10px rgba(0,0,0,0.6)
            `,
            border: '2px solid rgba(255,217,94,0.7)',
          }}
        >
          {/* Book pages right side */}
          <div className="absolute -right-2 top-2 bottom-2 w-2 rounded-r-sm bg-gradient-to-b from-[#FFF7E8] to-[#FDE68A] opacity-80" />

          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 rounded-l-sm bg-gradient-to-b from-[#1a0a3d] to-[#0a0520] border-r border-amber-400/40" />

          {/* Cover emblem */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl filter drop-shadow-md"
            >
              📖
            </motion.div>
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-dream-gold text-[9.5px] font-extrabold text-center leading-tight tracking-wider"
              style={{ textShadow: '0 0 8px rgba(255,217,94,0.8)' }}
            >
              ✨ CREATE<br />STORY ✨
            </motion.div>
            <div className="flex gap-1.5 mt-0.5">
              {['⭐', '🌙', '💫'].map((s, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                  className="text-[10px]"
                >{s}</motion.span>
              ))}
            </div>
          </div>

          {/* Book surface shine */}
          <div className="absolute inset-0 rounded-l-lg pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 35% 25%, rgba(255,217,94,0.25) 0%, transparent 70%)' }}
          />
        </motion.button>
      </div>

      {/* CTA Label */}
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75], y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-center text-dream-gold text-xs font-extrabold mt-1 tracking-widest uppercase"
        style={{ textShadow: '0 0 12px rgba(255,217,94,0.8)' }}
      >
        ✨ Click Book to Begin Bedtime Story
      </motion.div>

      {/* Round wooden table top */}
      <div
        className="mt-3 shadow-2xl relative"
        style={{
          width: '230px',
          height: '22px',
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #7C4A1E 0%, #5C3810 100%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.15)',
          border: '1px solid #3D2408',
        }}
      >
        {/* Table top wood grain ring */}
        <div className="absolute inset-2 rounded-full border border-amber-900/40 opacity-50 pointer-events-none" />
      </div>

      {/* Table leg */}
      <div className="w-7 h-20 rounded-b-xl shadow-xl"
        style={{ background: 'linear-gradient(90deg, #3D2408 0%, #7C4A1E 50%, #3D2408 100%)' }}
      />
    </div>
  );
};

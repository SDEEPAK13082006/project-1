import React from 'react';
import { motion } from 'framer-motion';

const FLOOR_PLANKS = Array.from({ length: 12 }, (_, i) => i);
const MUSHROOMS = [
  { x: 8, size: 16 }, { x: 22, size: 12 }, { x: 78, size: 14 }, { x: 90, size: 18 }
];
const FOOTPRINTS = [
  { x: 35, rotate: 10 }, { x: 45, rotate: -5 }, { x: 55, rotate: 8 }
];

export const RoomFloor: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '22%' }}>
      {/* Wooden plank base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #8B5E3C 0%, #6B4226 40%, #5C3617 100%)',
        }}
      />

      {/* Individual floor planks with perspective */}
      {FLOOR_PLANKS.map(i => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${(i / 12) * 100}%`,
            top: 0,
            bottom: 0,
            width: `${100 / 12}%`,
            borderRight: '1px solid rgba(0,0,0,0.2)',
            background: i % 2 === 0
              ? 'linear-gradient(to right, rgba(0,0,0,0.05), rgba(255,255,255,0.03))'
              : 'linear-gradient(to right, rgba(255,255,255,0.02), rgba(0,0,0,0.04))',
          }}
        />
      ))}

      {/* Horizontal grain lines */}
      {[20, 40, 60, 80].map((top, i) => (
        <div
          key={i}
          className="absolute inset-x-0 h-px opacity-20"
          style={{ top: `${top}%`, background: 'rgba(0,0,0,0.4)' }}
        />
      ))}

      {/* Magic carpet */}
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '45%',
          height: '55%',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #7C3AED, #4C1D95, #6D28D9, #7C3AED)',
          backgroundSize: '200% 200%',
          border: '2px solid #A78BFA',
          boxShadow: '0 0 20px rgba(124,58,237,0.3)',
          opacity: 0.8,
        }}
      >
        {/* Carpet pattern */}
        <div className="absolute inset-2 rounded"
          style={{ border: '1px solid #A78BFA44', opacity: 0.5 }}
        />
        <div className="absolute inset-4 rounded"
          style={{ border: '1px solid #A78BFA33', opacity: 0.3 }}
        />
        {/* Carpet fringe left */}
        <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="w-full h-[2px] bg-dream-gold/50 rounded-full" />
          ))}
        </div>
        {/* Carpet fringe right */}
        <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="w-full h-[2px] bg-dream-gold/50 rounded-full" />
          ))}
        </div>
      </motion.div>

      {/* Glowing mushrooms */}
      {MUSHROOMS.map((m, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -2, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
          className="absolute bottom-2 select-none pointer-events-none"
          style={{ left: `${m.x}%`, fontSize: m.size }}
        >
          🍄
        </motion.div>
      ))}

      {/* Magic footprints */}
      {FOOTPRINTS.map((f, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, delay: i * 1.2, repeat: Infinity }}
          className="absolute bottom-8 text-dream-gold/60 text-lg pointer-events-none select-none"
          style={{ left: `${f.x}%`, transform: `rotate(${f.rotate}deg)` }}
        >
          👣
        </motion.div>
      ))}

      {/* Toy blocks */}
      <div className="absolute bottom-2 left-[15%] flex gap-1">
        {['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'].map((c, i) => (
          <motion.div
            key={i}
            animate={{ rotate: [i % 2 === 0 ? -3 : 3, i % 2 === 0 ? 3 : -3] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, repeatType: 'reverse' }}
            className="w-5 h-5 rounded-sm shadow"
            style={{ background: c, border: `2px solid ${c}88` }}
          />
        ))}
      </div>

      {/* Floor glow from fireplace */}
      <div
        className="absolute bottom-0 left-8 w-48 h-12 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.12), transparent)', filter: 'blur(10px)' }}
      />

      {/* Ambient floor reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(167,139,250,0.04) 0%, transparent 100%)' }}
      />
    </div>
  );
};

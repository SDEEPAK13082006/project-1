import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BEAR_QUOTES = [
  '🌟 Time for a story, friend!',
  '😴 I love bedtime adventures...',
  '🌙 The moon is watching us!',
  '💫 Dream big tonight!',
  '🧸 Hug me and sleep tight!',
];

export const RoomBed: React.FC<{ onBedClick: () => void }> = ({ onBedClick }) => {
  const [teddyMsg, setTeddyMsg] = useState<string | null>(null);

  const handleTeddyClick = () => {
    const msg = BEAR_QUOTES[Math.floor(Math.random() * BEAR_QUOTES.length)];
    setTeddyMsg(msg);
    setTimeout(() => setTeddyMsg(null), 3000);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Night Lamp */}
      <div className="absolute -right-6 -top-20 z-20 flex flex-col items-center">
        {/* Lamp glow halo */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 w-14 h-14 rounded-full bg-amber-300/20 blur-xl"
        />
        {/* Lamp shade */}
        <div style={{
          width: 0, height: 0,
          borderLeft: '18px solid transparent',
          borderRight: '18px solid transparent',
          borderBottom: '30px solid #F59E0B'
        }} />
        {/* Lamp pole */}
        <div className="w-2 h-14 bg-gradient-to-b from-[#7C4A1E] to-[#5C3810] rounded-b-sm" />
        {/* Lamp base */}
        <div className="w-8 h-3 rounded-full bg-[#5C3810] shadow" />
      </div>

      {/* Bedside table */}
      <div
        className="absolute -right-14 bottom-0 w-16 h-12 rounded-t-sm shadow-lg"
        style={{ background: 'linear-gradient(to bottom, #7C4A1E, #5C3810)' }}
      />

      {/* Headboard */}
      <div
        className="w-64 h-16 rounded-t-[40px] shadow-xl z-10 relative flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, #6B3A15, #4A2810)', border: '4px solid #3D2408' }}
      >
        {/* Carved moon */}
        <div className="text-amber-300/60 text-2xl">🌙</div>
        {/* Headboard shine */}
        <div className="absolute inset-x-4 top-2 h-2 rounded-full bg-white/10" />
      </div>

      {/* Mattress & Pillows */}
      <div
        onClick={onBedClick}
        className="relative w-64 cursor-pointer group z-10"
        style={{ height: 60 }}
      >
        {/* Mattress */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute inset-0 rounded-b-xl rounded-t-sm shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
            border: '3px solid #F59E0B',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}
        />

        {/* Blanket */}
        <motion.div
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-0 inset-x-0 h-10 rounded-b-xl"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #A78BFA, #7C3AED)',
            border: '2px solid #7C3AED'
          }}
        />

        {/* Pillow left */}
        <div className="absolute top-2 left-4 w-20 h-10 rounded-xl bg-white shadow-md border border-gray-200" />
        {/* Pillow right */}
        <div className="absolute top-2 right-4 w-20 h-10 rounded-xl bg-white shadow-md border border-gray-200" />

        {/* Hover: Bedtime Mode badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="bg-black/60 text-dream-gold text-[10px] font-bold px-3 py-1 rounded-full border border-dream-gold/50">
            💤 Bedtime Mode
          </div>
        </div>
      </div>

      {/* Bed Frame (foot board) */}
      <div
        className="w-64 h-6 rounded-b-lg shadow-xl z-10"
        style={{ background: 'linear-gradient(to bottom, #4A2810, #3D2408)' }}
      />

      {/* Teddy Bear on bed */}
      <div className="absolute bottom-8 left-16 z-30">
        <AnimatePresence>
          {teddyMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-max max-w-[150px] text-center"
            >
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-semibold px-3 py-2 rounded-2xl shadow-lg border border-dream-gold/30">
                {teddyMsg}
              </div>
              <div className="w-2 h-2 bg-white/90 rotate-45 mx-auto -mt-1 shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleTeddyClick}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ scale: 1.15, rotate: [-5, 5, -5], transition: { duration: 0.3 } }}
          className="text-4xl cursor-pointer select-none focus:outline-none drop-shadow-lg"
          title="Click Barnaby the Bear!"
        >
          🧸
        </motion.button>
      </div>
    </div>
  );
};

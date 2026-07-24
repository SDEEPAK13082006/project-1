import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ambientSynth } from '../../services/audioNarration';

const BEAR_QUOTES = [
  '🧸 Barnaby says: Time for a magical bedtime tale!',
  '😴 I love sleeping under the starry ceiling...',
  '🌙 The moon is watching over us tonight!',
  '💫 Hug me tightly & dream big dreams!',
  '💤 Click the bed to turn on cozy Bedtime Dim Mode!',
];

export const RoomBed: React.FC<{ onBedClick: () => void }> = ({ onBedClick }) => {
  const [teddyMsg, setTeddyMsg] = useState<string | null>(null);
  const [lampState, setLampState] = useState<'ON' | 'WARM' | 'MOONLIGHT' | 'OFF'>('ON');

  const handleTeddyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientSynth.playSoundEffect('magicChime');
    const msg = BEAR_QUOTES[Math.floor(Math.random() * BEAR_QUOTES.length)];
    setTeddyMsg(msg);
    setTimeout(() => setTeddyMsg(null), 3500);
  };

  const cycleLamp = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientSynth.playSoundEffect('click');
    const next = lampState === 'ON' ? 'WARM' : lampState === 'WARM' ? 'MOONLIGHT' : lampState === 'MOONLIGHT' ? 'OFF' : 'ON';
    setLampState(next);
  };

  const getLampColor = () => {
    switch (lampState) {
      case 'ON': return '#FDE68A';
      case 'WARM': return '#F59E0B';
      case 'MOONLIGHT': return '#7FD9FF';
      default: return '#334155';
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none z-10">

      {/* Interactive Night Lamp */}
      <div
        onClick={cycleLamp}
        className="absolute -right-6 -top-20 z-30 flex flex-col items-center cursor-pointer group"
        title={`Night Lamp (${lampState} - Click to switch)`}
      >
        {/* Lamp glow halo */}
        {lampState !== 'OFF' && (
          <motion.div
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-3 w-16 h-16 rounded-full blur-xl pointer-events-none"
            style={{ background: getLampColor() }}
          />
        )}
        {/* Lamp shade */}
        <div style={{
          width: 0, height: 0,
          borderLeft: '18px solid transparent',
          borderRight: '18px solid transparent',
          borderBottom: `30px solid ${getLampColor()}`,
          transition: 'border-color 0.3s',
        }} />
        {/* Lamp pole */}
        <div className="w-2 h-14 bg-gradient-to-b from-[#7C4A1E] to-[#5C3810] rounded-b-sm" />
        {/* Lamp base */}
        <div className="w-9 h-3 rounded-full bg-[#5C3810] shadow-md" />
      </div>

      {/* Bedside Table */}
      <div
        className="absolute -right-14 bottom-0 w-16 h-12 rounded-t-sm shadow-lg pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #7C4A1E, #5C3810)' }}
      />

      {/* Headboard with Carved Moon */}
      <div
        className="w-64 h-16 rounded-t-[40px] shadow-xl z-10 relative flex items-center justify-center pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #6B3A15, #4A2810)', border: '4px solid #3D2408' }}
      >
        {/* Carved Moon emblem */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-amber-300 text-2xl drop-shadow"
        >🌙</motion.div>
        {/* Headboard wood shine */}
        <div className="absolute inset-x-4 top-2 h-2 rounded-full bg-white/10" />
      </div>

      {/* Mattress, Pillows & Soft Blanket */}
      <div
        onClick={() => { ambientSynth.playSoundEffect('click'); onBedClick(); }}
        className="relative w-64 cursor-pointer group z-10"
        style={{ height: 62 }}
        title="Click to toggle Bedtime Dim Mode!"
      >
        {/* Mattress Base */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute inset-0 rounded-b-xl rounded-t-sm shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
            border: '3px solid #F59E0B',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        />

        {/* Breathing Soft Blanket */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 inset-x-0 h-11 rounded-b-xl"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #6D28D9 100%)',
            border: '2px solid #6D28D9'
          }}
        >
          {/* Blanket pattern */}
          <div className="absolute inset-x-2 top-2 bottom-2 rounded border border-white/15 pointer-events-none" />
        </motion.div>

        {/* Left Pillow */}
        <div className="absolute top-2 left-3 w-16 h-9 rounded-xl bg-white shadow-md border border-gray-200" />
        {/* Right Pillow */}
        <div className="absolute top-2 right-3 w-16 h-9 rounded-xl bg-white shadow-md border border-gray-200" />
        {/* Moon Pillow */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1 left-24 text-2xl drop-shadow pointer-events-none"
        >
          🌙
        </motion.div>

        {/* Hover Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="bg-black/80 text-dream-gold text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-dream-gold/60 shadow-xl">
            💤 Bedtime Mode
          </div>
        </div>
      </div>

      {/* Bed Frame Footboard */}
      <div
        className="w-64 h-6 rounded-b-lg shadow-xl z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #4A2810, #3D2408)' }}
      />

      {/* Animated Breathing Barnaby Teddy Bear */}
      <div className="absolute bottom-8 left-14 z-30">
        <AnimatePresence>
          {teddyMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-max max-w-[170px] text-center pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-md text-gray-900 text-[11px] font-extrabold px-3 py-2 rounded-2xl shadow-xl border border-dream-gold/40">
                {teddyMsg}
              </div>
              <div className="w-2 h-2 bg-white/95 rotate-45 mx-auto -mt-1 shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleTeddyClick}
          animate={{
            scaleY: [1, 1.06, 1],
            scaleX: [1, 0.97, 1],
            y: [0, -2, 0],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.2, rotate: [-6, 6, -6], transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl cursor-pointer select-none focus:outline-none drop-shadow-xl"
          title="Barnaby Teddy Bear (Click to talk!)"
        >
          🧸
        </motion.button>
      </div>
    </div>
  );
};

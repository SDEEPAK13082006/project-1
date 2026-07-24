import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ambientSynth } from '../../services/audioNarration';
import { useEnvironment } from '../../context/EnvironmentContext';
import confetti from 'canvas-confetti';

const TOY_ITEMS = [
  { id: 'rabbit', emoji: '🐰', name: 'Barnaby Bunny', quote: 'Hop hop! Time for a magical bedtime story!' },
  { id: 'dino',   emoji: '🦖', name: 'Rexy Dino',     quote: 'ROAR! I protect you from bad dreams!' },
  { id: 'blocks', emoji: '🧱', name: 'Magic Blocks',  quote: 'Building castle towers to the moon!' },
  { id: 'wand',   emoji: '🪄', name: 'Sparkle Wand',  quote: '✨ Bibbidi-Bobbidi-Boo! Wish Granted!' },
];

export const InteractiveToyBox: React.FC = () => {
  const { collectShootingStar } = useEnvironment();
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleToyClick = (toy: typeof TOY_ITEMS[0]) => {
    ambientSynth.playSoundEffect('magicChime');
    setActiveMessage(`${toy.name}: "${toy.quote}"`);
    
    if (toy.id === 'wand') {
      collectShootingStar();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }

    // Burst sparkles
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 80 - 20,
    }));
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 1000);

    setTimeout(() => {
      setActiveMessage(null);
    }, 3500);
  };

  return (
    <div className="relative flex flex-col items-center select-none z-20">
      {/* Speech Bubble */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-max max-w-[200px] text-center pointer-events-none z-30"
          >
            <div className="bg-white/95 backdrop-blur-md text-gray-900 text-[11px] font-extrabold px-3 py-2 rounded-2xl shadow-2xl border border-dream-gold/40">
              {activeMessage}
            </div>
            <div className="w-2.5 h-2.5 bg-white/95 rotate-45 mx-auto -mt-1 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 w-2.5 h-2.5 rounded-full bg-dream-gold pointer-events-none z-40"
            style={{ boxShadow: '0 0 10px #FFD95E' }}
          />
        ))}
      </AnimatePresence>

      {/* Toy Chest Body */}
      <div className="relative flex flex-col items-center">
        {/* Toys peeking out top */}
        <div className="flex gap-2 items-end mb-[-6px] relative z-10">
          {TOY_ITEMS.map((toy, i) => (
            <motion.button
              key={toy.id}
              onClick={() => handleToyClick(toy)}
              whileHover={{ y: -8, scale: 1.25, rotate: i % 2 === 0 ? 8 : -8 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl sm:text-3xl cursor-pointer focus:outline-none drop-shadow-md"
              title={`Click ${toy.name}!`}
            >
              {toy.emoji}
            </motion.button>
          ))}
        </div>

        {/* Toy Box Container */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative cursor-pointer rounded-xl overflow-hidden shadow-2xl border-4"
          style={{
            width: 140,
            height: 54,
            background: 'linear-gradient(180deg, #7C4A1E 0%, #5C3810 100%)',
            borderColor: '#3D2408',
            boxShadow: '0 8px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)',
          }}
        >
          {/* Golden latch & straps */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-300 border border-amber-700 flex items-center justify-center shadow-md">
            <span className="text-[9px]">🗝️</span>
          </div>

          {/* Wooden plank vertical grooves */}
          <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
            <div className="w-px h-full bg-black" />
            <div className="w-px h-full bg-black" />
            <div className="w-px h-full bg-black" />
          </div>

          {/* Stars detail on box */}
          <div className="absolute bottom-1 inset-x-2 flex justify-between text-[9px] text-dream-gold/60 pointer-events-none">
            <span>⭐</span>
            <span>✨</span>
            <span>⭐</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

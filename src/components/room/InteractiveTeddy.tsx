import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';
import confetti from 'canvas-confetti';

export const InteractiveTeddy: React.FC = () => {
  const { clickTeddy, teddyClickCount } = useEnvironment();
  const [speech, setSpeech] = useState<string | null>(null);

  const isDancing = teddyClickCount > 0 && teddyClickCount % 5 === 0;

  const handleClick = () => {
    ambientSynth.playSoundEffect('click');
    clickTeddy();

    if ((teddyClickCount + 1) % 5 === 0) {
      setSpeech("🎉 Dancing Teddy Time!");
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } else {
      setSpeech("Ready for tonight's adventure? ✨");
    }

    setTimeout(() => {
      setSpeech(null);
    }, 3500);
  };

  return (
    <div className="relative flex flex-col items-center select-none z-20">
      
      {/* Speech Bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-0 px-4 py-2 rounded-2xl bg-[#152454] border border-dream-gold text-dream-gold font-extrabold text-xs shadow-glow-gold whitespace-nowrap"
          >
            🧸 Barnaby: {speech}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teddy Bear Container */}
      <motion.div
        animate={
          isDancing
            ? { rotate: [-15, 15, -15, 15, 0], y: [0, -15, 0, -15, 0] }
            : { y: [0, -4, 0], scale: [1, 1.02, 1] }
        }
        transition={{ repeat: Infinity, duration: isDancing ? 0.8 : 4 }}
        onClick={handleClick}
        className="w-24 h-24 sm:w-28 sm:h-28 cursor-pointer relative group flex items-center justify-center"
        title="Barnaby Teddy Bear (Click me!)"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700 drop-shadow-2xl">
          {/* Bear Ears */}
          <circle cx="28" cy="25" r="12" fill="#B45309" />
          <circle cx="28" cy="25" r="6" fill="#FDE68A" />
          <circle cx="72" cy="25" r="12" fill="#B45309" />
          <circle cx="72" cy="25" r="6" fill="#FDE68A" />

          {/* Bear Head */}
          <circle cx="50" cy="40" r="24" fill="#D97706" />

          {/* Snout */}
          <ellipse cx="50" cy="46" rx="10" ry="7" fill="#FEF3C7" />
          <ellipse cx="50" cy="43" rx="4" ry="3" fill="#78350F" />

          {/* Eyes (Blinking animation) */}
          <circle cx="40" cy="36" r="2.5" fill="#78350F" />
          <circle cx="60" cy="36" r="2.5" fill="#78350F" />

          {/* Cute Rosy Cheeks */}
          <circle cx="36" cy="44" r="3.5" fill="#F43F5E" opacity="0.6" />
          <circle cx="64" cy="44" r="3.5" fill="#F43F5E" opacity="0.6" />

          {/* Bear Body */}
          <ellipse cx="50" cy="72" rx="22" ry="18" fill="#D97706" />
          <ellipse cx="50" cy="72" rx="12" ry="10" fill="#FEF3C7" />

          {/* Paws */}
          <circle cx="28" cy="70" r="7" fill="#B45309" />
          <circle cx="72" cy="70" r="7" fill="#B45309" />
        </svg>

        {/* Floating Sparkle on Hover */}
        <div className="absolute -top-2 -right-2 text-dream-gold opacity-0 group-hover:opacity-100 transition-opacity animate-pulse text-lg">
          ✨
        </div>
      </motion.div>
    </div>
  );
};

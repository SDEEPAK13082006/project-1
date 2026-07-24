import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ambientSynth } from '../../services/audioNarration';

export const InteractiveOwl: React.FC = () => {
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const tips = [
    "Hoo-hoo! Reading bedtime stories boosts child imagination and vocabulary!",
    "Tip: Turn on Soft Rain ambient soundscapes for faster sleep!",
    "Oliver says: You are brave, kind, and magical!",
    "Try creating a story with a Dragon and a Teddy Bear tonight!"
  ];

  const handleClick = () => {
    ambientSynth.playSoundEffect('click');
    setClickCount(prev => prev + 1);

    if ((clickCount + 1) % 3 === 0) {
      setSpeech("🧙‍♂️ Abracadabra! Wizard Oliver unlocked!");
    } else {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setSpeech(randomTip);
    }

    setTimeout(() => {
      setSpeech(null);
    }, 4000);
  };

  return (
    <div className="relative flex flex-col items-center select-none z-20">
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 px-4 py-2 rounded-2xl bg-[#152454] border border-dream-sky text-dream-sky font-extrabold text-xs shadow-glow-sky max-w-xs text-center z-30"
          >
            🦉 Oliver: {speech}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4 }}
        onClick={handleClick}
        className="text-4xl sm:text-5xl cursor-pointer hover:scale-125 transition-transform"
        title="Oliver Wise Owl (Click for Bedtime Tips!)"
      >
        🦉
      </motion.div>
    </div>
  );
};

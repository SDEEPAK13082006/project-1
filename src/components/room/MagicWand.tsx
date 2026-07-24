import React from 'react';
import { motion } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';
import confetti from 'canvas-confetti';

export const MagicWand: React.FC = () => {
  const { setCurrentWeather } = useEnvironment();

  const handleWandClick = () => {
    ambientSynth.playSoundEffect('magicChime');
    
    const weathers = ['Forest', 'Ocean', 'Space', 'Castle', 'Snow', 'Rain', 'Magic'] as const;
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    setCurrentWeather(randomWeather);

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWandClick}
      className="text-3xl sm:text-4xl cursor-pointer select-none z-20"
      title="Magic Wand (Click to cast magic weather!)"
    >
      🪄
    </motion.div>
  );
};

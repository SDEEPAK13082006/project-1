import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';
import confetti from 'canvas-confetti';

export const ShootingStarNotifier: React.FC = () => {
  const { collectShootingStar, shootingStarPoints } = useEnvironment();
  const [activeStar, setActiveStar] = useState<boolean>(false);
  const [wishMessage, setWishMessage] = useState<string | null>(null);

  useEffect(() => {
    const triggerRandomStar = () => {
      setActiveStar(true);
      setTimeout(() => setActiveStar(false), 4000);
    };

    const interval = setInterval(() => {
      triggerRandomStar();
    }, 25000); // Triggers every 25s

    return () => clearInterval(interval);
  }, []);

  const handleStarClick = () => {
    ambientSynth.playSoundEffect('magicChime');
    collectShootingStar();
    setActiveStar(false);
    setWishMessage("🌟 Wish Granted! +50 Magic Dust Stars!");

    confetti({ particleCount: 70, spread: 70, origin: { y: 0.3 } });

    setTimeout(() => {
      setWishMessage(null);
    }, 3000);
  };

  return (
    <>
      {/* Wish Granted Popup */}
      <AnimatePresence>
        {wishMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-gradient-magic text-white font-extrabold text-xs sm:text-sm shadow-glow-purple"
          >
            {wishMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shooting Star Animation */}
      {activeStar && (
        <motion.div
          initial={{ x: '-10%', y: '10%', opacity: 0 }}
          animate={{ x: '110vw', y: '60vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, ease: 'linear' }}
          onClick={handleStarClick}
          className="fixed z-40 cursor-pointer p-3 select-none"
          title="Click the Shooting Star to make a wish!"
        >
          <div className="flex items-center gap-1 text-dream-gold font-extrabold text-2xl drop-shadow-glow">
            🌠 <span className="text-xs text-white font-bold bg-dream-purple/80 px-2 py-0.5 rounded-full">Make a Wish!</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ambientSynth } from '../../services/audioNarration';

const OWL_RECOMMENDATIONS = [
  "🦉 Hoo-hoo! Tonight, I recommend 'Oliver and the Starlit Forest'!",
  "💡 Bedtime Tip: Reading 15 minutes before bed improves memory & sleep quality!",
  "⭐ Stars whisper tales of dragons who love drinking warm cocoa!",
  "🌙 Sleep tight, brave dreamer! Magical adventures await in your sleep!",
  "🔮 Tip: Click the Magic Wand in the Toy Box for bonus Star Dust!",
  "📚 I know 1,000 bedtime stories! Which adventure shall we create tonight?",
];

export const InteractiveOwl: React.FC = () => {
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [headTilt, setHeadTilt] = useState<number>(0);

  // Periodic head tilt & blinking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setHeadTilt(prev => (prev === 0 ? (Math.random() > 0.5 ? 12 : -12) : 0));
      setTimeout(() => setIsBlinking(false), 250);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    ambientSynth.playSoundEffect('magicChime');
    setClickCount(prev => prev + 1);

    if ((clickCount + 1) % 4 === 0) {
      setSpeech("🧙‍♂️ Abracadabra! Wizard Oliver grants you +20 Magic Star Dust!");
    } else {
      const rec = OWL_RECOMMENDATIONS[Math.floor(Math.random() * OWL_RECOMMENDATIONS.length)];
      setSpeech(rec);
    }

    setTimeout(() => {
      setSpeech(null);
    }, 4500);
  };

  return (
    <div className="relative flex flex-col items-center select-none z-30">
      {/* Speech Bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[210px] text-center pointer-events-none z-40"
          >
            <div className="bg-[#0B132B]/95 backdrop-blur-md text-dream-gold text-[11px] font-extrabold px-3.5 py-2 rounded-2xl shadow-2xl border border-dream-sky/40">
              {speech}
            </div>
            <div className="w-2.5 h-2.5 bg-[#0B132B]/95 rotate-45 mx-auto -mt-1 shadow-sm border-r border-b border-dream-sky/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Owl Character */}
      <motion.button
        onClick={handleClick}
        animate={{
          rotate: headTilt,
          y: [0, -3, 0],
        }}
        transition={{
          rotate: { duration: 0.4, ease: 'easeOut' },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.25, rotate: [-10, 10, -10], transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer text-4xl sm:text-5xl focus:outline-none drop-shadow-xl"
        title="Oliver the Wise Owl (Click for story recommendations & tips!)"
      >
        {/* Animated Emoji representation */}
        <span className="relative inline-block">
          {isBlinking ? '🙈' : '🦉'}
        </span>

        {/* Glowing eyes aura */}
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-400/20 blur-md rounded-full pointer-events-none -z-10"
        />
      </motion.button>
    </div>
  );
};

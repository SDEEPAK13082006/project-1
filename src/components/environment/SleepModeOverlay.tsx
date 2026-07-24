import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sparkles, VolumeX, X } from 'lucide-react';
import { useEnvironment, SleepTimerOption } from '../../context/EnvironmentContext';
import { ambientSynth, SpeechNarrator } from '../../services/audioNarration';

export const SleepModeOverlay: React.FC = () => {
  const { 
    isSleepMode, 
    setIsSleepMode, 
    sleepTimer, 
    setSleepTimer,
    setBedtimeMode
  } = useEnvironment();

  const [countdown, setCountdown] = useState<number | null>(null);

  // Sleep Timer Auto Countdown
  useEffect(() => {
    if (sleepTimer === 'Off') {
      setCountdown(null);
      return;
    }

    const minutes = Number(sleepTimer);
    setCountdown(10); // Show 10-second countdown notification

    const timer = setTimeout(() => {
      setIsSleepMode(true);
      setBedtimeMode(true);
      SpeechNarrator.stop();
      ambientSynth.playAmbient('Forest');
    }, 10000);

    return () => clearTimeout(timer);
  }, [sleepTimer]);

  if (!isSleepMode && countdown === null) return null;

  return (
    <>
      {/* 10-Second Countdown Notification Banner */}
      <AnimatePresence>
        {countdown !== null && !isSleepMode && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-dream-purple via-indigo-900 to-[#0E1A40] text-dream-gold font-extrabold text-xs sm:text-sm border border-dream-gold shadow-glow-purple flex items-center gap-3"
          >
            <Moon className="w-5 h-5 text-dream-gold animate-bounce" />
            <span>🌙 Sleep mode begins in 10 seconds...</span>
            <button
              onClick={() => {
                setSleepTimer('Off');
                setCountdown(null);
              }}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Sleep Mode Screen Dimming Overlay */}
      {isSleepMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          className="fixed inset-0 z-50 bg-[#070D22] backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center select-none"
        >
          {/* Glowing Moon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#FFF7E8] via-[#FFD95E] to-amber-400 shadow-glow-gold flex items-center justify-center mb-6 border-4 border-white/40"
          >
            <span className="text-6xl">🌙</span>
          </motion.div>

          <h2 className="text-4xl font-extrabold text-dream-gold font-sans tracking-wide mb-2">
            Sweet Dreams
          </h2>
          <p className="text-base text-dream-cream max-w-sm font-sans mb-8">
            See you tomorrow for another magical bedtime adventure!
          </p>

          <div className="flex items-center gap-3 text-3xl mb-8">
            <span>🧸</span>
            <span>📖</span>
            <span>⭐</span>
          </div>

          <button
            onClick={() => {
              setIsSleepMode(false);
              setBedtimeMode(false);
            }}
            className="px-8 py-3 rounded-full bg-dream-purple text-white font-extrabold text-sm shadow-glow-purple hover:scale-105 transition-all"
          >
            Awake & Continue Reading ✨
          </button>
        </motion.div>
      )}
    </>
  );
};

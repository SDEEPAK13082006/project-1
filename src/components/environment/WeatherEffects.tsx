import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, WeatherTheme } from '../../context/EnvironmentContext';

export const WeatherEffects: React.FC = () => {
  const { currentWeather, reduceMotion } = useEnvironment();

  if (currentWeather === 'Default' || reduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence mode="wait">
        
        {/* FOREST WEATHER: Leaves & Sun Rays */}
        {currentWeather === 'Forest' && (
          <motion.div
            key="weather-forest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Falling Leaves */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['-10%', '110vh'],
                  x: [0, 40, -40, 20],
                  rotate: [0, 360]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 6 + 6,
                  delay: Math.random() * 4,
                  ease: 'linear'
                }}
                style={{ left: `${Math.random() * 95}%` }}
                className="absolute text-emerald-400 text-lg select-none"
              >
                🍃
              </motion.div>
            ))}

            {/* Sun Rays */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-amber-300/10 via-yellow-200/5 to-transparent blur-2xl" />
          </motion.div>
        )}

        {/* OCEAN WEATHER: Bubbles & Waves */}
        {currentWeather === 'Ocean' && (
          <motion.div
            key="weather-ocean"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Rising Underwater Bubbles */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['110vh', '-10%'],
                  x: [0, 15, -15, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 5 + 4,
                  delay: Math.random() * 3,
                  ease: 'easeInOut'
                }}
                style={{ left: `${Math.random() * 95}%` }}
                className="absolute text-dream-sky text-xl select-none"
              >
                🫧
              </motion.div>
            ))}

            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-sky-600/20 to-transparent blur-xl" />
          </motion.div>
        )}

        {/* SPACE WEATHER: Meteors & Galaxy Aurora */}
        {currentWeather === 'Space' && (
          <motion.div
            key="weather-space"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Shooting Meteors */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: ['-10%', '110vw'],
                  y: ['-10%', '110vh'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 4,
                  ease: 'linear'
                }}
                style={{ top: `${Math.random() * 50}%` }}
                className="absolute text-dream-gold text-2xl select-none"
              >
                ☄️
              </motion.div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-pink-900/10 to-transparent blur-3xl" />
          </motion.div>
        )}

        {/* CASTLE WEATHER: Floating Lanterns */}
        {currentWeather === 'Castle' && (
          <motion.div
            key="weather-castle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['110vh', '-10%'],
                  x: [0, 20, -20, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 7 + 8,
                  delay: Math.random() * 5,
                  ease: 'easeInOut'
                }}
                style={{ left: `${Math.random() * 95}%` }}
                className="absolute text-dream-gold text-2xl select-none drop-shadow-glow"
              >
                🏮
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* SNOW WEATHER: Falling Snowflakes */}
        {currentWeather === 'Snow' && (
          <motion.div
            key="weather-snow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['-10%', '110vh'],
                  x: [0, 25, -25, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 5 + 4,
                  delay: Math.random() * 3,
                  ease: 'linear'
                }}
                style={{ left: `${Math.random() * 95}%` }}
                className="absolute text-blue-200 text-lg select-none"
              >
                ❄️
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* RAIN WEATHER: Raindrops */}
        {currentWeather === 'Rain' && (
          <motion.div
            key="weather-rain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: ['-10%', '110vh'],
                  x: [0, -10]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 1.5 + 1,
                  delay: Math.random() * 2,
                  ease: 'linear'
                }}
                style={{ left: `${Math.random() * 98}%` }}
                className="absolute text-dream-sky text-sm font-bold select-none opacity-70"
              >
                💧
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* MAGIC WEATHER: Glowing Butterflies & Crystals */}
        {currentWeather === 'Magic' && (
          <motion.div
            key="weather-magic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 30, -30, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 4 + 4,
                  delay: Math.random() * 3,
                  ease: 'easeInOut'
                }}
                style={{ top: `${Math.random() * 85}%`, left: `${Math.random() * 95}%` }}
                className="absolute text-dream-pink text-xl select-none"
              >
                🦋
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

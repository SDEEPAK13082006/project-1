import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';
import confetti from 'canvas-confetti';

export const InteractiveWindow: React.FC = () => {
  const navigate = useNavigate();
  const { timeOfDay, currentWeather, curtainsOpen, setCurtainsOpen, clickMoon, moonClickCount } = useEnvironment();

  const handleMoonClick = () => {
    ambientSynth.playSoundEffect('magicChime');
    clickMoon();

    if ((moonClickCount + 1) % 3 === 0) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
    }

    setTimeout(() => {
      navigate('/create');
    }, 500);
  };

  const getSkyGradient = () => {
    switch (timeOfDay) {
      case 'Morning': return 'from-[#7FD9FF] via-[#BAE6FD] to-[#FFF7E8]';
      case 'Afternoon': return 'from-[#38BDF8] via-[#7FD9FF] to-[#E0F2FE]';
      case 'Evening': return 'from-[#F59E0B] via-[#EC4899] to-[#1E1B4B]';
      default: return 'from-[#0B132B] via-[#0E1A40] to-[#1C1236]';
    }
  };

  return (
    <div className="relative w-48 sm:w-64 h-56 sm:h-72 rounded-t-full border-8 border-[#523118] bg-slate-900 shadow-2xl overflow-hidden flex flex-col items-center justify-between z-20 group">
      
      {/* Sky Canvas View */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getSkyGradient()} transition-colors duration-1000 p-4 flex flex-col justify-between overflow-hidden`}>
        
        {/* Sun / Moon celestial body */}
        {timeOfDay === 'Night' ? (
          <motion.div
            whileHover={{ scale: 1.25 }}
            onClick={handleMoonClick}
            className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#FFF7E8] via-[#FFD95E] to-amber-400 shadow-glow-gold flex items-center justify-center cursor-pointer border-2 border-white/30"
            title="Click the Moon to fly a storybook!"
          >
            <span className="text-xl sm:text-2xl">🌙</span>
          </motion.div>
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-200 to-amber-400 shadow-glow-gold flex items-center justify-center"
          >
            <span className="text-2xl">☀️</span>
          </motion.div>
        )}

        {/* Live Weather Indicator Icons */}
        <div className="text-xs font-extrabold text-white/80 bg-slate-950/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
          {currentWeather === 'Rain' && '🌧️ Rain'}
          {currentWeather === 'Snow' && '❄️ Snow'}
          {currentWeather === 'Space' && '🌌 Galaxy'}
          {currentWeather === 'Ocean' && '🌊 Ocean'}
          {currentWeather === 'Forest' && '🌲 Forest'}
          {currentWeather === 'Default' && timeOfDay}
        </div>
      </div>

      {/* Interactive Curtains Overlay */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex justify-between">
        <motion.div
          animate={{ x: curtainsOpen ? '-65%' : '0%' }}
          transition={{ duration: 0.6 }}
          className="w-1/2 h-full bg-dream-purple/90 border-r-2 border-amber-800 shadow-xl"
        />
        <motion.div
          animate={{ x: curtainsOpen ? '65%' : '0%' }}
          transition={{ duration: 0.6 }}
          className="w-1/2 h-full bg-dream-purple/90 border-l-2 border-amber-800 shadow-xl"
        />
      </div>

      {/* Curtain Toggle Button */}
      <button
        onClick={() => setCurtainsOpen(!curtainsOpen)}
        className="absolute bottom-2 z-30 px-3 py-1 rounded-full bg-[#152454]/90 border border-dream-gold text-dream-gold font-extrabold text-[10px] shadow-md"
      >
        {curtainsOpen ? '🪟 Close Curtains' : '🪟 Open Curtains'}
      </button>
    </div>
  );
};

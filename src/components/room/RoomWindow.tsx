import React from 'react';
import { motion } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';

export const RoomWindow: React.FC = () => {
  const { timeOfDay, currentWeather, curtainsOpen, setCurtainsOpen, clickMoon } = useEnvironment();

  const getSkyGradient = () => {
    if (currentWeather === 'Space') return 'from-[#06001a] via-[#0e0040] to-[#1a0060]';
    if (currentWeather === 'Rain') return 'from-[#121e2b] via-[#1c2d3d] to-[#263c4e]';
    if (currentWeather === 'Snow') return 'from-[#b8cbdb] via-[#d0e0ed] to-[#e4f0f8]';
    if (currentWeather === 'Forest') return 'from-[#051a10] via-[#0e3020] to-[#1a4a30]';
    if (currentWeather === 'Ocean') return 'from-[#041226] via-[#0a2647] to-[#144272]';

    switch (timeOfDay) {
      case 'Morning': return 'from-[#52B2EA] via-[#94D8FF] to-[#FFF4E0]';
      case 'Afternoon': return 'from-[#2596D1] via-[#60A5FA] to-[#DBEAFE]';
      case 'Evening': return 'from-[#2D0B38] via-[#831843] to-[#F59E0B]';
      default: return 'from-[#04081c] via-[#0d1848] to-[#1a2060]';
    }
  };

  const rainDrops = Array.from({ length: 24 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2
  }));
  const snowFlakes = Array.from({ length: 18 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 3
  }));
  const fireflies = Array.from({ length: 10 }, (_, i) => ({
    id: i, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20, delay: Math.random() * 3
  }));
  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 60, size: Math.random() * 2.2 + 0.8, delay: Math.random() * 3
  }));

  const handleMoonClick = () => {
    ambientSynth.playSoundEffect('magicChime');
    clickMoon();
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Window Frame - Large Arched */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: '210px',
          height: '270px',
          borderRadius: '105px 105px 8px 8px',
          border: '10px solid #5C3810',
          boxShadow: '0 0 0 4px #3D2408, inset 0 0 25px rgba(0,0,0,0.6), 0 20px 60px rgba(0,0,0,0.7)'
        }}
      >
        {/* Sky Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${getSkyGradient()} transition-all duration-3000`} />

        {/* Clouds (Drifting across) */}
        <motion.div
          animate={{ x: ['-20%', '120%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-8 left-0 text-white/30 text-3xl pointer-events-none"
        >
          ☁️
        </motion.div>

        {/* Stars (Night / Space) */}
        {(timeOfDay === 'Night' || currentWeather === 'Space') && stars.map(s => (
          <motion.div
            key={s.id}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: s.delay + 2, repeat: Infinity }}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, boxShadow: '0 0 4px white' }}
          />
        ))}

        {/* Moon (Night) */}
        {timeOfDay === 'Night' && (
          <motion.div
            onClick={handleMoonClick}
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="absolute top-6 right-5 cursor-pointer z-10"
            title="Click the Moon for a magic chime!"
            style={{
              width: 46, height: 46,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFF7E8, #FFD95E)',
              boxShadow: '0 0 35px #FFD95EAA, 0 0 70px #FFD95E55'
            }}
          />
        )}

        {/* Sun (Morning / Afternoon) */}
        {(timeOfDay === 'Morning' || timeOfDay === 'Afternoon') && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute top-6 right-5 pointer-events-none"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'radial-gradient(circle, #FFF176, #FFD54F)',
              boxShadow: '0 0 30px #FFD54FAA'
            }}
          />
        )}

        {/* Sunset glow (Evening) */}
        {timeOfDay === 'Evening' && (
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#F59E0B]/70 to-transparent pointer-events-none" />
        )}

        {/* Rain drops */}
        {currentWeather === 'Rain' && rainDrops.map(r => (
          <motion.div
            key={r.id}
            animate={{ y: ['-10%', '110%'] }}
            transition={{ duration: 0.7, delay: r.delay, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[1.5px] h-5 bg-sky-300/80 rounded-full pointer-events-none"
            style={{ left: `${r.left}%` }}
          />
        ))}

        {/* Snowflakes */}
        {currentWeather === 'Snow' && snowFlakes.map(s => (
          <motion.div
            key={s.id}
            animate={{ y: ['-10%', '110%'], x: [-6, 6, -6] }}
            transition={{ duration: 3.5, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute text-white text-xs pointer-events-none"
            style={{ left: `${s.left}%` }}
          >❄</motion.div>
        ))}

        {/* Fireflies (Forest/Night) */}
        {(currentWeather === 'Forest' || timeOfDay === 'Night') && fireflies.map(f => (
          <motion.div
            key={f.id}
            animate={{ x: [0, 15, -10, 0], y: [0, -12, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: f.delay + 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 pointer-events-none"
            style={{ left: `${f.x}%`, top: `${f.y}%`, boxShadow: '0 0 8px #FFD95E' }}
          />
        ))}

        {/* Flying Birds (Morning) */}
        {timeOfDay === 'Morning' && (
          <motion.div
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 9, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            className="absolute top-12 text-xs select-none pointer-events-none"
          >🐦 🐦</motion.div>
        )}

        {/* Curtains */}
        <motion.div
          animate={{ x: curtainsOpen ? '-72%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 left-0 w-1/2"
          style={{ background: 'linear-gradient(to right, #8B5CF6dd, #7C3AEDaa)', backdropFilter: 'blur(2px)' }}
        />
        <motion.div
          animate={{ x: curtainsOpen ? '72%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 right-0 w-1/2"
          style={{ background: 'linear-gradient(to left, #8B5CF6dd, #7C3AEDaa)', backdropFilter: 'blur(2px)' }}
        />

        {/* Glass Reflection */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)' }}
        />
      </div>

      {/* Window Sill with Swaying Potted Plants */}
      <div
        className="relative w-60 h-5 rounded-b-lg shadow-lg flex items-center justify-between px-4 z-10"
        style={{ background: 'linear-gradient(to bottom, #7C4A1E, #5C3810)', boxShadow: '0 6px 16px rgba(0,0,0,0.5)' }}
      >
        {/* Swaying Potted Plant Left */}
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-lg -mt-5 cursor-pointer"
          title="Window Sill Plant"
        >
          🪴
        </motion.div>

        {/* Swaying Potted Plant Right */}
        <motion.div
          animate={{ rotate: [2, -2, 2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-lg -mt-5 cursor-pointer"
          title="Cozy Flower Pot"
        >
          🌿
        </motion.div>
      </div>

      {/* Curtain Toggle Button */}
      <button
        onClick={() => { ambientSynth.playSoundEffect('click'); setCurtainsOpen(!curtainsOpen); }}
        className="mt-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold text-dream-gold border border-dream-gold/40 bg-black/40 hover:bg-dream-purple/40 transition-all shadow-md"
      >
        {curtainsOpen ? '🪟 Close Curtains' : '🪟 Open Curtains'}
      </button>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { useEnvironment } from '../../context/EnvironmentContext';

export const RoomWindow: React.FC = () => {
  const { timeOfDay, currentWeather, curtainsOpen, setCurtainsOpen, clickMoon } = useEnvironment();

  const getSkyGradient = () => {
    if (currentWeather === 'Space') return 'from-[#0a0020] via-[#0e0040] to-[#1a0060]';
    if (currentWeather === 'Rain') return 'from-[#1a2a3a] via-[#223344] to-[#2a3a4a]';
    if (currentWeather === 'Snow') return 'from-[#c8d8e8] via-[#dce8f0] to-[#e8f0f8]';
    switch (timeOfDay) {
      case 'Morning': return 'from-[#7FD9FF] via-[#BAE6FD] to-[#FFF7E8]';
      case 'Afternoon': return 'from-[#38BDF8] via-[#7FD9FF] to-[#E0F2FE]';
      case 'Evening': return 'from-[#1a0520] via-[#8B2252] to-[#F59E0B]';
      default: return 'from-[#050a20] via-[#0e1a50] to-[#1a2060]';
    }
  };

  const rainDrops = Array.from({ length: 20 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2
  }));
  const snowFlakes = Array.from({ length: 15 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 3
  }));
  const fireflies = Array.from({ length: 8 }, (_, i) => ({
    id: i, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20, delay: Math.random() * 3
  }));
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 60, size: Math.random() * 2 + 1, delay: Math.random() * 3
  }));

  return (
    <div className="relative flex flex-col items-center">
      {/* Window Frame - Large Arched */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: '200px',
          height: '260px',
          borderRadius: '100px 100px 8px 8px',
          border: '10px solid #5C3810',
          boxShadow: '0 0 0 4px #3D2408, inset 0 0 20px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.6)'
        }}
      >
        {/* Sky Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${getSkyGradient()} transition-all duration-3000`} />

        {/* Stars (Night / Space) */}
        {(timeOfDay === 'Night' || currentWeather === 'Space') && stars.map(s => (
          <motion.div
            key={s.id}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: s.delay + 2, repeat: Infinity }}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          />
        ))}

        {/* Moon (Night) */}
        {timeOfDay === 'Night' && (
          <motion.div
            onClick={clickMoon}
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-6 right-5 cursor-pointer"
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFF7E8, #FFD95E)',
              boxShadow: '0 0 30px #FFD95E88, 0 0 60px #FFD95E44'
            }}
          />
        )}

        {/* Sun (Morning/Afternoon) */}
        {(timeOfDay === 'Morning' || timeOfDay === 'Afternoon') && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-6 right-5"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'radial-gradient(circle, #FFF176, #FFD54F)',
              boxShadow: '0 0 25px #FFD54F88'
            }}
          />
        )}

        {/* Evening Gradient */}
        {timeOfDay === 'Evening' && (
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#F59E0B]/60 to-transparent" />
        )}

        {/* Rain drops */}
        {currentWeather === 'Rain' && rainDrops.map(r => (
          <motion.div
            key={r.id}
            animate={{ y: ['-10%', '110%'] }}
            transition={{ duration: 0.8, delay: r.delay, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[1px] h-4 bg-sky-300/70 rounded-full"
            style={{ left: `${r.left}%` }}
          />
        ))}

        {/* Snowflakes */}
        {currentWeather === 'Snow' && snowFlakes.map(s => (
          <motion.div
            key={s.id}
            animate={{ y: ['-10%', '110%'], x: [-5, 5, -5] }}
            transition={{ duration: 3, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute text-white text-sm"
            style={{ left: `${s.left}%` }}
          >❄</motion.div>
        ))}

        {/* Fireflies (Forest/Night) */}
        {(currentWeather === 'Forest' || timeOfDay === 'Night') && fireflies.map(f => (
          <motion.div
            key={f.id}
            animate={{ x: [0, 15, -10, 0], y: [0, -10, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: f.delay + 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300"
            style={{ left: `${f.x}%`, top: `${f.y}%`, boxShadow: '0 0 6px #FFD95E' }}
          />
        ))}

        {/* Flying Birds (Morning) */}
        {timeOfDay === 'Morning' && (
          <motion.div
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 8, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
            className="absolute top-12 text-xs select-none"
          >🐦 🐦</motion.div>
        )}

        {/* Curtains */}
        <motion.div
          animate={{ x: curtainsOpen ? '-70%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 left-0 w-1/2"
          style={{ background: 'linear-gradient(to right, #8B5CF6cc, #7C3AED88)', backdropFilter: 'blur(2px)' }}
        />
        <motion.div
          animate={{ x: curtainsOpen ? '70%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 right-0 w-1/2"
          style={{ background: 'linear-gradient(to left, #8B5CF6cc, #7C3AED88)', backdropFilter: 'blur(2px)' }}
        />

        {/* Window Reflection */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
        />
      </div>

      {/* Window Sill */}
      <div
        className="w-56 h-4 rounded-b-lg shadow-lg"
        style={{ background: 'linear-gradient(to bottom, #7C4A1E, #5C3810)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
      />

      {/* Curtain toggle */}
      <button
        onClick={() => setCurtainsOpen(!curtainsOpen)}
        className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-dream-gold border border-dream-gold/40 bg-black/30 hover:bg-dream-purple/30 transition-all"
      >
        {curtainsOpen ? '🪟 Close' : '🪟 Open'}
      </button>
    </div>
  );
};

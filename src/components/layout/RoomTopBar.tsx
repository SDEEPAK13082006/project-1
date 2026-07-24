import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Settings2, X, Sun, Moon, Cloud, Snowflake, Zap, TreePine, Waves, Globe, Star } from 'lucide-react';
import { useEnvironment, TimeOfDay, WeatherTheme } from '../../context/EnvironmentContext';

const WEATHER_OPTIONS: { value: WeatherTheme; emoji: string; label: string }[] = [
  { value: 'Default', emoji: '🌙', label: 'Night Sky' },
  { value: 'Rain', emoji: '🌧️', label: 'Soft Rain' },
  { value: 'Snow', emoji: '❄️', label: 'Snow' },
  { value: 'Forest', emoji: '🌳', label: 'Forest' },
  { value: 'Ocean', emoji: '🌊', label: 'Ocean' },
  { value: 'Space', emoji: '🚀', label: 'Deep Space' },
  { value: 'Magic', emoji: '✨', label: 'Magic' },
  { value: 'Desert', emoji: '🏜️', label: 'Desert' },
];

const TIME_OPTIONS: { value: TimeOfDay; emoji: string; label: string }[] = [
  { value: 'Morning',   emoji: '🌅', label: 'Morning' },
  { value: 'Afternoon', emoji: '☀️', label: 'Afternoon' },
  { value: 'Evening',   emoji: '🌇', label: 'Evening' },
  { value: 'Night',     emoji: '🌙', label: 'Night' },
];

export const RoomTopBar: React.FC = () => {
  const navigate = useNavigate();
  const { timeOfDay, setTimeOfDay, greeting, toggleSleepMode, isSleepMode, currentWeather, setCurrentWeather, shootingStarPoints, reduceMotion, setReduceMotion, muteAudio, setMuteAudio } = useEnvironment();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const timeColors: Record<string, string> = {
    Morning: '#FFD95E',
    Afternoon: '#38BDF8',
    Evening: '#F97316',
    Night: '#A78BFA',
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-2.5"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,3,20,0.88) 0%, transparent 100%)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 focus:outline-none"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-xl"
          >🌙</motion.span>
          <div>
            <div className="text-sm font-black tracking-wider text-white leading-none"
              style={{ textShadow: '0 0 20px rgba(167,139,250,0.6)' }}
            >
              DreamVerse
            </div>
            <div className="text-[9px] font-medium tracking-widest text-dream-gold/70 uppercase leading-none">
              AI Bedtime Stories
            </div>
          </div>
        </motion.button>

        {/* Center greeting */}
        <motion.div
          key={greeting}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center hidden sm:block"
        >
          <div
            className="text-sm font-bold tracking-wide"
            style={{ color: timeColors[timeOfDay] ?? '#A78BFA', textShadow: '0 0 12px currentColor' }}
          >
            {greeting}
          </div>
          <div className="text-[9px] text-white/50 tracking-widest uppercase">
            Your Dream Awaits
          </div>
        </motion.div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Star points badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold"
            style={{
              background: 'rgba(255,217,94,0.12)',
              border: '1px solid rgba(255,217,94,0.4)',
              color: '#FFD95E',
              boxShadow: '0 0 10px rgba(255,217,94,0.2)',
            }}
          >
            ⭐ {shootingStarPoints}
          </motion.div>

          {/* Sleep mode toggle */}
          <motion.button
            onClick={toggleSleepMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all focus:outline-none"
            style={{
              background: isSleepMode ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.05)',
              borderColor: isSleepMode ? '#A78BFA' : 'rgba(255,255,255,0.15)',
              color: isSleepMode ? '#A78BFA' : 'rgba(255,255,255,0.6)',
            }}
          >
            {isSleepMode ? '☀️ Wake' : '💤 Sleep'}
          </motion.button>

          {/* Settings button */}
          <motion.button
            onClick={() => setSettingsOpen(o => !o)}
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full flex items-center justify-center focus:outline-none transition-all"
            style={{
              background: settingsOpen ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${settingsOpen ? '#A78BFA' : 'rgba(255,255,255,0.12)'}`,
            }}
          >
            {settingsOpen
              ? <X className="w-3.5 h-3.5 text-dream-purple" />
              : <Settings2 className="w-3.5 h-3.5 text-white/60" />
            }
          </motion.button>

          {/* Avatar */}
          <motion.button
            onClick={() => navigate('/profile')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative focus:outline-none"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-base border-2 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
                borderColor: '#A78BFA',
                boxShadow: '0 0 12px rgba(124,58,237,0.5)',
              }}
            >
              🧒
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-black" />
          </motion.button>
        </div>
      </motion.header>

      {/* ─── Settings Panel ─── */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed top-16 right-4 z-[99] rounded-2xl p-4 space-y-4 min-w-[260px]"
            style={{
              background: 'rgba(8, 4, 28, 0.90)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(167,139,250,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.15)',
            }}
          >
            <div className="text-xs font-extrabold text-white/80 uppercase tracking-widest border-b border-white/10 pb-2">
              ⚙️ Dream Room Controls
            </div>

            {/* Time of Day */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-dream-gold/80 uppercase tracking-wider">Time of Day</div>
              <div className="grid grid-cols-4 gap-1">
                {TIME_OPTIONS.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTimeOfDay(t.value)}
                    className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-xl text-center transition-all"
                    style={{
                      background: timeOfDay === t.value ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${timeOfDay === t.value ? '#A78BFA' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: timeOfDay === t.value ? '0 0 12px rgba(124,58,237,0.3)' : 'none',
                    }}
                  >
                    <span className="text-base">{t.emoji}</span>
                    <span className="text-[8px] font-semibold text-white/60">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-dream-gold/80 uppercase tracking-wider">Atmosphere</div>
              <div className="grid grid-cols-4 gap-1">
                {WEATHER_OPTIONS.map(w => (
                  <button
                    key={w.value}
                    onClick={() => setCurrentWeather(w.value)}
                    className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-xl text-center transition-all"
                    style={{
                      background: currentWeather === w.value ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${currentWeather === w.value ? '#38BDF8' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: currentWeather === w.value ? '0 0 12px rgba(56,189,248,0.2)' : 'none',
                    }}
                  >
                    <span className="text-base">{w.emoji}</span>
                    <span className="text-[8px] font-semibold text-white/60">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-1 border-t border-white/10">
              <div className="text-[10px] font-bold text-dream-gold/80 uppercase tracking-wider">Options</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setReduceMotion(!reduceMotion)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                  style={{
                    background: reduceMotion ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${reduceMotion ? '#A78BFA' : 'rgba(255,255,255,0.1)'}`,
                    color: reduceMotion ? '#A78BFA' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  🎬 {reduceMotion ? 'Motion On' : 'Reduce'}
                </button>
                <button
                  onClick={() => setMuteAudio(!muteAudio)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                  style={{
                    background: muteAudio ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${muteAudio ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
                    color: muteAudio ? '#EF4444' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {muteAudio ? '🔇 Muted' : '🔊 Sound'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

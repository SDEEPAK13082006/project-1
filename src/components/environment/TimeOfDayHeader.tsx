import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Cloud, Sparkles, Volume2, VolumeX, Shield, Eye } from 'lucide-react';
import { useEnvironment, TimeOfDay } from '../../context/EnvironmentContext';

export const TimeOfDayHeader: React.FC = () => {
  const { 
    timeOfDay, 
    setTimeOfDay, 
    autoTimeDetect, 
    setAutoTimeDetect, 
    reduceMotion, 
    setReduceMotion,
    muteAudio,
    setMuteAudio
  } = useEnvironment();

  const getGreeting = () => {
    switch (timeOfDay) {
      case 'Morning': return 'Good Morning, Little Hero! 🌅';
      case 'Afternoon': return 'Good Afternoon, Explorer! ☀️';
      case 'Evening': return 'Good Evening, Storyteller! 🌇';
      default: return 'Good Night & Sweet Dreams! 🌙';
    }
  };

  const getTimeBadgeColor = () => {
    switch (timeOfDay) {
      case 'Morning': return 'from-amber-400 to-sky-400 text-[#0E1A40]';
      case 'Afternoon': return 'from-sky-400 to-blue-500 text-white';
      case 'Evening': return 'from-amber-500 to-pink-600 text-white';
      default: return 'from-dream-purple to-indigo-900 text-dream-gold';
    }
  };

  return (
    <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
      
      {/* Dynamic Animated Greeting */}
      <motion.div
        key={timeOfDay}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`px-5 py-2 rounded-full bg-gradient-to-r ${getTimeBadgeColor()} font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2`}
      >
        <Sparkles className="w-4 h-4 animate-spin-slow" />
        <span>{getGreeting()}</span>
      </motion.div>

      {/* Manual Time of Day & Accessibility Controls */}
      <div className="flex flex-wrap items-center gap-2">
        
        {/* Time of Day Select Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#152454]/80 border border-dream-purple/40 backdrop-blur-md">
          {(['Morning', 'Afternoon', 'Evening', 'Night'] as TimeOfDay[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setAutoTimeDetect(false);
                setTimeOfDay(t);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                timeOfDay === t
                  ? 'bg-dream-purple text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t === 'Morning' && '🌅 Morning'}
              {t === 'Afternoon' && '☀️ Afternoon'}
              {t === 'Evening' && '🌇 Evening'}
              {t === 'Night' && '🌙 Night'}
            </button>
          ))}
        </div>

        {/* Auto Detect Toggle */}
        <button
          onClick={() => setAutoTimeDetect(!autoTimeDetect)}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
            autoTimeDetect
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
              : 'bg-white/10 border-white/20 text-slate-300'
          }`}
          title="Toggle Auto Time Detection"
        >
          {autoTimeDetect ? '⚡ Live Clock Sync' : '⚙️ Manual Time'}
        </button>

        {/* Mute Audio Toggle */}
        <button
          onClick={() => setMuteAudio(!muteAudio)}
          className="p-2 rounded-full bg-[#152454] border border-white/20 text-slate-200 hover:text-dream-gold transition-all"
          title="Mute Ambient Audio"
        >
          {muteAudio ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Reduce Motion Toggle */}
        <button
          onClick={() => setReduceMotion(!reduceMotion)}
          className={`p-2 rounded-full border transition-all ${
            reduceMotion
              ? 'bg-amber-400 text-purple-950 border-amber-300'
              : 'bg-[#152454] border-white/20 text-slate-200 hover:text-white'
          }`}
          title="Reduce Motion Mode"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

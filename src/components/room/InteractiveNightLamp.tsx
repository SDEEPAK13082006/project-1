import React from 'react';
import { motion } from 'framer-motion';
import { useEnvironment, LampMode } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';

export const InteractiveNightLamp: React.FC = () => {
  const { lampMode, setLampMode } = useEnvironment();

  const modes: LampMode[] = ['ON', 'OFF', 'WARM', 'MOONLIGHT', 'MAGIC'];

  const cycleLampMode = () => {
    ambientSynth.playSoundEffect('click');
    const currentIdx = modes.indexOf(lampMode);
    const nextMode = modes[(currentIdx + 1) % modes.length];
    setLampMode(nextMode);
  };

  const getGlowColor = () => {
    switch (lampMode) {
      case 'ON': return 'shadow-glow-gold bg-amber-200';
      case 'WARM': return 'shadow-glow-gold bg-amber-400';
      case 'MOONLIGHT': return 'shadow-glow-sky bg-dream-sky';
      case 'MAGIC': return 'shadow-glow-purple bg-dream-purple';
      default: return 'bg-slate-700 shadow-none';
    }
  };

  return (
    <div className="relative flex flex-col items-center cursor-pointer group z-20" onClick={cycleLampMode}>
      
      {/* Glow aura */}
      {lampMode !== 'OFF' && (
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className={`absolute -top-4 w-20 h-20 rounded-full blur-xl -z-10 ${getGlowColor()}`}
        />
      )}

      {/* Lamp Shade */}
      <div className={`w-14 h-10 rounded-t-2xl border-2 border-amber-800 transition-colors ${getGlowColor()}`} />

      {/* Lamp Stem */}
      <div className="w-2 h-10 bg-amber-800" />

      {/* Lamp Base */}
      <div className="w-12 h-3 bg-amber-900 rounded-full shadow-md" />

      <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#152454] border border-white/20 text-dream-gold font-extrabold text-[10px]">
        Lamp: {lampMode}
      </span>
    </div>
  );
};

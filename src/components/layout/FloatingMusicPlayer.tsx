import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Music, ChevronUp, Sliders } from 'lucide-react';
import { ambientSynth } from '../../services/audioNarration';

const SOUNDSCAPES = [
  { id: 'Rain',     label: 'Soft Rain',   emoji: '🌧️' },
  { id: 'Lullaby',  label: 'Bedtime Melodies', emoji: '🎵' },
  { id: 'Forest',   label: 'Night Forest', emoji: '🌲' },
  { id: 'Ocean',    label: 'Ocean Waves',  emoji: '🌊' },
  { id: 'Space',    label: 'Cosmic Dreams', emoji: '🌌' },
  { id: 'Campfire', label: 'Cozy Fire',    emoji: '🔥' },
];

export const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrack, setActiveTrack] = useState<string>('Rain');
  const [volume, setVolume] = useState<number>(0.6);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    ambientSynth.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (isPlaying) {
      ambientSynth.stopAmbient();
      setIsPlaying(false);
    } else {
      ambientSynth.playAmbient(activeTrack);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (trackId: string) => {
    setActiveTrack(trackId);
    ambientSynth.playAmbient(trackId);
    setIsPlaying(true);
  };

  const currentSound = SOUNDSCAPES.find(s => s.id === activeTrack) || SOUNDSCAPES[0];

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start select-none">
      {/* Expanded Track & Volume Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="mb-3 p-4 rounded-3xl space-y-3 shadow-2xl border"
            style={{
              background: 'rgba(10, 5, 30, 0.88)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(167, 139, 250, 0.3)',
              boxShadow: '0 12px 40px rgba(124, 58, 237, 0.3)',
              width: 220,
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-extrabold text-dream-gold flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                Bedtime Soundscapes
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Soundscape List */}
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
              {SOUNDSCAPES.map(s => {
                const isCurrent = activeTrack === s.id && isPlaying;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectTrack(s.id)}
                    className="w-full flex items-center justify-between p-2 rounded-2xl text-xs font-semibold transition-all text-left"
                    style={{
                      background: isCurrent ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255, 255, 255, 0.04)',
                      color: isCurrent ? '#FFD95E' : '#E2E8F0',
                      border: isCurrent ? '1px solid rgba(167, 139, 250, 0.5)' : '1px solid transparent',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{s.emoji}</span>
                      <span>{s.label}</span>
                    </span>
                    {isCurrent && (
                      <span className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-dream-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-2 bg-dream-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-3.5 bg-dream-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Volume Slider */}
            <div className="pt-2 border-t border-white/10 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-300 hover:text-white"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setIsMuted(false);
                    setVolume(parseFloat(e.target.value));
                  }}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-dream-gold"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mini Floating Pill */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full cursor-pointer shadow-2xl"
        style={{
          background: 'rgba(10, 5, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(167, 139, 250, 0.3)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all shadow-md"
          style={{
            background: isPlaying ? 'linear-gradient(135deg, #7C3AED, #4C1D95)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isPlaying ? '0 0 16px rgba(124, 58, 237, 0.6)' : 'none',
          }}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Track Label */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 pr-1"
        >
          <span className="text-base">{currentSound.emoji}</span>
          <div className="flex flex-col">
            <span className="text-xs font-extrabold text-white leading-none">
              {currentSound.label}
            </span>
            <span className="text-[9px] font-bold text-dream-gold/80 leading-none mt-0.5">
              {isPlaying ? '♪ Playing Soundscape' : 'Tap to Play'}
            </span>
          </div>

          {/* Equalizer Wave / Chevron */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 h-3 bg-dream-gold rounded-full animate-pulse" />
              <span className="w-0.5 h-1.5 bg-dream-gold rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <span className="w-0.5 h-2.5 bg-dream-gold rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
            </div>
          ) : (
            <ChevronUp className={`w-3.5 h-3.5 text-slate-400 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

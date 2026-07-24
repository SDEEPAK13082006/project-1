import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Clock, 
  Music, 
  Settings2,
  Mic
} from 'lucide-react';
import { SpeechNarrator, ambientSynth } from '../../services/audioNarration';
import { VoiceType } from '../../types/story';

interface AudioPlayerProps {
  currentText: string;
  voiceType: VoiceType;
  narrationSpeed: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentText,
  voiceType: initialVoice,
  narrationSpeed: initialSpeed,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(initialSpeed || 1);
  const [voiceType, setVoiceType] = useState<VoiceType>(initialVoice || 'Mother');
  const [ambientSound, setAmbientSound] = useState<'Off' | 'Forest' | 'Rain' | 'Ocean' | 'Wind' | 'Campfire'>('Forest');
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedCharIndex, setHighlightedCharIndex] = useState<number>(0);

  // Synchronize ambient soundscape
  useEffect(() => {
    if (ambientSound === 'Off' || isMuted) {
      ambientSynth.stopAmbient();
    } else {
      ambientSynth.playAmbient(ambientSound);
    }
    return () => {
      ambientSynth.stopAmbient();
    };
  }, [ambientSound, isMuted]);

  // Handle sleep timer countdown
  useEffect(() => {
    if (!sleepTimer) {
      setTimerRemaining(null);
      return;
    }

    setTimerRemaining(sleepTimer * 60);
    const interval = setInterval(() => {
      setTimerRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          SpeechNarrator.stop();
          ambientSynth.stopAmbient();
          setIsPlaying(false);
          setSleepTimer(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimer]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      SpeechNarrator.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      SpeechNarrator.speak({
        text: currentText,
        voiceType,
        speed,
        onEnd: () => setIsPlaying(false),
        onBoundary: (charIdx) => setHighlightedCharIndex(charIdx)
      });
    }
  };

  const handleReplay = () => {
    SpeechNarrator.stop();
    setIsPlaying(true);
    SpeechNarrator.speak({
      text: currentText,
      voiceType,
      speed,
      onEnd: () => setIsPlaying(false),
      onBoundary: (charIdx) => setHighlightedCharIndex(charIdx)
    });
  };

  return (
    <div className="w-full rounded-3xl glass-card p-4 sm:p-5 border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
      
      {/* Upper Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Voice & Ambient Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dream-purple to-dream-pink text-white flex items-center justify-center shadow-md shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
              <span>AI Voice: {voiceType}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-[10px] font-bold text-dream-purple">
                {speed}x
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ambient Sound: {ambientSound}
            </p>
          </div>
        </div>

        {/* Primary Playback Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay}
            title="Replay Page"
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-dream-purple transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-12 h-12 rounded-2xl bg-gradient-dream text-white flex items-center justify-center shadow-lg hover:shadow-glow-purple hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-dream-purple transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Selector Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          
          {/* Ambient Music Selector */}
          <div className="relative">
            <select
              value={ambientSound}
              onChange={(e) => setAmbientSound(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl glass-input text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer pr-7"
            >
              <option value="Forest">🌲 Forest</option>
              <option value="Rain">🌧️ Rain</option>
              <option value="Ocean">🌊 Ocean</option>
              <option value="Wind">🌬️ Wind</option>
              <option value="Campfire">🔥 Campfire</option>
              <option value="Off">🔇 Mute Music</option>
            </select>
          </div>

          {/* Sleep Timer */}
          <div className="relative">
            <select
              value={sleepTimer || ''}
              onChange={(e) => setSleepTimer(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-1.5 rounded-xl glass-input text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="">⏱️ Sleep Timer</option>
              <option value="5">5 Mins</option>
              <option value="10">10 Mins</option>
              <option value="15">15 Mins</option>
              <option value="30">30 Mins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sleep Timer Banner */}
      {timerRemaining !== null && (
        <div className="text-center text-xs font-semibold text-amber-500 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 py-1.5 rounded-xl border border-amber-200/50">
          🌙 Bedtime Sleep Timer Active: {Math.floor(timerRemaining / 60)}m {timerRemaining % 60}s remaining
        </div>
      )}
    </div>
  );
};

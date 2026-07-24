import React from 'react';
import { 
  Cloud, 
  Sun, 
  Moon, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Clock,
  Compass,
  Sliders
} from 'lucide-react';
import { useEnvironment, WeatherTheme, SleepTimerOption } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';

export const EnvironmentManagerBar: React.FC = () => {
  const { 
    currentWeather, 
    setCurrentWeather, 
    sleepTimer, 
    setSleepTimer,
    timeOfDay,
    setTimeOfDay,
    setAutoTimeDetect
  } = useEnvironment();

  const weatherThemes: { name: WeatherTheme; label: string }[] = [
    { name: 'Default', label: '✨ Default' },
    { name: 'Forest', label: '🌲 Forest' },
    { name: 'Ocean', label: '🌊 Ocean' },
    { name: 'Space', label: '🌌 Space' },
    { name: 'Castle', label: '🏰 Castle' },
    { name: 'Snow', label: '❄️ Snow' },
    { name: 'Rain', label: '🌧️ Rain' },
    { name: 'Desert', label: '🏜️ Desert' },
    { name: 'Magic', label: '🦋 Magic' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 mb-4">
      <div className="p-3 rounded-2xl glass-card-dream border border-dream-purple/40 shadow-glass-magic flex flex-wrap items-center justify-between gap-4">
        
        {/* Environment Weather Picker */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          <span className="text-xs font-extrabold text-dream-gold flex items-center gap-1 shrink-0">
            <Compass className="w-3.5 h-3.5" />
            Weather Realm:
          </span>
          {weatherThemes.map((w) => (
            <button
              key={w.name}
              onClick={() => {
                setCurrentWeather(w.name);
                ambientSynth.playAmbient(w.name === 'Default' ? 'Off' : (w.name as any));
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                currentWeather === w.name
                  ? 'bg-gradient-magic text-white shadow-md scale-105'
                  : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Sleep Timer Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-extrabold text-dream-sky flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Sleep Timer:
          </span>
          <select
            value={sleepTimer}
            onChange={(e) => setSleepTimer(e.target.value as SleepTimerOption)}
            className="px-3 py-1 rounded-full bg-[#182A60] border border-dream-purple/40 text-xs font-bold text-dream-cream cursor-pointer"
          >
            <option value="Off">⏱️ Timer Off</option>
            <option value="15">15 Mins</option>
            <option value="30">30 Mins</option>
            <option value="45">45 Mins</option>
            <option value="60">60 Mins</option>
          </select>
        </div>
      </div>
    </div>
  );
};

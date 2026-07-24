import React, { createContext, useContext, useState, useEffect } from 'react';

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';
export type WeatherTheme = 'Default' | 'Forest' | 'Ocean' | 'Space' | 'Castle' | 'Snow' | 'Rain' | 'Desert' | 'Magic';
export type LampMode = 'ON' | 'OFF' | 'WARM' | 'MOONLIGHT' | 'MAGIC';
export type SleepTimerOption = 'Off' | '15' | '30' | '45' | '60';

interface EnvironmentContextType {
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  autoTimeDetect: boolean;
  setAutoTimeDetect: (auto: boolean) => void;
  currentWeather: WeatherTheme;
  setCurrentWeather: (weather: WeatherTheme) => void;
  lampMode: LampMode;
  setLampMode: (mode: LampMode) => void;
  curtainsOpen: boolean;
  setCurtainsOpen: (open: boolean) => void;
  bedtimeMode: boolean;
  setBedtimeMode: (mode: boolean) => void;
  shootingStarPoints: number;
  collectShootingStar: () => void;
  unlockedGoldenBook: boolean;
  setUnlockedGoldenBook: (unlocked: boolean) => void;
  teddyClickCount: number;
  clickTeddy: () => void;
  moonClickCount: number;
  clickMoon: () => void;
  isSleepMode: boolean;
  setIsSleepMode: (sleep: boolean) => void;
  toggleSleepMode: () => void;
  sleepTimer: SleepTimerOption;
  setSleepTimer: (timer: SleepTimerOption) => void;
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
  muteAudio: boolean;
  setMuteAudio: (mute: boolean) => void;
  greeting: string;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export const EnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [autoTimeDetect, setAutoTimeDetect] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Night');
  const [currentWeather, setCurrentWeather] = useState<WeatherTheme>('Default');
  const [lampMode, setLampMode] = useState<LampMode>('ON');
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [bedtimeMode, setBedtimeMode] = useState(false);
  const [shootingStarPoints, setShootingStarPoints] = useState(120);
  const [unlockedGoldenBook, setUnlockedGoldenBook] = useState(false);
  const [teddyClickCount, setTeddyClickCount] = useState(0);
  const [moonClickCount, setMoonClickCount] = useState(0);
  const [isSleepMode, setIsSleepMode] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<SleepTimerOption>('Off');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);

  // Detect local time of day automatically
  useEffect(() => {
    if (!autoTimeDetect) return;
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) setTimeOfDay('Morning');
    else if (hour >= 11 && hour < 17) setTimeOfDay('Afternoon');
    else if (hour >= 17 && hour < 19) setTimeOfDay('Evening');
    else setTimeOfDay('Night');
  }, [autoTimeDetect]);

  const collectShootingStar = () => {
    setShootingStarPoints(prev => prev + 50);
  };

  const clickTeddy = () => {
    setTeddyClickCount(prev => prev + 1);
  };

  const clickMoon = () => {
    setMoonClickCount(prev => prev + 1);
  };

  const toggleSleepMode = () => setIsSleepMode(prev => !prev);

  const greeting = (() => {
    switch (timeOfDay) {
      case 'Morning': return '🌅 Good Morning, Dreamer!';
      case 'Afternoon': return '☀️ Good Afternoon, Adventurer!';
      case 'Evening': return '🌇 Good Evening, Storyteller!';
      default: return '🌙 Good Night, Dream Explorer!';
    }
  })();

  return (
    <EnvironmentContext.Provider
      value={{
        timeOfDay,
        setTimeOfDay,
        autoTimeDetect,
        setAutoTimeDetect,
        currentWeather,
        setCurrentWeather,
        lampMode,
        setLampMode,
        curtainsOpen,
        setCurtainsOpen,
        bedtimeMode,
        setBedtimeMode,
        shootingStarPoints,
        collectShootingStar,
        unlockedGoldenBook,
        setUnlockedGoldenBook,
        teddyClickCount,
        clickTeddy,
        moonClickCount,
        clickMoon,
        isSleepMode,
        setIsSleepMode,
        toggleSleepMode,
        sleepTimer,
        setSleepTimer,
        reduceMotion,
        setReduceMotion,
        muteAudio,
        setMuteAudio,
        greeting,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) throw new Error('useEnvironment must be used within EnvironmentProvider');
  return context;
};

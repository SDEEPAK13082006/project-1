import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Volume2, BookOpen, Heart, Clock, Award } from 'lucide-react';
import { useEnvironment } from '../../context/EnvironmentContext';
import { useAuth } from '../../context/AuthContext';
import { useStory } from '../../context/StoryContext';

import { InteractiveTeddy } from './InteractiveTeddy';
import { InteractiveWindow } from './InteractiveWindow';
import { InteractiveNightLamp } from './InteractiveNightLamp';
import { InteractiveOwl } from './InteractiveOwl';
import { MagicWand } from './MagicWand';
import { ShootingStarNotifier } from './ShootingStarNotifier';
import { ambientSynth } from '../../services/audioNarration';

export const DreamRoomHub: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stories, setActiveStory } = useStory();
  const { 
    lampMode, 
    bedtimeMode, 
    setBedtimeMode, 
    shootingStarPoints, 
    timeOfDay,
    unlockedGoldenBook,
    setUnlockedGoldenBook
  } = useEnvironment();

  const [toyBoxOpen, setToyBoxOpen] = useState(false);

  const latestStory = stories[0];

  const handleBedClick = () => {
    ambientSynth.playSoundEffect('click');
    setBedtimeMode(!bedtimeMode);
    if (!bedtimeMode) {
      ambientSynth.playAmbient('Forest');
    }
  };

  const handleBookClick = (story: any) => {
    ambientSynth.playSoundEffect('magicChime');
    setActiveStory(story);
    navigate(`/story/${story.id}`);
  };

  const getRoomLightingClass = () => {
    if (bedtimeMode) return 'bg-[#09102A]/95 opacity-90';
    if (lampMode === 'OFF') return 'bg-[#0B132B]/90';
    if (lampMode === 'WARM') return 'bg-amber-950/20';
    if (lampMode === 'MOONLIGHT') return 'bg-sky-950/30';
    if (lampMode === 'MAGIC') return 'bg-purple-950/30';
    return '';
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none z-10">
      
      {/* Random Shooting Stars Notifier */}
      <ShootingStarNotifier />

      {/* Bedtime Mode Notification Banner */}
      {bedtimeMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 z-40 px-6 py-2 rounded-full bg-dream-purple/90 border border-dream-gold text-dream-gold font-extrabold text-xs shadow-glow-purple flex items-center gap-2"
        >
          <Moon className="w-4 h-4 text-dream-gold" />
          <span>Bedtime Mode Active • Lights Dimmed & Music Softened</span>
        </motion.div>
      )}

      {/* Room Controls Bar */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-[#152454]/80 border border-dream-gold/40 text-dream-gold font-extrabold text-xs flex items-center gap-1.5 shadow-md">
          <span>✨ Magic Dust:</span>
          <span>{shootingStarPoints} Stars</span>
        </div>
      </div>

      {/* MAIN CINEMATIC BEDROOM CONTAINER */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className={`relative w-full max-w-6xl aspect-[16/10] min-h-[500px] sm:min-h-[580px] rounded-3xl border-4 border-[#523118] shadow-2xl overflow-hidden bg-gradient-to-b from-[#152454] via-[#111C44] to-[#0A122E] flex flex-col justify-between p-6 sm:p-10 ${getRoomLightingClass()}`}
      >
        
        {/* TOP ROOM LAYER: Window, Owl, Picture Frame, Ceiling Stars */}
        <div className="flex items-start justify-between z-20">
          
          {/* Picture Frame with Child Avatar */}
          <div className="p-2 rounded-2xl border-4 border-amber-800 bg-[#152454] shadow-xl text-center">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'}
              alt="Hero Avatar"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover ring-2 ring-dream-gold mx-auto"
            />
            <span className="text-[10px] font-extrabold text-dream-cream mt-1 block">
              Hero: {user?.childName || 'Leo'}
            </span>
          </div>

          {/* Large Live Interactive Window */}
          <div className="flex items-center gap-4">
            <InteractiveWindow />
            <InteractiveOwl />
          </div>

          {/* Wooden Wall Bookshelf Preview */}
          <div className="hidden sm:flex flex-col items-center p-3 rounded-2xl bg-[#523118] border-2 border-amber-700 shadow-xl space-y-2">
            <span className="text-[10px] font-extrabold text-dream-gold">
              📚 Bookshelf
            </span>
            <div className="flex gap-2">
              {stories.slice(0, 3).map((s) => (
                <motion.div
                  key={s.id}
                  whileHover={{ y: -6, scale: 1.1 }}
                  onClick={() => handleBookClick(s)}
                  className="w-10 h-14 rounded-md bg-gradient-magic shadow-md cursor-pointer flex items-center justify-center text-xs font-bold text-white border border-white/30"
                  title={s.title}
                >
                  📖
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE ROOM LAYER: Bed, Night Lamp, Teddy Bear, Magic Wand, Table with Flying Book */}
        <div className="flex items-end justify-between z-20 pt-6">
          
          {/* Bed & Sleeping Teddy Section */}
          <div className="flex items-end gap-3">
            
            {/* Bedside Night Lamp */}
            <InteractiveNightLamp />

            {/* Cozy Fluffy Bed */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={handleBedClick}
              className="relative p-4 sm:p-6 rounded-3xl bg-[#1E2E6B] border-4 border-dream-purple/50 shadow-2xl cursor-pointer flex flex-col items-center group"
              title="Click Bed to toggle Bedtime Mode!"
            >
              {/* Pillow */}
              <div className="w-24 sm:w-32 h-8 rounded-full bg-dream-cream shadow-inner mb-2" />
              
              {/* Breathing Blanket */}
              <motion.div
                animate={{ scaleY: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-32 sm:w-44 h-16 sm:h-20 rounded-2xl bg-gradient-to-r from-dream-purple to-dream-pink flex items-center justify-center text-white font-extrabold text-xs shadow-md"
              >
                🛏️ Cozy Bed ({bedtimeMode ? 'Bedtime Mode ON' : 'Tap for Sleep'})
              </motion.div>
            </motion.div>

            {/* Barnaby Teddy Bear */}
            <InteractiveTeddy />
          </div>

          {/* Table with Story Book & Magic Wand */}
          <div className="flex flex-col items-center space-y-2">
            
            {/* Magic Wand */}
            <MagicWand />

            {/* Table with Book */}
            <div className="p-4 rounded-2xl bg-[#523118] border-2 border-amber-700 shadow-2xl flex flex-col items-center">
              {latestStory && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  onClick={() => handleBookClick(latestStory)}
                  className="w-20 h-24 rounded-xl bg-gradient-to-tr from-dream-purple to-dream-gold p-2 shadow-glow-gold cursor-pointer text-white flex flex-col justify-between border-2 border-white"
                  title="Click to open latest story!"
                >
                  <span className="text-xs">✨</span>
                  <span className="text-[10px] font-extrabold line-clamp-2">{latestStory.title}</span>
                  <span className="text-[9px] bg-black/40 px-1 rounded">Open</span>
                </motion.div>
              )}
              <span className="text-[10px] font-extrabold text-dream-gold mt-1">Bedside Table</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROOM LAYER: Soft Carpet, Toybox & Floor */}
        <div className="flex items-center justify-between pt-4 border-t-4 border-[#523118] z-20">
          
          {/* Interactive Toybox */}
          <div
            onClick={() => setToyBoxOpen(!toyBoxOpen)}
            className="p-3 rounded-2xl bg-[#523118] border-2 border-amber-600 text-center cursor-pointer text-xs font-bold text-dream-gold shadow-md"
          >
            🧸 Toy Box ({toyBoxOpen ? 'Opened 🎁' : 'Closed 🔒'})
          </div>

          {/* Soft Carpet Center */}
          <div className="w-48 sm:w-80 h-10 rounded-full bg-gradient-to-r from-dream-purple/40 via-dream-pink/40 to-dream-sky/40 border border-white/20 flex items-center justify-center text-xs font-extrabold text-dream-cream shadow-inner">
            🌸 Soft Bedroom Carpet 🌸
          </div>

          {/* Hidden Golden Book Unlocker */}
          <button
            onClick={() => {
              setUnlockedGoldenBook(!unlockedGoldenBook);
              ambientSynth.playSoundEffect('magicChime');
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/30 border border-dream-gold text-dream-gold font-extrabold text-[10px]"
          >
            {unlockedGoldenBook ? '🌟 Golden Book Unlocked!' : '🔒 Unlock Golden Book'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

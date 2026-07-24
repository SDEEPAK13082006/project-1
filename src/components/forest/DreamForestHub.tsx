import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Play, Volume2, BookOpen, Heart, Compass } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

export const DreamForestHub: React.FC = () => {
  const navigate = useNavigate();
  const { stories } = useStory();
  const [activeSpeech, setActiveSpeech] = useState<string | null>("Hoo-hoo! Welcome to the Dream Forest, little explorer!");

  const handleLandmarkClick = (path: string, speechMessage: string) => {
    setActiveSpeech(speechMessage);
    setTimeout(() => {
      navigate(path);
    }, 600);
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden z-10">
      
      {/* Speech Bubble from Talking Owl */}
      {activeSpeech && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-6 z-30 px-6 py-3 rounded-3xl bg-[#152454]/90 backdrop-blur-xl border border-dream-gold/40 shadow-glow-gold text-center text-xs sm:text-sm font-bold text-dream-cream max-w-md mx-auto"
        >
          <span>🦉 Oliver the Wise Owl: </span>
          <span className="text-dream-gold">{activeSpeech}</span>
        </motion.div>
      )}

      {/* Main Interactive Fantasy Map Layout */}
      <div className="relative w-full max-w-5xl aspect-[16/10] min-h-[480px] rounded-3xl border border-dream-purple/30 shadow-glass-magic overflow-hidden bg-gradient-to-b from-[#111C44]/80 via-[#182A60]/60 to-[#0A122E]/90 flex items-center justify-center">
        
        {/* Animated Background Elements in Map */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="w-96 h-96 rounded-full bg-dream-purple/20 blur-3xl absolute top-10 left-10" />
          <div className="w-96 h-96 rounded-full bg-dream-sky/20 blur-3xl absolute bottom-10 right-10" />
        </div>

        {/* 1. 🏰 Interactive Castle -> Story Generator */}
        <motion.button
          whileHover={{ scale: 1.1, y: -8 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLandmarkClick('/create', "Entering the Magic Castle to create tonight's story!")}
          className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-dream-purple via-dream-pink to-dream-gold p-1 shadow-glow-purple flex items-center justify-center group-hover:shadow-glow-gold transition-all">
            <div className="w-full h-full bg-[#152454] rounded-[22px] flex flex-col items-center justify-center text-4xl">
              🏰
            </div>
          </div>
          <span className="mt-2 px-3 py-1 rounded-full bg-[#152454]/90 border border-dream-gold text-dream-gold font-extrabold text-xs shadow-md">
            Magic Castle (Create Story)
          </span>
        </motion.button>

        {/* 2. 🌲 Interactive Tree -> Nature Stories */}
        <motion.button
          whileHover={{ scale: 1.1, y: -6 }}
          onClick={() => handleLandmarkClick('/library?theme=Jungle', "Exploring Whispering Woods Nature Stories!")}
          className="absolute top-36 left-8 sm:left-16 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-500/20 border border-emerald-400 p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
            <span className="text-4xl">🌲</span>
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-[#152454]/90 text-emerald-300 font-bold text-xs">
            Nature Forest
          </span>
        </motion.button>

        {/* 3. 🌊 Interactive River -> Ocean Stories */}
        <motion.button
          whileHover={{ scale: 1.1, y: -6 }}
          onClick={() => handleLandmarkClick('/library?theme=Ocean', "Diving into Crystal Coral Ocean Stories!")}
          className="absolute bottom-16 left-12 sm:left-24 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-sky-500/20 border border-dream-sky p-1 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🌊</span>
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-[#152454]/90 text-dream-sky font-bold text-xs">
            Coral River
          </span>
        </motion.button>

        {/* 4. 🏔️ Interactive Mountain -> Adventure Stories */}
        <motion.button
          whileHover={{ scale: 1.1, y: -6 }}
          onClick={() => handleLandmarkClick('/library?theme=Adventure', "Climbing Starlight Mountain Adventures!")}
          className="absolute top-36 right-8 sm:right-16 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/20 border border-dream-gold p-1 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🏔️</span>
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-[#152454]/90 text-dream-gold font-bold text-xs">
            Adventure Mountain
          </span>
        </motion.button>

        {/* 5. ☁️ Interactive Cloud -> Dream Stories */}
        <motion.button
          whileHover={{ scale: 1.1, y: -6 }}
          onClick={() => handleLandmarkClick('/library?theme=Fantasy', "Floating on Cotton Candy Dream Clouds!")}
          className="absolute bottom-16 right-12 sm:right-24 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-pink-500/20 border border-dream-pink p-1 flex items-center justify-center shadow-lg">
            <span className="text-4xl">☁️</span>
          </div>
          <span className="mt-1 px-3 py-0.5 rounded-full bg-[#152454]/90 text-dream-pink font-bold text-xs">
            Dream Clouds
          </span>
        </motion.button>

        {/* Talking Owl Sprite (Oliver) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          onClick={() => setActiveSpeech("Hoo-hoo! Click the Castle to create a bedtime story with your child's name!")}
          className="absolute top-8 right-1/4 cursor-pointer text-3xl hover:scale-125 transition-transform"
          title="Oliver the Wise Owl"
        >
          🦉
        </motion.div>

        {/* Running Rabbit Animation */}
        <motion.div
          animate={{ x: [-30, 40, -30] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/3 text-2xl select-none"
        >
          🐰
        </motion.div>

        {/* Sleeping Bear Animation */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute bottom-6 right-1/3 text-3xl select-none"
          title="Barnaby Bear Sleeping"
        >
          🐻💤
        </motion.div>

        {/* Flying Butterflies */}
        <motion.div
          animate={{ y: [-10, 10, -10], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-1/2 left-1/4 text-xl select-none"
        >
          🦋
        </motion.div>
      </div>
    </div>
  );
};

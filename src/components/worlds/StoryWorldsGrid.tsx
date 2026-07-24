import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Volume2, ArrowRight, ShieldCheck } from 'lucide-react';
import { STORY_WORLDS } from '../../data/storyWorldsData';
import { StoryWorld } from '../../types/story';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';

export const StoryWorldsGrid: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentWeather } = useEnvironment();
  const [favorites, setFavorites] = useState<string[]>(['magical-forest', 'space-adventures']);

  const toggleFav = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleWorldClick = (world: StoryWorld) => {
    setCurrentWeather(world.ambientSound);
    ambientSynth.playAmbient(world.ambientSound);
    navigate(`/world/${world.id}`);
  };

  const handleAudioPreview = (e: React.MouseEvent, sound: any) => {
    e.stopPropagation();
    ambientSynth.playAmbient(sound);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 z-20">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dream-purple/20 border border-dream-purple/40 text-dream-gold font-bold text-xs">
          <Sparkles className="w-4 h-4 text-dream-gold" />
          <span>12 Magical Story Realms</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore 12 Unique Story Worlds
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Every realm comes alive with custom background animations, ambient soundscapes, child-safe prompts, and positive moral lessons.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold mt-2">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Kid-Safe • Ages 3–12 • Guaranteed Happy Endings</span>
        </div>
      </div>

      {/* 12 Animated Story World Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {STORY_WORLDS.map((world) => {
          const isFav = favorites.includes(world.id);

          return (
            <motion.div
              key={world.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleWorldClick(world)}
              className="relative rounded-3xl overflow-hidden glass-card-dream border border-dream-purple/40 shadow-2xl flex flex-col justify-between cursor-pointer group hover:border-dream-gold transition-all duration-300"
            >
              <div>
                {/* Large World Illustration Cover */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={world.coverImage}
                    alt={world.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${world.bgGradient} opacity-70`} />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-dream-gold text-[10px] font-extrabold">
                      {world.recommendedAge}
                    </span>

                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => handleAudioPreview(e, world.ambientSound)}
                        className="p-2 rounded-full bg-slate-950/70 text-white hover:text-dream-gold transition-colors"
                        title="Preview Ambient Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => toggleFav(e, world.id)}
                        className="p-2 rounded-full bg-slate-950/70 text-white hover:text-dream-pink transition-colors"
                        title="Favorite World"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-dream-pink text-dream-pink' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Animated World Icon */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                    <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300">
                      {world.emoji}
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold text-white leading-tight">
                        {world.title}
                      </h3>
                      <span className="text-[10px] font-bold text-dream-sky block">
                        {world.storyCount} Stories • {world.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {world.description}
                  </p>

                  <div className="space-y-1">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-dream-gold">
                      Moral Lessons
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {world.moralLessons.slice(0, 3).map((moral) => (
                        <span
                          key={moral}
                          className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-slate-200"
                        >
                          ❤️ {moral}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-5 pt-0 border-t border-white/10 flex items-center justify-between mt-2">
                <span className="text-[11px] font-extrabold text-dream-pink flex items-center gap-1">
                  Enter World
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-magic text-white flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Volume2, ShieldCheck, Wand2, Compass } from 'lucide-react';
import { STORY_WORLDS } from '../../data/storyWorldsData';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';

export const WorldRealmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCurrentWeather } = useEnvironment();

  const world = STORY_WORLDS.find(w => w.id === id) || STORY_WORLDS[0];

  const handleLaunchWorldStory = (storyIdea?: string) => {
    setCurrentWeather(world.ambientSound);
    ambientSynth.playAmbient(world.ambientSound);
    navigate(`/create?world=${world.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 z-20">
      
      {/* Back Button */}
      <Link
        to="/worlds"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#152454] border border-dream-purple/40 text-xs font-extrabold text-dream-cream hover:border-dream-gold transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All 12 Story Worlds</span>
      </Link>

      {/* World Hero Banner */}
      <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-r ${world.bgGradient} border-2 border-dream-gold/40 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
        
        <div className="lg:col-span-8 space-y-4 z-10">
          <div className="flex items-center gap-3">
            <span className="text-5xl sm:text-6xl animate-bounce">{world.emoji}</span>
            <div>
              <span className="px-3 py-0.5 rounded-full bg-dream-purple/80 text-dream-gold font-extrabold text-xs">
                {world.recommendedAge} • {world.difficulty}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                {world.title} Realm
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
            {world.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {world.elements.map((el) => (
              <span key={el} className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-dream-cream">
                ✨ {el}
              </span>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => handleLaunchWorldStory()}
              className="px-8 py-3.5 rounded-2xl bg-gradient-magic text-white font-extrabold text-sm shadow-glow-purple hover:scale-105 transition-all flex items-center gap-2"
            >
              <Wand2 className="w-5 h-5" />
              <span>Create Story in {world.title}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 relative aspect-square rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
          <img src={world.coverImage} alt={world.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Story Ideas & Prompts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Story Ideas List */}
        <div className="p-6 rounded-3xl glass-card-dream border border-dream-purple/40 shadow-xl space-y-4">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-dream-gold" />
            Featured Story Ideas in {world.title}
          </h3>

          <div className="space-y-3">
            {world.storyIdeas.map((idea, idx) => (
              <div
                key={idx}
                onClick={() => handleLaunchWorldStory(idea)}
                className="p-4 rounded-2xl bg-[#1E2E6B]/60 border border-white/10 hover:border-dream-gold transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-dream-purple/30 text-dream-gold font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-dream-gold">
                    {idea}
                  </span>
                </div>
                <Wand2 className="w-4 h-4 text-dream-pink group-hover:scale-125 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        {/* Moral Lessons & Safety Guarantee */}
        <div className="p-6 rounded-3xl glass-card-dream border border-dream-purple/40 shadow-xl space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mb-2">
              ❤️ Educational Moral Lessons
            </h3>
            <p className="text-xs text-slate-300">
              Stories generated in this world automatically reinforce positive character values:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {world.moralLessons.map((moral) => (
              <div key={moral} className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-2">
                <span className="text-lg">🌟</span>
                <span className="text-xs font-bold text-white">{moral}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Child Safety Guarantee</span>
            </div>
            <p className="text-[11px] text-emerald-200">
              Zero violence, horror, or scary elements. Every story ends with a happy bedtime lesson tailored for ages 3–12.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

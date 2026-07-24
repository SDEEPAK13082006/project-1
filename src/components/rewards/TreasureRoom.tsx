import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Star, Award, Heart, Moon, Volume2, CheckCircle2, Lock } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import confetti from 'canvas-confetti';

export const TreasureRoom: React.FC = () => {
  const { achievements } = useStory();

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Moon': return Moon;
      case 'Heart': return Heart;
      case 'Volume2': return Volume2;
      default: return Award;
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-800 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-300/40">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-dream-gold">
            <Trophy className="w-4 h-4 text-dream-gold" />
            <span>Treasure Vault</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans">
            Magic Gem & Badge Treasure Room
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
            Tap any glowing badge to trigger celebration confetti and collect golden reading stars!
          </p>
        </div>

        <div className="z-10 bg-[#152454]/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-dream-gold/40 text-center">
          <span className="text-3xl font-extrabold block text-dream-gold">
            {unlockedCount} / {achievements.length}
          </span>
          <span className="text-xs text-slate-300 font-extrabold uppercase tracking-wider">
            Badges Unlocked
          </span>
        </div>
      </div>

      {/* Floating Gem Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const IconComp = getIcon(ach.icon);
          return (
            <motion.div
              key={ach.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => {
                if (ach.unlocked) handleTriggerConfetti();
              }}
              className={`p-6 rounded-3xl glass-card-dream border relative overflow-hidden flex flex-col justify-between transition-all ${
                ach.unlocked
                  ? 'border-dream-gold/60 shadow-glow-gold cursor-pointer'
                  : 'border-slate-700/50 opacity-75'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ach.badgeColor} text-white flex items-center justify-center shadow-glow-purple`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  {ach.unlocked ? (
                    <span className="px-3 py-1 rounded-full bg-dream-gold text-purple-950 text-xs font-extrabold flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked!
                    </span>
                  ) : (
                    <span className="p-2 rounded-full bg-white/10 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-white">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {ach.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-6 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Progress</span>
                  <span>{ach.progress} / {ach.maxProgress}</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${ach.badgeColor} rounded-full transition-all duration-500`}
                    style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Award, 
  Sparkles, 
  Moon, 
  Compass, 
  Heart, 
  Volume2, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import confetti from 'canvas-confetti';

export const AchievementsPage: React.FC = () => {
  const { achievements } = useStory();

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Moon': return Moon;
      case 'Compass': return Compass;
      case 'Heart': return Heart;
      case 'Volume2': return Volume2;
      default: return Award;
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Award className="w-4 h-4 text-yellow-300" />
            <span>Reading Milestones</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans">
            Reading Badges & Achievements
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-lg">
            Unlock magical trophies by reading stories every night, trying new themes, and listening with AI voice narration!
          </p>
        </div>

        <div className="z-10 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center">
          <span className="text-3xl font-extrabold block text-amber-300">
            {unlockedCount} / {achievements.length}
          </span>
          <span className="text-xs text-purple-200 font-semibold uppercase tracking-wider">
            Badges Unlocked
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const IconComponent = getIconComponent(ach.icon);
          return (
            <div
              key={ach.id}
              onClick={() => ach.unlocked && handleCelebrate()}
              className={`p-6 rounded-3xl glass-card border shadow-xl relative overflow-hidden flex flex-col justify-between transition-all ${
                ach.unlocked 
                  ? 'border-amber-200 dark:border-amber-900/50 cursor-pointer hover:scale-[1.02]' 
                  : 'border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ach.badgeColor} text-white flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  {ach.unlocked ? (
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked
                    </span>
                  ) : (
                    <span className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-6 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {ach.progress} / {ach.maxProgress}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${ach.badgeColor} rounded-full transition-all duration-500`}
                    style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                  />
                </div>
                {ach.unlockedAt && (
                  <p className="text-[10px] text-amber-500 font-medium pt-1">
                    ✨ Unlocked on {ach.unlockedAt}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

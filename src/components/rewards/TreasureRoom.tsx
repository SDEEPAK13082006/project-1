import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Star, Award, Heart, Moon, Volume2, CheckCircle2, Lock, Zap, Gift } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { useEnvironment } from '../../context/EnvironmentContext';
import confetti from 'canvas-confetti';

const MAGIC_GEMS = [
  { id: 'ruby',    emoji: '🔴', name: 'Ruby of Courage',     desc: 'For the bravest readers',   color: '#EF4444', points: 100 },
  { id: 'emerald', emoji: '💚', name: 'Emerald of Wisdom',   desc: 'For curious explorers',     color: '#22C55E', points: 75 },
  { id: 'sapphire',emoji: '💙', name: 'Sapphire of Dreams',  desc: 'For night time adventurers',color: '#3B82F6', points: 120 },
  { id: 'gold',    emoji: '💛', name: 'Golden Dream Star',   desc: 'For magical storytellers',  color: '#F59E0B', points: 150 },
  { id: 'purple',  emoji: '💜', name: 'Amethyst of Magic',   desc: 'For fantasy lovers',        color: '#8B5CF6', points: 90 },
  { id: 'diamond', emoji: '💎', name: 'Diamond of Stories',  desc: 'For legendary readers',     color: '#7FD9FF', points: 200 },
];

export const TreasureRoom: React.FC = () => {
  const { achievements } = useStory();
  const { shootingStarPoints } = useEnvironment();
  const [selectedGem, setSelectedGem] = useState<string | null>(null);
  const [recentCelebration, setRecentCelebration] = useState(false);

  const handleTriggerConfetti = (gemId: string) => {
    setSelectedGem(gemId);
    setRecentCelebration(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD95E', '#A78BFA', '#F472B6', '#4ADE80', '#38BDF8'],
    });
    setTimeout(() => setRecentCelebration(false), 3000);
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
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(180deg, #0a0520 0%, #1a0830 60%, #0a1020 100%)' }}
    >
      {/* Floating gold particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 4 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${10 + Math.random() * 80}%`,
              fontSize: Math.random() * 8 + 6,
            }}
          >
            {['⭐', '✨', '💫', '🌟'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden p-6 sm:p-10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(124,58,237,0.2) 50%, rgba(56,189,248,0.1) 100%)',
            border: '2px solid rgba(245,158,11,0.25)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(245,158,11,0.08)',
          }}
        >
          {/* Aurora glow */}
          <motion.div
            animate={{ x: ['-15%', '15%', '-15%'], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.2), transparent 60%)' }}
          />

          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)' }}>
              <Trophy className="w-4 h-4 text-dream-gold" />
              <span className="text-dream-gold font-bold text-xs tracking-wider uppercase">Treasure Vault</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight"
              style={{ textShadow: '0 0 40px rgba(255,217,94,0.3)' }}>
              Magic Gem &
              <span className="text-dream-gold"> Treasure </span>
              Room
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Collect Magic Gems, unlock Dream Badges, and celebrate your reading journey!
              Click any glowing gem to trigger the celebration!
            </p>
          </div>

          {/* Stats cluster */}
          <div className="flex gap-4 z-10 flex-shrink-0">
            <div className="text-center p-4 rounded-2xl"
              style={{ background: 'rgba(255,217,94,0.1)', border: '1px solid rgba(255,217,94,0.25)' }}>
              <div className="text-3xl font-extrabold text-dream-gold">{shootingStarPoints}</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">⭐ Star Points</div>
            </div>
            <div className="text-center p-4 rounded-2xl"
              style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)' }}>
              <div className="text-3xl font-extrabold text-dream-purple">{unlockedCount}/{achievements.length}</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">🏆 Badges</div>
            </div>
          </div>
        </motion.div>

        {/* ─── Magic Gems Section ─── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-dream-gold/80 uppercase tracking-widest">💎 Magic Gem Collection</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MAGIC_GEMS.map((gem, i) => (
              <motion.div
                key={gem.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -12, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTriggerConfetti(gem.id)}
                className="relative p-4 rounded-2xl text-center cursor-pointer group"
                style={{
                  background: selectedGem === gem.id
                    ? `${gem.color}22`
                    : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${selectedGem === gem.id ? gem.color : `${gem.color}33`}`,
                  boxShadow: selectedGem === gem.id
                    ? `0 0 30px ${gem.color}44, 0 15px 40px rgba(0,0,0,0.4)`
                    : '0 8px 25px rgba(0,0,0,0.3)',
                }}
              >
                {/* Glow aura */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 30%, ${gem.color}22, transparent 70%)` }}
                />

                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2.5 + i * 0.2, repeat: Infinity }}
                  className="text-4xl mb-2 relative z-10"
                >{gem.emoji}</motion.div>
                <div className="text-[10px] font-extrabold text-white/90 relative z-10 leading-tight mb-1">{gem.name}</div>
                <div className="text-[9px] text-slate-400 relative z-10">{gem.desc}</div>
                <div className="mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold relative z-10 inline-block"
                  style={{ background: `${gem.color}22`, color: gem.color, border: `1px solid ${gem.color}44` }}>
                  +{gem.points} ⭐
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Achievement Badge Wall ─── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-dream-gold/80 uppercase tracking-widest">🏆 Achievement Badges</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
            <span className="text-xs text-white/30">{unlockedCount} / {achievements.length} earned</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((ach, i) => {
              const IconComp = getIcon(ach.icon);
              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => {
                    if (ach.unlocked) handleTriggerConfetti(ach.id);
                  }}
                  className="relative p-5 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
                  style={{
                    background: ach.unlocked
                      ? 'rgba(255,217,94,0.06)'
                      : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${ach.unlocked ? 'rgba(255,217,94,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    cursor: ach.unlocked ? 'pointer' : 'default',
                    opacity: ach.unlocked ? 1 : 0.65,
                    boxShadow: ach.unlocked ? '0 0 25px rgba(255,217,94,0.08)' : 'none',
                  }}
                >
                  {/* Shimmer effect on unlocked */}
                  {ach.unlocked && (
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
                    />
                  )}

                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${ach.badgeColor})` }}
                      >
                        <IconComp className="w-7 h-7" />
                      </div>
                      {ach.unlocked ? (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold"
                          style={{ background: 'rgba(255,217,94,0.2)', color: '#FFD95E', border: '1px solid rgba(255,217,94,0.3)' }}>
                          <CheckCircle2 className="w-3 h-3" />
                          Unlocked!
                        </div>
                      ) : (
                        <div className="p-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <Lock className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-white mb-1">{ach.title}</h4>
                      <p className="text-xs text-slate-400">{ach.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-4 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>Progress</span>
                      <span style={{ color: ach.unlocked ? '#FFD95E' : 'rgba(255,255,255,0.4)' }}>
                        {ach.progress} / {ach.maxProgress}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                        transition={{ duration: 0.8, delay: i * 0.07 + 0.3 }}
                        className="h-full rounded-full"
                        style={{
                          background: ach.unlocked
                            ? 'linear-gradient(90deg, #F59E0B, #FFD95E)'
                            : `linear-gradient(90deg, ${ach.badgeColor})`,
                        }}
                      />
                    </div>
                  </div>

                  {ach.unlocked && (
                    <div className="mt-3 text-[9px] text-dream-gold/60 font-medium text-center">
                      🎉 Click to celebrate!
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Daily Reward Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(245,158,11,0.15) 100%)',
            border: '2px solid rgba(167,139,250,0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.1)',
          }}
        >
          <motion.div
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
          />
          <div className="flex items-center gap-5 z-10">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl"
            >🎁</motion.div>
            <div>
              <div className="text-xs font-extrabold text-dream-gold uppercase tracking-widest mb-1">Daily Reward Available!</div>
              <h3 className="text-xl font-extrabold text-white">Read tonight's story to earn +50 Stars</h3>
              <p className="text-sm text-slate-400 mt-1">Your reading streak is active! Don't break the chain 🔥</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTriggerConfetti('daily')}
            className="flex-shrink-0 px-8 py-3.5 rounded-2xl text-white font-bold text-sm z-10 flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
              boxShadow: '0 0 30px rgba(124,58,237,0.5)',
              border: '1px solid rgba(167,139,250,0.4)',
            }}
          >
            <Gift className="w-4 h-4" />
            Claim Reward
          </motion.button>
        </motion.div>

        {/* Celebration overlay */}
        <AnimatePresence>
          {recentCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] text-center pointer-events-none"
            >
              <div className="text-8xl animate-bounce">🎉</div>
              <div className="text-2xl font-extrabold text-dream-gold mt-2"
                style={{ textShadow: '0 0 30px rgba(255,217,94,0.6)' }}>
                Amazing!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

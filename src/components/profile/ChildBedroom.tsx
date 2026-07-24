import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Star, Trophy, BookOpen, Moon, Sun, Sparkles, Heart, Clock, CheckCircle2, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStory } from '../../context/StoryContext';

const AVATAR_EMOJIS = ['🧒', '👦', '👧', '🧑', '🧙‍♂️', '🧚', '🦸', '🧜', '🦊', '🐉', '🦄', '🌟'];
const BEDROOM_THEMES = [
  { id: 'space',   label: 'Space Explorer', emoji: '🚀', bg: 'from-[#050a20] to-[#0e1a50]', accent: '#38BDF8' },
  { id: 'forest',  label: 'Forest Fairy',   emoji: '🌿', bg: 'from-[#0a1a10] to-[#1a3a20]', accent: '#4ADE80' },
  { id: 'ocean',   label: 'Ocean Dreamer',  emoji: '🌊', bg: 'from-[#040d20] to-[#0a2040]', accent: '#7FD9FF' },
  { id: 'magic',   label: 'Magic Kingdom',  emoji: '✨', bg: 'from-[#1a0530] to-[#2d0a60]', accent: '#A78BFA' },
  { id: 'candy',   label: 'Candy World',    emoji: '🍭', bg: 'from-[#200510] to-[#4a1525]', accent: '#F472B6' },
  { id: 'desert',  label: 'Desert Dunes',   emoji: '🏜️', bg: 'from-[#201005] to-[#403010]', accent: '#F59E0B' },
];

const SKILLS = [
  { name: 'Reader',       icon: '📖', points: 420, maxPoints: 500, level: 8 },
  { name: 'Explorer',     icon: '🌍', points: 280, maxPoints: 400, level: 6 },
  { name: 'Storyteller',  icon: '✨', points: 190, maxPoints: 300, level: 5 },
  { name: 'Dreamer',      icon: '💫', points: 350, maxPoints: 400, level: 7 },
];

export const ChildBedroom: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { stories, achievements } = useStory();
  const [selectedTheme, setSelectedTheme] = useState('magic');
  const [editName, setEditName] = useState(false);
  const [tempName, setTempName] = useState(user?.childName || 'Dream Hero');
  const [selectedAvatar, setSelectedAvatar] = useState('🧒');
  const [lampOn, setLampOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'achievements'>('profile');

  const currentTheme = BEDROOM_THEMES.find(t => t.id === selectedTheme) || BEDROOM_THEMES[3];
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalReadingMinutes = stories.reduce((a, s) => a + s.readingTimeMinutes, 0);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(180deg, #060215 0%, #0a1030 100%)' }}
    >
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -25, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: 4 + i * 0.3, delay: i * 0.25, repeat: Infinity }}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${10 + Math.random() * 80}%`,
              width: Math.random() * 2.5 + 1,
              height: Math.random() * 2.5 + 1,
              background: ['#FFD95E', '#A78BFA', '#7FD9FF', '#F472B6', '#4ADE80'][i % 5],
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* ─── Profile Hero Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.bg.replace('from-', '').replace(' to-', ', ')})`,
            border: `2px solid ${currentTheme.accent}33`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${currentTheme.accent}15`,
          }}
        >
          {/* Animated bg aurora */}
          <motion.div
            animate={{ x: ['-10%', '10%', '-10%'], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${currentTheme.accent}55, transparent 70%)` }}
          />

          <div className="relative z-10 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl cursor-pointer select-none"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.accent}33, rgba(0,0,0,0.3))`,
                  border: `3px solid ${currentTheme.accent}55`,
                  boxShadow: `0 0 30px ${currentTheme.accent}33`,
                }}
                onClick={() => setSelectedAvatar(AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)])}
              >
                {selectedAvatar}
              </motion.div>
              {/* Glow ring on avatar */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ boxShadow: `0 0 25px ${currentTheme.accent}66` }}
              />
              <button
                className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs"
                style={{ background: currentTheme.accent, color: '#000' }}
                onClick={() => setSelectedAvatar(AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)])}
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              {/* Name */}
              <div className="flex items-center gap-3">
                {editName ? (
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => { updateProfile({ childName: tempName }); setEditName(false); }}
                    onKeyDown={(e) => e.key === 'Enter' && setEditName(false)}
                    autoFocus
                    className="text-2xl sm:text-3xl font-extrabold text-white bg-transparent border-b-2 focus:outline-none"
                    style={{ borderColor: currentTheme.accent }}
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {user?.childName || 'Dream Hero'}
                  </h1>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setEditName(!editName)}
                  className="p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
                  style={{ background: `${currentTheme.accent}22` }}
                >
                  <Edit3 className="w-3.5 h-3.5 text-white" />
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: `${currentTheme.accent}22`, color: currentTheme.accent, border: `1px solid ${currentTheme.accent}44` }}>
                  {currentTheme.emoji} {currentTheme.label}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(255,217,94,0.15)', color: '#FFD95E', border: '1px solid rgba(255,217,94,0.3)' }}>
                  ⭐ Dream Explorer
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.3)' }}>
                  🔥 {stories.length > 0 ? `${stories.length} Stories Read` : 'New Reader'}
                </span>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6">
                {[
                  { icon: BookOpen, label: 'Stories', value: stories.length },
                  { icon: Trophy, label: 'Badges', value: unlockedAchievements },
                  { icon: Clock, label: 'Hours', value: `${Math.round(totalReadingMinutes / 60)}h` },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <stat.icon className="w-3.5 h-3.5 opacity-60" style={{ color: currentTheme.accent }} />
                    <span className="text-lg font-extrabold text-white">{stat.value}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Tab Navigation ─── */}
        <div className="flex gap-1 p-1 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['profile', 'stats', 'achievements'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all capitalize"
              style={{
                background: activeTab === tab ? 'rgba(124,58,237,0.5)' : 'transparent',
                color: activeTab === tab ? '#A78BFA' : 'rgba(255,255,255,0.4)',
                border: activeTab === tab ? '1px solid rgba(167,139,250,0.4)' : '1px solid transparent',
              }}
            >
              {tab === 'profile' ? '🏠 Room' : tab === 'stats' ? '📊 Stats' : '🏆 Badges'}
            </button>
          ))}
        </div>

        {/* ─── Tab Content ─── */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Bedroom Theme */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-dream-gold/80 uppercase tracking-widest">🎨 Room Theme</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {BEDROOM_THEMES.map(theme => (
                    <motion.button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative p-3 rounded-2xl flex flex-col items-center gap-2 transition-all"
                      style={{
                        background: selectedTheme === theme.id ? `${theme.accent}22` : 'rgba(255,255,255,0.03)',
                        border: `2px solid ${selectedTheme === theme.id ? theme.accent : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: selectedTheme === theme.id ? `0 0 20px ${theme.accent}33` : 'none',
                      }}
                    >
                      <span className="text-2xl">{theme.emoji}</span>
                      <span className="text-[9px] font-bold text-white/70 text-center leading-tight">{theme.label}</span>
                      {selectedTheme === theme.id && (
                        <motion.div
                          layoutId="theme-ring"
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{ boxShadow: `0 0 15px ${theme.accent}55` }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Avatar picker */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-dream-gold/80 uppercase tracking-widest">🎭 Avatar</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {AVATAR_EMOJIS.map((emoji, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedAvatar(emoji)}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
                      style={{
                        background: selectedAvatar === emoji ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.04)',
                        border: `2px solid ${selectedAvatar === emoji ? '#A78BFA' : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: selectedAvatar === emoji ? '0 0 15px rgba(124,58,237,0.4)' : 'none',
                      }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Interactive Room Objects */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-dream-gold/80 uppercase tracking-widest">🛋️ Room Objects</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { emoji: lampOn ? '💡' : '🕯️', label: 'Night Lamp', status: lampOn ? 'Glowing On' : 'Off', color: '#FFD95E', action: () => setLampOn(!lampOn) },
                    { emoji: '🛏️', label: 'Cozy Bed',   status: 'Dreamland Ready', color: '#A78BFA', action: () => {} },
                    { emoji: '🧸', label: 'Toy Box',    status: 'Teddy & Wand',    color: '#7FD9FF', action: () => {} },
                    { emoji: '📚', label: 'Bookshelf',  status: `${stories.length} Books`,   color: '#4ADE80', action: () => {} },
                  ].map((obj, i) => (
                    <motion.div
                      key={i}
                      onClick={obj.action}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      className="p-5 rounded-2xl cursor-pointer flex flex-col items-center text-center gap-2"
                      style={{
                        background: `${obj.color}11`,
                        border: `2px solid ${obj.color}33`,
                        boxShadow: `0 8px 25px rgba(0,0,0,0.3)`,
                      }}
                    >
                      <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
                        className="text-3xl"
                      >{obj.emoji}</motion.span>
                      <span className="text-xs font-bold text-white">{obj.label}</span>
                      <span className="text-[10px] font-medium" style={{ color: obj.color }}>{obj.status}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-dream-gold/80 uppercase tracking-widest">⚡ Dream Skills</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {SKILLS.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-2xl space-y-2.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{skill.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-white">{skill.name}</div>
                            <div className="text-[9px] text-slate-400 font-medium">Level {skill.level}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-dream-gold">{skill.points}</div>
                          <div className="text-[9px] text-slate-500">/ {skill.maxPoints} XP</div>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.points / skill.maxPoints) * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { emoji: '📖', label: 'Stories Read', value: stories.length, color: '#A78BFA' },
                  { emoji: '⏱️', label: 'Total Minutes', value: `${totalReadingMinutes}m`, color: '#38BDF8' },
                  { emoji: '🏆', label: 'Badges Earned', value: `${unlockedAchievements}/${achievements.length}`, color: '#FFD95E' },
                  { emoji: '❤️', label: 'Favorites', value: stories.filter(s => s.isFavorite).length, color: '#F472B6' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2"
                    style={{
                      background: `${stat.color}10`,
                      border: `2px solid ${stat.color}30`,
                      boxShadow: `0 8px 25px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <span className="text-3xl">{stat.emoji}</span>
                    <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: stat.color }}>{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Reading activity heatmap-style */}
              <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-xs font-extrabold text-white/70 uppercase tracking-widest">📅 Weekly Reading Activity</div>
                <div className="flex gap-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
                    const intensity = Math.random();
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${20 + intensity * 80}%` }}
                          transition={{ duration: 0.8, delay: i * 0.08 }}
                          className="w-full rounded-t-lg min-h-[8px]"
                          style={{
                            background: `linear-gradient(to top, #7C3AED, #A78BFA)`,
                            opacity: 0.3 + intensity * 0.7,
                          }}
                        />
                        <span className="text-[9px] text-slate-500 font-medium">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Favorite genres */}
              <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-xs font-extrabold text-white/70 uppercase tracking-widest">🎭 Favorite Story Genres</div>
                <div className="space-y-3">
                  {[
                    { genre: '🌍 Adventure', pct: 42, color: '#F59E0B' },
                    { genre: '✨ Fantasy',   pct: 31, color: '#A78BFA' },
                    { genre: '🚀 Sci-Fi',    pct: 16, color: '#38BDF8' },
                    { genre: '🌿 Nature',    pct: 11, color: '#4ADE80' },
                  ].map((g, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/70 font-semibold">{g.genre}</span>
                        <span className="font-bold" style={{ color: g.color }}>{g.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${g.pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: g.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative p-5 rounded-2xl overflow-hidden"
                  style={{
                    background: ach.unlocked ? 'rgba(255,217,94,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${ach.unlocked ? 'rgba(255,217,94,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    opacity: ach.unlocked ? 1 : 0.6,
                  }}
                >
                  {/* Badge Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${ach.badgeColor.includes('purple') ? '#7C3AED, #4C1D95' : '#F59E0B, #D97706'})` }}
                    >
                      {ach.unlocked ? '🏆' : '🔒'}
                    </div>
                    {ach.unlocked && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-dream-gold"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </motion.div>
                    )}
                  </div>

                  <h4 className="text-sm font-extrabold text-white mb-1">{ach.title}</h4>
                  <p className="text-[11px] text-slate-400 mb-3">{ach.description}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>Progress</span>
                      <span className="text-white/60">{ach.progress}/{ach.maxProgress}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 + 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: ach.unlocked ? 'linear-gradient(90deg, #FFD95E, #F59E0B)' : 'linear-gradient(90deg, #7C3AED, #A78BFA)' }}
                      />
                    </div>
                  </div>

                  {ach.unlocked && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                      style={{ background: 'rgba(255,217,94,0.2)', color: '#FFD95E', border: '1px solid rgba(255,217,94,0.3)' }}>
                      <CheckCircle2 className="w-3 h-3" />
                      Unlocked
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

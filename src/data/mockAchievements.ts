import { Achievement } from '../types/story';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: '100 Stories Master',
    description: 'Listen or generate 100 magical bedtime stories.',
    icon: 'Sparkles',
    unlocked: false,
    progress: 14,
    maxProgress: 100,
    badgeColor: 'from-amber-400 to-yellow-500'
  },
  {
    id: 'ach-2',
    title: '10 Days Bedtime Streak',
    description: 'Read bedtime stories 10 days in a row before sleep.',
    icon: 'Moon',
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    unlockedAt: 'Jul 20, 2026',
    badgeColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'ach-3',
    title: 'Adventure Lover',
    description: 'Create 5 stories with the Adventure style.',
    icon: 'Compass',
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    unlockedAt: 'Jul 22, 2026',
    badgeColor: 'from-sky-400 to-blue-600'
  },
  {
    id: 'ach-4',
    title: 'Animal Expert',
    description: 'Include 10 different favorite animals in your stories.',
    icon: 'Heart',
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    badgeColor: 'from-pink-400 to-rose-500'
  },
  {
    id: 'ach-5',
    title: 'Good Listener',
    description: 'Listen to 15 full stories with AI voice narration.',
    icon: 'Volume2',
    unlocked: true,
    progress: 15,
    maxProgress: 15,
    unlockedAt: 'Jul 23, 2026',
    badgeColor: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'ach-6',
    title: 'Moral Champion',
    description: 'Explore stories featuring all 10 educational moral lessons.',
    icon: 'Award',
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    badgeColor: 'from-violet-400 to-purple-600'
  }
];

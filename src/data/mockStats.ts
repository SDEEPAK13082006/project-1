export interface ParentDashboardStats {
  weeklyMinutes: { day: string; minutes: number }[];
  favoriteTopics: { name: string; percentage: number; color: string }[];
  moralProgress: { lesson: string; count: number }[];
  totalReadingTimeMinutes: number;
  totalStoriesRead: number;
  currentStreakDays: number;
  avgReadingTimePerSession: number;
}

export const INITIAL_PARENT_STATS: ParentDashboardStats = {
  weeklyMinutes: [
    { day: 'Mon', minutes: 15 },
    { day: 'Tue', minutes: 20 },
    { day: 'Wed', minutes: 12 },
    { day: 'Thu', minutes: 25 },
    { day: 'Fri', minutes: 30 },
    { day: 'Sat', minutes: 35 },
    { day: 'Sun', minutes: 22 },
  ],
  favoriteTopics: [
    { name: 'Fantasy & Magic', percentage: 40, color: '#8B5CF6' },
    { name: 'Ocean & Mermaids', percentage: 25, color: '#38BDF8' },
    { name: 'Space Exploration', percentage: 20, color: '#EC4899' },
    { name: 'Jungle & Animals', percentage: 15, color: '#FBBF24' },
  ],
  moralProgress: [
    { lesson: 'Kindness', count: 8 },
    { lesson: 'Teamwork', count: 6 },
    { lesson: 'Bravery', count: 5 },
    { lesson: 'Sharing', count: 4 },
    { lesson: 'Honesty', count: 3 },
  ],
  totalReadingTimeMinutes: 285,
  totalStoriesRead: 24,
  currentStreakDays: 10,
  avgReadingTimePerSession: 12
};

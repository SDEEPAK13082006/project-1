import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Clock, BookOpen, Flame, Award, CheckCircle2 } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

export const ParentStatsCharts: React.FC = () => {
  const { parentStats } = useStory();

  const statCards = [
    {
      label: 'Total Reading Time',
      value: `${parentStats.totalReadingTimeMinutes} mins`,
      subtitle: '~4.7 hours of bedtime magic',
      icon: Clock,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      label: 'Stories Read',
      value: `${parentStats.totalStoriesRead} stories`,
      subtitle: '8 stories this week',
      icon: BookOpen,
      color: 'from-sky-400 to-blue-600'
    },
    {
      label: 'Current Reading Streak',
      value: `${parentStats.currentStreakDays} Days`,
      subtitle: '🔥 Active bedtime habit',
      icon: Flame,
      color: 'from-amber-400 to-orange-500'
    },
    {
      label: 'Avg. Story Length',
      value: `${parentStats.avgReadingTimePerSession} mins`,
      subtitle: 'Optimal bedtime pace',
      icon: Award,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-md flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  {card.label}
                </span>
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                  {card.value}
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Minutes Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Weekly Bedtime Reading Time
              </h3>
              <p className="text-xs text-slate-500">Minutes read per day</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-dream-purple font-semibold text-xs">
              This Week
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={parentStats.weeklyMinutes}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="minutes" radius={[8, 8, 0, 0]}>
                  {parentStats.weeklyMinutes.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#8B5CF6', '#EC4899', '#38BDF8', '#FBBF24', '#8B5CF6', '#EC4899', '#38BDF8'][index % 7]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Favorite Topics Donut Chart */}
        <div className="p-6 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Favorite Topics
            </h3>
            <p className="text-xs text-slate-500">Most requested story themes</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={parentStats.favoriteTopics}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="percentage"
                >
                  {parentStats.favoriteTopics.map((entry, index) => (
                    <Cell key={`pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2">
            {parentStats.favoriteTopics.map((topic, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: topic.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{topic.name}</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">{topic.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moral Lessons Progress Grid */}
      <div className="p-6 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Moral Lessons Learned
          </h3>
          <p className="text-xs text-slate-500">Character & life values reinforced in bedtime stories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {parentStats.moralProgress.map((moral, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-purple-100 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {moral.lesson}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-400">{moral.count} Stories Read</p>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-dream rounded-full"
                  style={{ width: `${Math.min(100, moral.count * 12)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

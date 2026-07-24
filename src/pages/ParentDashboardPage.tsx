import React from 'react';
import { ParentStatsCharts } from '../components/dashboard/ParentStatsCharts';
import { BarChart3, Download, Award, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ParentDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dream-purple/90 via-dream-pink/80 to-dream-blue/90 text-white shadow-2xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Parent Insights Portal</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans">
            Welcome, {user?.name || 'Parent'}!
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
            Track weekly bedtime reading minutes, educational moral milestones, topic preferences, and reading streak achievements.
          </p>
        </div>

        <button className="z-10 px-5 py-2.5 rounded-2xl bg-white text-purple-950 font-bold text-xs shadow-md hover:bg-purple-50 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Export Parent Report</span>
        </button>

        {/* Background Overlay */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Charts & Metrics */}
      <ParentStatsCharts />
    </div>
  );
};

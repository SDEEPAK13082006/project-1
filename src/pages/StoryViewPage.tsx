import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { BookViewer } from '../components/story/BookViewer';

export const StoryViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getStoryById, activeStory } = useStory();

  const story = id ? getStoryById(id) : activeStory;

  if (!story) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl glass-card text-center space-y-4">
        <Sparkles className="w-12 h-12 text-dream-purple mx-auto" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Story Not Found</h3>
        <p className="text-xs text-slate-500">The story you are looking for does not exist or has been removed.</p>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-dream text-white font-semibold text-sm"
        >
          Generate New Story
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/my-stories"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-dream-purple transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Book Reader */}
      <BookViewer story={story} />
    </div>
  );
};

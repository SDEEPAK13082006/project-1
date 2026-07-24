import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Heart, 
  BookOpen, 
  Trash2, 
  Copy, 
  Download, 
  Clock, 
  Sparkles,
  Plus
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { exportStoryToPDF } from '../services/pdfExporter';

export const MyStoriesPage: React.FC = () => {
  const { stories, toggleFavorite, deleteStory, duplicateStory, setActiveStory } = useStory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Favorites' | 'Fantasy' | 'Ocean' | 'Adventure'>('All');

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.moralLesson.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'Favorites') return matchesSearch && story.isFavorite;
    if (selectedFilter !== 'All') return matchesSearch && story.style === selectedFilter;
    return matchesSearch;
  });

  const latestStory = stories[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-sans text-slate-800 dark:text-white">
            My Bedtime Library
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access, continue reading, or export your saved personalized storybooks.
          </p>
        </div>

        <Link
          to="/generate"
          className="px-6 py-3 rounded-2xl bg-gradient-dream text-white font-bold text-sm shadow-lg hover:shadow-glow-purple transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Story</span>
        </Link>
      </div>

      {/* Continue Reading Card Banner */}
      {latestStory && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 items-center border border-purple-800/40">
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Continue Reading</span>
            </div>
            <h3 className="text-2xl font-bold font-sans">
              {latestStory.title}
            </h3>
            <p className="text-xs text-purple-200 line-clamp-2">
              {latestStory.summary}
            </p>
            <div className="pt-2">
              <Link
                to={`/story/${latestStory.id}`}
                onClick={() => setActiveStory(latestStory)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-100 transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Resume Reading</span>
              </Link>
            </div>
          </div>

          <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/20">
            <img src={latestStory.coverImage} alt={latestStory.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-3xl border border-purple-100 dark:border-slate-800">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title, child name, moral..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl glass-input text-xs text-slate-800 dark:text-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {(['All', 'Favorites', 'Fantasy', 'Ocean', 'Adventure'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === filter
                  ? 'bg-dream-purple text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Story Cards Grid */}
      {filteredStories.length === 0 ? (
        <div className="p-12 text-center glass-card rounded-3xl space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">No Stories Found</h4>
          <p className="text-xs text-slate-400">Try adjusting your search terms or filter selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between group hover:shadow-2xl transition-all"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(story.id)}
                      className="p-2 rounded-xl bg-slate-900/60 backdrop-blur-md text-white hover:text-pink-500 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${story.isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold">
                    {story.style}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-1">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {story.summary}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400 font-medium">
                    <span>Child: {story.childName}</span>
                    <span>•</span>
                    <span>Lesson: {story.moralLesson}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-3">
                <Link
                  to={`/story/${story.id}`}
                  onClick={() => setActiveStory(story)}
                  className="px-4 py-2 rounded-xl bg-gradient-dream text-white font-semibold text-xs shadow-sm hover:opacity-95 transition-all"
                >
                  Read Story
                </Link>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    onClick={() => exportStoryToPDF(story)}
                    title="Export PDF"
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-dream-purple"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => duplicateStory(story.id)}
                    title="Duplicate Story"
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-dream-purple"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteStory(story.id)}
                    title="Delete Story"
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

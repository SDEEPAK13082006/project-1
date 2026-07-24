import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Download, Plus, Search, Sparkles } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { exportStoryToPDF } from '../../services/pdfExporter';

export const WoodenBookshelf: React.FC = () => {
  const { stories, toggleFavorite, setActiveStory } = useStory();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All');

  const filteredStories = stories.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.childName.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedTheme !== 'All') return matchesSearch && s.style === selectedTheme;
    return matchesSearch;
  });

  const handleOpenBook = (story: any) => {
    setActiveStory(story);
    navigate(`/story/${story.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dream-purple/20 border border-dream-purple/40 text-dream-gold font-bold text-xs mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Wooden Library Realm</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Grand Bookshelf Library
          </h2>
          <p className="text-xs text-slate-300">
            Click on any storybook on the wooden shelf to enter the magical tale!
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search book by title or hero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl glass-input-dream text-xs text-white"
          />
        </div>
      </div>

      {/* 3D Wooden Bookshelf Shelves */}
      <div className="space-y-12">
        {/* Shelf Tier 1 */}
        <div className="relative rounded-3xl wood-shelf p-6 sm:p-8 space-y-6 shadow-2xl border-4 border-[#523118]">
          <div className="flex items-center justify-between border-b border-amber-200/20 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-dream-gold">
              🪵 Shelf Tier I: Featured Storybooks
            </span>
            <span className="text-xs text-amber-200 font-semibold">
              {filteredStories.length} Books Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ y: -10, rotate: -1, scale: 1.03 }}
                className="relative group rounded-2xl overflow-hidden bg-[#152454] border-2 border-dream-gold/40 shadow-2xl flex flex-col justify-between cursor-pointer"
                onClick={() => handleOpenBook(story)}
              >
                {/* Favorite Ribbon */}
                {story.isFavorite && (
                  <div className="absolute top-0 right-3 z-20 w-6 h-10 bg-dream-pink flex items-center justify-center rounded-b-md shadow-md">
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>
                )}

                {/* Book Cover Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A40] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="px-2.5 py-0.5 rounded-full bg-dream-purple/80 text-[10px] font-bold">
                      {story.style}
                    </span>
                    <h4 className="text-base font-extrabold leading-snug mt-1 text-dream-cream line-clamp-2">
                      {story.title}
                    </h4>
                  </div>
                </div>

                {/* Book Spine Details */}
                <div className="p-4 bg-[#0E1A40] space-y-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                    <span>Hero: {story.childName}</span>
                    <span>~{story.readingTimeMinutes}m</span>
                  </div>
                  
                  {/* Reading Progress Bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-magic rounded-full w-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wooden Shelf Base Lip */}
          <div className="h-4 w-full bg-[#523118] rounded-b-xl border-t border-amber-200/30" />
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, Download, Plus, Search, Sparkles, Star, Clock, Filter, X } from 'lucide-react';
import { useStory } from '../../context/StoryContext';
import { exportStoryToPDF } from '../../services/pdfExporter';

const GENRES = ['All', 'Adventure', 'Fantasy', 'Mystery', 'Sci-Fi', 'Comedy', 'Educational'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'A-Z', 'Shortest', 'Favorites'];

const SHELF_DECO_ITEMS = [
  { emoji: '🦉', label: 'Oliver the Owl' },
  { emoji: '🌿', label: 'Vine' },
  { emoji: '🕯️', label: 'Candle' },
  { emoji: '🔮', label: 'Crystal Ball' },
  { emoji: '⭐', label: 'Magic Star' },
];

export const WoodenBookshelf: React.FC = () => {
  const { stories, toggleFavorite, setActiveStory } = useStory();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [previewStory, setPreviewStory] = useState<any | null>(null);

  const filteredStories = useMemo(() => {
    let result = stories.filter(s => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.childName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || s.style === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    switch (sortBy) {
      case 'A-Z': result = [...result].sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'Favorites': result = [...result].sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)); break;
      case 'Shortest': result = [...result].sort((a, b) => a.readingTimeMinutes - b.readingTimeMinutes); break;
      default: break;
    }
    return result;
  }, [stories, searchTerm, selectedGenre, sortBy]);

  const handleOpenBook = (story: any) => {
    setActiveStory(story);
    navigate(`/story/${story.id}`);
  };

  const handleDownload = (e: React.MouseEvent, story: any) => {
    e.stopPropagation();
    exportStoryToPDF(story);
  };

  const handleFavorite = (e: React.MouseEvent, story: any) => {
    e.stopPropagation();
    toggleFavorite(story.id);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(180deg, #0a0520 0%, #0e1a40 40%, #1a1240 100%)' }}
    >
      {/* Floating ambient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 5 + i * 0.4, delay: i * 0.3, repeat: Infinity }}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 70}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: ['#FFD95E', '#A78BFA', '#7FD9FF'][i % 3],
              boxShadow: `0 0 6px currentColor`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          {/* Title section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-3"
                style={{
                  background: 'rgba(124,58,237,0.2)',
                  border: '1px solid rgba(167,139,250,0.4)',
                }}>
                <BookOpen className="w-4 h-4 text-dream-gold" />
                <span className="text-dream-gold font-bold text-xs">Magical Library Realm</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight"
                style={{ textShadow: '0 0 40px rgba(167,139,250,0.3)' }}>
                Grand Storybook
                <span className="text-dream-gold"> Library</span>
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                {stories.length} magical tales await • Click any book to begin the adventure
              </p>
            </div>

            {/* Create new button */}
            <motion.button
              onClick={() => navigate('/create')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
                boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                border: '1px solid rgba(167,139,250,0.4)',
              }}
            >
              <Plus className="w-4 h-4" />
              New Story
            </motion.button>
          </div>

          {/* Search + Filters bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title or hero name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <motion.button
              onClick={() => setShowFilters(o => !o)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all"
              style={{
                background: showFilters ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${showFilters ? '#A78BFA' : 'rgba(255,255,255,0.12)'}`,
                color: showFilters ? '#A78BFA' : 'rgba(255,255,255,0.6)',
              }}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedGenre !== 'All' || sortBy !== 'Newest') && (
                <span className="w-2 h-2 rounded-full bg-dream-gold ml-1" />
              )}
            </motion.button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-6 p-5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-dream-gold/80 uppercase tracking-wider">Genre</div>
                    <div className="flex flex-wrap gap-2">
                      {GENRES.map(g => (
                        <button key={g} onClick={() => setSelectedGenre(g)}
                          className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                          style={{
                            background: selectedGenre === g ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.06)',
                            border: `1px solid ${selectedGenre === g ? '#A78BFA' : 'rgba(255,255,255,0.1)'}`,
                            color: selectedGenre === g ? '#A78BFA' : 'rgba(255,255,255,0.6)',
                          }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-dream-gold/80 uppercase tracking-wider">Sort By</div>
                    <div className="flex flex-wrap gap-2">
                      {SORT_OPTIONS.map(s => (
                        <button key={s} onClick={() => setSortBy(s)}
                          className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                          style={{
                            background: sortBy === s ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)',
                            border: `1px solid ${sortBy === s ? '#F59E0B' : 'rgba(255,255,255,0.1)'}`,
                            color: sortBy === s ? '#FFD95E' : 'rgba(255,255,255,0.6)',
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── 3D Wooden Bookshelves ─── */}
        {filteredStories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 space-y-4"
          >
            <div className="text-6xl">📚</div>
            <div className="text-xl font-bold text-white/60">No stories found</div>
            <p className="text-sm text-slate-500">Try a different search or create your first story!</p>
            <motion.button
              onClick={() => navigate('/create')}
              whileHover={{ scale: 1.05 }}
              className="mt-4 px-6 py-3 rounded-2xl text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)' }}
            >
              ✨ Create First Story
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {/* Shelf with books */}
            {[0, 1].map(shelfRow => {
              const booksOnShelf = filteredStories.slice(shelfRow * 4, shelfRow * 4 + 4);
              if (booksOnShelf.length === 0) return null;
              return (
                <motion.div
                  key={shelfRow}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shelfRow * 0.1 }}
                  className="relative"
                >
                  {/* Shelf label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{shelfRow === 0 ? '🪵' : '📖'}</span>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-dream-gold/80">
                        {shelfRow === 0 ? 'Featured Stories' : 'More Adventures'}
                      </span>
                    </div>
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,217,94,0.15)' }} />
                    <span className="text-xs text-white/30">{booksOnShelf.length} books</span>
                  </div>

                  {/* Wooden shelf container */}
                  <div
                    className="relative p-5 rounded-2xl"
                    style={{
                      background: 'linear-gradient(180deg, #3D2408 0%, #2A1A06 100%)',
                      border: '4px solid #5C3810',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Shelf wood grain texture */}
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="absolute inset-x-4 h-px opacity-20"
                        style={{ top: `${20 + i * 20}%`, background: 'rgba(255,255,255,0.3)' }} />
                    ))}

                    {/* Decorative items on shelf top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-none">
                      {SHELF_DECO_ITEMS.slice(0, 3).map((d, i) => (
                        <motion.span key={i} animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
                          className="text-lg">{d.emoji}</motion.span>
                      ))}
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                      {booksOnShelf.map((story, idx) => (
                        <motion.div
                          key={story.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          onHoverStart={() => setHoveredBookId(story.id)}
                          onHoverEnd={() => setHoveredBookId(null)}
                          whileHover={{ y: -14, scale: 1.03 }}
                          onClick={() => setPreviewStory(story)}
                          className="relative group rounded-2xl overflow-hidden cursor-pointer"
                          style={{
                            background: 'linear-gradient(160deg, #1a0e40, #0E1A40)',
                            border: hoveredBookId === story.id ? '2px solid #FFD95E88' : '2px solid rgba(167,139,250,0.25)',
                            boxShadow: hoveredBookId === story.id
                              ? '0 20px 50px rgba(0,0,0,0.6), 0 0 25px rgba(255,217,94,0.15)'
                              : '0 10px 30px rgba(0,0,0,0.5)',
                          }}
                        >
                          {/* Favorite Ribbon */}
                          {story.isFavorite && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-0 right-3 z-20 w-6 h-9 flex items-start justify-center pt-1"
                              style={{ background: 'linear-gradient(to bottom, #EC4899, #BE185D)', borderRadius: '0 0 6px 6px' }}
                            >
                              <Heart className="w-3.5 h-3.5 fill-white text-white" />
                            </motion.div>
                          )}

                          {/* Book Cover */}
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={story.coverImage}
                              alt={story.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080420] via-[#080420]/40 to-transparent" />

                            {/* Glow on hover */}
                            {hoveredBookId === story.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0"
                                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,217,94,0.08), transparent 70%)' }}
                              />
                            )}

                            {/* Book info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-1.5"
                                style={{ background: 'rgba(124,58,237,0.7)', backdropFilter: 'blur(4px)' }}>
                                <span className="text-[9px] font-bold text-white">{story.style}</span>
                              </div>
                              <h4 className="text-sm font-extrabold text-white leading-snug line-clamp-2"
                                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                                {story.title}
                              </h4>
                            </div>
                          </div>

                          {/* Book footer */}
                          <div className="p-3 space-y-2.5"
                            style={{ background: 'rgba(14,26,64,0.9)' }}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                <span>Hero: <span className="text-white/80 font-semibold">{story.childName}</span></span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span>{story.readingTimeMinutes}m</span>
                              </div>
                            </div>

                            {/* Reading Progress */}
                            <div className="space-y-1">
                              <div className="w-full h-1.5 rounded-full overflow-hidden"
                                style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 1.2, delay: idx * 0.1 }}
                                  className="h-full rounded-full"
                                  style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }}
                                />
                              </div>
                              <div className="text-[9px] text-slate-500">Completed</div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleOpenBook(story); }}
                                className="flex-1 py-1.5 rounded-xl text-[10px] font-bold text-white transition-all"
                                style={{ background: 'linear-gradient(135deg, #7C3AED, #4C1D95)', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}
                              >
                                📖 Read
                              </button>
                              <button
                                onClick={(e) => handleFavorite(e, story)}
                                className="px-2 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                                style={{ background: 'rgba(236,72,153,0.2)', border: '1px solid rgba(236,72,153,0.3)', color: '#F472B6' }}
                              >
                                <Heart className={`w-3 h-3 ${story.isFavorite ? 'fill-current' : ''}`} />
                              </button>
                              <button
                                onClick={(e) => handleDownload(e, story)}
                                className="px-2 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                                style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)', color: '#FFD95E' }}
                              >
                                <Download className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Wooden shelf plank lip */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-4 rounded-b-2xl"
                      style={{ background: 'linear-gradient(to bottom, #5C3810, #3D2408)' }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
            >
              {[
                { icon: '📚', label: 'Total Stories', value: stories.length },
                { icon: '❤️', label: 'Favorites', value: stories.filter(s => s.isFavorite).length },
                { icon: '⏱️', label: 'Reading Hours', value: `${Math.round(stories.reduce((a, s) => a + s.readingTimeMinutes, 0) / 60)}h` },
                { icon: '✨', label: 'Worlds Explored', value: new Set(stories.map(s => s.style)).size },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(167,139,250,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="text-2xl mb-1">{stat.icon}</span>
                  <span className="text-xl font-extrabold text-white">{stat.value}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* ─── Story Preview Modal ─── */}
      <AnimatePresence>
        {previewStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={() => setPreviewStory(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1a0840, #0e1a40)',
                border: '2px solid rgba(167,139,250,0.4)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 50px rgba(124,58,237,0.2)',
              }}
            >
              {/* Cover art */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={previewStory.coverImage} alt={previewStory.title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a40] to-transparent" />
                <button
                  onClick={() => setPreviewStory(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
                    style={{ background: 'rgba(124,58,237,0.4)', border: '1px solid rgba(167,139,250,0.4)' }}>
                    <Sparkles className="w-3 h-3 text-dream-gold" />
                    <span className="text-[10px] font-bold text-dream-gold">{previewStory.style}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">{previewStory.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Hero: <span className="text-white/80 font-semibold">{previewStory.childName}</span>
                    {' '}· {previewStory.readingTimeMinutes} min read
                  </p>
                </div>

                {previewStory.summary && (
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {previewStory.summary}
                  </p>
                )}

                {/* Moral */}
                {previewStory.moralLesson && (
                  <div className="flex items-start gap-2 p-3 rounded-2xl"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <Star className="w-4 h-4 text-dream-gold flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-200/80 font-medium italic">
                      "{previewStory.moralLesson}"
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    onClick={() => { handleOpenBook(previewStory); setPreviewStory(null); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
                      boxShadow: '0 0 25px rgba(124,58,237,0.4)',
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Now
                  </motion.button>
                  <button
                    onClick={(e) => { handleFavorite(e, previewStory); }}
                    className="px-4 py-3 rounded-2xl font-bold transition-all"
                    style={{
                      background: previewStory.isFavorite ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${previewStory.isFavorite ? '#EC4899' : 'rgba(255,255,255,0.12)'}`,
                      color: previewStory.isFavorite ? '#F472B6' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <Heart className={`w-5 h-5 ${previewStory.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => handleDownload(e, previewStory)}
                    className="px-4 py-3 rounded-2xl font-bold transition-all"
                    style={{
                      background: 'rgba(245,158,11,0.15)',
                      border: '1px solid rgba(245,158,11,0.3)',
                      color: '#FFD95E',
                    }}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

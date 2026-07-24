import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Download, 
  Maximize2, 
  Minimize2, 
  Bookmark, 
  Clock, 
  BookOpen, 
  Award,
  Check,
  Moon,
  Sun
} from 'lucide-react';
import { Story } from '../../types/story';
import { useStory } from '../../context/StoryContext';
import { AudioPlayer } from './AudioPlayer';
import { exportStoryToPDF } from '../../services/pdfExporter';
import confetti from 'canvas-confetti';

interface PaperStoryBookProps {
  story: Story;
}

export const PaperStoryBook: React.FC<PaperStoryBookProps> = ({ story }) => {
  const { toggleFavorite } = useStory();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNightReadingMode, setIsNightReadingMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const currentPage = story.pages[currentPageIndex] || story.pages[0];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === story.pages.length - 1;

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0E1A40] p-4 sm:p-8 overflow-y-auto' : ''}`}>
      
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card-dream p-4 rounded-3xl border border-dream-purple/40">
        
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-dream-purple text-white font-extrabold text-xs">
            {story.style}
          </span>
          <span className="flex items-center gap-1 text-xs text-dream-cream font-medium">
            <Clock className="w-3.5 h-3.5 text-dream-gold" />
            ~{story.readingTimeMinutes} mins
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-300 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-dream-pink" />
            {story.wordCount} words
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setIsNightReadingMode(!isNightReadingMode)}
            className={`p-2.5 rounded-2xl transition-all ${
              isNightReadingMode ? 'bg-amber-400 text-purple-950 font-bold' : 'bg-white/10 text-slate-200 hover:text-white'
            }`}
            title="Toggle Soft Night Reading Mode"
          >
            {isNightReadingMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-dream-gold" />}
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-2xl transition-all ${
              isBookmarked ? 'bg-amber-400 text-purple-950 font-bold' : 'bg-white/10 text-slate-200 hover:text-amber-400'
            }`}
            title="Bookmark Page"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-purple-950' : ''}`} />
          </button>

          <button
            onClick={() => toggleFavorite(story.id)}
            className={`p-2.5 rounded-2xl transition-all ${
              story.isFavorite ? 'bg-dream-pink text-purple-950 font-bold' : 'bg-white/10 text-slate-200 hover:text-dream-pink'
            }`}
            title="Favorite Story"
          >
            <Heart className={`w-4 h-4 ${story.isFavorite ? 'fill-purple-950' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-2xl bg-white/10 text-slate-200 hover:text-dream-sky transition-all"
            title="Share Story"
          >
            {copiedShareLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => exportStoryToPDF(story)}
            className="p-2.5 rounded-2xl bg-white/10 text-slate-200 hover:text-dream-sky transition-all"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-gradient-magic text-white font-bold shadow-md hover:scale-105 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 3D Real Paper StoryBook Container */}
      <div className={`relative rounded-3xl overflow-hidden p-6 sm:p-10 min-h-[500px] flex flex-col justify-between shadow-2xl transition-colors ${
        isNightReadingMode ? 'bg-[#1C160C] text-[#FDE68A] border-4 border-amber-900/60' : 'paper-texture text-slate-900 border-4 border-[#8B5E3C]'
      }`}>
        
        {/* Book Center Fold Shadow */}
        <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-950/15 to-transparent pointer-events-none z-10 hidden md:block" />

        {/* Page Content View with Framer Motion Page Flip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageIndex}
            initial={{ opacity: 0, rotateY: -20, scale: 0.97 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            
            {/* Left Page: Story Illustration */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square border-2 border-amber-800/30 group">
              <img
                src={currentPage.illustrationUrl}
                alt={`Illustration Page ${currentPage.pageNumber}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-semibold">
                ✨ {story.illustrationStyle} Style: {currentPage.imagePrompt.slice(0, 70)}...
              </div>
            </div>

            {/* Right Page: Story Text */}
            <div className="flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-dream-purple uppercase tracking-widest">
                    Page {currentPage.pageNumber} of {story.pages.length}
                  </span>
                  <span className="text-sm font-handwriting text-pink-600 dark:text-pink-300 font-extrabold">
                    Moral: {story.moralLesson}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold font-sans leading-snug">
                  {isFirstPage ? story.title : `Chapter ${currentPage.pageNumber}`}
                </h3>

                <p className="text-base sm:text-lg leading-relaxed font-sans font-medium">
                  {currentPage.content}
                </p>
              </div>

              {isLastPage && (
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                  <Award className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold">Sweet Dreams! Story Completed</h5>
                    <p className="text-[11px]">You earned stars for learning about {story.moralLesson}!</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Page Footer Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-300 dark:border-slate-800 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={isFirstPage}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition-all ${
              isFirstPage
                ? 'opacity-30 cursor-not-allowed bg-slate-300'
                : 'bg-slate-800 text-white hover:bg-dream-purple'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1.5">
            {story.pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPageIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentPageIndex ? 'w-8 bg-dream-purple' : 'bg-slate-300 hover:bg-dream-pink'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            className="px-6 py-2.5 rounded-2xl bg-gradient-magic text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all"
          >
            <span>{isLastPage ? 'Finish Story ✨' : 'Next Page'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded Audio Player */}
      <AudioPlayer
        currentText={currentPage.content}
        voiceType={story.voiceType}
        narrationSpeed={story.narrationSpeed}
      />
    </div>
  );
};

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
  Sparkles,
  Award,
  Check
} from 'lucide-react';
import { Story } from '../../types/story';
import { useStory } from '../../context/StoryContext';
import { AudioPlayer } from './AudioPlayer';
import { exportStoryToPDF } from '../../services/pdfExporter';
import confetti from 'canvas-confetti';

interface BookViewerProps {
  story: Story;
}

export const BookViewer: React.FC<BookViewerProps> = ({ story }) => {
  const { toggleFavorite } = useStory();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const currentPage = story.pages[currentPageIndex] || story.pages[0];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === story.pages.length - 1;

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      // Trigger celebration on completing story!
      confetti({
        particleCount: 80,
        spread: 70,
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

  const handleDownloadPDF = () => {
    exportStoryToPDF(story);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4 sm:p-8 overflow-y-auto' : ''}`}>
      
      {/* Top Controls & Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-4 rounded-3xl border border-purple-100 dark:border-slate-800">
        
        {/* Story Metadata */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-dream-purple font-bold text-xs">
            {story.style}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-dream-purple" />
            ~{story.readingTimeMinutes} mins
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-dream-pink" />
            {story.wordCount} words
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 text-xs font-semibold">
            {story.difficulty}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-2xl transition-all ${
              isBookmarked 
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-500' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500'
            }`}
            title="Bookmark Page"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={() => toggleFavorite(story.id)}
            className={`p-2.5 rounded-2xl transition-all ${
              story.isFavorite 
                ? 'bg-pink-100 dark:bg-pink-950 text-pink-500' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-pink-500'
            }`}
            title="Favorite Story"
          >
            <Heart className={`w-4 h-4 ${story.isFavorite ? 'fill-pink-500' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-dream-purple transition-all relative"
            title="Share Story"
          >
            {copiedShareLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-dream-purple transition-all"
            title="Download Printable PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-gradient-dream text-white hover:opacity-90 transition-all shadow-md"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 3D Book Display Container */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-10 min-h-[480px] flex flex-col justify-between">
        
        {/* Book Spine Shadow Overlay */}
        <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-900/10 dark:via-slate-900/40 to-transparent pointer-events-none z-10 hidden md:block" />

        {/* Page Content View with Framer Motion flip animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageIndex}
            initial={{ opacity: 0, rotateY: -15, scale: 0.98 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 15, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            
            {/* Left Page: Illustration */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square border border-purple-100/50 dark:border-slate-800 group">
              <img
                src={currentPage.illustrationUrl}
                alt={`Illustration Page ${currentPage.pageNumber}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium leading-tight">
                ✨ {story.illustrationStyle} Style: {currentPage.imagePrompt.slice(0, 75)}...
              </div>
            </div>

            {/* Right Page: Story Text */}
            <div className="flex flex-col justify-between space-y-6 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-dream-purple uppercase tracking-widest">
                    Page {currentPage.pageNumber} of {story.pages.length}
                  </span>
                  <span className="text-xs font-handwriting text-dream-pink text-lg font-bold">
                    Moral: {story.moralLesson}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold font-sans text-slate-800 dark:text-white leading-snug">
                  {isFirstPage ? story.title : `Chapter ${currentPage.pageNumber}`}
                </h3>

                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal">
                  {currentPage.content}
                </p>
              </div>

              {/* Page completion badge on last page */}
              {isLastPage && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                  <Award className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Sweet Dreams! Story Completed
                    </h5>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      You learned about {story.moralLesson} tonight! Great reading!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Book Navigation Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={isFirstPage}
            className={`px-5 py-2.5 rounded-2xl font-semibold text-sm flex items-center gap-2 transition-all ${
              isFirstPage
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-dream-purple hover:text-white text-slate-700 dark:text-slate-200'
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
                  idx === currentPageIndex
                    ? 'w-8 bg-dream-purple'
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-dream-soft'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            className="px-5 py-2.5 rounded-2xl bg-gradient-dream text-white font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-glow-purple transition-all"
          >
            <span>{isLastPage ? 'Finish Story ✨' : 'Next Page'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded Audio Narration Player */}
      <AudioPlayer
        currentText={currentPage.content}
        voiceType={story.voiceType}
        narrationSpeed={story.narrationSpeed}
      />
    </div>
  );
};

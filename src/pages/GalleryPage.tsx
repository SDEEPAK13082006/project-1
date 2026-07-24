import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Download, 
  Heart, 
  Maximize2, 
  Sparkles, 
  X,
  Filter
} from 'lucide-react';
import { useStory } from '../context/StoryContext';
import { GalleryItem } from '../types/story';

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useStory();
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedStyle === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.style === selectedStyle);

  const handleDownloadImage = (url: string, title: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_illustration.jpg`;
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-dream-purple font-semibold text-xs mb-2">
            <ImageIcon className="w-4 h-4" />
            <span>AI Artwork Showcase</span>
          </div>
          <h2 className="text-3xl font-bold font-sans text-slate-800 dark:text-white">
            Illustration Gallery
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse fairytale illustrations created in Disney, Pixar, Anime, and Watercolor styles.
          </p>
        </div>

        {/* Style Filters */}
        <div className="flex flex-wrap gap-2">
          {['All', '3D Pixar', 'Disney', 'Watercolor', 'Anime', 'Cartoon'].map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedStyle === style
                  ? 'bg-dream-purple text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl overflow-hidden glass-card border border-purple-100 dark:border-slate-800 shadow-xl"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="px-2.5 py-0.5 rounded-md bg-dream-purple/80 text-[10px] font-bold w-fit mb-1">
                  {item.style}
                </span>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">{item.prompt}</p>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/20">
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    {item.likes}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveItem(item)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/40 text-white transition-colors"
                      title="Fullscreen Preview"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadImage(item.imageUrl, item.title)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/40 text-white transition-colors"
                      title="Download Image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Preview Lightbox */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-6 space-y-4 text-white">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden">
              <img src={activeItem.imageUrl} alt={activeItem.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-dream-purple text-xs font-bold">
                  {activeItem.style} Style
                </span>
                <h3 className="text-xl font-bold mt-2">{activeItem.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeItem.prompt}</p>
              </div>

              <button
                onClick={() => handleDownloadImage(activeItem.imageUrl, activeItem.title)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-dream text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Res</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

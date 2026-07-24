import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, StoryFormInputs, Achievement, GalleryItem } from '../types/story';
import { INITIAL_STORIES } from '../data/mockStories';
import { INITIAL_GALLERY } from '../data/mockGallery';
import { INITIAL_ACHIEVEMENTS } from '../data/mockAchievements';
import { INITIAL_PARENT_STATS, ParentDashboardStats } from '../data/mockStats';
import { generateStoryFromInputs } from '../services/storyEngine';

interface StoryContextType {
  stories: Story[];
  activeStory: Story | null;
  setActiveStory: (story: Story | null) => void;
  favorites: Story[];
  isGenerating: boolean;
  galleryItems: GalleryItem[];
  achievements: Achievement[];
  parentStats: ParentDashboardStats;
  generateNewStory: (inputs: StoryFormInputs) => Promise<Story>;
  toggleFavorite: (storyId: string) => void;
  deleteStory: (storyId: string) => void;
  duplicateStory: (storyId: string) => void;
  getStoryById: (id: string) => Story | undefined;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('dreamtales_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [activeStory, setActiveStory] = useState<Story | null>(INITIAL_STORIES[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [galleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [parentStats, setParentStats] = useState<ParentDashboardStats>(INITIAL_PARENT_STATS);

  useEffect(() => {
    localStorage.setItem('dreamtales_stories', JSON.stringify(stories));
  }, [stories]);

  const favorites = stories.filter(s => s.isFavorite);

  const generateNewStory = async (inputs: StoryFormInputs): Promise<Story> => {
    setIsGenerating(true);
    // Simulate AI generation network delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const newStory = generateStoryFromInputs(inputs);
    setStories(prev => [newStory, ...prev]);
    setActiveStory(newStory);
    setIsGenerating(false);

    // Update stats
    setParentStats(prev => ({
      ...prev,
      totalStoriesRead: prev.totalStoriesRead + 1,
      totalReadingTimeMinutes: prev.totalReadingTimeMinutes + newStory.readingTimeMinutes
    }));

    // Update achievement progress
    setAchievements(prev => prev.map(ach => {
      if (ach.id === 'ach-1') {
        const newProg = Math.min(ach.maxProgress, ach.progress + 1);
        return { ...ach, progress: newProg, unlocked: newProg >= ach.maxProgress };
      }
      return ach;
    }));

    return newStory;
  };

  const toggleFavorite = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, isFavorite: !s.isFavorite } : s));
    if (activeStory && activeStory.id === storyId) {
      setActiveStory(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const deleteStory = (storyId: string) => {
    setStories(prev => prev.filter(s => s.id !== storyId));
    if (activeStory?.id === storyId) {
      const remaining = stories.filter(s => s.id !== storyId);
      setActiveStory(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const duplicateStory = (storyId: string) => {
    const original = stories.find(s => s.id === storyId);
    if (!original) return;

    const copy: Story = {
      ...original,
      id: `story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: `${original.title} (Copy)`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setStories(prev => [copy, ...prev]);
  };

  const getStoryById = (id: string) => stories.find(s => s.id === id);

  return (
    <StoryContext.Provider
      value={{
        stories,
        activeStory,
        setActiveStory,
        favorites,
        isGenerating,
        galleryItems,
        achievements,
        parentStats,
        generateNewStory,
        toggleFavorite,
        deleteStory,
        duplicateStory,
        getStoryById
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) throw new Error('useStory must be used within a StoryProvider');
  return context;
};

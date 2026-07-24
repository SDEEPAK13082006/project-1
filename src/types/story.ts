export type StoryWorldId = 
  | 'magical-forest'
  | 'space-adventures'
  | 'unicorn-kingdom'
  | 'ocean-adventures'
  | 'dinosaur-world'
  | 'fairy-tale-kingdom'
  | 'vehicle-world'
  | 'school-adventures'
  | 'toy-world'
  | 'healthy-habits'
  | 'community-heroes'
  | 'kid-friendly-mystery';

export type StoryLength = 'Short' | 'Medium' | 'Long';

export type StoryStyle = 
  | 'Fantasy' 
  | 'Adventure' 
  | 'Princess' 
  | 'Space' 
  | 'Jungle' 
  | 'Ocean' 
  | 'Fairy Tale' 
  | 'Educational' 
  | 'Funny' 
  | 'Scary (Kid Friendly)';

export type MoralLesson = 
  | 'Kindness' 
  | 'Honesty' 
  | 'Friendship' 
  | 'Sharing' 
  | 'Respect' 
  | 'Confidence' 
  | 'Teamwork' 
  | 'Bravery' 
  | 'Creativity' 
  | 'Empathy'
  | 'Responsibility'
  | 'Helping others';

export type VoiceType = 
  | 'Mother' 
  | 'Father' 
  | 'Grandmother' 
  | 'Grandfather' 
  | 'Female' 
  | 'Male';

export type IllustrationStyle = 
  | 'Disney' 
  | 'Watercolor' 
  | 'Anime' 
  | 'Cartoon' 
  | '3D Pixar';

export type StoryTone = 
  | 'Cute' 
  | 'Funny' 
  | 'Relaxing' 
  | 'Inspirational' 
  | 'Calm' 
  | 'Adventure';

export interface StoryPage {
  pageNumber: number;
  content: string;
  illustrationUrl: string;
  imagePrompt: string;
}

export interface Story {
  id: string;
  title: string;
  childName: string;
  childAge: number;
  childGender: string;
  favoriteAnimal: string;
  favoriteColor: string;
  favoriteCharacter: string;
  favoritePlace: string;
  favoriteToy: string;
  favoriteFood: string;
  favoriteHobby: string;
  language: string;
  length: StoryLength;
  style: StoryStyle;
  worldId?: StoryWorldId;
  moralLesson: MoralLesson;
  voiceType: VoiceType;
  narrationSpeed: number;
  illustrationStyle: IllustrationStyle;
  tone: StoryTone;
  createdAt: string;
  readingTimeMinutes: number;
  wordCount: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  pages: StoryPage[];
  isFavorite: boolean;
  coverImage: string;
  audioUrl?: string;
  summary: string;
}

export interface StoryFormInputs {
  childName: string;
  childAge: number;
  childGender: 'Boy' | 'Girl' | 'Neutral';
  favoriteAnimal: string;
  favoriteColor: string;
  favoriteCharacter: string;
  favoritePlace: string;
  favoriteToy: string;
  favoriteFood: string;
  favoriteHobby: string;
  language: string;
  length: StoryLength;
  style: StoryStyle;
  worldId?: StoryWorldId;
  moralLesson: MoralLesson;
  voiceType: VoiceType;
  narrationSpeed: number;
  illustrationStyle: IllustrationStyle;
  tone: StoryTone;
}

export interface StoryWorld {
  id: StoryWorldId;
  title: string;
  emoji: string;
  theme: string;
  description: string;
  coverImage: string;
  bgGradient: string;
  accentColor: string;
  recommendedAge: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  storyCount: number;
  ambientSound: 'Forest' | 'Ocean' | 'Space' | 'Castle' | 'Snow' | 'Rain' | 'Desert' | 'Magic';
  storyIdeas: string[];
  moralLessons: MoralLesson[];
  elements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  badgeColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  storyTitle: string;
  imageUrl: string;
  style: IllustrationStyle;
  prompt: string;
  likes: number;
}

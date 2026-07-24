import mongoose, { Schema, Document } from 'mongoose';

export interface IStoryPage {
  pageNumber: number;
  content: string;
  illustrationUrl: string;
  imagePrompt: string;
}

export interface IStory extends Document {
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
  worldId: string;
  style: string;
  moralLesson: string;
  voiceType: string;
  narrationSpeed: number;
  illustrationStyle: string;
  tone: string;
  readingTimeMinutes: number;
  wordCount: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  pages: IStoryPage[];
  isFavorite: boolean;
  coverImage: string;
  summary: string;
  safeContentScore: number;
}

const StorySchema: Schema = new Schema({
  title: { type: String, required: true },
  childName: { type: String, required: true },
  childAge: { type: Number, required: true },
  childGender: { type: String, default: 'Boy' },
  favoriteAnimal: { type: String, default: 'Dragon' },
  favoriteColor: { type: String, default: 'Soft Purple' },
  favoriteCharacter: { type: String, default: 'Wizard' },
  favoritePlace: { type: String, default: 'Sky Kingdom' },
  favoriteToy: { type: String, default: 'Teddy Bear' },
  favoriteFood: { type: String, default: 'Pancakes' },
  favoriteHobby: { type: String, default: 'Stargazing' },
  worldId: { type: String, default: 'magical-forest' },
  style: { type: String, default: 'Fantasy' },
  moralLesson: { type: String, default: 'Kindness' },
  voiceType: { type: String, default: 'Mother' },
  narrationSpeed: { type: Number, default: 1.0 },
  illustrationStyle: { type: String, default: '3D Pixar' },
  tone: { type: String, default: 'Calm' },
  readingTimeMinutes: { type: Number, default: 4 },
  wordCount: { type: Number, default: 300 },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced'], default: 'Easy' },
  pages: [{
    pageNumber: Number,
    content: String,
    illustrationUrl: String,
    imagePrompt: String
  }],
  isFavorite: { type: Boolean, default: false },
  coverImage: { type: String, required: true },
  summary: { type: String, required: true },
  safeContentScore: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model<IStory>('Story', StorySchema);

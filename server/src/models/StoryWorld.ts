import mongoose, { Schema, Document } from 'mongoose';

export interface IStoryWorld extends Document {
  worldId: string;
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
  ambientSound: string;
  storyIdeas: string[];
  moralLessons: string[];
}

const StoryWorldSchema: Schema = new Schema({
  worldId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  emoji: { type: String, required: true },
  theme: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  bgGradient: { type: String, required: true },
  accentColor: { type: String, required: true },
  recommendedAge: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Advanced'], default: 'Easy' },
  storyCount: { type: Number, default: 0 },
  ambientSound: { type: String, default: 'Forest' },
  storyIdeas: [{ type: String }],
  moralLessons: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IStoryWorld>('StoryWorld', StoryWorldSchema);

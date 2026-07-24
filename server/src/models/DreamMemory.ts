import mongoose, { Schema, Document } from 'mongoose';

export interface IDreamMemory extends Document {
  childId: string;
  favoriteAnimals: string[];
  favoriteCharacters: string[];
  favoriteStoryWorlds: string[];
  favoriteMoralLessons: string[];
  favoriteVoices: string[];
  favoriteReadingTimes: string[];
  totalStoriesRead: number;
}

const DreamMemorySchema: Schema = new Schema({
  childId: { type: String, required: true, unique: true },
  favoriteAnimals: [{ type: String }],
  favoriteCharacters: [{ type: String }],
  favoriteStoryWorlds: [{ type: String }],
  favoriteMoralLessons: [{ type: String }],
  favoriteVoices: [{ type: String }],
  favoriteReadingTimes: [{ type: String }],
  totalStoriesRead: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IDreamMemory>('DreamMemory', DreamMemorySchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IChildProfile extends Document {
  parentId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  gender: 'Boy' | 'Girl' | 'Neutral';
  avatar: string;
  favoriteAnimal: string;
  favoriteColor: string;
  favoriteCharacter: string;
  favoritePlace: string;
  preferredStoryWorld: string;
  readingStreakDays: number;
}

const ChildProfileSchema: Schema = new Schema({
  parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Boy', 'Girl', 'Neutral'], default: 'Boy' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
  favoriteAnimal: { type: String, default: 'Dragon' },
  favoriteColor: { type: String, default: 'Soft Purple' },
  favoriteCharacter: { type: String, default: 'Wizard' },
  favoritePlace: { type: String, default: 'Sky Kingdom' },
  preferredStoryWorld: { type: String, default: 'magical-forest' },
  readingStreakDays: { type: Number, default: 10 }
}, { timestamps: true });

export default mongoose.model<IChildProfile>('ChildProfile', ChildProfileSchema);

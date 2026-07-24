import mongoose, { Schema, Document } from 'mongoose';

export interface ICharacter extends Document {
  characterId: string;
  name: string;
  avatar: string;
  description: string;
  voice: string;
  personality: string;
  likes: string[];
  dislikes: string[];
  favoriteFood: string;
  favoriteColor: string;
  worldOrigin: string;
  catchphrases: string[];
  recurringMemories: string[];
}

const CharacterSchema: Schema = new Schema({
  characterId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  description: { type: String, required: true },
  voice: { type: String, default: 'Friendly Owl' },
  personality: { type: String, default: 'Kind & Wise' },
  likes: [{ type: String }],
  dislikes: [{ type: String }],
  favoriteFood: { type: String, default: 'Blueberries' },
  favoriteColor: { type: String, default: 'Golden Yellow' },
  worldOrigin: { type: String, default: 'magical-forest' },
  catchphrases: [{ type: String }],
  recurringMemories: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<ICharacter>('Character', CharacterSchema);

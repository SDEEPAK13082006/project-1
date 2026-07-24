import mongoose, { Schema, Document } from 'mongoose';

export interface IStoryUniverse extends Document {
  universeId: string;
  title: string;
  worldId: string;
  recurringCharacters: string[];
  totalParts: number;
  summaryArc: string;
}

const StoryUniverseSchema: Schema = new Schema({
  universeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  worldId: { type: String, required: true },
  recurringCharacters: [{ type: String }],
  totalParts: { type: Number, default: 1 },
  summaryArc: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IStoryUniverse>('StoryUniverse', StoryUniverseSchema);

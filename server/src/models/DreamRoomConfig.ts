import mongoose, { Schema, Document } from 'mongoose';

export interface IDreamRoomConfig extends Document {
  timeTheme: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  lampMode: 'ON' | 'OFF' | 'WARM' | 'MOONLIGHT' | 'MAGIC';
  weather: string;
  moonStatus: string;
  curtainsOpen: boolean;
  owlMessage: string;
  starPoints: number;
}

const DreamRoomConfigSchema: Schema = new Schema({
  timeTheme: { type: String, enum: ['Morning', 'Afternoon', 'Evening', 'Night'], default: 'Night' },
  lampMode: { type: String, enum: ['ON', 'OFF', 'WARM', 'MOONLIGHT', 'MAGIC'], default: 'ON' },
  weather: { type: String, default: 'Default' },
  moonStatus: { type: String, default: 'Full Glow' },
  curtainsOpen: { type: Boolean, default: true },
  owlMessage: { type: String, default: 'Hoo-hoo! Welcome to the Dream Room!' },
  starPoints: { type: Number, default: 120 }
}, { timestamps: true });

export default mongoose.model<IDreamRoomConfig>('DreamRoomConfig', DreamRoomConfigSchema);

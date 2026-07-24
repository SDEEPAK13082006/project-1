import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'Admin' | 'Parent' | 'Child';
  isVerified: boolean;
  avatar: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Parent', 'Child'], default: 'Parent' },
  isVerified: { type: Boolean, default: true },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);

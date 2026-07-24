import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Sun, Moon, Sparkles, Check, Heart, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ChildBedroom: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [lampOn, setLampOn] = useState(true);
  const [windowNight, setWindowNight] = useState(true);

  const avatars = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-dream-purple/20 text-dream-gold font-bold text-xs">
          🛏️ Interactive Room Realm
        </span>
        <h2 className="text-3xl font-extrabold text-white">
          Child's Cozy Bedroom Profile
        </h2>
        <p className="text-xs text-slate-300">
          Tap the Night Lamp, Starlit Window, Toybox, or Bookshelf to customize your bedroom space!
        </p>
      </div>

      {/* Interactive Bedroom Layout Grid */}
      <div className={`relative rounded-3xl p-6 sm:p-10 border-4 transition-all duration-500 shadow-2xl overflow-hidden min-h-[460px] grid grid-cols-1 md:grid-cols-2 gap-8 ${
        lampOn 
          ? 'bg-[#152454] border-dream-gold/50 shadow-glow-gold' 
          : 'bg-[#09102A] border-slate-800 shadow-2xl opacity-90'
      }`}>
        
        {/* Left Column: Interactive Bedroom Objects */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Interactive Starlit Window */}
          <div
            onClick={() => setWindowNight(!windowNight)}
            className="relative rounded-2xl border-4 border-amber-800 bg-gradient-to-b from-[#0B132B] to-[#1C1236] p-4 text-center cursor-pointer shadow-xl group"
          >
            <span className="text-xs font-bold text-dream-gold block mb-1">
              🪟 Interactive Window (Click to Toggle Sky)
            </span>
            <div className="text-4xl animate-bounce my-2">
              {windowNight ? '🌙 ✦ ☁️' : '☀️ ☁️ 🌈'}
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              Sky State: {windowNight ? 'Starlit Night' : 'Daytime Sunshine'}
            </p>
          </div>

          {/* Interactive Night Lamp & Cozy Bed */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setLampOn(!lampOn)}
              className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                lampOn ? 'bg-amber-400/20 border-dream-gold text-dream-gold shadow-glow-gold' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <span className="text-3xl block mb-1">💡</span>
              <span className="text-xs font-bold block">Night Lamp</span>
              <span className="text-[10px]">{lampOn ? 'Glowing ON' : 'Turned OFF'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-900/40 border-2 border-dream-pink text-center">
              <span className="text-3xl block mb-1">🛏️</span>
              <span className="text-xs font-bold text-dream-pink block">Cozy Bed</span>
              <span className="text-[10px] text-slate-300">Ready for Bedtime</span>
            </div>
          </div>

          {/* Toybox & Bookshelf */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-sky-900/40 border-2 border-dream-sky text-center">
              <span className="text-3xl block mb-1">🧸</span>
              <span className="text-xs font-bold text-dream-sky block">Toy Box</span>
              <span className="text-[10px] text-slate-300">Teddy & Magic Wand</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-900/40 border-2 border-dream-gold text-center">
              <span className="text-3xl block mb-1">📚</span>
              <span className="text-xs font-bold text-dream-gold block">Bookshelf</span>
              <span className="text-[10px] text-slate-300">Saved Storybooks</span>
            </div>
          </div>
        </div>

        {/* Right Column: Avatar & Child Profile Controls */}
        <div className="space-y-6 glass-card-dream p-6 rounded-2xl border border-dream-purple/40">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-dream-gold shadow-md"
            />
            <div>
              <h4 className="text-xl font-extrabold text-white">{user?.name}</h4>
              <p className="text-xs text-dream-sky">Child Hero: {user?.childName} (Age {user?.childAge})</p>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-dream-purple text-white text-[10px] font-extrabold">
                {user?.plan} Membership
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-bold text-dream-cream">Choose Avatar</span>
            <div className="flex gap-3">
              {avatars.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => updateProfile({ avatar: img })}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    user?.avatar === img ? 'border-dream-gold scale-110 shadow-md' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="Avatar" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

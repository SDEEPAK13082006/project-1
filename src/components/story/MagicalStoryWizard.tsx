import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check, Wand2, BookOpen } from 'lucide-react';
import { StoryFormInputs, StoryStyle, MoralLesson, VoiceType, IllustrationStyle } from '../../types/story';
import { useStory } from '../../context/StoryContext';
import { ambientSynth } from '../../services/audioNarration';

interface Props {
  onComplete: () => void;
}

export const MagicalStoryWizard: React.FC<Props> = ({ onComplete }) => {
  const { generateNewStory } = useStory();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<StoryFormInputs>({
    childName: 'Leo',
    childAge: 5,
    childGender: 'Boy',
    favoriteAnimal: 'Dragon 🐲',
    favoriteColor: 'Soft Purple',
    favoriteCharacter: 'Wizard',
    favoritePlace: 'Sky Kingdom',
    favoriteToy: 'Magic Wand',
    favoriteFood: 'Blueberry Pancakes',
    favoriteHobby: 'Stargazing',
    language: 'English',
    length: 'Medium',
    style: 'Fantasy',
    moralLesson: 'Kindness',
    voiceType: 'Mother',
    narrationSpeed: 1.0,
    illustrationStyle: '3D Pixar',
    tone: 'Calm'
  });

  const animalOptions = [
    { name: 'Lion', emoji: '🦁' },
    { name: 'Panda', emoji: '🐼' },
    { name: 'Bunny', emoji: '🐰' },
    { name: 'Unicorn', emoji: '🦄' },
    { name: 'Penguin', emoji: '🐧' },
    { name: 'Fox', emoji: '🦊' },
    { name: 'Dolphin', emoji: '🐬' },
    { name: 'Elephant', emoji: '🐘' },
    { name: 'Turtle', emoji: '🐢' },
    { name: 'Dragon', emoji: '🐲' }
  ];

  const placeOptions = [
    { name: 'Castle', emoji: '🏰' },
    { name: 'Ocean', emoji: '🌊' },
    { name: 'Space', emoji: '🚀' },
    { name: 'Forest', emoji: '🌲' },
    { name: 'Sky Kingdom', emoji: '☁️' },
    { name: 'Island', emoji: '🏝️' }
  ];

  const characterOptions = [
    { name: 'Princess', emoji: '👑' },
    { name: 'Robot', emoji: '🤖' },
    { name: 'Wizard', emoji: '🧙‍♂️' },
    { name: 'Dragon', emoji: '🐲' },
    { name: 'Astronaut', emoji: '👨‍🚀' },
    { name: 'Fairy', emoji: '🧚‍♀️' },
    { name: 'Knight', emoji: '🛡️' },
    { name: 'Pirate', emoji: '🏴‍☠️' }
  ];

  const colorBubbles = [
    { name: 'Soft Purple', color: '#8A5CF6' },
    { name: 'Sky Blue', color: '#7FD9FF' },
    { name: 'Pink', color: '#FFB4E8' },
    { name: 'Golden Yellow', color: '#FFD95E' },
    { name: 'Emerald Green', color: '#34D399' },
    { name: 'Rose Red', color: '#F43F5E' }
  ];

  const themeOptions: StoryStyle[] = [
    'Fantasy', 'Adventure', 'Ocean', 'Jungle', 'Space', 
    'Princess', 'Fairy Tale', 'Educational', 'Funny', 'Scary (Kid Friendly)'
  ];

  const moralOptions: MoralLesson[] = [
    'Kindness', 'Respect', 'Friendship', 'Sharing', 
    'Honesty', 'Bravery', 'Confidence', 'Empathy'
  ];

  const illusStyles: IllustrationStyle[] = ['3D Pixar', 'Disney', 'Anime', 'Watercolor', 'Cartoon'];

  const voiceTypes: VoiceType[] = ['Mother', 'Father', 'Grandmother', 'Grandfather', 'Female', 'Male'];

  const handleNext = () => {
    ambientSynth.playSoundEffect('pageturn');
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    ambientSynth.playSoundEffect('pageturn');
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    ambientSynth.playSoundEffect('magicChime');
    await generateNewStory(formData);
    onComplete();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 z-30 select-none">

      {/* Floating Magic Glow Rays */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-6 rounded-[40px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.35), rgba(255,217,94,0.15), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Floating 3D Open Storybook Shell */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative rounded-[32px] overflow-hidden shadow-2xl p-6 sm:p-10 border-4"
        style={{
          background: 'linear-gradient(135deg, #150a30 0%, #1e1045 50%, #0d1540 100%)',
          borderColor: 'rgba(255,217,94,0.5)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(124,58,237,0.3), inset 0 2px 4px rgba(255,255,255,0.1)',
        }}
      >
        {/* Book spine line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-amber-400/50 via-purple-500/50 to-amber-400/50 opacity-50 pointer-events-none" />

        {/* Wizard Header Progress */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-pulse">📖</span>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-dream-gold block">
                Magical Story Book Generator
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Page {currentStep + 1} of 6 • Crafting Bedtime Adventure
              </span>
            </div>
          </div>

          <div className="flex gap-1.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentStep ? 'w-8 bg-gradient-magic shadow-glow-purple' : 'w-2.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Page Content */}
        <div className="py-6 min-h-[360px] flex flex-col justify-center relative z-10">
          <AnimatePresence mode="wait">
            
            {/* Page 0: Hero Name & Age */}
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, rotateY: -30, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-4xl inline-block animate-bounce">✨</span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    What is your little hero's name?
                  </h3>
                  <p className="text-xs text-slate-300">This name will shine as the hero of tonight's story!</p>
                </div>

                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-6 py-4 text-center font-extrabold text-2xl glass-input-dream focus:ring-dream-gold text-dream-cream placeholder-slate-400 shadow-xl"
                    placeholder="Enter child's name..."
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <span className="block text-center text-xs font-extrabold text-dream-sky uppercase tracking-widest">
                    Hero's Age
                  </span>
                  <div className="flex justify-center gap-3">
                    {[3, 5, 7, 9, 11].map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, childAge: age }); }}
                        className={`w-13 h-13 rounded-2xl font-extrabold text-lg transition-all ${
                          formData.childAge === age
                            ? 'bg-gradient-magic text-white scale-110 shadow-glow-purple border-2 border-white'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 1: Companion Animal */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, rotateY: -30, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-4xl inline-block animate-bounce">🐾</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Choose a Favorite Animal Companion
                  </h3>
                  <p className="text-xs text-slate-300">Your animal friend will guide you on the journey!</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {animalOptions.map((animal) => (
                    <button
                      key={animal.name}
                      type="button"
                      onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, favoriteAnimal: animal.name }); }}
                      className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all group ${
                        formData.favoriteAnimal.includes(animal.name)
                          ? 'bg-gradient-magic text-white scale-105 shadow-glow-purple border-2 border-white'
                          : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-4xl group-hover:scale-125 transition-transform">
                        {animal.emoji}
                      </span>
                      <span className="text-xs font-bold">{animal.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Page 2: Setting & Character */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, rotateY: -30, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <span className="text-3xl">🏰</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Favorite Place & Character Type
                  </h3>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-extrabold text-dream-gold uppercase tracking-widest">
                    Select Adventure Setting
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {placeOptions.map((place) => (
                      <button
                        key={place.name}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, favoritePlace: place.name }); }}
                        className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                          formData.favoritePlace === place.name
                            ? 'bg-dream-purple text-white scale-105 shadow-md border border-white font-bold'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        <span className="text-3xl">{place.emoji}</span>
                        <span className="text-[11px] font-bold">{place.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-extrabold text-dream-pink uppercase tracking-widest">
                    Select Character Role
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {characterOptions.map((char) => (
                      <button
                        key={char.name}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, favoriteCharacter: char.name }); }}
                        className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                          formData.favoriteCharacter === char.name
                            ? 'bg-dream-pink text-purple-950 font-bold scale-105 shadow-md'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        <span className="text-2xl">{char.emoji}</span>
                        <span className="text-[10px] font-semibold">{char.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 3: Color & Story Length */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, rotateY: -30, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-3xl">🎨</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Magic Color & Story Length
                  </h3>
                </div>

                <div className="space-y-3 text-center">
                  <span className="block text-xs font-extrabold text-dream-sky uppercase tracking-widest">
                    Pick Your Favorite Magic Color
                  </span>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {colorBubbles.map((bub) => (
                      <button
                        key={bub.name}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, favoriteColor: bub.name }); }}
                        style={{ backgroundColor: bub.color }}
                        className={`w-12 h-12 rounded-full shadow-lg transition-transform flex items-center justify-center ${
                          formData.favoriteColor === bub.name ? 'scale-125 ring-4 ring-white' : 'hover:scale-110 opacity-80'
                        }`}
                      >
                        {formData.favoriteColor === bub.name && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 text-center">
                  <span className="block text-xs font-extrabold text-dream-gold uppercase tracking-widest">
                    Story Length
                  </span>
                  <div className="flex justify-center gap-4">
                    {(['Short', 'Medium', 'Long'] as const).map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, length: len }); }}
                        className={`px-6 py-3 rounded-2xl font-extrabold text-xs transition-all ${
                          formData.length === len
                            ? 'bg-gradient-magic text-white shadow-glow-purple scale-105 border border-white'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {len} ({len === 'Short' ? '3 Pages' : len === 'Medium' ? '4 Pages' : '5 Pages'})
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 4: Theme & Moral Lesson */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, rotateY: -30, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-3xl">🌟</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Story Theme & Moral Lesson
                  </h3>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-extrabold text-dream-gold uppercase tracking-widest">
                    Select Theme
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {themeOptions.map((thm) => (
                      <button
                        key={thm}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, style: thm }); }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          formData.style === thm
                            ? 'bg-dream-purple text-white shadow-md border border-white'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {thm}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-extrabold text-dream-pink uppercase tracking-widest">
                    Educational Moral Lesson
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {moralOptions.map((moral) => (
                      <button
                        key={moral}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, moralLesson: moral }); }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          formData.moralLesson === moral
                            ? 'bg-dream-pink text-purple-950 shadow-md font-extrabold border border-white'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        ❤️ {moral}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 5: Art Style & Narration */}
            {currentStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, rotateY: -30, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-3xl">🎙️</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Illustration Art & Voice Narration
                  </h3>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-extrabold text-dream-sky uppercase tracking-widest">
                    Illustration Art Style
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {illusStyles.map((art) => (
                      <button
                        key={art}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, illustrationStyle: art }); }}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                          formData.illustrationStyle === art
                            ? 'bg-gradient-magic text-white shadow-glow-purple scale-105 border border-white'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        🎬 {art}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-extrabold text-dream-gold uppercase tracking-widest">
                    AI Voice Narration Profile
                  </span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {voiceTypes.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => { ambientSynth.playSoundEffect('click'); setFormData({ ...formData, voiceType: v }); }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          formData.voiceType === v
                            ? 'bg-dream-gold text-purple-950 shadow-md font-extrabold border border-white'
                            : 'bg-[#1E2E6B]/60 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        🗣️ {v} Voice
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
              currentStep === 0 ? 'opacity-40 cursor-not-allowed bg-white/10' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3.5 rounded-2xl bg-gradient-magic text-white font-extrabold text-sm shadow-glow-purple hover:scale-105 transition-all flex items-center gap-2 border border-white/30"
          >
            <span>{currentStep === 5 ? '✨ Generate Bedtime Story ✨' : 'Turn Page ➔'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

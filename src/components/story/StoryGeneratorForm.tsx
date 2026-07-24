import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Sparkles, 
  User, 
  Smile, 
  Heart, 
  Palette, 
  BookOpen, 
  Mic, 
  Wand2,
  Sliders,
  Compass,
  Award
} from 'lucide-react';
import { StoryFormInputs } from '../../types/story';
import { useStory } from '../../context/StoryContext';
import { MagicalSparkles } from '../common/MagicalSparkles';

const storySchema = z.object({
  childName: z.string().min(2, 'Name must be at least 2 characters'),
  childAge: z.number().min(1).max(14),
  childGender: z.enum(['Boy', 'Girl', 'Neutral']),
  favoriteAnimal: z.string().min(2, 'Animal is required'),
  favoriteColor: z.string().min(2, 'Color is required'),
  favoriteCharacter: z.string().min(2, 'Character is required'),
  favoritePlace: z.string().min(2, 'Place is required'),
  favoriteToy: z.string().min(2, 'Toy is required'),
  favoriteFood: z.string().min(2, 'Food is required'),
  favoriteHobby: z.string().min(2, 'Hobby is required'),
  language: z.string(),
  length: z.enum(['Short', 'Medium', 'Long']),
  style: z.enum([
    'Fantasy', 'Adventure', 'Princess', 'Space', 'Jungle', 
    'Ocean', 'Fairy Tale', 'Educational', 'Funny', 'Scary (Kid Friendly)'
  ]),
  moralLesson: z.enum([
    'Kindness', 'Honesty', 'Friendship', 'Sharing', 'Respect', 
    'Confidence', 'Teamwork', 'Bravery', 'Creativity', 'Empathy',
    'Responsibility', 'Helping others'
  ]),
  voiceType: z.enum(['Mother', 'Father', 'Grandmother', 'Grandfather', 'Female', 'Male']),
  narrationSpeed: z.number().min(0.5).max(1.5),
  illustrationStyle: z.enum(['Disney', 'Watercolor', 'Anime', 'Cartoon', '3D Pixar']),
  tone: z.enum(['Cute', 'Funny', 'Relaxing', 'Inspirational', 'Calm', 'Adventure'])
});

interface Props {
  onStoryGenerated?: () => void;
}

export const StoryGeneratorForm: React.FC<Props> = ({ onStoryGenerated }) => {
  const { generateNewStory, isGenerating } = useStory();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<StoryFormInputs>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      childName: 'Leo',
      childAge: 5,
      childGender: 'Boy',
      favoriteAnimal: 'Dragon',
      favoriteColor: 'Purple',
      favoriteCharacter: 'Captain Star',
      favoritePlace: 'Sky Castle',
      favoriteToy: 'Teddy Bear',
      favoriteFood: 'Pancakes',
      favoriteHobby: 'Stargazing',
      language: 'English',
      length: 'Medium',
      style: 'Fantasy',
      moralLesson: 'Kindness',
      voiceType: 'Mother',
      narrationSpeed: 1.0,
      illustrationStyle: '3D Pixar',
      tone: 'Calm'
    }
  });

  const watchSpeed = watch('narrationSpeed');
  const watchStyle = watch('style');
  const watchMoral = watch('moralLesson');
  const watchIllus = watch('illustrationStyle');

  const onSubmit = async (data: StoryFormInputs) => {
    await generateNewStory(data);
    if (onStoryGenerated) onStoryGenerated();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-2xl p-6 sm:p-10 overflow-hidden">
      
      {/* Magical Loading Animation Overlay when Generating */}
      {isGenerating && (
        <div className="absolute inset-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
          <MagicalSparkles count={20} />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-dream-purple via-dream-pink to-dream-yellow p-1 animate-spin-slow mb-6 shadow-glow-purple">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
              <Wand2 className="w-10 h-10 text-dream-purple" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Mixing Fairy Dust & AI Magic...
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            We are crafting a personalized bedtime storybook with custom illustrations and voice narration!
          </p>
          <div className="w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-6">
            <div className="w-full h-full bg-gradient-dream animate-pulse" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dream-purple/10 dark:bg-dream-purple/30 text-dream-purple dark:text-dream-pink font-semibold text-xs mb-3">
          <Sparkles className="w-4 h-4" />
          <span>AI Bedtime Story Generator</span>
        </div>
        <h2 className="text-3xl font-bold font-sans text-slate-800 dark:text-white">
          Create Your Child's Bedtime Story
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize every detail from favorite toys to moral lessons in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Step 1: Child Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dream-purple flex items-center gap-2">
            <User className="w-4 h-4" />
            Step 1: Child Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Child's Name
              </label>
              <input
                type="text"
                {...register('childName')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Leo"
              />
              {errors.childName && <p className="text-xs text-red-500 mt-1">{errors.childName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age
              </label>
              <input
                type="number"
                {...register('childAge', { valueAsNumber: true })}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                {...register('childGender')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Neutral">Neutral</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite Animal
              </label>
              <input
                type="text"
                {...register('favoriteAnimal')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Dragon, Bunny"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite Color
              </label>
              <input
                type="text"
                {...register('favoriteColor')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Soft Purple"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite Character
              </label>
              <input
                type="text"
                {...register('favoriteCharacter')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Captain Star"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite Place
              </label>
              <input
                type="text"
                {...register('favoritePlace')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Sky Castle"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite Toy
              </label>
              <input
                type="text"
                {...register('favoriteToy')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Teddy Bear"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Favorite Food
              </label>
              <input
                type="text"
                {...register('favoriteFood')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                placeholder="e.g. Pancakes"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Story Style & Educational Moral */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dream-pink flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Step 2: Theme & Moral Lesson
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Story Style
              </label>
              <select
                {...register('style')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="Fantasy">✨ Fantasy</option>
                <option value="Adventure">🧭 Adventure</option>
                <option value="Princess">👑 Princess</option>
                <option value="Space">🚀 Space</option>
                <option value="Jungle">🌴 Jungle</option>
                <option value="Ocean">🌊 Ocean</option>
                <option value="Fairy Tale">🏰 Fairy Tale</option>
                <option value="Educational">🧠 Educational</option>
                <option value="Funny">😄 Funny</option>
                <option value="Scary (Kid Friendly)">👻 Kid Scary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Moral Lesson
              </label>
              <select
                {...register('moralLesson')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="Kindness">❤️ Kindness</option>
                <option value="Honesty">🤝 Honesty</option>
                <option value="Friendship">🌟 Friendship</option>
                <option value="Sharing">🎁 Sharing</option>
                <option value="Respect">🙌 Respect</option>
                <option value="Confidence">💪 Confidence</option>
                <option value="Teamwork">🧩 Teamwork</option>
                <option value="Bravery">🦁 Bravery</option>
                <option value="Creativity">🎨 Creativity</option>
                <option value="Empathy">👂 Empathy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Story Length
              </label>
              <select
                {...register('length')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="Short">Short (3 Pages / 3 Mins)</option>
                <option value="Medium">Medium (4 Pages / 5 Mins)</option>
                <option value="Long">Long (5 Pages / 8 Mins)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 3: Illustration & Audio Customization */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dream-blue flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Step 3: Illustration & Voice Narration
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Illustration Style
              </label>
              <select
                {...register('illustrationStyle')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="3D Pixar">🎬 3D Pixar</option>
                <option value="Disney">🏰 Disney Style</option>
                <option value="Watercolor">🎨 Watercolor</option>
                <option value="Anime">🌟 Anime</option>
                <option value="Cartoon">🖍️ Cartoon</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Voice Narration Type
              </label>
              <select
                {...register('voiceType')}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="Mother">👩 Mother Voice</option>
                <option value="Father">👨 Father Voice</option>
                <option value="Grandmother">👵 Grandmother</option>
                <option value="Grandfather">👴 Grandfather</option>
                <option value="Female">👧 Female Warm</option>
                <option value="Male">👦 Male Gentle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Narration Speed ({watchSpeed}x)
              </label>
              <input
                type="range"
                min="0.75"
                max="1.5"
                step="0.05"
                {...register('narrationSpeed', { valueAsNumber: true })}
                className="w-full accent-dream-purple cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-dream text-white font-bold text-lg shadow-xl hover:shadow-glow-purple hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
        >
          <Sparkles className="w-6 h-6 animate-spin-slow" />
          <span>Generate Magical Story Now</span>
        </button>
      </form>
    </div>
  );
};

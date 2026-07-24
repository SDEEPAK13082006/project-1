import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Mic, 
  Palette, 
  Globe, 
  BookOpen, 
  Heart, 
  History, 
  Download, 
  Star, 
  ArrowRight,
  CheckCircle,
  Clock,
  Volume2,
  ChevronDown,
  X
} from 'lucide-react';
import { FloatingStars } from '../components/common/FloatingStars';
import { SleepingBear } from '../components/common/SleepingBear';
import { useStory } from '../context/StoryContext';

export const LandingPage: React.FC = () => {
  const { stories } = useStory();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const features = [
    {
      title: 'Personalized Story',
      description: "Uses child's name, age, favorite animal, toys, color, food & hobbies.",
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Voice Narration',
      description: 'Choice of Mother, Father, Grandmother, Grandfather & warm voices.',
      icon: Mic,
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'AI Illustrations',
      description: 'Custom artwork for every single story page in Pixar/Disney styles.',
      icon: Palette,
      color: 'from-sky-400 to-blue-600'
    },
    {
      title: 'Multiple Languages',
      description: 'Generate bedtime stories in English, Spanish, French, German & more.',
      icon: Globe,
      color: 'from-amber-400 to-yellow-500'
    },
    {
      title: 'Educational Moral Lessons',
      description: 'Teaches Kindness, Honesty, Sharing, Bravery & Empathy seamlessly.',
      icon: BookOpen,
      color: 'from-emerald-400 to-teal-600'
    },
    {
      title: 'Save & Read Later',
      description: 'Bookmark unfinished stories and resume reading anytime.',
      icon: Heart,
      color: 'from-violet-500 to-purple-700'
    },
    {
      title: 'Story History & Favorites',
      description: 'Filter your private library by favorite themes and reading dates.',
      icon: History,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Download PDF',
      description: 'Export beautifully formatted printable bedtime storybooks.',
      icon: Download,
      color: 'from-rose-400 to-pink-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Enter Child Details',
      description: "Add your child's name, age, favorite animal, toy, and place.",
      icon: '👦'
    },
    {
      number: '02',
      title: 'Choose Story Theme',
      description: 'Select fantasy style, illustration art, and a moral lesson.',
      icon: '🎨'
    },
    {
      number: '03',
      title: 'AI Generates Story',
      description: 'Our fairy dust engine creates a multi-page illustrated storybook.',
      icon: '✨'
    },
    {
      number: '04',
      title: 'Listen with Narration',
      description: 'Turn on calming voice narration and ambient lullaby rain.',
      icon: '🎵'
    },
    {
      number: '05',
      title: 'Enjoy Bedtime',
      description: 'Sail away into peaceful, happy, and cozy sweet dreams.',
      icon: '🌙'
    }
  ];

  const testimonials = [
    {
      quote: "DreamTales completely changed our bedtime routine. My 5-year-old son Leo gets so excited when he hears his own name and his teddy bear in the story!",
      author: "Emily R.",
      role: "Mother of 2",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "The ambient rain soundscapes combined with the soothing Grandmother voice narration put my daughter to sleep in under 10 minutes every single night.",
      author: "David K.",
      role: "Father of 6-year-old",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "I love that every story weaves in moral lessons like sharing and honesty naturally. It's educational, magical, and super easy to use.",
      author: "Sophia M.",
      role: "Kindergarten Teacher & Parent",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const faqs = [
    {
      question: "How does DreamTales personalize stories for my child?",
      answer: "DreamTales uses AI prompt templates tailored specifically for children. When you provide your child's name, favorite animal, toy, color, and character, our generator builds a multi-page story where your child is the brave hero!"
    },
    {
      question: "Are the stories safe and appropriate for young children?",
      answer: "Yes, 100%! All story themes, moral lessons, and generated illustrations strictly adhere to kid-friendly safety guidelines designed for ages 2 through 10."
    },
    {
      question: "Can I listen to the stories with audio narration?",
      answer: "Absolutely! DreamTales includes built-in Text-to-Speech narration with custom voice types (Mother, Father, Grandmother, Grandfather) and calming ambient lullaby soundscapes."
    },
    {
      question: "Can I download and print the storybooks as PDFs?",
      answer: "Yes, every generated story can be exported as a high-quality printable PDF complete with story text and page details."
    }
  ];

  return (
    <div className="relative overflow-hidden space-y-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8">
        <FloatingStars />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-dream-purple dark:text-dream-pink font-semibold text-xs shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Bedtime Story Generator</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-[1.1]">
              Create Magical Personalized Bedtime Stories in <span className="text-gradient-primary">Seconds</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Generate unique AI stories with your child's name, favorite animals, life lessons, voice narration and beautiful illustrations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/generate"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-dream text-white font-bold text-base shadow-xl hover:shadow-glow-purple hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 animate-spin-slow" />
                <span>Generate Story</span>
              </Link>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-base shadow-md hover:border-dream-purple transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-dream-pink fill-dream-pink" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Parent" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Parent" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Parent" />
              </div>
              <div className="flex flex-col">
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
                <span>Over 10,000+ bedtime stories read</span>
              </div>
            </div>
          </div>

          {/* Right Sleeping Bear Illustration */}
          <div className="lg:col-span-5 relative">
            <SleepingBear />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-500 font-semibold text-xs uppercase tracking-wider">
            Magical Features
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            Everything Needed for Sweet Dreams
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Designed for parents who want engaging, calming, and educational bedtime experiences every single night.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS (TIMELINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-dream-purple font-semibold text-xs uppercase tracking-wider">
            5 Simple Steps
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            How DreamTales Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-5 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-md">
              <span className="text-3xl mb-2">{step.icon}</span>
              <span className="text-xs font-bold text-dream-purple uppercase tracking-widest mb-1">
                Step {step.number}
              </span>
              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-dream-purple text-lg font-bold z-20">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-500 font-semibold text-xs uppercase tracking-wider">
            Parent Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 dark:text-white">
            Loved by Parents & Sleepy Kids
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl glass-card border border-purple-100 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex text-amber-400 gap-1">
                {"★".repeat(t.rating)}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-3xl glass-card border border-purple-100 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-semibold text-slate-800 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-dream-purple transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WATCH DEMO MODAL */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-6 space-y-4">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white">DreamTales Demo Walkthrough</h3>
            <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 p-8 text-center">
              <div>
                <Play className="w-16 h-16 text-dream-purple mx-auto mb-4 animate-pulse" />
                <p className="text-sm text-slate-300">
                  Interactive Demo Previewing Custom AI Bedtime Storybooks & Audio Narration
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

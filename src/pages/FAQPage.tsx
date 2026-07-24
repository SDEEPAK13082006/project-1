import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does DreamTales personalize stories for my child?',
      a: 'When you fill out the generator form with your child\'s name, age, favorite animal, color, toy, and place, our AI prompt engine designs a custom multi-page story where your child is the star hero!'
    },
    {
      q: 'What age group is DreamTales designed for?',
      a: 'DreamTales is crafted for toddlers and young children aged 2 through 10. You can adjust the difficulty level from Easy to Advanced depending on your child\'s reading age.'
    },
    {
      q: 'Can I listen to stories with AI voice narration?',
      a: 'Yes! DreamTales includes built-in Text-to-Speech narration with custom voice profiles (Mother, Father, Grandmother, Grandfather) and customizable speech rates.'
    },
    {
      q: 'What are the ambient lullaby soundscapes?',
      a: 'Our Web Audio soundscape synthesizer plays relaxing ambient sounds in the background while you read, including Lullaby Chimes, Soft Rain, and Night Breeze.'
    },
    {
      q: 'How do PDF downloads work?',
      a: 'Every generated story includes a 1-click Download PDF option. The exported PDF contains your complete story text formatted into printable pages.'
    },
    {
      q: 'Is my child\'s data safe and private?',
      a: '100% yes! We take child safety and privacy seriously. All data is saved locally on your device or in your private account with zero advertising.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-dream-purple font-semibold text-xs">
          <HelpCircle className="w-4 h-4" />
          <span>Bedtime Help Center</span>
        </div>
        <h2 className="text-3xl font-bold font-sans text-slate-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Everything you need to know about story creation, audio narration, and kid safety.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-3xl glass-card border border-purple-100 dark:border-slate-800 overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left font-semibold text-slate-800 dark:text-white flex items-center justify-between gap-4"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-dream-purple transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 pt-4 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-100 via-sky-100 to-pink-100 dark:from-purple-950/40 dark:via-sky-950/40 dark:to-pink-950/40 border border-purple-200/50 dark:border-slate-800 text-center space-y-3">
        <MessageCircle className="w-8 h-8 text-dream-purple mx-auto" />
        <h4 className="text-lg font-bold text-slate-800 dark:text-white">Still have questions?</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Our friendly bedtime team is always here to assist you.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-dream text-white font-bold text-xs shadow-md"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

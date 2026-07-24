import React, { useState } from 'react';
import { Check, Sparkles, Star, Zap, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { setOpenAuthModal } = useAuth();

  const plans = [
    {
      name: 'Free Starter Plan',
      priceMonthly: '$0',
      priceAnnual: '$0',
      description: 'Ideal for trying out personalized bedtime stories.',
      features: [
        '3 AI Stories generated per month',
        'Standard AI Voice narration',
        'Disney & Pixar style art',
        'Access to basic moral lessons',
        'Web reading viewer'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      color: 'border-slate-200 dark:border-slate-800'
    },
    {
      name: 'Premium Plan',
      priceMonthly: '$9.99',
      priceAnnual: '$7.99',
      description: 'Unlimited stories, full voice library & PDF downloads.',
      features: [
        'Unlimited AI Story Generation',
        'All Voice Types (Mother, Father, Grandparents)',
        'Full 3D Pixar, Anime & Watercolor art styles',
        'Ambient lullaby rain soundscapes',
        'Printable PDF downloads',
        'Parent Analytics Dashboard',
        'Gamified Reading Badges'
      ],
      popular: true,
      buttonText: 'Start 7-Day Free Trial',
      color: 'border-dream-purple shadow-glow-purple'
    },
    {
      name: 'Family Plan',
      priceMonthly: '$14.99',
      priceAnnual: '$11.99',
      description: 'Support up to 4 child profiles with shared library.',
      features: [
        'Everything in Premium',
        'Up to 4 Child Profiles',
        'Multi-device sync for tablet & mobile',
        'Priority AI Story Generator queue',
        'Custom moral lesson builder',
        'Dedicated 24/7 Support'
      ],
      popular: false,
      buttonText: 'Get Family Pass',
      color: 'border-pink-200 dark:border-pink-900/50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-dream-purple font-semibold text-xs uppercase tracking-wider">
          Simple Transparent Pricing
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Invest in Peaceful Bedtimes & Lifelong Imagination
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Choose the plan that fits your bedtime routine. Cancel anytime with no hidden fees.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mt-4">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              !isAnnual ? 'bg-white dark:bg-slate-900 text-dream-purple shadow-md' : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isAnnual ? 'bg-gradient-dream text-white shadow-md' : 'text-slate-500'
            }`}
          >
            <span>Annual (Save 20%)</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl glass-card border ${plan.color} p-8 flex flex-col justify-between shadow-2xl transition-all hover:scale-[1.02]`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-dream text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                ⭐ Most Popular Choice
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-800 dark:text-white">
                  {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ month</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setOpenAuthModal(true)}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
                  plan.popular
                    ? 'bg-gradient-dream text-white hover:shadow-glow-purple'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-dream-purple hover:text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

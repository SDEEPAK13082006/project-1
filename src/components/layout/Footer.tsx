import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Moon, Heart, Mail, ShieldCheck, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 bg-slate-900 text-slate-300 border-t border-slate-800 overflow-hidden">
      
      {/* Decorative Top Wave */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-dream-purple via-dream-pink to-dream-blue" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dream-purple to-dream-pink flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold font-sans text-white">
              DreamTales
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Crafting personalized, enchanted bedtime stories with AI voice narration, calming lullaby soundscapes, and child-friendly moral lessons to ignite imagination every night.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 px-3 py-2 rounded-xl w-fit">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>Loved by 10,000+ happy parents & sleepy kids worldwide</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Product</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/generate" className="hover:text-dream-purple transition-colors">Generate Story</Link></li>
            <li><Link to="/my-stories" className="hover:text-dream-purple transition-colors">My Library</Link></li>
            <li><Link to="/parents" className="hover:text-dream-purple transition-colors">Parent Analytics</Link></li>
            <li><Link to="/achievements" className="hover:text-dream-purple transition-colors">Badges & Streaks</Link></li>
            <li><Link to="/gallery" className="hover:text-dream-purple transition-colors">Illustration Gallery</Link></li>
          </ul>
        </div>

        {/* Company & Support */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/pricing" className="hover:text-dream-purple transition-colors">Pricing Plans</Link></li>
            <li><Link to="/faq" className="hover:text-dream-purple transition-colors">FAQ & Help</Link></li>
            <li><Link to="/contact" className="hover:text-dream-purple transition-colors">Contact Us</Link></li>
            <li><Link to="/profile" className="hover:text-dream-purple transition-colors">Account Settings</Link></li>
            <li className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Kid-Safe & Ad-Free
            </li>
          </ul>
        </div>

        {/* Bedtime Newsletter */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Bedtime Digest</h4>
          <p className="text-xs text-slate-400">
            Get weekly fairy tales and bedtime tips delivered to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="parent@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-dream-purple"
              />
            </div>
            <button className="w-full py-2.5 rounded-xl bg-gradient-dream text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Subscribe Free</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-3">
        <div className="flex items-center gap-1">
          <span>© 2026 DreamTales Inc. Made with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
          <span>for peaceful bedtimes.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Kid Safety Guarantee</span>
        </div>
      </div>
    </footer>
  );
};

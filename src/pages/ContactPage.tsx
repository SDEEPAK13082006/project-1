import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Star, Heart } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-dream-pink font-semibold text-xs">
          <Mail className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl font-bold font-sans text-slate-800 dark:text-white">
          Contact & Feedback
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Have a suggestion, custom bedtime story request, or feedback for our team?
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-3xl glass-card border border-purple-100 dark:border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              Message Sent!
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Thank you for reaching out to DreamTales. We will reply to your message shortly!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-2xl bg-gradient-dream text-white font-bold text-xs"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="General Question">General Question</option>
                  <option value="Story Generator Feedback">Story Generator Feedback</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Billing Support">Billing Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  App Rating Feedback
                </label>
                <div className="flex items-center gap-1 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your bedtime routine or ideas..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 glass-input text-sm text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-dream text-white font-bold text-sm shadow-lg hover:shadow-glow-purple transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

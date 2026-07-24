import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BOOKS = [
  { emoji: '📗', title: 'Magical Forest', color: '#22C55E' },
  { emoji: '📘', title: 'Ocean World', color: '#3B82F6' },
  { emoji: '📕', title: 'Dragon Land', color: '#EF4444' },
  { emoji: '📙', title: 'Space Quest', color: '#F59E0B' },
  { emoji: '📓', title: 'Arctic', color: '#67E8F9' },
  { emoji: '📔', title: 'Dino Era', color: '#84CC16' },
  { emoji: '📒', title: 'Candy World', color: '#F472B6' },
  { emoji: '📃', title: 'Wizard School', color: '#A78BFA' },
];

const OWL_MESSAGES = [
  '🦉 Hoot! Ready for adventure?',
  '📚 I know every story ever told!',
  '⭐ Stars whisper tales at night...',
  '🌙 Sleep is where dreams live!',
  '🔮 Choose your world wisely...',
];

export const RoomBookshelf: React.FC = () => {
  const navigate = useNavigate();
  const [owlMsg, setOwlMsg] = useState<string | null>(null);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  const handleOwlClick = () => {
    const msg = OWL_MESSAGES[Math.floor(Math.random() * OWL_MESSAGES.length)];
    setOwlMsg(msg);
    setTimeout(() => setOwlMsg(null), 3500);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Oliver the Owl - perched on top of shelf */}
      <div className="relative mb-1 z-20">
        <AnimatePresence>
          {owlMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-[160px] text-center"
            >
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-semibold px-3 py-2 rounded-2xl shadow-lg border border-dream-gold/30">
                {owlMsg}
              </div>
              <div className="w-2 h-2 bg-white/90 rotate-45 mx-auto -mt-1 shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleOwlClick}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          whileHover={{ scale: 1.2, rotate: [-8, 8, -8], transition: { duration: 0.4 } }}
          className="text-4xl cursor-pointer select-none focus:outline-none drop-shadow-lg"
          title="Oliver the Owl!"
        >
          🦉
        </motion.button>
      </div>

      {/* Bookshelf */}
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl"
        style={{
          width: '220px',
          background: 'linear-gradient(to bottom, #5C3810, #3D2408)',
          border: '4px solid #3D2408',
          boxShadow: '0 0 0 2px #2A1A06, 4px 8px 30px rgba(0,0,0,0.6)'
        }}
      >
        {/* Shelf Rows */}
        {[0, 1].map(row => (
          <div key={row} className="relative px-3 pt-2 pb-1">
            {/* Books row */}
            <div className="flex gap-1 items-end h-16 relative z-10">
              {BOOKS.slice(row * 4, row * 4 + 4).map((book, i) => (
                <motion.button
                  key={i}
                  onHoverStart={() => setHoveredBook(row * 4 + i)}
                  onHoverEnd={() => setHoveredBook(null)}
                  onClick={() => navigate('/library')}
                  animate={{ y: hoveredBook === row * 4 + i ? -8 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative group flex flex-col items-center cursor-pointer focus:outline-none"
                  style={{ flex: 1, height: '100%' }}
                >
                  {/* Book spine */}
                  <div
                    className="w-full flex-1 rounded-sm relative overflow-hidden"
                    style={{
                      background: `linear-gradient(to right, ${book.color}dd, ${book.color})`,
                      boxShadow: hoveredBook === row * 4 + i
                        ? `0 0 12px ${book.color}88`
                        : `2px 0 4px rgba(0,0,0,0.3)`,
                      minHeight: 48 + (i % 3) * 8
                    }}
                  >
                    <div className="text-white text-[8px] font-bold writing-mode-vertical rotate-180 absolute inset-0 flex items-center justify-center opacity-70">
                      {book.title}
                    </div>
                    {/* Glow when hovered */}
                    {hoveredBook === row * 4 + i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                      />
                    )}
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredBook === row * 4 + i && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-max bg-black/80 text-white text-[9px] px-2 py-1 rounded-full shadow z-50 pointer-events-none whitespace-nowrap"
                      >
                        {book.emoji} {book.title}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Shelf plank */}
            <div
              className="w-full h-3 rounded-sm mt-1 shadow-md"
              style={{ background: 'linear-gradient(to bottom, #7C4A1E, #5C3810)' }}
            />
          </div>
        ))}

        {/* Bottom shelf footer */}
        <div
          className="w-full h-4 rounded-b-sm"
          style={{ background: 'linear-gradient(to bottom, #3D2408, #2A1A06)' }}
        />

        {/* Shelf glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{ background: 'radial-gradient(ellipse at 50% 10%, rgba(245,158,11,0.05) 0%, transparent 70%)' }}
        />
      </div>

      {/* View All Books button */}
      <motion.button
        onClick={() => navigate('/library')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-2 px-4 py-1 text-[10px] font-bold text-dream-gold border border-dream-gold/50 rounded-full bg-black/30 hover:bg-dream-gold/10 transition-all"
      >
        📚 View Library
      </motion.button>
    </div>
  );
};

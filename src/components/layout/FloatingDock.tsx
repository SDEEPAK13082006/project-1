import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEnvironment } from '../../context/EnvironmentContext';
import { ambientSynth } from '../../services/audioNarration';

const NAV_ITEMS = [
  { id: 'home',     emoji: '🏠', label: 'Home',         path: '/' },
  { id: 'worlds',   emoji: '🌍', label: 'Story Worlds', path: '/worlds' },
  { id: 'create',   emoji: '📖', label: 'Create Story', path: '/create', featured: true },
  { id: 'library',  emoji: '📚', label: 'Library',      path: '/library' },
  { id: 'rewards',  emoji: '🏆', label: 'Rewards',      path: '/rewards' },
  { id: 'parent',   emoji: '👨‍👩‍👧', label: 'Parent Dashboard', path: '/parents' },
];

export const FloatingDock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSleepMode } = useEnvironment();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: isSleepMode ? 0.3 : 1 }}
      transition={{ type: 'spring', damping: 20, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full"
        style={{
          background: 'rgba(8, 4, 24, 0.78)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(167, 139, 250, 0.25)',
          boxShadow: '0 12px 50px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {NAV_ITEMS.map((item, i) => (
          <DockItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
            onClick={() => {
              ambientSynth.playSoundEffect('click');
              navigate(item.path);
            }}
            index={i}
          />
        ))}
      </div>
    </motion.nav>
  );
};

interface DockItemProps {
  item: typeof NAV_ITEMS[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const DockItem: React.FC<DockItemProps> = ({ item, isActive, onClick, index }) => {
  const [hovered, setHovered] = useState(false);
  const isFeatured = !!item.featured;

  return (
    <div className="relative flex flex-col items-center">
      {/* Hover Label Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2.5 w-max px-3 py-1.5 text-xs font-bold text-white rounded-full pointer-events-none whitespace-nowrap z-50"
            style={{
              background: 'rgba(124,58,237,0.92)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(167,139,250,0.5)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 15px rgba(124,58,237,0.4)',
            }}
          >
            {item.label}
            {/* Tooltip arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderTop: '4px solid rgba(124,58,237,0.92)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Pulsing Halo for Create Story */}
      {isFeatured && (
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,217,94,0.4), transparent 70%)',
            boxShadow: '0 0 25px rgba(255,217,94,0.5)',
          }}
        />
      )}

      {/* Dock Icon Button */}
      <motion.button
        id={`dock-${item.id}`}
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: isFeatured ? 1.4 : 1.32, y: -10 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: index * 0.05 + 0.4 } }}
        className={`relative flex items-center justify-center cursor-pointer focus:outline-none transition-all ${
          isFeatured ? 'w-13 h-13 rounded-2xl text-3xl' : 'w-11 h-11 rounded-2xl text-2xl'
        }`}
        style={{ width: isFeatured ? 52 : 44, height: isFeatured ? 52 : 44 }}
      >
        {/* Active ring */}
        {isActive && (
          <motion.div
            layoutId="active-dock-ring"
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'rgba(167,139,250,0.2)',
              border: '1.5px solid rgba(167,139,250,0.7)',
              boxShadow: '0 0 20px rgba(124,58,237,0.6), inset 0 0 8px rgba(167,139,250,0.2)',
            }}
          />
        )}

        {/* Hover glow */}
        <motion.div
          animate={{ opacity: hovered ? 0.6 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isFeatured
              ? 'radial-gradient(ellipse, rgba(255,217,94,0.5), transparent)'
              : 'radial-gradient(ellipse, rgba(167,139,250,0.5), transparent)',
          }}
        />

        {/* Button surface */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-200"
          style={{
            background: isFeatured
              ? 'linear-gradient(135deg, rgba(124,58,237,0.7), rgba(76,29,149,0.9))'
              : isActive
                ? 'rgba(124,58,237,0.35)'
                : hovered
                  ? 'rgba(124,58,237,0.25)'
                  : 'rgba(255,255,255,0.04)',
            border: isFeatured
              ? '1.5px solid rgba(255,217,94,0.7)'
              : isActive
                ? '1px solid transparent'
                : hovered
                  ? '1px solid rgba(167,139,250,0.4)'
                  : '1px solid rgba(255,255,255,0.07)',
          }}
        />

        <span className="relative z-10 select-none" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))' }}>
          {item.emoji}
        </span>

        {/* Active dot indicator */}
        {isActive && (
          <motion.div
            layoutId="active-dock-dot"
            className="absolute -bottom-2 w-1.5 h-1.5 rounded-full"
            style={{ background: '#FFD95E', boxShadow: '0 0 8px #FFD95E, 0 0 16px #FFD95E44' }}
          />
        )}
      </motion.button>
    </div>
  );
};

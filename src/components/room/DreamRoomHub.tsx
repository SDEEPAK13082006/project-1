import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEnvironment } from '../../context/EnvironmentContext';

import { RoomCeiling } from './RoomCeiling';
import { RoomWindow } from './RoomWindow';
import { RoomBed } from './RoomBed';
import { RoomBookshelf } from './RoomBookshelf';
import { RoomDesk } from './RoomDesk';
import { RoomFireplace } from './RoomFireplace';
import { RoomFloor } from './RoomFloor';
import { RoomTopBar } from '../layout/RoomTopBar';
import { FloatingDock } from '../layout/FloatingDock';
import { MagicDustCursor } from './MagicDustCursor';
import { ShootingStarNotifier } from './ShootingStarNotifier';

/* ─── Wall ambient fireflies ─── */
const AMBIENT_FIREFLIES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 20 + Math.random() * 55,
  delay: Math.random() * 5,
}));

/* ─── Wall paintings ─── */
const WALL_PAINTINGS = [
  { left: '5%', top: '18%', emoji: '🖼️', title: 'Dragon Vale', subtitle: 'A story of friendship' },
  { right: '5%', top: '18%', emoji: '🎨', title: 'Ocean Deep', subtitle: 'Beneath the waves' },
];

export const DreamRoomHub: React.FC = () => {
  const navigate = useNavigate();
  const { isSleepMode, setBedtimeMode, bedtimeMode, timeOfDay, reduceMotion } = useEnvironment();
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── Mouse parallax ─── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 25 });
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
    rawX.set((clientX / width - 0.5) * 14);
    rawY.set((clientY / height - 0.5) * 8);
  };

  /* ─── Room wall gradient by time ─── */
  const wallColors: Record<string, string> = {
    Morning: 'from-[#1a1240] via-[#2d1b5e] to-[#1a1240]',
    Afternoon: 'from-[#0f1a3d] via-[#1e2a5e] to-[#0f1a3d]',
    Evening: 'from-[#1a0820] via-[#3d1530] to-[#1a0820]',
    Night: 'from-[#070d25] via-[#0d1540] to-[#070d25]',
  };

  /* ─── Bedtime mode handler ─── */
  const handleBedClick = () => {
    setBedtimeMode(!bedtimeMode);
  };

  /* ─── Floating particles behind the room ─── */
  const [floatParticles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 6,
      color: ['#FFD95E', '#A78BFA', '#7FD9FF', '#F9A8D4', '#4ADE80'][Math.floor(Math.random() * 5)],
    }))
  );

  return (
    <>
      {/* Magic cursor dust trail */}
      <MagicDustCursor />

      {/* Top bar */}
      <RoomTopBar />

      {/* ─── Sleep mode dim overlay ─── */}
      <AnimatePresence>
        {(isSleepMode || bedtimeMode) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: bedtimeMode ? 0.65 : 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-[80] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, #1a0a05 0%, #000 100%)' }}
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          THE DREAM ROOM
          ════════════════════════════════════════════ */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* ── Parallax scene container ── */}
        <motion.div
          className="absolute inset-0"
          style={{
            rotateY: reduceMotion ? 0 : smoothX,
            rotateX: reduceMotion ? 0 : smoothY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ── BACK WALL (gradient) ── */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${wallColors[timeOfDay] ?? wallColors.Night}`}
          >
            {/* Wood panel texture strips */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-[22%] opacity-10"
                style={{
                  left: `${i * 12.5}%`,
                  width: '12.5%',
                  borderRight: '1px solid rgba(255,255,255,0.15)',
                  background: i % 2 === 0
                    ? 'rgba(255,255,255,0.02)'
                    : 'rgba(0,0,0,0.03)'
                }}
              />
            ))}

            {/* Ambient wall glow from fireplace */}
            <motion.div
              animate={{ opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-[22%] left-0 w-64 h-64 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, #F59E0B33, transparent)' }}
            />

            {/* Moonlight beam from window */}
            {timeOfDay === 'Night' && (
              <motion.div
                animate={{ opacity: [0.04, 0.12, 0.04] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute pointer-events-none"
                style={{
                  top: '15%',
                  left: '45%',
                  width: '12%',
                  height: '60%',
                  background: 'linear-gradient(to bottom, rgba(200,220,255,0.15), transparent)',
                  transform: 'skewX(-5deg)',
                  filter: 'blur(8px)',
                }}
              />
            )}
          </div>

          {/* ── CEILING STARS ── */}
          <RoomCeiling />

          {/* ── AMBIENT FIREFLIES ── */}
          {!reduceMotion && AMBIENT_FIREFLIES.map(f => (
            <motion.div
              key={f.id}
              animate={{
                x: [0, 20, -15, 0],
                y: [0, -15, 10, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 5 + f.delay,
                delay: f.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                background: '#FFD95E',
                boxShadow: '0 0 6px #FFD95E, 0 0 12px #FFD95E44',
              }}
            />
          ))}

          {/* ── FLOATING MAGIC PARTICLES (back wall) ── */}
          {!reduceMotion && floatParticles.map(p => (
            <motion.div
              key={p.id}
              animate={{ y: [p.y + '%', `${p.y - 15}%`, p.y + '%'], opacity: [0, 0.7, 0] }}
              transition={{ duration: 6 + p.delay, delay: p.delay, repeat: Infinity }}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          ))}

          {/* ── WALL PAINTINGS ── */}
          {WALL_PAINTINGS.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="absolute cursor-pointer"
              style={{ left: p.left, right: p.right, top: p.top }}
            >
              <div
                className="relative rounded-xl overflow-hidden shadow-2xl"
                style={{
                  width: 90, height: 70,
                  background: 'linear-gradient(135deg, #2d1b5e, #1a0a3d)',
                  border: '4px solid #5C3810',
                  boxShadow: '0 0 0 2px #3D2408, 0 8px 25px rgba(0,0,0,0.5)'
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl">{p.emoji}</span>
                  <span className="text-white/60 text-[7px] mt-1 font-semibold">{p.title}</span>
                </div>
                {/* Frame shine */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
                />
              </div>
            </motion.div>
          ))}

          {/* ════════════════════════════════════════════
              ROOM OBJECTS LAYOUT
              ════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-[22%]">

            {/* ── LEFT ZONE: Fireplace + Bed ── */}
            <div className="flex flex-col items-start gap-6 w-[28%] h-full justify-end pb-2">
              <RoomFireplace />
              <RoomBed onBedClick={handleBedClick} />
            </div>

            {/* ── CENTER ZONE: Window + Desk ── */}
            <div className="flex flex-col items-center justify-end gap-4 w-[38%] h-full pb-2">
              <RoomWindow />
              <RoomDesk />
            </div>

            {/* ── RIGHT ZONE: Bookshelf ── */}
            <div className="flex flex-col items-end justify-end w-[28%] h-full pb-2">
              <RoomBookshelf />
            </div>
          </div>

          {/* ── FLOOR ── */}
          <RoomFloor />

          {/* ── BASEBOARD / WAINSCOTING ── */}
          <div
            className="absolute bottom-[22%] left-0 right-0 h-3 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #8B5E3C, #6B4226)',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.4)'
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Shooting Star Notifier (random collectible) ── */}
      <ShootingStarNotifier />

      {/* ── Floating Dock (always on top) ── */}
      <FloatingDock />
    </>
  );
};

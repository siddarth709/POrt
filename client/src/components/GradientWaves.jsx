import React from 'react';
import { motion } from 'framer-motion';

export default function GradientWaves() {
  const waves = [
    'M-100 180 C 180 90, 380 270, 700 170 S 1160 100, 1540 210',
    'M-120 250 C 220 150, 430 340, 760 240 S 1190 170, 1560 290',
    'M-120 330 C 220 240, 500 410, 820 310 S 1220 250, 1560 360',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 1440 440" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-80">
        <defs>
          <linearGradient id="contactWave" x1="0" x2="1">
            <stop offset="0" stopColor="#67e8f9" stopOpacity="0" />
            <stop offset="0.45" stopColor="#60a5fa" stopOpacity="0.55" />
            <stop offset="1" stopColor="#e879f9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {waves.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="url(#contactWave)"
            strokeWidth={index === 1 ? 1.4 : 0.8}
            strokeDasharray={index === 1 ? '8 12' : '3 14'}
            animate={{ pathLength: [0.72, 1, 0.72], x: [0, index % 2 ? -34 : 34, 0], opacity: [0.28, 0.7, 0.28] }}
            transition={{ duration: 9 + index * 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-fuchsia-500/[0.07] via-blue-500/[0.04] to-transparent blur-3xl" />
    </div>
  );
}
import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

export default function BackgroundFX() {
  const stars = useMemo(() => Array.from({ length: 34 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    top: `${(index * 61) % 100}%`,
    size: index % 5 === 0 ? 3 : 1 + (index % 2),
    delay: `${(index % 9) * 0.45}s`,
    duration: `${3.5 + (index % 5)}s`,
  })), []);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates around center
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / innerWidth);
      mouseY.set((e.clientY - innerHeight / 2) / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030511]">
      {/* Noise Texture layer */}
      <div className="noise-overlay" />

      <div className="absolute inset-0 star-field opacity-60" />
      <div className="absolute -top-1/4 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-cyan-300/[0.08] shadow-[0_0_120px_rgba(80,140,255,0.08)]" />
      <div className="absolute -top-1/4 left-1/2 h-[31rem] w-[31rem] -translate-x-1/2 rounded-full border border-fuchsia-300/[0.06]" />
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-sky-100"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size, boxShadow: '0 0 10px rgba(150, 220, 255, 0.9)' }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.25, 0.7] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* 1. Subtle Precision Technical Grid */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-tech-grid opacity-[0.55]"
      />

      {/* 2. Mathematical Vector Curves (SVG) */}
      <motion.svg
        style={{
          x: useTransform(smoothMouseX, (v) => v * 25),
          y: useTransform(smoothMouseY, (v) => v * 25),
        }}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full opacity-[0.14] stroke-white"
      >
        <path
          d="M-100 250 C 300 150, 600 450, 1000 300 C 1200 220, 1400 350, 1600 280"
          strokeWidth="0.75"
          strokeDasharray="4 6"
        />
        <path
          d="M-100 380 C 400 280, 750 550, 1100 420 C 1300 350, 1500 480, 1600 400"
          strokeWidth="0.5"
        />
        <path
          d="M-100 520 C 250 620, 650 380, 950 540 C 1250 700, 1450 500, 1600 580"
          strokeWidth="0.75"
          strokeDasharray="8 8"
        />
        {/* Subtle geometric technical markers */}
        <circle cx="600" cy="450" r="2" fill="white" opacity="0.6" />
        <circle cx="1000" cy="300" r="2" fill="white" opacity="0.6" />
        <line x1="590" y1="450" x2="610" y2="450" stroke="white" strokeWidth="0.5" opacity="0.4" />
        <line x1="600" y1="440" x2="600" y2="460" stroke="white" strokeWidth="0.5" opacity="0.4" />
      </motion.svg>

      {/* 3. Understated Ambient Light Falloff */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, (v) => v * 40),
          y: useTransform(smoothMouseY, (v) => v * 40),
        }}
        className="absolute top-10 left-1/3 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-cyan-400/[0.09] via-indigo-500/[0.05] to-transparent blur-[140px] pointer-events-none"
      />
      <div className="absolute bottom-10 right-10 w-[600px] h-[500px] rounded-full bg-gradient-to-tl from-fuchsia-500/[0.07] via-indigo-500/[0.04] to-transparent blur-[160px] pointer-events-none" />
    </div>
  );
}

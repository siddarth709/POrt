import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ParticlesBackground() {
  // Generate random particles with fixed deterministic seeds
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#a855f7' : '#ec4899',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [`${p.y}vh`, `${(p.y - 25 + 100) % 100}vh`],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  );
}

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Thin gradient bar across the top that fills as the user scrolls - a
// subtle premium touch used by many high-end portfolio/agency sites.
// A soft glowing dot now rides the leading edge of the bar for a bit more
// visual life as the page scrolls.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const dotLeft = useTransform(scaleX, (v) => `${v * 100}%`);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <motion.div
        style={{ scaleX }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent2"
      />
      <motion.div
        style={{ left: dotLeft }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent2 shadow-glow-cyan"
      />
    </div>
  );
}

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Thin gradient bar across the top that fills as the user scrolls - a
// subtle premium touch used by many high-end portfolio/agency sites.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-accent to-accent2"
    />
  );
}

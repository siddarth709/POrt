import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../animations/variants';

// Generic scroll-reveal wrapper - wrap any block in <Reveal> for the
// consistent fade-up-on-scroll premium effect.
export default function Reveal({ children, custom = 0, className = '', variants = fadeUp, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={custom}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

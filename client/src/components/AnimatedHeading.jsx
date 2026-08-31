import React from 'react';
import { motion } from 'framer-motion';
import { wordContainer, wordChild, viewportOnce } from '../animations/variants';

// Splits text into words and reveals them with a soft blur/rise stagger as
// the heading scrolls into view with natural CSS line breaks.
export default function AnimatedHeading({
  as: Tag = 'h2',
  text = '',
  className = '',
  wordClassName = '',
}) {
  const words = String(text).split(' ');
  const MotionTag = motion[Tag] || motion.h2;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={wordContainer}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordChild}
          className={`inline-block mr-[0.26em] last:mr-0 will-change-transform ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { wordContainer, wordChild, viewportOnce } from '../animations/variants';

// Splits text into words and reveals them with a soft blur/rise stagger as
// the heading scrolls into view. Drop-in replacement for a plain <h2>/<h3> -
// pass the same className you'd use on the heading element.
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
          className={`inline-block will-change-transform ${wordClassName}`}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
}

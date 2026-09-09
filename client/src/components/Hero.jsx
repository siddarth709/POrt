import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ data = {} }) {
  const heroRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const slowX = useSpring(pointerX, { stiffness: 35, damping: 20 });
  const slowY = useSpring(pointerY, { stiffness: 35, damping: 20 });
  const fastX = useSpring(pointerX, { stiffness: 55, damping: 22 });
  const fastY = useSpring(pointerY, { stiffness: 55, damping: 22 });
  const name = data.name || 'N S SIDDARTH';
  const description = data.tagline || 'Building intelligent systems with code, models, and ideas.';

  const handlePointerMove = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || !heroRef.current) return;
    const bounds = heroRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 36);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 24);
  };

  return (
    <section id="home" ref={heroRef} onPointerMove={handlePointerMove} className="hero-editorial">
      <div className="hero-forms" aria-hidden="true">
        <motion.span className="hero-form hero-form-one" style={{ x: slowX, y: slowY }} />
        <motion.span className="hero-form hero-form-two" style={{ x: fastX, y: fastY }} />
        <motion.span className="hero-form hero-form-three" style={{ x: slowX, y: fastY }} />
      </div>
      <div className="editorial-grid hero-grid">
        <motion.div className="hero-title" initial="hidden" animate="visible">
          <h1><span className="hero-title-line"><motion.span variants={reveal} custom={0.26}>{name}</motion.span></span></h1>
        </motion.div>
        <motion.p variants={reveal} initial="hidden" animate="visible" custom={0.62} className="hero-description">{description}</motion.p>
        <motion.div variants={reveal} initial="hidden" animate="visible" custom={0.84} className="hero-meta">
          <span>OPEN TO COLLABORATIONS</span><span>AI SYSTEMS / RESEARCH</span>
        </motion.div>
        <motion.button type="button" variants={reveal} initial="hidden" animate="visible" custom={1.02} className="scroll-cue" onClick={() => document.getElementById('statement')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to explore">
          <span>SCROLL TO EXPLORE</span><i aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Cloud, Rocket } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function RocketLaunch() {
  const [launched, setLaunched] = useState(false);
  const reducedMotion = useReducedMotion();

  const launch = () => {
    if (launched) return;
    setLaunched(true);
    const heroTarget = document.querySelector('#home .hero-portrait') || document.querySelector('#home');
    heroTarget?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <div className="rocket-launch-dock">
      <motion.button
        type="button"
        onClick={launch}
        disabled={launched}
        className="education-launch-button interactive-hit"
        whileHover={launched ? undefined : { y: -3, scale: 1.03 }}
        whileTap={launched ? undefined : { scale: .97 }}
        aria-label="Launch back to the hero portrait"
      >
        <Rocket size={17} />
        <span>{launched ? 'LIFTING OFF' : 'RETURN TO ORIGIN'}</span>
      </motion.button>
      <span className="education-launchpad__caption">NAVIGATE TO ORIGIN // HERO IMAGE</span>

      {launched && !reducedMotion && (
        <div className="rocket-flight" aria-hidden="true">
          <motion.div
            className="rocket-flight__vehicle"
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: [0, -72, 58, 0, 0], y: [0, '-20vh', '-48vh', '-78vh', '-125vh'], rotate: [0, -8, 8, 0, 0], opacity: [1, 1, 1, 1, 0] }}
            transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1], times: [0, .18, .46, .72, 1] }}
            onAnimationComplete={() => setLaunched(false)}
          >
            <span className="rocket-flight__flame" />
            <Rocket size={48} strokeWidth={1.35} />
          </motion.div>
          {[0, 1, 2].map((cloudIdx) => (
            <motion.div
              key={cloudIdx}
              className={`rocket-flight__cloud rocket-flight__cloud--${cloudIdx + 1}`}
              initial={{ opacity: 0, scale: .5, y: 40 }}
              animate={{ opacity: [0, .8, 0], scale: [0.5, 1.1, 1.45], y: [40, 0, -40], x: cloudIdx % 2 ? 70 : -70 }}
              transition={{ duration: 2.2, delay: .42 + cloudIdx * .18, ease: 'easeOut' }}
            >
              <Cloud size={58 + cloudIdx * 14} strokeWidth={1.2} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
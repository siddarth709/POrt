import React, { useEffect, useRef, useState } from 'react';
import { Rocket } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

function CloudBurst({ index }) {
  const positions = [
    { left: '48%', top: '18%', size: 170, delay: 0.7 },
    { left: '35%', top: '27%', size: 125, delay: 0.9 },
    { left: '61%', top: '30%', size: 145, delay: 1.05 },
    { left: '51%', top: '39%', size: 105, delay: 1.18 },
  ];
  const item = positions[index];

  return (
    <motion.div
      className="rocket-cloud"
      style={{ left: item.left, top: item.top, width: item.size, height: item.size * 0.52 }}
      initial={{ opacity: 0, scale: 0.35, y: 18 }}
      animate={{ opacity: [0, 0.95, 0.9, 0], scale: [0.35, 1.08, 1.16, 1.28], y: [18, 0, -4, -18] }}
      transition={{ duration: 2.1, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="rocket-cloud__puff rocket-cloud__puff--a" />
      <span className="rocket-cloud__puff rocket-cloud__puff--b" />
      <span className="rocket-cloud__puff rocket-cloud__puff--c" />
      <span className="rocket-cloud__puff rocket-cloud__puff--d" />
    </motion.div>
  );
}

export default function RocketLaunch({ className = '' }) {
  const buttonRef = useRef(null);
  const [launch, setLaunch] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!launch) return undefined;
    const finish = window.setTimeout(() => setLaunch(null), reducedMotion ? 350 : 3900);
    return () => window.clearTimeout(finish);
  }, [launch, reducedMotion]);

  const launchRocket = () => {
    if (launch) return;
    const button = buttonRef.current;
    const rect = button?.getBoundingClientRect();
    if (!rect) return;

    const home = document.getElementById('home');
    const target = home?.querySelector('.hero-portrait') || home;
    const homeRect = home?.getBoundingClientRect();
    const targetRect = target?.getBoundingClientRect();

    if (reducedMotion) {
      home?.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }

    setLaunch({
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
      targetX: targetRect ? targetRect.left + targetRect.width * 0.72 : window.innerWidth * 0.68,
      targetY: targetRect && homeRect ? targetRect.top - homeRect.top + targetRect.height * 0.3 : window.innerHeight * 0.24,
    });

    window.setTimeout(() => {
      home?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const start = launch || {};

  return (
    <div className={`rocket-launch-dock ${className}`}>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={launchRocket}
        disabled={Boolean(launch)}
        className="education-launch-button rocket-launch-button interactive-hit"
        whileHover={launch ? undefined : { y: -3, scale: 1.04 }}
        whileTap={launch ? undefined : { scale: 0.96 }}
        aria-label="Launch rocket back to the hero section"
      >
        <span className="rocket-launch-button__icon" aria-hidden="true"><Rocket size={18} strokeWidth={2} /></span>
        <span>{launch ? 'LIFTING OFF' : 'RETURN TO ORIGIN'}</span>
      </motion.button>
      <span className="education-launchpad__caption">LAUNCH TO ORIGIN // HERO</span>

      <AnimatePresence>
        {launch && (
          <motion.div className="rocket-launch-scene" aria-hidden="true">
            <motion.div
              className="rocket-launch-scene__trail"
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: [0, 0.9, 0], scaleY: [0.2, 1, 1.25] }}
              transition={{ duration: 2.8, ease: 'easeOut' }}
            />
            {[0, 1, 2, 3].map((index) => <CloudBurst key={index} index={index} />)}
            <motion.div
              className="rocket-launch-scene__rocket"
              initial={{ left: start.startX, top: start.startY, x: '-50%', y: '-50%', rotate: 0, scale: 0.72, opacity: 1 }}
              animate={{
                left: [start.startX, start.startX + 8, start.targetX - 35, start.targetX],
                top: [start.startY, start.startY - window.innerHeight * 0.18, start.targetY + 35, start.targetY],
                rotate: [0, -4, -2, 0],
                scale: [0.72, 0.86, 1, 0.8],
                opacity: [1, 1, 1, 0],
              }}
              transition={{ duration: 3.25, times: [0, 0.18, 0.72, 1], ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="rocket-launch-scene__glow" />
              <span className="rocket-launch-scene__flame rocket-launch-scene__flame--outer" />
              <span className="rocket-launch-scene__flame rocket-launch-scene__flame--inner" />
              <span className="rocket-launch-scene__body">
                <span className="rocket-launch-scene__nose" />
                <span className="rocket-launch-scene__window" />
                <span className="rocket-launch-scene__fin rocket-launch-scene__fin--left" />
                <span className="rocket-launch-scene__fin rocket-launch-scene__fin--right" />
              </span>
            </motion.div>
            <motion.div
              className="rocket-launch-scene__flash"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.25, 1.8] }}
              transition={{ duration: 0.45, delay: 3.05, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

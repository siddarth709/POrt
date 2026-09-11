import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Rocket } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

function CloudBurst({ index }) {
  const positions = [
    { x: 0, y: 0, size: 190, delay: 0 },
    { x: -120, y: 55, size: 145, delay: 0.08 },
    { x: 125, y: 45, size: 155, delay: 0.14 },
    { x: 0, y: 95, size: 125, delay: 0.2 },
    { x: -70, y: 105, size: 115, delay: 0.24 },
    { x: 75, y: 105, size: 120, delay: 0.28 },
  ];
  const item = positions[index];

  return (
    <motion.div
      className="rocket-cloud"
      style={{ left: 'var(--rocket-x)', top: 'var(--rocket-y)', width: item.size, height: item.size * 0.52, marginLeft: item.x, marginTop: item.y }}
      initial={{ opacity: 0, scale: 0.35 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.35, 1, 1.08, 1.25] }}
      transition={{ duration: 1.8, delay: item.delay, ease: 'linear' }}
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
  const animationFrameRef = useRef(null);
  const launchLockRef = useRef(false);
  const [launch, setLaunch] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const launchRocket = () => {
    if (launchLockRef.current) return;
    const button = buttonRef.current;
    const home = document.getElementById('home');
    if (!button || !home) return;

    const heroTarget = home.querySelector('.hero-portrait') || home.querySelector('.hero-image') || home;
    const buttonRect = button.getBoundingClientRect();
    const targetRect = heroTarget.getBoundingClientRect();
    const scrollStart = window.scrollY;
    const homeDocumentTop = home.getBoundingClientRect().top + window.scrollY;
    const targetDocumentX = targetRect.left + targetRect.width * 0.72;
    const targetDocumentY = targetRect.top + window.scrollY + targetRect.height * 0.28;
    const startDocumentX = buttonRect.left + buttonRect.width / 2;
    const startDocumentY = buttonRect.top + window.scrollY + buttonRect.height / 2;
    const scrollTarget = Math.max(0, homeDocumentTop);

    if (reducedMotion) {
      window.scrollTo({ top: scrollTarget, behavior: 'auto' });
      return;
    }

    const distance = Math.abs(scrollStart - scrollTarget);
    const duration = Math.max(1800, Math.min(5200, (distance / 950) * 1000));
    launchLockRef.current = true;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    setLaunch({ startDocumentX, startDocumentY, targetDocumentX, targetDocumentY, scrollStart, scrollTarget, duration, restoreOverflow: () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    }});
  };

  useEffect(() => {
    if (!launch || reducedMotion) return undefined;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / launch.duration, 1);
      const scrollY = launch.scrollStart + (launch.scrollTarget - launch.scrollStart) * progress;
      const documentX = launch.startDocumentX + (launch.targetDocumentX - launch.startDocumentX) * progress;
      const documentY = launch.startDocumentY + (launch.targetDocumentY - launch.startDocumentY) * progress;
      window.scrollTo(0, scrollY);
      document.documentElement.style.setProperty('--rocket-x', `${documentX}px`);
      document.documentElement.style.setProperty('--rocket-y', `${documentY - scrollY}px`);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }
      window.setTimeout(() => {
        launch.restoreOverflow();
        launchLockRef.current = false;
        setLaunch(null);
      }, 850);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [launch, reducedMotion]);

  const start = launch || {};
  const launchScene = launch ? (
    <AnimatePresence>
      <motion.div className="rocket-launch-scene" aria-hidden="true">
        <motion.div className="rocket-launch-scene__trail" initial={{ opacity: 0, scaleY: 0.2 }} animate={{ opacity: [0, 0.9, 0.85], scaleY: [0.2, 1, 1.05] }} transition={{ duration: launch.duration / 1000, ease: 'linear' }} />
        <motion.div className="rocket-launch-scene__rocket" initial={{ opacity: 1, scale: 0.72, rotate: 0 }} animate={{ opacity: 1, scale: 0.82, rotate: 0 }} transition={{ duration: launch.duration / 1000, ease: 'linear' }}>
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
        {[0, 1, 2, 3, 4, 5].map((index) => <CloudBurst key={index} index={index} />)}
        <motion.div className="rocket-launch-scene__flash" initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: [0, 1, 0], scale: [0.3, 1.15, 1.7] }} transition={{ duration: 0.7, delay: launch.duration / 1000, ease: 'linear' }} />
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <>
      <div className={`rocket-launch-dock ${className}`}>
        <motion.button ref={buttonRef} type="button" onClick={launchRocket} disabled={Boolean(launch)} className="education-launch-button rocket-launch-button interactive-hit" whileHover={launch ? undefined : { y: -3, scale: 1.04 }} whileTap={launch ? undefined : { scale: 0.96 }} aria-label="Launch rocket back to the hero section">
          <span className="rocket-launch-button__icon" aria-hidden="true"><Rocket size={18} strokeWidth={2} /></span>
          <span>{launch ? 'LIFTING OFF' : 'RETURN TO ORIGIN'}</span>
        </motion.button>
        <span className="education-launchpad__caption">LAUNCH TO ORIGIN // HERO</span>
      </div>
      {typeof document !== 'undefined' && launchScene ? createPortal(launchScene, document.body) : null}
    </>
  );
}

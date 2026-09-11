import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'link' | 'view' | 'open'
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 23, stiffness: 380, mass: 0.32 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, [role="button"]');
      if (!target) {
        setCursorState('default');
        return;
      }

      const customCursor = target.getAttribute('data-cursor');
      if (customCursor === 'view') {
        setCursorState('view');
      } else if (customCursor === 'open') {
        setCursorState('open');
      } else if (target.tagName === 'A' && target.getAttribute('target') === '_blank') {
        setCursorState('open');
      } else {
        setCursorState('link');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY, visible]);

  if (isTouch || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        <AnimatePresence mode="wait">
          {cursorState === 'view' ? (
            /* Radially increasing circle with 'VIEW' */
            <motion.div
              key="cursor-view"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              className="w-20 h-20 rounded-full bg-white text-[#050508] flex items-center justify-center shadow-2xl shadow-black/50"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase select-none">
                VIEW
              </span>
            </motion.div>
          ) : cursorState === 'open' ? (
            /* Radially increasing circle/badge with 'OPEN ↗' */
            <motion.div
              key="cursor-open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              className="w-16 h-16 rounded-full bg-white text-[#050508] flex items-center justify-center shadow-2xl shadow-black/50"
            >
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase select-none">
                OPEN ↗
              </span>
            </motion.div>
          ) : cursorState === 'link' ? (
            /* Subtle link hover ring */
            <motion.div
              key="cursor-link"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-8 h-8 rounded-full border border-white/40 bg-white/[0.1] backdrop-blur-[2px]"
            />
          ) : (
            /* Minimal default dot */
            <motion.div
              key="cursor-default"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-2 h-2 rounded-full bg-white shadow-sm"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

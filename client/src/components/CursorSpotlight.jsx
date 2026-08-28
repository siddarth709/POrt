import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 30, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Subtle Studio Cursor Spotlight */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/[0.04] to-cyan-500/[0.04] blur-[100px]"
      />
    </div>
  );
}


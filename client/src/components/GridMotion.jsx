import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const LOOP_COPIES = 4;

export default function GridMotion({ items = [] }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const loopedItems = useMemo(() => Array.from({ length: LOOP_COPIES }, () => items).flat(), [items]);

  if (!items.length) return null;

  const rows = [
    { shift: 0, direction: -1, duration: 34 },
    { shift: Math.ceil(items.length / 3), direction: 1, duration: 42 },
    { shift: Math.ceil((items.length * 2) / 3), direction: -1, duration: 38 },
  ];

  return (
    <section
      id="grid-motion"
      className="grid-motion-section relative py-3 sm:py-4"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 26,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 18,
        });
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="grid-motion-viewport" aria-label="Moving visual archive">
        <motion.div
          className="grid-motion-canvas"
          animate={{ x: pointer.x, y: pointer.y }}
          transition={{ type: 'spring', stiffness: 85, damping: 22, mass: 0.5 }}
        >
          {rows.map((row, rowIndex) => {
            const orderedItems = [...loopedItems.slice(row.shift), ...loopedItems.slice(0, row.shift)];
            const travel = row.direction * (items.length * 310);

            return (
              <motion.div
                key={rowIndex}
                className="grid-motion-row"
                animate={{ x: [0, travel] }}
                transition={{ duration: row.duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
              >
                {orderedItems.map((item, itemIndex) => (
                  <figure className="grid-motion-tile" key={`${rowIndex}-${item._id || itemIndex}-${itemIndex}`}>
                    <img src={item.image} alt={item.title || 'Portfolio visual'} loading="lazy" />
                    <figcaption>{item.title || 'Visual study'}</figcaption>
                  </figure>
                ))}
              </motion.div>
            );
          })}
        </motion.div>
        <div className="grid-motion-fade grid-motion-fade-top" />
        <div className="grid-motion-fade grid-motion-fade-bottom" />
      </div>
    </section>
  );
}

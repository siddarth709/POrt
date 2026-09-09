import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GridMotion({ items = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const offsets = [
    useTransform(scrollYProgress, [0, 1], ['4%', '-12%']),
    useTransform(scrollYProgress, [0, 1], ['-12%', '4%']),
    useTransform(scrollYProgress, [0, 1], ['5%', '-9%']),
  ];
  const rows = [0, 1, 2].map((row) => items.filter((_, index) => index % 3 === row));

  if (!items.length) return null;

  return (
    <section id="grid-motion" ref={ref} className="relative overflow-hidden border-t border-white/[0.04] py-28 sm:py-36">
      <div className="relative z-10 mx-auto mb-12 flex max-w-7xl items-end justify-between gap-6 px-6 sm:px-10">
        <div><p className="font-mono text-xs tracking-[0.25em] text-cyan-300/70">VISUAL TELEMETRY</p><h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">GRID MOTION</h2></div>
        <span className="hidden font-mono text-[10px] tracking-widest text-slate-500 sm:block">SCROLL // EXPLORE</span>
      </div>
      <div className="flex flex-col gap-3 sm:gap-5">
        {rows.map((row, rowIndex) => (
          <motion.div key={rowIndex} style={{ x: offsets[rowIndex] }} className="flex min-w-max gap-3 sm:gap-5">
            {row.map((item, itemIndex) => (
              <motion.figure key={item._id || `${rowIndex}-${itemIndex}`} whileHover={{ y: -8, scale: 1.035, zIndex: 2 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="group relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-white/[0.1] bg-slate-950/60 shadow-2xl sm:h-60 sm:w-96">
                <img src={item.image} alt={item.title || 'Grid visual'} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030511] via-transparent to-transparent opacity-90" />
                {item.title && <figcaption className="absolute bottom-4 left-4 right-4 font-mono text-xs tracking-wider text-white/80">{item.title}</figcaption>}
              </motion.figure>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
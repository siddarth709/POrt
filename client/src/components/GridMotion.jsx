import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GridMotion({ items = [] }) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  if (!items.length) return null;

  return (
    <section
      id="grid-motion"
      className="relative overflow-hidden border-t border-white/[0.04] py-28 sm:py-36"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
      }}
      style={{ '--grid-x': `${pointer.x}%`, '--grid-y': `${pointer.y}%` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--grid-x)_var(--grid-y),rgba(53,211,255,0.17),transparent_28rem)]" />
      <div className="relative z-10 mx-auto mb-12 flex max-w-7xl items-end justify-between gap-6 px-6 sm:px-10">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-cyan-300/70">VISUAL TELEMETRY</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">GRID MOTION</h2>
        </div>
        <span className="hidden font-mono text-[10px] tracking-widest text-slate-500 sm:block">MOVE // EXPLORE</span>
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 sm:grid-cols-3 sm:gap-3 sm:px-10 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.figure
            key={item._id || index}
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: (index % 8) * 0.045, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: index % 2 ? -10 : 10, scale: 1.045, rotateX: index % 2 ? 2 : -2, rotateY: index % 3 ? 2 : -2, zIndex: 2 }}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/[0.1] bg-slate-950/70 shadow-2xl sm:rounded-2xl"
          >
            <img src={item.image} alt={item.title || 'Grid visual'} className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-125" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030511] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,0.22),transparent_52%)]" />
            {item.title && <figcaption className="absolute bottom-3 left-3 right-3 truncate font-mono text-[10px] tracking-wider text-white/80 sm:bottom-4 sm:left-4 sm:text-xs">{item.title}</figcaption>}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
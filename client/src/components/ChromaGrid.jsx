import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';

export default function ChromaGrid({ items = [], onSelect }) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  return (
    <div
      className="chroma-grid"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpotlight({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
      }}
      style={{ '--spot-x': `${spotlight.x}%`, '--spot-y': `${spotlight.y}%` }}
    >
      {items.map((item, index) => (
        <motion.button
          type="button"
          key={item._id || index}
          onClick={() => onSelect(item)}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -7, scale: 1.015 }}
          transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="chroma-card group text-left"
        >
          <div className="image-surface relative h-40 overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
            {item.image ? (
              <img src={item.image} alt={item.title || 'Chronicle visual'} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-fuchsia-500/10"><ImageIcon className="text-slate-600" size={28} /></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050813] via-transparent to-transparent" />
            <ArrowUpRight size={16} className="absolute right-3 top-3 text-white/50 transition group-hover:text-cyan-300" />
          </div>
          <div className="px-1 pt-4">
            <p className="mb-2 font-mono text-[10px] tracking-widest text-cyan-300/70 uppercase">{item.location || `LOG // ${String(index + 1).padStart(2, '0')}`}</p>
            <h3 className="font-display text-lg font-semibold tracking-tight text-white">{item.title}</h3>
            {item.description && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">{item.description}</p>}
          </div>
        </motion.button>
      ))}
    </div>
  );
}

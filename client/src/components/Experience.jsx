import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Experience({ data }) {
  const [hoveredId, setHoveredId] = useState(null);

  // Nothing hardcoded: Render strictly what is in data.items from the dashboard
  if (!data || data.visible === false || !data.items || data.items.length === 0) {
    return null;
  }

  const items = data.items;

  return (
    <section id="experience" className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-400 uppercase"
          >
            WORK EXPERIENCE
          </motion.h2>
        </div>

        {/* Editorial Experiences Flowing Seamlessly */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {items.map((item, idx) => {
            const isHovered = hoveredId === (item._id || idx);
            return (
              <motion.div
                key={item._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(item._id || idx)}
                onMouseLeave={() => setHoveredId(null)}
                className={`py-12 sm:py-16 px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-2xl transition-all duration-300 group cursor-default ${
                  isHovered ? 'bg-white/[0.02] shadow-inner' : 'hover:bg-white/[0.01]'
                }`}
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  {/* Left: Role, Company, Duration */}
                  <div className="lg:col-span-5">
                    <motion.div
                      animate={{ x: isHovered ? 8 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-3">
                        {item.logo && (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/20 bg-white p-2 shadow-[0_0_20px_rgba(103,232,249,0.12)]">
                            <img src={item.logo} alt={`${item.company || 'Company'} logo`} className="h-full w-full object-contain" loading="lazy" />
                          </div>
                        )}
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                          {item.role}
                        </h3>
                        <motion.span
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 4 : -4,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight size={18} className="text-cyan-400" />
                        </motion.span>
                      </div>

                      <div className="mt-2.5 flex items-center gap-2.5 font-mono text-xs text-slate-400 uppercase tracking-wider">
                        {item.company && (
                          <span className="text-slate-300 font-medium px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                            {item.company}
                          </span>
                        )}
                        {item.duration && <span className="text-slate-500 group-hover:text-slate-400 transition-colors">{item.duration}</span>}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Narrative Description from Dashboard */}
                  {item.description && (
                    <div className="lg:col-span-7">
                      <motion.p
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                        transition={{ duration: 0.25 }}
                        className="text-base sm:text-lg text-slate-300 leading-relaxed font-light text-left whitespace-pre-line border-l border-white/[0.06] group-hover:border-white/20 pl-5 transition-colors duration-300"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Education({ data }) {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Nothing hardcoded: Render strictly what is in data.items from the dashboard
  if (!data || data.visible === false || !data.items || data.items.length === 0) {
    return null;
  }

  const items = data.items;

  return (
    <section id="education" ref={containerRef} className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]">
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
            EDUCATION
          </motion.h2>
        </div>

        {/* Editorial Vertical Layout with Drawing Vertical Line */}
        <div className="relative pl-6 sm:pl-12">
          <div className="absolute left-0 top-3 bottom-3 w-[1px] bg-white/[0.08]" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-3 w-[1.5px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-sky-400 origin-top"
          />

          <div className="flex flex-col gap-20">
            {items.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <motion.div
                  key={item._id || idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative group cursor-default"
                >
                  <div
                    className={`absolute -left-[27px] sm:-left-[51px] top-2.5 w-2 h-2 rounded-full transition-all duration-300 ${
                      isHovered
                        ? 'bg-cyan-400 scale-150 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                        : 'bg-white/40 group-hover:bg-white'
                    }`}
                  />

                  <div className="max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400 mb-3 tracking-wider">
                      {item.year && <span>{item.year}</span>}
                      {item.year && item.institution && <span>•</span>}
                      {item.institution && (
                        <span className="text-slate-300 font-medium">
                          {item.institution}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors">
                      {item.degree}
                    </h3>

                    {item.description && (
                      <motion.div
                        animate={{
                          opacity: isHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/[0.06] text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl text-justify-editorial font-light whitespace-pre-line"
                      >
                        <p>{item.description}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useState } from 'react';
import { Cloud, Rocket } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function Education({ data }) {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [launched, setLaunched] = useState(false);
  const reducedMotion = useReducedMotion();

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

  const launchRocket = () => {
    if (launched) return;
    setLaunched(true);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="education" ref={containerRef} className="relative py-28 sm:py-36 px-5 sm:px-8 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="section-heading mb-14 sm:mb-16">
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

        {/* Milestone path keeps each education record easy to scan. */}
        <div className="education-timeline relative">
          <div className="education-timeline__track" />

          <motion.div
            style={{ height: lineHeight }}
            className="education-timeline__progress"
          />

          <div className="flex flex-col gap-10 sm:gap-14">
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
                  className={`education-timeline__item relative group cursor-default p-4 sm:p-6 rounded-2xl transition-all duration-300 ${
                    idx % 2 ? 'education-timeline__item--reverse' : ''
                  } ${
                    isHovered ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className={`education-timeline__node ${isHovered ? 'education-timeline__node--active' : ''}`}>
                    <span
                      className={`education-timeline__dot transition-all duration-300 ${
                      isHovered
                        ? 'bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]'
                        : 'bg-slate-500 group-hover:bg-white'
                      }`}
                    />
                  </div>

                  <div className="education-timeline__card max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400 mb-4 tracking-wider">
                      {item.logo && (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-300/20 bg-white p-2 shadow-[0_0_20px_rgba(103,232,249,0.12)]">
                          <img src={item.logo} alt={`${item.institution || 'Institution'} logo`} className="h-full w-full object-contain" loading="lazy" />
                        </div>
                      )}
                      {item.year && (
                        <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-slate-300">
                          {item.year}
                        </span>
                      )}
                      {item.year && item.institution && <span className="text-slate-600">•</span>}
                      {item.institution && (
                        <span className="text-slate-300 font-medium group-hover:text-cyan-300 transition-colors">
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
                        className="mt-4 pt-4 border-t border-white/[0.06] text-sm sm:text-base text-slate-400 group-hover:text-slate-300 leading-relaxed max-w-3xl text-left font-light whitespace-pre-line transition-colors duration-300"
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

        <div className="education-launchpad">
          <div className="education-launchpad__signal" aria-hidden="true" />
          <motion.button
            type="button"
            onClick={launchRocket}
            disabled={launched}
            className="education-launch-button interactive-hit"
            whileHover={launched ? undefined : { y: -3, scale: 1.03 }}
            whileTap={launched ? undefined : { scale: .97 }}
            aria-label="Launch to the hero section"
          >
            <Rocket size={17} />
            <span>{launched ? 'LIFTING OFF' : 'RETURN TO ORIGIN'}</span>
          </motion.button>
          <span className="education-launchpad__caption">NAVIGATE TO ORIGIN // HERO</span>
        </div>

        {launched && !reducedMotion && (
          <div className="rocket-flight" aria-hidden="true">
            <motion.div
              className="rocket-flight__vehicle"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{ x: [0, -72, 58, 0, 0], y: [0, '-20vh', '-48vh', '-78vh', '-125vh'], rotate: [0, -8, 8, 0, 0], opacity: [1, 1, 1, 1, 0] }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1], times: [0, .18, .46, .72, 1] }}
              onAnimationComplete={() => setLaunched(false)}
            >
              <span className="rocket-flight__flame" />
              <Rocket size={48} strokeWidth={1.35} />
            </motion.div>
            {[0, 1, 2].map((cloudIdx) => (
              <motion.div
                key={cloudIdx}
                className={`rocket-flight__cloud rocket-flight__cloud--${cloudIdx + 1}`}
                initial={{ opacity: 0, scale: .5, y: 40 }}
                animate={{ opacity: [0, .8, 0], scale: [0.5, 1.1, 1.45], y: [40, 0, -40], x: cloudIdx % 2 ? 70 : -70 }}
                transition={{ duration: 2.2, delay: .42 + cloudIdx * .18, ease: 'easeOut' }}
              >
                <Cloud size={58 + cloudIdx * 14} strokeWidth={1.2} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

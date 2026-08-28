import React from 'react';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import Reveal from './Reveal';
import { fadeUp } from '../animations/variants';

export default function Experience({ data }) {
  if (!data || data.visible === false || !data.items?.length) return null;

  return (
    <section id="experience" className="relative py-24 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
              <FiBriefcase size={13} />
              <span>CAREER PATH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="gradient-text">Work Experience</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6">
          {data.items.map((item, i) => (
            <Reveal key={item._id || i} custom={i} variants={fadeUp}>
              <div className="glass-card rounded-2xl p-6 sm:p-8 hover:border-cyan-400/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {item.logo && (
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                      <img src={item.logo} alt={item.company || 'Logo'} className="w-full h-full object-contain rounded-lg" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                            #{String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-display text-xl font-bold text-white tracking-tight">{item.role}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#22d3ee] shadow-glow-cyan animate-pulse" />
                          <span style={{ color: '#22d3ee' }} className="font-bold text-base md:text-lg text-cyan-300">
                            {item.company}
                          </span>
                        </div>
                      </div>
                      {item.duration && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono">
                          <FiCalendar size={12} className="text-cyan-400" />
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p
                        style={{ color: '#67e8f9' }}
                        className="text-sm md:text-base mt-4 leading-relaxed whitespace-pre-line border-t border-cyan-500/30 pt-4 font-normal"
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

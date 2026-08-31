import React from 'react';
import { FiBookOpen, FiCalendar } from 'react-icons/fi';
import Reveal from './Reveal';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp } from '../animations/variants';

export default function Education({ data }) {
  if (!data || data.visible === false || !data.items?.length) return null;

  return (
    <section id="education" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
              <FiBookOpen size={13} />
              <span>ACADEMIC BACKGROUND</span>
            </div>
            <AnimatedHeading
              text="Education"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              wordClassName="gradient-text"
            />
          </div>
        </Reveal>

        <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-8 space-y-10">
          {data.items.map((item, i) => (
            <Reveal key={item._id || i} custom={i} variants={fadeUp} className="relative pl-7 md:pl-9">
              {/* Glowing timeline node with number badge */}
              <span className="absolute -left-[14px] top-1 w-7 h-7 rounded-full bg-base border-2 border-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-300 shadow-glow-cyan">
                {String(i + 1).padStart(2, '0')}
              </span>
              
              <div className="glass-card rounded-2xl p-6 sm:p-7 hover:border-cyan-400/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {item.logo && (
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                      <img src={item.logo} alt={item.institution || 'Logo'} className="w-full h-full object-contain rounded-lg" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                          #{String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white tracking-tight">{item.degree}</h3>
                      </div>
                      {item.year && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono">
                          <FiCalendar size={12} className="text-cyan-400" />
                          {item.year}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22d3ee] shadow-glow-cyan animate-pulse" />
                      <span style={{ color: '#22d3ee' }} className="font-bold text-base md:text-lg text-cyan-300">
                        {item.institution || item.school || 'School / University'}
                      </span>
                    </div>

                    {item.description && (
                      <p
                        style={{ color: '#67e8f9' }}
                        className="text-sm md:text-base leading-relaxed whitespace-pre-line border-t border-cyan-500/30 pt-3 font-normal text-justify"
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

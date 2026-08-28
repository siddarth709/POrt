import React from 'react';
import { FiCalendar, FiMapPin, FiCompass } from 'react-icons/fi';
import Reveal from './Reveal';
import { slideInLeft, slideInRight } from '../animations/variants';

export default function Chronicles({ data }) {
  if (!data || data.visible === false || !data.items?.length) return null;

  return (
    <section id="chronicles" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
              <FiCompass size={13} />
              <span>EVENTS, TALKS & HACKATHONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="gradient-text">Chronicles</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Central Glowing Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent2 to-transparent hidden md:block opacity-40" />

          <div className="flex flex-col gap-16 md:gap-24">
            {data.items.map((c, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={c._id || i} className="relative grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                  {/* Photo / Visual Card */}
                  <Reveal
                    variants={isEven ? slideInLeft : slideInRight}
                    className={isEven ? 'md:order-1' : 'md:order-2'}
                  >
                    {c.image ? (
                      <div className="glass-card rounded-2xl overflow-hidden p-2 group border border-white/10 hover:border-accent/40 shadow-xl">
                        <div className="rounded-xl overflow-hidden max-h-72">
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl h-48 glass flex items-center justify-center border border-white/10 text-slate-500">
                        <FiCompass size={36} className="opacity-40" />
                      </div>
                    )}
                  </Reveal>

                  {/* Story Card */}
                  <Reveal
                    variants={isEven ? slideInRight : slideInLeft}
                    className={isEven ? 'md:order-2 md:pl-6' : 'md:order-1 md:pr-6 text-left md:text-right'}
                  >
                    <div className={`flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
                      {c.date && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-cyan-300">
                          <FiCalendar size={12} /> {c.date}
                        </span>
                      )}
                      {c.location && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                          <FiMapPin size={12} className="text-accent2" /> {c.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-3">
                      {c.title}
                    </h3>

                    <p className="text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line opacity-95">
                      {c.description}
                    </p>
                  </Reveal>

                  {/* Glowing Node on Center Line */}
                  <span className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-base border-2 border-accent items-center justify-center shadow-glow-sm">
                    <span className="w-2 h-2 rounded-full bg-accent2" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

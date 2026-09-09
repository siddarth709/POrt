import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { formatExternalUrl } from '../utils/url';

export default function About({ data = {} }) {
  const visualRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 90, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 25 });

  const handleMouseMove = (e) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    mouseX.set(x * 16);
    mouseY.set(y * 16);
  };

  // Nothing hardcoded: If about has no content from dashboard, don't show empty skeleton
  if (!data || (!data.heading && !data.bio && !data.image)) {
    return null;
  }

  const hasImage = Boolean(data.image);

  return (
    <section id="about" className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-400 uppercase"
          >
            ABOUT
          </motion.h2>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {data.heading && (
              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight mb-10 hover:text-slate-100 transition-colors"
              >
                {data.heading}
              </motion.h3>
            )}

            {data.bio && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-2xl border border-white/[0.1] p-6 sm:p-8 text-slate-300 text-base sm:text-lg leading-relaxed space-y-4 text-left font-light whitespace-pre-line hover:border-cyan-300/30 transition-colors duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
              >
                {data.bio}
              </motion.div>
            )}

            {/* Resume Link if entered in dashboard */}
            {data.resumeUrl && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-10"
              >
                <motion.a
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  href={formatExternalUrl(data.resumeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/40 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono tracking-wider text-slate-300 hover:text-white transition-all shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <FileText size={14} className="text-emerald-400" />
                  <span>CURRICULUM VITAE / RESUME</span>
                  <ArrowUpRight size={14} className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-400 group-hover:text-white" />
                </motion.a>
              </motion.div>
            )}
          </div>

          {/* Visual Column */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-5 flex items-center justify-center relative group"
          >
            {hasImage ? (
              <motion.div
                style={{ x: springX, y: springY }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/[0.1] group-hover:border-white/[0.25] p-3 shadow-2xl relative transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/[0.06]">
                  <img
                    src={data.image}
                    alt={data.heading || 'About'}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                style={{ x: springX, y: springY }}
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-md aspect-square rounded-2xl glass-panel p-8 relative flex flex-col justify-between overflow-hidden group border border-white/[0.08] hover:border-white/20 transition-all duration-300"
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-20 stroke-white group-hover:opacity-30 transition-opacity duration-500"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  <circle cx="200" cy="200" r="140" strokeWidth="0.5" strokeDasharray="3 4" />
                  <circle cx="200" cy="200" r="90" strokeWidth="0.75" />
                  <circle cx="200" cy="200" r="40" strokeWidth="0.5" />
                  <line x1="200" y1="20" x2="200" y2="380" strokeWidth="0.5" strokeDasharray="2 3" />
                  <line x1="20" y1="200" x2="380" y2="200" strokeWidth="0.5" strokeDasharray="2 3" />
                </svg>

                <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-slate-400 border-b border-white/[0.06] pb-3">
                  <span className="tracking-widest uppercase">ABOUT</span>
                  <span className="text-emerald-400 animate-pulse">ACTIVE</span>
                </div>

                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
                  <div className="w-24 h-24 rounded-full border border-white/15 group-hover:border-cyan-400/40 flex items-center justify-center font-display text-2xl font-bold tracking-tighter text-white/90 bg-white/[0.02] group-hover:bg-white/[0.05] transition-all duration-300 shadow-inner">
                    NS
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
                className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight mb-10"
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
                className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4 text-justify-editorial font-light whitespace-pre-line"
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
                <a
                  href={formatExternalUrl(data.resumeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-300 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors"
                >
                  <FileText size={14} />
                  <span>CURRICULUM VITAE / RESUME</span>
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            )}
          </div>

          {/* Visual Column */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            {hasImage ? (
              <motion.div
                style={{ x: springX, y: springY }}
                className="w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/[0.1] p-3 shadow-2xl relative"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/[0.06]">
                  <img
                    src={data.image}
                    alt={data.heading || 'About'}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-60" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                style={{ x: springX, y: springY }}
                className="w-full max-w-md aspect-square rounded-2xl glass-panel p-8 relative flex flex-col justify-between overflow-hidden group border border-white/[0.08]"
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-20 stroke-white"
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
                  <span className="text-emerald-400">ACTIVE</span>
                </div>

                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
                  <div className="w-24 h-24 rounded-full border border-white/15 flex items-center justify-center font-display text-2xl font-bold tracking-tighter text-white/90 bg-white/[0.02]">
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

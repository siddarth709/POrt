import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiCheckCircle } from 'react-icons/fi';
import Reveal from './Reveal';
import AnimatedHeading from './AnimatedHeading';
import { slideInLeft, slideInRight } from '../animations/variants';

const floatVariant = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const floatVariantSlow = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 5, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const ringPulse = {
  animate: {
    scale: [1, 1.12, 1],
    opacity: [0.25, 0.08, 0.25],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

const ringPulse2 = {
  animate: {
    scale: [1, 1.18, 1],
    opacity: [0.15, 0.04, 0.15],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
  },
};



export default function About({ data = {} }) {
  if (!data || (!data.bio && !data.image)) return null;

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/6 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* ── Left Column: Image ── */}
          <div className="md:col-span-5 flex">
            <Reveal variants={slideInLeft} className="relative group w-full">
              {/* Pulsing outer rings */}
              <motion.div
                variants={ringPulse}
                animate="animate"
                className="absolute inset-[-18px] rounded-3xl border border-emerald-400/30 pointer-events-none"
              />
              <motion.div
                variants={ringPulse2}
                animate="animate"
                className="absolute inset-[-36px] rounded-3xl border border-cyan-400/20 pointer-events-none"
              />

              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-lg pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg pointer-events-none" />



              {/* Ambient gradient bloom behind image */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-transparent to-cyan-500/15 opacity-0 group-hover:opacity-100 blur-xl transition duration-700 pointer-events-none" />

              {/* Image container — stretches full height to match right column */}
              {data.image ? (
                <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-surface/40 shadow-2xl">
                  <img
                    src={data.image}
                    alt="About"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  {/* Subtle bottom fade to blend white-bg photos */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070b]/70 via-transparent to-transparent" />
                  {/* Subtle top glow edge */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                </div>
              ) : (
                <div className="rounded-2xl w-full h-full min-h-[320px] glass flex items-center justify-center border border-white/10 text-slate-500">
                  <FiFileText size={48} className="opacity-40" />
                </div>
              )}

              {/* Floating bottom label */}
              <motion.div
                variants={floatVariantSlow}
                animate="animate"
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5
                  px-3 py-1.5 rounded-full bg-black/70 backdrop-blur border border-white/10
                  text-[10px] font-mono text-slate-400 shadow-lg whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </motion.div>
            </Reveal>
          </div>

          {/* ── Right Column: Bio ── */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <Reveal variants={slideInRight}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-4">
                <FiCheckCircle size={13} />
                <span>ABOUT ME</span>
              </div>

              <AnimatedHeading
                text={data.heading || 'Crafting Digital Experiences'}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
                wordClassName="text-white"
              />

              {/* Animated divider line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="origin-left h-px bg-gradient-to-r from-emerald-500/60 via-cyan-400/40 to-transparent mb-6"
              />

              <div className="text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4 font-normal">
                {data.bio || 'Passionate engineer dedicated to creating high-performance software with clean design.'}
              </div>

              {/* Animated stat chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: 'ML / AI Systems', dot: 'bg-emerald-400' },
                  { label: 'Time-Series Modeling', dot: 'bg-cyan-400' },
                  { label: 'High-Perf Engineering', dot: 'bg-teal-400' },
                ].map((tag, i) => (
                  <motion.span
                    key={tag.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-400"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
                    {tag.label}
                  </motion.span>
                ))}
              </div>

              {data.resumeUrl && (
                <div className="mt-8 flex items-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent2 text-black font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all"
                  >
                    <FiDownload size={16} /> View / Download Resume
                  </motion.a>
                </div>
              )}
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Orbit } from 'lucide-react';
import { formatExternalUrl } from '../utils/url';

// Tactical Magnetic Button component for hero CTAs
function MagneticButton({ children, as: Component = motion.button, onClick, className = '', ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.28);
    y.set((e.clientY - centerY) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Component
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function Hero({ data = {} }) {
  const containerRef = useRef(null);

  // Scroll driven subtle fade and scale
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.98]);
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, 50]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const hasImage = Boolean(data.image);
  const linkedin = (data.socials || []).find((social) => social.platform?.toLowerCase().includes('linkedin'));
  const linkedinUrl = formatExternalUrl(linkedin?.url || 'https://www.linkedin.com');
  const nameText = (data.name || "N S SIDDARTH").toUpperCase();
  const taglineText = data.tagline || "Building intelligent systems with code, models, and ideas. AI/ML engineer exploring complex computational systems.";

  const techBadges = [
    'PyTorch',
    'C++',
    'Distributed Systems',
    'Stochastic Modeling',
    'CUDA',
    'Neural Architectures',
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="hero relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-5 sm:px-8 overflow-hidden bg-[#090a0f]"
    >
      {/* Clean Hero Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Single clean sweep: deep indigo to transparent, top-center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_-5%,_rgba(79,70,229,0.45)_0%,_rgba(67,56,202,0.15)_40%,_transparent_70%)]" />
        {/* Subtle warm amber behind the portrait - not oversaturated */}
        <div className="absolute top-[25%] left-[45%] -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.12)_0%,_transparent_65%)] blur-3xl" />
        {/* Faint horizontal light streak across middle */}
        <div className="absolute top-[38%] inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        {/* Bottom fade to base */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent z-[5]" />
      </div>

      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroTranslateY,
        }}
        className="hero-stage max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between"
      >
        {/* TOP: Centered Giant Name - Solid White */}
        <div className="hero-header-center w-full text-center select-none pt-2 sm:pt-4 z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-dribbble-title font-display font-black uppercase tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-slate-900 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            {nameText}
          </motion.h1>
        </div>

        {/* MIDDLE: Two-column — left info | portrait — no overlap */}
        <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-end mt-2 sm:mt-4">

          {/* ── LEFT COLUMN: narrow so it never reaches the centered portrait ── */}
          <div className="relative z-30 w-[30%] max-w-[280px] flex-shrink-0 pb-8 sm:pb-12 pr-2 flex flex-col gap-0 items-start">

            {/* 1. Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.07] backdrop-blur-md mb-4 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-mono text-[11px] tracking-wider text-emerald-300 uppercase">
                Open to collaborations
              </span>
            </motion.div>

            {/* 2. Role line */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-indigo-300 mb-3"
            >
              Machine Learning Engineer
            </motion.p>

            {/* 3. Bio text */}
            {taglineText && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13px] sm:text-sm text-white/90 font-normal leading-relaxed mb-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.95)]"
              >
                {taglineText}
              </motion.p>
            )}

            {/* 4. GET IN TOUCH */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="interactive-hit group px-5 py-2.5 rounded-full bg-white text-[#090a0f] font-mono text-[11px] sm:text-xs font-semibold tracking-wider flex items-center gap-2 hover:bg-slate-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>

              {/* 5. LinkedIn */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagneticButton
                  as={motion.a}
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-hit group px-5 py-2.5 rounded-full border border-white/[0.18] hover:border-indigo-400/60 bg-white/[0.04] hover:bg-indigo-500/[0.1] backdrop-blur-md text-slate-200 hover:text-white font-mono text-[11px] sm:text-xs font-medium tracking-wider flex items-center gap-2 transition-all"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight size={13} className="text-slate-400 transition-all duration-300 group-hover:text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* ── PORTRAIT: absolute center of the full row ── */}
          {hasImage && (
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 z-20 flex justify-center items-end">
              <motion.img
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                src={data.image}
                alt={data.name || 'Hero'}
                className="hero-grounded-portrait w-auto max-h-[60vh] sm:max-h-[70vh] lg:max-h-[78vh] object-contain object-bottom"
              />
            </div>
          )}
        </div>

        {/* BOTTOM: Minimal Tech Strip (Matches reference layout) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-bottom-bar relative z-30 w-full pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-400"
        >
          <div className="flex items-center gap-2 text-slate-300 uppercase tracking-widest text-[10px]">
            <Orbit size={13} className="text-amber-400" />
            <span>CORE SYSTEMS</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.025] text-slate-300 hover:text-white hover:border-white/25 transition-colors text-[10px] sm:text-[11px]"
              >
                {badge}
              </span>
            ))}
          </div>

          <button
            onClick={() => scrollTo('about')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={12} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

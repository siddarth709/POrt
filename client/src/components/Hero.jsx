import React, { useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, ArrowUpRight, Cpu, Code2, Orbit } from 'lucide-react';
import AeroShards from './AeroShards';
import AnimatedHeading from './AnimatedHeading';
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
  const textLayerRef = useRef(null);
  const portraitLayerRef = useRef(null);

  // Scroll driven subtle fade and scale
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 480], [1, 0.97]);
  const heroTranslateY = useTransform(scrollY, [0, 480], [0, 60]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let handleParallax;
    const ctx = gsap.context(() => {
      const moveText = gsap.quickTo(textLayerRef.current, 'x', { duration: 0.55, ease: 'power3.out' });
      const movePortrait = gsap.quickTo(portraitLayerRef.current, 'x', { duration: 0.7, ease: 'power3.out' });
      handleParallax = (event) => {
        const center = window.innerWidth / 2;
        moveText((event.clientX - center) * -0.018);
        movePortrait((event.clientX - center) * 0.035);
      };
    }, container);
    container.addEventListener('mousemove', handleParallax, { passive: true });
    return () => {
      container.removeEventListener('mousemove', handleParallax);
      ctx.revert();
    };
  }, []);

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
  const nameText = data.name || "NS SIDDARTH";
  const taglineText = data.tagline || "Building intelligent systems with code, models, and ideas. AI/ML engineer exploring complex computational systems.";

  return (
    <section
      id="home"
      ref={containerRef}
      className="hero relative min-h-[94vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-5 sm:px-8 overflow-hidden"
    >
      <div className="hero-ambient absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <AeroShards
          backgroundColor="#120F17"
          shardColor="#896ABD"
          accentColor="#A855F7"
          placement="full"
          flow="stream"
          material="pearl"
          detail="balanced"
          effect="none"
          scale={1}
          spread={1}
          depth={1}
          speed={1}
          spin={1}
          interaction="repel"
          density={1.5}
          shardSize={1.1}
          stretch={1}
          turbulence={1}
          glow={1}
          edgeSoftness={2}
          bloom={0.5}
          grain={0.05}
          chromaticAberration={0.0075}
          transitionDuration={1}
          interactionRadius={1.5}
          interactionStrength={0.5}
          rippleIntensity={1}
          holdToGather={true}
        />
      </div>
      <div
        className="hero-vignette pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#120F17]/95 via-[#120F17]/78 to-[#120F17]/12"
        aria-hidden="true"
      />
      <div
        className="hero-vignette-bottom pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-[#120F17]/72 to-transparent"
        aria-hidden="true"
      />
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroTranslateY,
        }}
        className="hero-stage max-w-7xl mx-auto w-full relative"
      >
        <div className={hasImage ? "grid lg:grid-cols-12 gap-12 lg:gap-16 items-center" : "max-w-6xl text-left"}>
          
          {/* Left Column: Big Name & Beautiful Tag Below */}
          <div className={`hero-content ${hasImage ? "lg:col-span-7 flex flex-col items-start text-left" : "flex flex-col items-start text-left"}`}>
            
            {/* Status indicator */}
            <motion.div
              initial={false}
              whileHover={{ scale: 1.02, y: -1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-white/[0.1] hover:border-cyan-300/40 bg-white/[0.035] hover:bg-cyan-300/[0.07] backdrop-blur-md mb-7 transition-all cursor-default shadow-sm hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] tracking-wider text-slate-100 uppercase">
                Open to collaborations
              </span>
            </motion.div>

            {/* BIG NAME (Headline) */}
            <motion.div
              ref={textLayerRef}
              className="hero-name-layer relative z-10 font-display font-extrabold tracking-tight text-white leading-[1.02] sm:leading-[1] mb-6 select-none group"
            >
              <AnimatedHeading
                as="h1"
                text={nameText}
                animateOnView={false}
                className={hasImage ? "text-5xl sm:text-6xl md:text-7xl lg:text-[5.7rem]" : "text-5xl sm:text-7xl md:text-8xl lg:text-[6.6rem]"}
                wordClassName="editorial-gradient transition-all duration-500 group-hover:brightness-125"
              />
            </motion.div>

            {/* ELEGANT TAGLINE ALIGNED BELOW IN REFINED SMALLER FONT */}
            {taglineText && (
              <motion.div
                initial={false}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-30 max-w-2xl mb-9 group"
              >
                <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed text-left whitespace-pre-line border-l-2 border-cyan-300/60 group-hover:border-cyan-300 pl-4 py-0.5 transition-colors duration-300 [text-shadow:0_2px_18px_rgba(18,15,23,0.9)]">
                  {taglineText}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={false}
              className="relative z-30 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <MagneticButton
                as={motion.a}
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="interactive-hit group px-6 py-3.5 rounded-full bg-white text-[#050508] font-mono text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 hover:bg-cyan-50 hover:shadow-[0_0_28px_rgba(255,255,255,0.22)] transition-all"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="interactive-hit group px-6 py-3.5 rounded-full border border-white/[0.15] hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md text-slate-200 hover:text-white font-mono text-xs sm:text-sm font-medium tracking-wider flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight
                  size={16}
                  className="text-slate-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                />
              </MagneticButton>
            </motion.div>
            <motion.div
              initial={false}
              className="hero-meta relative z-30 mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 [text-shadow:0_2px_14px_rgba(18,15,23,0.95)]"
            >
              <span className="flex items-center gap-2"><Orbit size={13} className="text-cyan-300" /> AI systems</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>Research × product</span>
              <button onClick={() => scrollTo('about')} className="ml-1 flex items-center gap-2 text-slate-200 transition-colors hover:text-white">Scroll to explore <ArrowDown size={13} /></button>
            </motion.div>
          </div>

          {/* Right Column: Hero Image Frame from Dashboard */}
          {hasImage && (
            <motion.div
              initial={false}
              ref={portraitLayerRef}
              className="hero-portrait-layer relative z-20 lg:col-span-5 flex justify-center group"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="image-surface hero-portrait relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden glass-panel border border-white/[0.1] group-hover:border-white/[0.25] p-3 shadow-2xl transition-colors duration-500"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/[0.06]">
                  <img
                    src={data.image}
                    alt={data.name || 'Hero'}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-50" />

                  {/* Badges */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="hero-image-tag hero-image-tag--ai absolute top-4 right-4 px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-cyan-400/40 font-mono text-[10px] text-slate-300 flex items-center gap-1.5 shadow-md cursor-default transition-all"
                  >
                    <Cpu size={12} className="text-cyan-400 animate-pulse" />
                    <span>AI / ML</span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="hero-image-tag hero-image-tag--systems absolute bottom-4 left-4 px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-emerald-400/40 font-mono text-[10px] text-slate-300 flex items-center gap-1.5 shadow-md cursor-default transition-all"
                  >
                    <Code2 size={12} className="text-emerald-400 animate-pulse" />
                    <span>SYSTEMS</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </section>
  );
}

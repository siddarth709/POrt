import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Cpu, Code2 } from 'lucide-react';

// Tactical Magnetic Button component for hero CTAs
function MagneticButton({ children, onClick, className = '', ...props }) {
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
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default function Hero({ data = {} }) {
  const containerRef = useRef(null);

  // Scroll driven subtle fade and scale
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 480], [1, 0.97]);
  const heroTranslateY = useTransform(scrollY, [0, 480], [0, 60]);

  // Subtle mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const parallaxY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX - innerWidth / 2) / innerWidth * 16);
    mouseY.set((e.clientY - innerHeight / 2) / innerHeight * 16);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const hasImage = Boolean(data.image);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-6 sm:px-10 overflow-hidden"
    >
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroTranslateY,
        }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <div className={hasImage ? "grid lg:grid-cols-12 gap-12 lg:gap-16 items-center" : "max-w-5xl text-left"}>
          
          {/* Left Column: Name & Dynamic Tagline from Dashboard */}
          <div className={hasImage ? "lg:col-span-7 flex flex-col items-start text-left" : "flex flex-col items-start text-left"}>
            
            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] tracking-wider text-slate-300 uppercase">
                Currently Available
              </span>
            </motion.div>

            {/* Name from Dashboard */}
            {data.name && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4"
              >
                <h2 className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-400 uppercase font-medium">
                  {data.name}
                </h2>
              </motion.div>
            )}

            {/* Tagline Headline from Dashboard */}
            {data.tagline && (
              <motion.div
                style={{ x: parallaxX, y: parallaxY }}
                className={`font-display font-bold tracking-tight text-white leading-[1.08] sm:leading-[1.05] mb-8 ${
                  hasImage ? "text-3xl sm:text-5xl lg:text-6xl" : "text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem]"
                }`}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="whitespace-pre-line"
                >
                  {data.tagline}
                </motion.h1>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="group px-7 py-3.5 rounded-full bg-white text-[#050508] font-mono text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-lg"
              >
                <span>VIEW MY WORK</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="group px-7 py-3.5 rounded-full border border-white/[0.15] bg-white/[0.03] backdrop-blur-md text-slate-200 font-mono text-xs sm:text-sm font-medium tracking-wider flex items-center gap-2 hover:border-white/[0.3] hover:text-white transition-all"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight
                  size={16}
                  className="text-slate-400 transition-all duration-250 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Hero Image Frame from Dashboard */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/[0.1] p-3 shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/[0.06]">
                  <img
                    src={data.image}
                    alt={data.name || 'Hero'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-50" />
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </section>
  );
}

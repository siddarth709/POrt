import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiSend, FiBriefcase, FiDownload, FiUser, FiCode, FiCpu } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa6';

export default function Hero({ data = {} }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  const getSocialIcon = (platform = '') => {
    const p = platform.toLowerCase();
    if (p.includes('git')) return <FaGithub size={18} />;
    if (p.includes('link')) return <FaLinkedin size={18} />;
    if (p.includes('twit') || p.includes('x')) return <FaTwitter size={18} />;
    if (p.includes('insta')) return <FaInstagram size={18} />;
    return <FaGlobe size={18} />;
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const yPos = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPos, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-grid-pattern">
      {/* Animated ambient glow spheres */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-accent/20 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-accent2/20 rounded-full blur-[150px] pointer-events-none -z-10"
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Text, Tagline & Buttons */}
          <div className="lg:col-span-7 text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-lg shadow-black/20 mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300 tracking-wide uppercase font-mono">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.08]"
            >
              <span className="text-white">Hi, I'm </span>
              <br className="hidden sm:inline" />
              <span className="gradient-text">{data.name || 'N S Siddarth'}</span>
            </motion.h1>

            {/* Tagline / Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 font-normal leading-relaxed mb-8 max-w-xl"
            >
              {data.tagline || 'AIML Undergrad & Full-Stack Developer crafting intelligent, high-impact web applications.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-accent to-accent2 text-black font-semibold text-sm shadow-glow-md hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
              >
                <FiBriefcase size={16} /> Explore Projects
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <FiSend size={16} /> Contact Me
              </button>
            </motion.div>

            {/* Social Icons */}
            {data.socials?.filter(s => {
              const p = (s.platform || '').toLowerCase();
              return !p.includes('twit') && !p.includes('x') && !p.includes('git');
            }).length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-mono text-slate-400 mr-1 uppercase">Connect:</span>
                {data.socials
                  .filter(s => {
                    const p = (s.platform || '').toLowerCase();
                    return !p.includes('twit') && !p.includes('x') && !p.includes('git');
                  })
                  .map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-accent/50 hover:bg-accent/10 hover:scale-110 transition-all duration-300 shadow-sm"
                      title={s.platform}
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                  ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: Interactive Animated Image Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] group"
            >
              {/* Outer Glowing Neon Halo that pulses and expands on hover */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent via-accent2 to-accent3 opacity-40 blur-2xl group-hover:opacity-75 group-hover:blur-3xl transition-all duration-700 -z-10 animate-pulse-slow" />

              {/* Animated Floating Geometric Cyber Card Frame */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-3xl p-3 glass-card border border-white/20 shadow-2xl overflow-hidden backdrop-blur-xl"
              >
                {/* Decorative Cyber Corner Accents */}
                <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20" />
                <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20" />
                <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500 z-20" />
                <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-500 z-20" />

                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-surface/90 border border-white/10 flex items-center justify-center">
                  {data.image ? (
                    <>
                      <img
                        src={data.image}
                        alt={data.name || 'Profile'}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      {/* Subtle Glass Gradient Overlay & Shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </>
                  ) : (
                    <div className="text-center p-6 flex flex-col items-center justify-center gap-3">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent/20 to-accent2/20 border border-white/10 flex items-center justify-center text-accent2 shadow-glow-sm">
                        <FiUser size={42} className="opacity-80" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Photo Frame</h4>
                        <p className="text-slate-400 text-xs mt-1">Upload your photo anytime via the CMS Dashboard</p>
                      </div>
                    </div>
                  )}

                  {/* Floating Interactive Badges on the Frame */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                    className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full glass border border-white/15 text-[11px] font-mono font-medium text-white flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform backdrop-blur-md"
                  >
                    <FiCpu className="text-cyan-400" size={13} />
                    <span>AI / ML</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.8 }}
                    className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full glass border border-white/15 text-[11px] font-mono font-medium text-white flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform backdrop-blur-md"
                  >
                    <FiCode className="text-purple-400" size={13} />
                    <span>Developer</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <FiArrowDown size={20} />
      </motion.button>
    </section>
  );
}

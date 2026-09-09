import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'experience', label: 'WORK EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'chronicles', label: 'CHRONICLES' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({ visibility = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const scrollPos = window.scrollY + 220;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const item = NAV_LINKS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = NAV_LINKS.filter((l) => visibility[l.id] !== false);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const yPos = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPos, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Ultra-thin Scroll Progress Indicator at very top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 origin-left z-[100] pointer-events-none"
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'py-3.5 bg-[#050508]/85 backdrop-blur-md border-b border-white/[0.06]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand / Logo */}
          <motion.button
            onClick={() => scrollTo('home')}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 group text-left"
          >
            <span className="font-display font-bold text-sm sm:text-base tracking-widest uppercase text-white/95 group-hover:text-white transition-colors">
              NS SIDDARTH
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative font-mono text-[11px] tracking-widest transition-all duration-250 py-1 ${
                    isActive ? 'text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-400 to-cyan-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Discreet CMS Login & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/login"
              title="Dashboard CMS"
              className="text-slate-600 hover:text-slate-400 transition-colors p-1"
              aria-label="CMS Login"
            >
              <Lock size={12} className="opacity-40 hover:opacity-100 transition-opacity" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-b border-white/[0.08] bg-[#07080f]/95 backdrop-blur-xl overflow-hidden px-6 py-6"
            >
              <div className="flex flex-col gap-3">
                {links.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => scrollTo(link.id)}
                      className={`text-left font-mono text-xs tracking-widest py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-white bg-white/[0.06] font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <ArrowUpRight size={14} className="text-emerald-400" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

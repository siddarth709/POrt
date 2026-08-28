import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'chronicles', label: 'Chronicles' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ visibility = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = LINKS.filter((l) => visibility[l.id] !== false);

  const scrollTo = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl shadow-black/40 border border-white/10">
          <button 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-accent2 flex items-center justify-center text-white text-xs font-mono font-bold shadow-md shadow-accent/30 group-hover:scale-105 transition-transform">
              NS
            </span>
            <span className="gradient-text font-semibold">N S Siddarth</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 relative ${
                    isActive 
                      ? 'text-white bg-white/10 shadow-sm' 
                      : 'text-muted hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-accent2/20 border border-accent/40 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dashboard Direct Login Link */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/login"
              className="flex items-center gap-1.5 text-xs font-medium text-muted px-3 py-1.5 rounded-full opacity-0 pointer-events-none select-none"
              title="Owner Dashboard Login"
              tabIndex={-1}
              aria-hidden="true"
            >
              <FiLock size={13} />
              <span className="hidden sm:inline">CMS</span>
            </Link>

            <button 
              className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none" 
              onClick={() => setOpen(!open)}
              aria-label="Toggle Navigation"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-6xl mx-auto px-6 mt-2"
          >
            <div className="glass rounded-2xl p-5 flex flex-col gap-2 border border-white/10 shadow-2xl">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === l.id
                      ? 'bg-accent/20 text-white font-semibold'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center">
                <Link
                  to="/dashboard/login"
                  className="flex items-center gap-2 text-xs text-accent2 py-1"
                >
                  <FiLock size={13} /> Owner Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

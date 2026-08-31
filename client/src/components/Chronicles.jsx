import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiMapPin,
  FiCompass,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
  FiX,
  FiMaximize2,
  FiAward,
} from 'react-icons/fi';
import Reveal from './Reveal';
import AnimatedHeading from './AnimatedHeading';
import { modalVariant } from '../animations/variants';

export default function Chronicles({ data }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedChronicle, setSelectedChronicle] = useState(null);

  const items = data?.items || [];

  const updateScrollMetrics = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    setCanScrollPrev(currentScroll > 12);
    setCanScrollNext(currentScroll < maxScroll - 12);

    if (maxScroll > 0) {
      setScrollProgress((currentScroll / maxScroll) * 100);
    }

    const cards = Array.from(el.querySelectorAll('[data-chronicle-card]'));
    if (!cards.length) return;

    const center = currentScroll + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollMetrics();
    el.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics);

    // Mouse wheel horizontal translation handler
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Translate vertical wheel to smooth horizontal scroll when over the track
        if (el.scrollWidth > el.clientWidth) {
          const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
          const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth && e.deltaY > 0;
          if (!atStart && !atEnd) {
            e.preventDefault();
            el.scrollLeft += e.deltaY * 0.85;
          }
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
      el.removeEventListener('wheel', onWheel);
    };
  }, [updateScrollMetrics, items.length]);

  const scrollToIndex = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-chronicle-card]');
    const targetCard = cards[index];
    if (targetCard) {
      const offset = targetCard.offsetLeft - el.clientWidth / 2 + targetCard.offsetWidth / 2;
      el.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
    }
  };

  const scrollByAmount = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-chronicle-card]');
    const step = card ? card.offsetWidth + 32 : 360;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  // Pointer drag to scroll logic
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasMoved: false });

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      hasMoved: false,
    };
    el.classList.add('cursor-grabbing');
  };

  const onPointerMove = (e) => {
    if (!dragState.current.isDown) return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    if (Math.abs(walk) > 5) {
      dragState.current.hasMoved = true;
    }
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onPointerUp = () => {
    const el = trackRef.current;
    dragState.current.isDown = false;
    el?.classList.remove('cursor-grabbing');
  };

  const handleCardClick = (item) => {
    if (dragState.current.hasMoved) return;
    setSelectedChronicle(item);
  };

  // Keyboard escape listener for modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedChronicle(null);
    };
    if (selectedChronicle) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedChronicle]);

  if (!data || data.visible === false || !items.length) return null;

  return (
    <section id="chronicles" className="relative py-28 overflow-hidden bg-surface/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                <FiCompass className="animate-spin-slow" size={13} />
                <span>MILESTONES & JOURNEY</span>
              </div>
              <AnimatedHeading
                text="Chronicles"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                wordClassName="gradient-text"
              />
              <p className="text-slate-400 text-sm mt-3 max-w-lg">
                Keynotes, hackathons, and transformative events that defined my engineering journey.
              </p>
            </div>
          </Reveal>

          {/* Navigation Controls & Counter */}
          <Reveal custom={1}>
            <div className="flex items-center gap-4 self-start md:self-auto">
              <div className="font-mono text-xs text-slate-400 bg-surface/80 px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="text-cyan-400 font-bold">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-slate-600">/</span>
                <span>{String(items.length).padStart(2, '0')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollByAmount(-1)}
                  disabled={!canScrollPrev}
                  aria-label="Previous milestone"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-white/80 border border-white/10 hover:border-cyan-400/50 hover:text-white hover:shadow-glow-cyan transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scrollByAmount(1)}
                  disabled={!canScrollNext}
                  aria-label="Next milestone"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-white/80 border border-white/10 hover:border-cyan-400/50 hover:text-white hover:shadow-glow-cyan transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Interactive Top Milestone Mini-Stepper */}
        {items.length > 1 && (
          <div className="hidden lg:block mb-10 overflow-x-auto scrollbar-hide py-2">
            <div className="flex items-center gap-3 relative min-w-max pb-1">
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item._id || idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-glow-sm'
                        : 'glass border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-semibold'
                          : 'bg-white/10 text-slate-400 group-hover:bg-white/15'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="text-left">
                      <div
                        className={`text-xs font-semibold max-w-[140px] truncate transition-colors ${
                          isActive ? 'text-cyan-300' : 'text-slate-300'
                        }`}
                      >
                        {item.title}
                      </div>
                      {item.date && (
                        <div className="text-[10px] font-mono text-slate-400">{item.date}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Horizontal Timeline Track Area */}
      <div className="relative">
        {/* Visual Edge Fades for Seamless Horizontal Scroll Effect */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-6 w-20 bg-gradient-to-r from-base via-base/80 to-transparent z-10 pointer-events-none" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-6 w-20 bg-gradient-to-l from-base via-base/80 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container with Drag Support */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-14 pb-10 px-6 sm:px-16 cursor-grab select-none"
        >
          {/* Continuous Glowing Timeline Spine Running Across Nodes */}
          <div className="absolute left-6 right-6 sm:left-16 sm:right-16 top-[42px] h-[3px] bg-gradient-to-r from-cyan-500/30 via-emerald-400/50 to-accent/30 pointer-events-none rounded-full" />

          {items.map((c, i) => {
            const isActive = activeIndex === i;
            const cardNum = String(i + 1).padStart(2, '0');

            return (
              <motion.div
                key={c._id || i}
                data-chronicle-card
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ root: trackRef, once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative shrink-0 snap-center w-[300px] sm:w-[360px] md:w-[390px] flex flex-col pt-2 group"
              >
                {/* Timeline Interactive Node Marker */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                  <div
                    className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-base border-2 border-cyan-400 shadow-glow-cyan scale-110'
                        : 'bg-surface border-2 border-white/20 group-hover:border-cyan-400/60'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-cyan-300 animate-pulse' : 'bg-white/40 group-hover:bg-cyan-400'
                      }`}
                    />
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-60" />
                    )}
                  </div>
                </div>

                {/* Main Chronicle Card */}
                <div
                  onClick={() => handleCardClick(c)}
                  className={`glass-card rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col h-full cursor-pointer relative group-hover:shadow-2xl ${
                    isActive
                      ? 'border-cyan-500/40 shadow-glow-sm ring-1 ring-cyan-500/20'
                      : 'border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  {/* Top Header Badge Row */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-md">
                      #{cardNum}
                    </span>

                    {c.date && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-md">
                        <FiCalendar size={11} className="text-cyan-400" />
                        {c.date}
                      </span>
                    )}
                  </div>

                  {/* Chronicle Cover Image Container */}
                  <div className="relative mx-4 mt-3 mb-2 rounded-xl overflow-hidden h-48 bg-surface/80 border border-white/5">
                    {c.image ? (
                      <>
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-transparent" />
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg glass text-[10px] font-medium text-white/90 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md backdrop-blur-md">
                          <FiMaximize2 size={11} className="text-cyan-300" /> View
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-gradient-to-b from-surface/40 to-surface/90">
                        <FiCompass size={36} className="opacity-30 mb-2" />
                        <span className="text-xs font-mono text-slate-500">Event Chronicle</span>
                      </div>
                    )}

                    {c.location && (
                      <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg glass text-[11px] font-mono text-slate-200 border border-white/10 backdrop-blur-md">
                        <FiMapPin size={11} className="text-emerald-400" />
                        <span>{c.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-5 pt-3 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2.5">
                        {c.title}
                      </h3>

                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line line-clamp-3 font-normal opacity-90 text-justify">
                        {c.description}
                      </p>
                    </div>

                    {/* Card Action Link */}
                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium">
                        Explore story <FiArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Milestone {i + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Track Progress Indicator */}
      <div className="max-w-xs mx-auto px-6 mt-2 flex flex-col items-center gap-2">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
            style={{ width: `${Math.max(10, scrollProgress)}%` }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          />
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Drag or Scroll to Explore
        </span>
      </div>

      {/* Pop-up Modal for Chronicle Detailed View */}
      <AnimatePresence>
        {selectedChronicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={() => setSelectedChronicle(null)}
          >
            <motion.div
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/15 shadow-2xl flex flex-col md:grid md:grid-cols-12 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedChronicle(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-xl"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              {/* Story Details Left Column */}
              <div className="md:col-span-6 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[85vh] flex flex-col justify-between order-2 md:order-1 border-t md:border-t-0 md:border-r border-white/10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold">
                      <FiAward size={13} /> MILESTONE STORY
                    </span>
                    {selectedChronicle.date && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                        <FiCalendar size={12} className="text-cyan-400" /> {selectedChronicle.date}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                    {selectedChronicle.title}
                  </h3>

                  {selectedChronicle.location && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg mb-6">
                      <FiMapPin size={13} className="text-emerald-400" />
                      <span>{selectedChronicle.location}</span>
                    </div>
                  )}

                  <div className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal text-justify">
                    {selectedChronicle.description}
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Chronicle Archive
                  </span>
                  <button
                    onClick={() => setSelectedChronicle(null)}
                    className="px-4 py-2 rounded-xl glass text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Story Photo Right Column */}
              <div className="md:col-span-6 p-6 sm:p-8 bg-surface/60 flex flex-col justify-center order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl max-h-[440px] flex items-center justify-center">
                  {selectedChronicle.image ? (
                    <img
                      src={selectedChronicle.image}
                      alt={selectedChronicle.title}
                      className="w-full h-auto max-h-[420px] object-contain rounded-xl"
                    />
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-500">
                      <FiCompass size={48} className="opacity-40 mb-3" />
                      <span className="text-xs font-mono text-slate-500">Event Snapshot</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

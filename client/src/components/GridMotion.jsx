import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, X, ArrowUpRight, Terminal, ShieldCheck, Code2 } from 'lucide-react';

export default function GridMotion({ items = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedCard, setSelectedCard] = useState(null);

  // Filter items
  const filteredItems = useMemo(() => {
    const valid = items.filter((item) => item?.image);
    if (!valid.length) return [];
    if (activeCategory === 'PROJECTS') return valid.filter((i) => i._id?.includes('project') || i.title?.toLowerCase().includes('project'));
    if (activeCategory === 'CERTIFICATIONS') return valid.filter((i) => i._id?.includes('certification') || i.title?.toLowerCase().includes('certificate'));
    if (activeCategory === 'AI / ML') return valid.filter((i) => i.title?.toLowerCase().includes('model') || i.title?.toLowerCase().includes('ai') || i.title?.toLowerCase().includes('neural'));
    return valid;
  }, [items, activeCategory]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  if (!items.length) return null;

  return (
    <section id="grid-motion" className="grid-motion-shell relative min-h-screen py-14 sm:py-24 px-4 sm:px-8 bg-[#060710] overflow-hidden isolate">
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,rgba(59,130,246,0.04)_50%,transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-3 sm:mb-4"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span className="font-mono text-[11px] sm:text-xs text-indigo-300 uppercase tracking-widest">Interactive Bento Vault</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase"
            >
              System <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Artifacts</span>
            </motion.h2>
          </div>

          {/* Category Filter Pills — Touch horizontal scrollable on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap no-scrollbar"
          >
            {['ALL', 'PROJECTS', 'CERTIFICATIONS', 'AI / ML'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Bento Grid Showcase ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[230px] sm:auto-rows-[260px]">
          {filteredItems.slice(0, 9).map((item, index) => {
            // Determine bento card size pattern for desktop vs mobile
            const isLarge = index === 0;
            const isWide = index === 3 || index === 7;
            const isTall = index === 2;

            const gridClass = isLarge
              ? 'col-span-1 sm:col-span-2 sm:row-span-2 min-h-[260px]'
              : isWide
                ? 'col-span-1 sm:col-span-2 sm:row-span-1'
                : isTall
                  ? 'col-span-1 sm:row-span-2'
                  : 'col-span-1 row-span-1';

            return (
              <motion.div
                key={item._id || `${item.title}-${index}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onMouseMove={handleMouseMove}
                onClick={() => setSelectedCard(item)}
                className={`group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl overflow-hidden cursor-pointer p-4 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] ${gridClass}`}
              >
                {/* Mouse-following Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.18), transparent 40%)',
                  }}
                />

                {/* Card Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title || 'Bento artifact'}
                    className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.85] opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060710] via-[#060710]/70 to-transparent" />
                </div>

                {/* Header Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-black/70 border border-white/15 text-indigo-300 backdrop-blur-md">
                    <ShieldCheck size={11} className="text-indigo-400" />
                    {item.title ? item.title.split(' ')[0] : 'VAULT ITEM'}
                  </span>

                  <span className="p-1.5 sm:p-2 rounded-full bg-white/10 border border-white/15 text-slate-300 group-hover:text-white group-hover:bg-indigo-600/80 group-hover:border-indigo-400/60 transition-all duration-300">
                    <ArrowUpRight size={13} className="sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>

                {/* Footer Content */}
                <div className="relative z-10">
                  <h3 className={`font-bold text-white tracking-tight line-clamp-2 mb-1 group-hover:text-indigo-200 transition-colors ${isLarge ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-lg'}`}>
                    {item.title || 'System Specimen'}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Eye size={11} className="text-indigo-400 sm:w-3 sm:h-3" /> Tap to inspect
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Interactive Metric / Status Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onMouseMove={handleMouseMove}
            className="col-span-1 sm:col-span-1 group relative rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950/80 backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden min-h-[220px]"
          >
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-indigo-300 uppercase">
                <Terminal size={13} className="text-emerald-400" /> SYSTEM HEALTH
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>

            <div className="z-10 my-auto py-2">
              <div className="text-2xl sm:text-3xl font-mono font-black text-white">99.98<span className="text-emerald-400 text-xs sm:text-sm">%</span></div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1">Model Inference Precision</p>
            </div>

            <div className="z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2.5">
              <span>ACTIVE STACK</span>
              <span className="text-indigo-300">PyTorch / C++</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Live Inspection Drawer Modal ── */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/20 bg-slate-900/95 shadow-[0_0_80px_rgba(99,102,241,0.3)] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Code2 size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-white line-clamp-1">{selectedCard.title || 'System Specimen'}</h3>
                    <span className="text-[10px] sm:text-xs font-mono text-indigo-400 uppercase tracking-wider">Vault Artifact</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 text-slate-300 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
                <div className="lg:w-3/5 rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center min-h-[220px] max-h-[38vh] sm:max-h-[50vh]">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title || 'Detail image'}
                    className="w-full h-full object-contain max-h-[38vh] sm:max-h-[50vh]"
                  />
                </div>

                <div className="lg:w-2/5 flex flex-col justify-between gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-1.5">
                      <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">SPECIFICATION</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        High-capacity neural architecture specimen featuring optimized gradient flows, stochastic evaluations, and distributed training pipelines.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase">TAGS & ARCHITECTURE</span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {['PyTorch', 'CUDA', 'Distributed', 'Deep Learning'].map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono border border-white/10 bg-white/5 text-indigo-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCard(null)}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  >
                    CLOSE INSPECTION
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, X, Image as ImageIcon, Calendar, Tag, Layers } from 'lucide-react';
import ChromaGrid from './ChromaGrid';

export default function Chronicles({ data }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);

  // If no items or section is hidden, return null
  if (!data || data.visible === false || !data.items || data.items.length === 0) {
    return null;
  }

  const chronicles = data.items;
  const currentItem = chronicles[activeIdx] || chronicles[0];

  return (
    <section id="chronicles" className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-16 sm:mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-400 uppercase"
            >
              CHRONICLES
            </motion.h2>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-slate-100 font-medium mt-3 tracking-tight">
              Research Notes, Experiments & Technical Explorations
            </p>
          </div>
          <span className="font-mono text-xs text-slate-500">
            [ {chronicles.length} {chronicles.length === 1 ? 'LOG' : 'LOGS'} RECORDED ]
          </span>
        </div>

        {/* Redesigned Dual Interactive Showcase Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Interactive Chronicle Index */}
          <div className="lg:col-span-7">
            <ChromaGrid items={chronicles} onSelect={(item) => { setActiveIdx(chronicles.indexOf(item)); setSelectedNote(item); }} />
          </div>

          {/* Right Column: Dynamic Live Preview Terminal Card (Sticky on Desktop) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-white/[0.2] transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06] font-mono text-[11px] text-slate-400">
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <BookOpen size={13} className="animate-pulse" />
                  <span>PREVIEW LOG</span>
                </span>
                <span className="text-slate-400">{currentItem?.date || 'CHRONICLE'}</span>
              </div>

              {/* Preview Image if present */}
              {currentItem?.image ? (
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 mb-5 bg-black/40">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/10] rounded-2xl border border-white/[0.08] mb-5 bg-white/[0.02] flex flex-col items-center justify-center p-6 text-center">
                  <Layers size={32} className="text-slate-600 group-hover:text-emerald-400 mb-2 transition-colors duration-300" />
                  <span className="font-mono text-xs text-slate-400">TECHNICAL RESEARCH MEMO</span>
                </div>
              )}

              <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                {currentItem?.title}
              </h4>

              {currentItem?.location && (
                <div className="mb-4 inline-block font-mono text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  {currentItem.location}
                </div>
              )}

              {currentItem?.description && (
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light text-left line-clamp-4 mb-6">
                  {currentItem.description}
                </p>
              )}

              <button
                onClick={() => setSelectedNote(currentItem)}
                className="w-full py-3.5 rounded-full bg-white text-[#050508] font-mono text-xs font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-slate-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all shadow-md active:scale-[0.98]"
              >
                <span>OPEN FULL ENTRY</span>
                <ArrowUpRight size={14} className="transition-transform duration-250 hover:translate-x-0.5 hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Note Reader Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050508]/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-10"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto glass-panel rounded-2xl border border-white/[0.12] p-6 sm:p-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Note"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider mb-2">
                <BookOpen size={14} />
                {selectedNote.location && <span className="uppercase">{selectedNote.location}</span>}
                {selectedNote.date && (
                  <>
                    <span>•</span>
                    <span className="text-slate-400">{selectedNote.date}</span>
                  </>
                )}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                {selectedNote.title}
              </h3>

              {selectedNote.image && (
                <div className="w-full max-h-[280px] rounded-xl overflow-hidden border border-white/10 mb-6 bg-black/40">
                  <img src={selectedNote.image} alt={selectedNote.title} className="w-full h-full object-cover" />
                </div>
              )}

              {selectedNote.description && (
                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line space-y-4 font-light text-left border-t border-white/[0.08] pt-6">
                  {selectedNote.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

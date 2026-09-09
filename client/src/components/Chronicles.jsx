import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, X, Image as ImageIcon } from 'lucide-react';

export default function Chronicles({ data }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  // Nothing hardcoded: Render strictly what is in data.items from the dashboard
  if (!data || data.visible === false || !data.items || data.items.length === 0) {
    return null;
  }

  const chronicles = data.items;

  return (
    <section id="chronicles" className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-20 sm:mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
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
            <p className="font-display text-2xl sm:text-3xl text-slate-200 font-medium mt-3">
              Research Notes, Experiments & Technical Explorations
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400">
            [ RESEARCH NOTEBOOK ]
          </span>
        </div>

        {/* Large Editorial Text Rows */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {chronicles.map((item, idx) => {
            const isHovered = hoveredId === (item._id || idx);

            return (
              <motion.div
                key={item._id || idx}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                onMouseEnter={() => setHoveredId(item._id || idx)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedNote(item)}
                className="py-10 sm:py-12 group cursor-pointer transition-colors duration-300"
              >
                <div className="flex flex-col gap-3">
                  {/* Category & Date from Dashboard */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 tracking-wider">
                    {item.location && <span className="text-emerald-400 uppercase">{item.location}</span>}
                    <div className="flex items-center gap-3 ml-auto">
                      {item.image && (
                        <span className="inline-flex items-center gap-1 text-slate-500 text-[10px]">
                          <ImageIcon size={11} /> PHOTO
                        </span>
                      )}
                      {item.date && <span>{item.date}</span>}
                    </div>
                  </div>

                  {/* Title Row with Smooth Hover Shift */}
                  <div className="flex items-center justify-between gap-6">
                    <motion.h3
                      animate={{ x: isHovered ? 8 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors"
                    >
                      {item.title}
                    </motion.h3>

                    <motion.div
                      animate={{
                        x: isHovered ? 4 : 0,
                        y: isHovered ? -4 : 0,
                        opacity: isHovered ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-white"
                    >
                      <ArrowUpRight size={22} />
                    </motion.div>
                  </div>

                  {/* Description Preview & Thumbnail on Hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-start"
                      >
                        {item.image && (
                          <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black/40">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        {item.description && (
                          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl font-light text-justify-editorial line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
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
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto glass-panel rounded-2xl border border-white/[0.12] p-6 sm:p-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white transition-colors"
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
                <div className="w-full max-h-[260px] rounded-xl overflow-hidden border border-white/10 mb-6 bg-black/40">
                  <img src={selectedNote.image} alt={selectedNote.title} className="w-full h-full object-cover" />
                </div>
              )}

              {selectedNote.description && (
                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line space-y-4 font-light text-justify-editorial border-t border-white/[0.08] pt-6">
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

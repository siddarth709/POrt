import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ZoomIn } from 'lucide-react';

export default function GridMotion({ items = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);

  // Valid section-specific items only
  const validItems = items.filter((item) => item?.image);

  if (!validItems.length) return null;

  return (
    <section id="grid-motion" className="relative w-full h-auto min-h-0 py-16 sm:py-24 px-4 sm:px-8 bg-[#07080e] overflow-visible isolate">
      {/* Ambient Subtle Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header — Section Badge & Clean Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-3"
          >
            <Sparkles size={14} className="text-indigo-400" />
            <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">Visual Archive</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase"
          >
            Visual <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Collage</span>
          </motion.h2>
        </div>

        {/* ── Masonry Collage Layout (No Image Labels) ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {validItems.map((item, index) => (
            <motion.div
              key={item._id || `${item.image}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden cursor-pointer break-inside-avoid shadow-lg hover:border-indigo-500/60 hover:shadow-[0_12px_40px_rgba(99,102,241,0.25)] transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt="Collage item"
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Hover Zoom Overlay — No Text Labels */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="p-3 rounded-full bg-indigo-600/90 text-white shadow-xl backdrop-blur-md scale-95 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={18} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal — Clean High-Res Image View */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-slate-900/90 shadow-[0_0_80px_rgba(99,102,241,0.3)] flex flex-col"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-indigo-600 transition-all shadow-lg backdrop-blur-md"
              >
                <X size={18} />
              </button>

              <div className="p-3 sm:p-4 bg-black flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt="Full view"
                  className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

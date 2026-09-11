import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowUpRight, ZoomIn } from 'lucide-react';

export default function GridMotion({ items = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items uploaded specifically for this section
  const filteredItems = useMemo(() => {
    const valid = items.filter((item) => item?.image);
    if (!valid.length) return [];
    if (activeCategory === 'PROJECTS') return valid.filter((i) => i._id?.includes('project') || i.title?.toLowerCase().includes('project'));
    if (activeCategory === 'CERTIFICATIONS') return valid.filter((i) => i._id?.includes('certification') || i.title?.toLowerCase().includes('certificate'));
    if (activeCategory === 'AI / ML') return valid.filter((i) => i.title?.toLowerCase().includes('model') || i.title?.toLowerCase().includes('ai') || i.title?.toLowerCase().includes('neural'));
    return valid;
  }, [items, activeCategory]);

  if (!items.length) return null;

  return (
    <section id="grid-motion" className="grid-motion-shell relative min-h-screen py-20 sm:py-28 px-4 sm:px-8 bg-[#07080e] overflow-hidden isolate">
      {/* Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-3"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">Visual Archive</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase"
            >
              Featured <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Gallery</span>
            </motion.h2>
          </div>

          {/* Filter Pills */}
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
                className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] scale-105'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Clean Professional Equal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id || `${item.title}-${index}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:border-indigo-500/60 hover:shadow-[0_12px_40px_rgba(99,102,241,0.25)] hover:-translate-y-1.5"
            >
              {/* Image Frame with Aspect Ratio */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title || 'Visual Specimen'}
                  className="w-full h-full object-cover filter contrast-[1.02] saturate-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080e] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="p-2.5 rounded-full bg-indigo-600/90 text-white shadow-lg backdrop-blur-md flex items-center justify-center">
                    <ZoomIn size={15} />
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-slate-900/40 border-t border-white/[0.06]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-semibold">
                    {item.title ? item.title.split(' ')[0] : 'VISUAL ARTIFACT'}
                  </span>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-200 transition-colors">
                  {item.title || 'Visual Specimen'}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Inspection Modal */}
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
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-slate-900/95 shadow-[0_0_80px_rgba(99,102,241,0.3)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white">{selectedItem.title || 'Visual Specimen'}</h3>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">High-Resolution View</span>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 text-slate-300 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center p-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title || 'Full resolution view'}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { formatImageUrl } from '../utils/url';

export default function GridMotion({ items = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  // Valid section-specific items with normalized image URLs
  const validItems = items
    .filter((item) => item?.image || item?.url || item?.src)
    .map((item) => {
      const rawImage = item.image || item.url || item.src || '';
      return {
        ...item,
        image: formatImageUrl(rawImage),
      };
    });

  if (!validItems.length) return null;

  const handleImageError = (itemId) => {
    setFailedImages((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <section id="grid-motion" className="relative w-full h-auto min-h-0 py-14 sm:py-24 px-4 sm:px-8 bg-[#07080e] overflow-visible isolate">
      {/* Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-3">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">Visual Archive</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            Visual <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Collage</span>
          </h2>
        </div>

        {/* ── Responsive Device-Compatible Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {validItems.map((item, index) => {
            const itemId = item._id || `${item.image}-${index}`;
            const isFailed = failedImages[itemId];

            return (
              <div
                key={itemId}
                onClick={() => setSelectedItem(item)}
                className="group relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden cursor-pointer shadow-lg hover:border-indigo-500/60 hover:shadow-[0_12px_40px_rgba(99,102,241,0.25)] transition-all duration-300"
              >
                {!isFailed && item.image ? (
                  <img
                    src={item.image}
                    alt="Collage item"
                    onError={() => handleImageError(itemId)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-4 text-center">
                    <ImageIcon className="text-indigo-400/60 mb-2" size={32} />
                    <span className="font-mono text-[11px] text-slate-400 line-clamp-1">{item.title || 'Visual Specimen'}</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="p-3 rounded-full bg-indigo-600/90 text-white shadow-xl backdrop-blur-md scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn size={18} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
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

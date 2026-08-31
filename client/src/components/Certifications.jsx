import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiAward, FiEye, FiCheck, FiCalendar } from 'react-icons/fi';
import Reveal from './Reveal';
import AnimatedHeading from './AnimatedHeading';
import { scaleIn, modalVariant } from '../animations/variants';

export default function Certifications({ data }) {
  const [active, setActive] = useState(null);
  if (!data || data.visible === false || !data.items?.length) return null;

  return (
    <section id="certifications" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
              <FiAward size={13} />
              <span>ACCREDITATIONS & LICENSES</span>
            </div>
            <AnimatedHeading
              text="Certifications"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              wordClassName="gradient-text"
            />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {data.items.map((c, i) => (
            <Reveal key={c._id || i} custom={i} variants={scaleIn}>
              <motion.button
                whileHover={{ y: -6 }}
                onClick={() => setActive(c)}
                className="w-full text-left glass-card rounded-2xl overflow-hidden group border border-white/10 hover:border-accent/40 shadow-xl transition-all duration-300"
              >
                {/* Certificate Preview Image */}
                {c.image ? (
                  <div className="relative overflow-hidden h-48 bg-surface/80">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full glass text-xs font-medium text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <FiEye size={12} className="text-accent2" /> View Certificate
                    </div>
                  </div>
                ) : (
                  <div className="h-36 bg-surface/50 flex items-center justify-center border-b border-white/10">
                    <FiAward size={36} className="text-accent/60" />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-accent2 font-medium mb-1">
                    <FiCheck size={12} />
                    <span>{c.issuer || 'Verified Credential'}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {c.title}
                  </h3>
                  {c.date && (
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <FiCalendar size={11} /> {c.date}
                    </p>
                  )}
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full-Screen Certificate Viewer Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden border border-white/15 shadow-2xl p-4 sm:p-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              {/* Certificate Image */}
              {active.image ? (
                <div className="rounded-xl overflow-hidden max-h-[75vh] flex items-center justify-center bg-black/40">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <FiAward size={48} className="mx-auto mb-3 text-accent" />
                  <p>No preview image uploaded for this certificate.</p>
                </div>
              )}

              {/* Details Footer */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white">{active.title}</h3>
                  <p className="text-sm text-slate-300">Issued by <span className="text-accent2 font-medium">{active.issuer}</span> {active.date && `• ${active.date}`}</p>
                </div>

                <button
                  onClick={() => setActive(null)}
                  className="px-5 py-2 rounded-full glass text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

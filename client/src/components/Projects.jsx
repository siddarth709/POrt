import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiLayers, FiEye } from 'react-icons/fi';
import Reveal from './Reveal';
import AnimatedHeading from './AnimatedHeading';
import { scaleIn, modalVariant } from '../animations/variants';

export default function Projects({ data }) {
  const [active, setActive] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!data || data.visible === false || !data.items?.length) return null;

  const handleOpenProject = (project) => {
    setActive(project);
    setSelectedImage(project.image || (project.gallery && project.gallery[0]) || null);
  };

  return (
    <section id="projects" className="relative py-28 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
              <FiLayers size={13} />
              <span>FEATURED WORK</span>
            </div>
            <AnimatedHeading
              text="Projects"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              wordClassName="gradient-text"
            />
          </div>
        </Reveal>

        {/* Project Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((p, i) => (
            <Reveal key={p._id || i} custom={i} variants={scaleIn}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl overflow-hidden group border border-white/10 hover:border-accent/40 shadow-xl flex flex-col h-full cursor-pointer"
                onClick={() => handleOpenProject(p)}
              >
                {/* Project Image */}
                {p.image ? (
                  <div className="relative overflow-hidden h-52 bg-surface/90">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full glass text-xs font-medium text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <FiEye size={12} className="text-accent2" /> Details & Gallery
                    </div>
                  </div>
                ) : (
                  <div className="h-44 bg-surface/50 flex items-center justify-center border-b border-white/10">
                    <FiLayers size={36} className="text-accent/50" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-100 text-sm mt-2.5 line-clamp-2 leading-relaxed flex-grow opacity-95 text-justify">
                    {p.shortDescription || p.details}
                  </p>

                  {/* Tech stack pills */}
                  {p.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.06]">
                      {p.techStack.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-cyan-300 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 4 && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.02] text-slate-300">
                          +{p.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Project Detail Pop-up Modal (Content on Left, Images on Right) */}
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
              className="glass rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-white/15 shadow-2xl flex flex-col md:grid md:grid-cols-12 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              {/* LEFT COLUMN: Project Details & Story */}
              <div className="md:col-span-6 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[85vh] flex flex-col justify-between order-2 md:order-1 border-t md:border-t-0 md:border-r border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
                    PROJECT SHOWCASE
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                    {active.title}
                  </h3>

                  {/* Tech stack badges */}
                  {active.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {active.techStack.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-cyan-300 border border-accent/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Detailed Description */}
                  <div className="text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal opacity-95 text-justify">
                    {active.details || active.shortDescription}
                  </div>
                </div>

                {/* Live / Code CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/10">
                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent2 text-black font-semibold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow-md transition-all"
                    >
                      <FiExternalLink size={15} /> Live Preview
                    </a>
                  )}

                  {active.githubUrl && (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white font-medium text-xs sm:text-sm hover:bg-white/10 transition-colors"
                    >
                      <FiGithub size={15} /> Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Image Gallery */}
              <div className="md:col-span-6 p-6 sm:p-8 bg-surface/50 flex flex-col justify-center order-1 md:order-2">
                {/* Main Selected Image */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-xl max-h-[420px] flex items-center justify-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={active.title}
                      className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-slate-500">
                      <FiLayers size={48} className="opacity-40" />
                    </div>
                  )}
                </div>

                {/* Thumbnails switcher if gallery has multiple photos */}
                {((active.gallery && active.gallery.length > 0) || (active.image && active.gallery?.length)) && (
                  <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                    {active.image && (
                      <button
                        onClick={() => setSelectedImage(active.image)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                          selectedImage === active.image ? 'border-cyan-400 scale-105 shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={active.image} alt="Thumbnail Cover" className="w-full h-full object-cover" />
                      </button>
                    )}
                    {active.gallery?.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                          selectedImage === img ? 'border-cyan-400 scale-105 shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

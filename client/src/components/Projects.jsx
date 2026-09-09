import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { formatExternalUrl } from '../utils/url';

function GithubIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects({ data }) {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    if (activeProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeProject]);

  // Nothing hardcoded: Render strictly what is in data.items from the dashboard
  if (!data || data.visible === false || !data.items || data.items.length === 0) {
    return null;
  }

  const projects = data.items;

  return (
    <section id="projects" className="relative py-32 px-6 sm:px-10 border-t border-white/[0.04]">
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
              PROJECTS
            </motion.h2>
            <p className="font-display text-2xl sm:text-3xl text-slate-200 font-medium mt-3">
              Selected Systems & Engineering Case Studies
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400">
            [ CLICK TO EXPLORE CASE STUDY ]
          </span>
        </div>

        {/* Large Immersive Showcases */}
        <div className="flex flex-col gap-24 sm:gap-36">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                key={project._id || idx}
                onClick={() => setActiveProject(project)}
                data-cursor="view"
                className="cursor-pointer group"
              >
                <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Visual Frame */}
                  <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden glass-panel border border-white/[0.08] group-hover:border-white/[0.2] transition-colors duration-300 shadow-xl bg-black/40 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                          [ SYSTEM VISUALIZATION ]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                  </div>

                  {/* Project Metadata */}
                  <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] text-slate-400 border border-white/[0.08] px-2.5 py-0.5 rounded-full bg-white/[0.02]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug group-hover:text-slate-200 transition-colors">
                      {project.title}
                    </h3>

                    {project.shortDescription && (
                      <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed text-justify-editorial font-light">
                        {project.shortDescription}
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-2 font-mono text-xs text-slate-300 group-hover:text-white transition-colors">
                      <span className="tracking-wider uppercase font-medium">VIEW CASE STUDY</span>
                      <ArrowUpRight size={15} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#050508]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-2xl border border-white/[0.12] p-6 sm:p-12 shadow-2xl"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 transition-colors z-20"
                aria-label="Close Case Study"
              >
                <X size={18} />
              </button>

              <div className="mb-8">
                <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">
                  CASE STUDY
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                  {activeProject.title}
                </h2>
                {activeProject.shortDescription && (
                  <p className="font-display text-base sm:text-lg text-slate-400 mt-2 font-normal">
                    {activeProject.shortDescription}
                  </p>
                )}
              </div>

              {activeProject.image && (
                <div className="rounded-xl overflow-hidden border border-white/[0.08] mb-10 max-h-[380px] bg-black">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Case Study Details from Dashboard */}
              {activeProject.details && (
                <div className="border-t border-white/[0.06] pt-8 mb-8">
                  <h4 className="font-mono text-xs tracking-widest uppercase text-slate-400 mb-3">
                    SYSTEM OVERVIEW & DETAILS
                  </h4>
                  <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-light text-justify-editorial whitespace-pre-line space-y-4">
                    {activeProject.details}
                  </div>
                </div>
              )}

              {/* Technologies from Dashboard */}
              {Array.isArray(activeProject.techStack) && activeProject.techStack.length > 0 && (
                <div className="border-t border-white/[0.06] pt-6 mb-6">
                  <h4 className="font-mono text-xs tracking-widest uppercase text-slate-400 mb-3">
                    TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Links from Dashboard */}
              {(activeProject.githubUrl || activeProject.liveUrl) && (
                <div className="border-t border-white/[0.06] mt-8 pt-6 flex flex-wrap items-center gap-4">
                  {activeProject.githubUrl && (
                    <a
                      href={formatExternalUrl(activeProject.githubUrl)}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>GITHUB REPOSITORY</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {activeProject.liveUrl && (
                    <a
                      href={formatExternalUrl(activeProject.liveUrl)}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider hover:bg-slate-200 transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

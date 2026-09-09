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
    <section id="projects" className="relative py-28 sm:py-36 px-5 sm:px-8 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="section-heading mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
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
              Selected systems, made tangible.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Click any project to open the full case study
          </span>
        </div>

        {/* Large Immersive Showcases */}
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.article
                key={project._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveProject(project)}
                data-cursor="view"
                whileHover={{ y: -8 }}
                className={`project-card cursor-pointer group relative overflow-hidden rounded-[1.65rem] border border-white/[0.08] bg-white/[0.025] p-3 sm:p-4 ${idx === 0 && projects.length > 2 ? 'lg:col-span-2' : ''}`}
              >
                <div className={`grid gap-6 ${idx === 0 && projects.length > 2 ? 'lg:grid-cols-12 lg:items-center' : 'sm:grid-cols-2 sm:items-center'}`}>
                  {/* Visual Frame */}
                  <div className={idx === 0 && projects.length > 2 ? `lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}` : ''}>
                    <div className="relative aspect-[16/10] rounded-[1.1rem] overflow-hidden border border-white/[0.07] group-hover:border-cyan-200/25 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-500 bg-black/40 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="font-mono text-xs text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                          [ SYSTEM VISUALIZATION ]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                  </div>

                  {/* Project Metadata */}
                  <div className={`${idx === 0 && projects.length > 2 ? `lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}` : ''} flex flex-col justify-center px-2 pb-3 sm:px-3 sm:pb-2`}>
                    {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] text-slate-400 hover:text-emerald-300 border border-white/[0.08] hover:border-emerald-500/40 px-2.5 py-0.5 rounded-full bg-white/[0.02] hover:bg-emerald-500/10 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug group-hover:text-cyan-100 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {project.shortDescription && (
                      <p className="mt-4 text-slate-400 group-hover:text-slate-300 text-sm sm:text-base leading-relaxed text-left font-light transition-colors duration-300">
                        {project.shortDescription}
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-2 font-mono text-xs text-slate-300 group-hover:text-white transition-all">
                      <span className="tracking-wider uppercase font-medium">VIEW CASE STUDY</span>
                      <ArrowUpRight size={15} className="text-slate-400 group-hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </motion.article>
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
                  <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-light text-left whitespace-pre-line space-y-4">
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
                        className="font-mono text-xs px-3 py-1 rounded-full border border-white/[0.08] hover:border-emerald-400/40 bg-white/[0.03] hover:bg-emerald-500/10 text-slate-200 transition-all cursor-default"
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
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white/50 bg-white/[0.05] hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-all"
                    >
                      <GithubIcon size={14} />
                      <span>GITHUB REPOSITORY</span>
                      <ArrowUpRight size={14} className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-400 group-hover:text-white" />
                    </a>
                  )}

                  {activeProject.liveUrl && (
                    <a
                      href={formatExternalUrl(activeProject.liveUrl)}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={14} className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

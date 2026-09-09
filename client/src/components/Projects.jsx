import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Projects({ data }) {
  const [active, setActive] = useState(null);
  if (!data?.items?.length || data.visible === false) return null;

  return (
    <section id="projects" className="work-section">
      <div className="editorial-grid">
        <div className="work-intro reveal-group"><p className="eyebrow">02 / SELECTED WORK</p><h2>Systems made tangible.</h2></div>
      </div>
      <div className="work-list">
        {data.items.map((project, index) => {
          const reversed = index % 2 === 1;
          return (
            <article key={project._id || `${project.title}-${index}`} className={`project-row ${reversed ? 'is-reversed' : ''}`}>
              <button className="project-open" onClick={() => setActive(project)} aria-label={`View ${project.title || 'project'}`}>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-copy">
                  <p className="eyebrow">{[project.category, project.year].filter(Boolean).join(' / ') || 'PROJECT'}</p>
                  <h3>{project.title || 'PROJECT TITLE'}</h3>
                  {project.shortDescription && <p className="project-description">{project.shortDescription}</p>}
                  <span className="project-link">VIEW PROJECT <ArrowUpRight size={14} /></span>
                </div>
                <div className="project-visual">
                  {project.image ? <img src={project.image} alt={project.title || 'Project preview'} loading="lazy" /> : <span>PROJECT VISUAL</span>}
                  <i className="project-marker" aria-hidden="true" />
                </div>
              </button>
            </article>
          );
        })}
      </div>
      <AnimatePresence>{active && <motion.div className="project-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
        <motion.article initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setActive(null)} aria-label="Close project"><X size={18} /></button>
          <p className="eyebrow">{[active.category, active.year].filter(Boolean).join(' / ') || 'PROJECT'}</p>
          <h2>{active.title || 'PROJECT TITLE'}</h2>
          {active.image && <img src={active.image} alt={active.title || 'Project preview'} />}
          <p>{active.description || active.shortDescription}</p>
        </motion.article>
      </motion.div>}</AnimatePresence>
    </section>
  );
}

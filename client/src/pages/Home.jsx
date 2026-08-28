import React from 'react';
import { useContent } from '../context/ContentContext';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import BackgroundFX from '../components/BackgroundFX';
import CursorSpotlight from '../components/CursorSpotlight';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Chronicles from '../components/Chronicles';
import Contact from '../components/Contact';

export default function Home() {
  const { content, loading } = useContent();

  if (loading || !content) return <Loader />;

  const visibility = {
    education: content.education?.visible !== false && content.education?.items?.length > 0,
    experience: content.experience?.visible !== false && content.experience?.items?.length > 0,
    certifications: content.certifications?.visible !== false && content.certifications?.items?.length > 0,
    projects: content.projects?.visible !== false && content.projects?.items?.length > 0,
    chronicles: content.chronicles?.visible !== false && content.chronicles?.items?.length > 0,
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <BackgroundFX />
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar visibility={visibility} />
      <Hero data={content.hero} />
      <About data={content.about} />
      <Education data={content.education} />
      <Experience data={content.experience} />
      {/* Certifications appear before Projects, as requested */}
      <Certifications data={content.certifications} />
      <Projects data={content.projects} />
      <Chronicles data={content.chronicles} />
      <Contact data={content.contact} />
      <footer className="text-center text-xs text-slate-500 py-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-6 gap-4">
        <p>© {new Date().getFullYear()} {content.hero?.name || 'Portfolio'}. All rights reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono text-xs"
        >
          Back to top ↑
        </button>
      </footer>
    </div>
  );
}

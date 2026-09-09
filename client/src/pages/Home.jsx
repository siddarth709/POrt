import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import CustomCursor from '../components/CustomCursor';
import BackgroundFX from '../components/BackgroundFX';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Chronicles from '../components/Chronicles';
import Contact from '../components/Contact';
import GridMotion from '../components/GridMotion';

export default function Home() {
  const { content } = useContent();

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section')];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.dataset.revealed = 'true';
      }),
      { threshold: 0.12 }
    );
    sections.forEach((section) => observer.observe(section));

    const addRipple = (event) => {
      const target = event.target.closest('.interactive-hit');
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'tap-ripple';
      ripple.style.left = `${event.clientX - bounds.left}px`;
      ripple.style.top = `${event.clientY - bounds.top}px`;
      target.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    };

    window.addEventListener('pointerdown', addRipple, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('pointerdown', addRipple);
    };
  }, [content]);

  const visibility = {
    home: true,
    about: Boolean(content?.about?.bio || content?.about?.image || content?.about?.heading),
    education: content?.education?.visible !== false && content?.education?.items?.length > 0,
    experience: content?.experience?.visible !== false && content?.experience?.items?.length > 0,
    projects: content?.projects?.visible !== false && content?.projects?.items?.length > 0,
    chronicles: content?.chronicles?.visible !== false && content?.chronicles?.items?.length > 0,
    contact: true,
  };

  const visualItems = [
    ...(content?.gridMotion?.items || []),
    ...(content?.projects?.items || []).flatMap((project) => [
      project.image && { _id: `project-cover-${project._id || project.title}`, title: project.title, image: project.image },
      ...((project.gallery || []).filter(Boolean).map((image, index) => ({ _id: `project-gallery-${project._id || project.title}-${index}`, title: project.title, image }))),
    ].filter(Boolean)),
    ...(content?.chronicles?.items || []).filter((item) => item.image).map((item) => ({ _id: `chronicle-${item._id || item.title}`, title: item.title, image: item.image })),
    ...(content?.certifications?.items || []).filter((item) => item.image).map((item) => ({ _id: `certification-${item._id || item.title}`, title: item.title, image: item.image })),
    content?.hero?.image ? { _id: 'hero-image', title: content.hero.name || 'Portrait', image: content.hero.image } : null,
    content?.about?.image ? { _id: 'about-image', title: content.about.heading || 'About', image: content.about.image } : null,
  ].filter((item, index, collection) => item?.image && collection.findIndex((candidate) => candidate.image === item.image) === index);

  return (
    <div className="portfolio-shell relative isolate min-h-screen overflow-x-clip bg-[#050508] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-100">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <CustomCursor />
      <BackgroundFX />
      <Navbar visibility={visibility} />

      <main
        id="main-content"
        className="relative z-10"
        onPointerMove={(event) => {
          const section = event.target.closest('main > section');
          if (!section) return;
          const rect = section.getBoundingClientRect();
          section.style.setProperty('--section-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
          section.style.setProperty('--section-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
        }}
      >
        <Hero data={content?.hero} />
        {visibility.about && <About data={content?.about} />}
        {visibility.education && <Education data={content?.education} />}
        {visibility.experience && <Experience data={content?.experience} />}
        {visibility.projects && <Projects data={content?.projects} />}
        {visibility.chronicles && <Chronicles data={content?.chronicles} />}
        {content?.gridMotion?.visible !== false && <GridMotion items={visualItems} />}
        <Contact data={content?.contact} heroSocials={content?.hero?.socials} />
      </main>
    </div>
  );
}

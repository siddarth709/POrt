import React from 'react';
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

  const visibility = {
    home: true,
    about: Boolean(content?.about?.bio || content?.about?.image || content?.about?.heading),
    education: content?.education?.visible !== false && content?.education?.items?.length > 0,
    experience: content?.experience?.visible !== false && content?.experience?.items?.length > 0,
    projects: content?.projects?.visible !== false && content?.projects?.items?.length > 0,
    chronicles: content?.chronicles?.visible !== false && content?.chronicles?.items?.length > 0,
    contact: true,
  };

  return (
    <div className="relative isolate min-h-screen bg-[#050508] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      <CustomCursor />
      <BackgroundFX />
      <Navbar visibility={visibility} />

      <main className="relative z-10">
        <Hero data={content?.hero} />
        {visibility.about && <About data={content?.about} />}
        {visibility.education && <Education data={content?.education} />}
        {visibility.experience && <Experience data={content?.experience} />}
        {visibility.projects && <Projects data={content?.projects} />}
        {visibility.chronicles && <Chronicles data={content?.chronicles} />}
        <GridMotion items={content?.gridMotion?.visible !== false ? (content?.gridMotion?.items || []) : []} />
        <Contact data={content?.contact} heroSocials={content?.hero?.socials} />
      </main>
    </div>
  );
}

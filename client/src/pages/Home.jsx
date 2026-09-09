import React from 'react';
import { useContent } from '../context/ContentContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatementSection from '../components/StatementSection';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  const { content } = useContent();

  const visibility = {
    home: true,
    about: Boolean(content?.about?.bio || content?.about?.image || content?.about?.heading),
    experience: content?.experience?.visible !== false && content?.experience?.items?.length > 0,
    projects: content?.projects?.visible !== false && content?.projects?.items?.length > 0,
    contact: true,
  };

  return (
    <div className="portfolio-shell editorial-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar visibility={visibility} />
      <main id="main-content">
        <Hero data={content?.hero} />
        <StatementSection text={content?.hero?.tagline} />
        {visibility.projects && <Projects data={content?.projects} />}
        {visibility.about && <About data={content?.about} />}
        {visibility.experience && <Experience data={content?.experience} />}
        <Contact data={content?.contact} heroSocials={content?.hero?.socials} />
      </main>
    </div>
  );
}

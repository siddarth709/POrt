import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['about', 'ABOUT'], ['experience', 'EXPERIENCE'], ['projects', 'WORK'], ['contact', 'CONTACT'],
];

export default function Navbar({ visibility = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const visibleLinks = links.filter(([id]) => visibility[id] !== false);
  return (
    <header className={`editorial-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <button className="nav-mark" onClick={() => scrollTo('home')} aria-label="Go to home">NS / 26</button>
      <nav className="nav-links" aria-label="Primary navigation">
        {visibleLinks.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
      </nav>
      <button className="nav-status" onClick={() => scrollTo('contact')}><i /> AVAILABLE</button>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{visibleLinks.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</nav>}
    </header>
  );
}

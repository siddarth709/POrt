import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { formatExternalUrl } from '../utils/url';

export default function About({ data = {} }) {
  if (!data.heading && !data.bio && !data.image) return null;
  const lines = (data.bio || data.heading || '').split(/\n+/).filter(Boolean);
  return <section id="about" className="about-editorial">
    <div className="editorial-grid about-grid">
      <div><p className="eyebrow">03 / ABOUT</p>{data.resumeUrl && <a className="about-resume" href={formatExternalUrl(data.resumeUrl)} target="_blank" rel="noreferrer">RESUME <ArrowUpRight size={13} /></a>}</div>
      <div className="about-large-copy">{lines.map((line, index) => <motion.p key={`${line}-${index}`} initial={{ opacity: .35 }} whileInView={{ opacity: 1 }} viewport={{ amount: .75 }} transition={{ duration: .5, ease: [0.22,1,.36,1] }}>{line}</motion.p>)}</div>
    </div>
  </section>;
}

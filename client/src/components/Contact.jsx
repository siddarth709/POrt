import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { formatExternalUrl } from '../utils/url';

export default function Contact({ data = {}, heroSocials = [] }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });
  const socials = data.socials?.length ? data.socials : heroSocials;
  const handleMove = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(Math.max(-18, Math.min(18, (event.clientX - (rect.left + rect.width / 2)) * .12)));
    y.set(Math.max(-12, Math.min(12, (event.clientY - (rect.top + rect.height / 2)) * .1)));
  };
  return <section id="contact" className="contact-editorial">
    <div className="editorial-grid contact-grid">
      <p className="eyebrow">05 / CONTACT</p>
      <div className="contact-main">
        <h2>{data.heading || "LET'S BUILD SOMETHING INTERESTING."}</h2>
        <motion.a ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }} href={data.email ? `mailto:${data.email}` : '#'} className="talk-link">
          <span>LET&apos;S TALK</span><i><ArrowUpRight size={22} /></i>
        </motion.a>
      </div>
      <footer className="editorial-footer">
        <span>© {new Date().getFullYear()} {data.name || 'N S SIDDARTH'}</span><span><i /> OPEN TO COLLABORATIONS</span>
        <div>{(socials || []).map((social) => <a key={social.platform} href={formatExternalUrl(social.url)} target="_blank" rel="noreferrer">{social.platform}</a>)}</div>
      </footer>
    </div>
  </section>;
}

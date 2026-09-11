import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

const TOTAL_ITEMS = 28;

// React Bits Grid Motion, adapted to accept the portfolio's image records.
export default function GridMotion({ items = [], gradientColor = '#5227FF' }) {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth / 2);
  const lastScrollYRef = useRef(typeof window === 'undefined' ? 0 : window.scrollY);
  const scrollingUpRef = useRef(false);
  const images = useMemo(() => {
    const validImages = items.filter((item) => item?.image);
    if (!validImages.length) return [];
    return Array.from({ length: TOTAL_ITEMS }, (_, index) => validImages[index % validImages.length]);
  }, [items]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    gsap.ticker.lagSmoothing(0);
    const handleMouseMove = (event) => { mouseXRef.current = event.clientX; };
    const handleScroll = () => {
      if (!shellRef.current || !canvasRef.current) return;
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      scrollingUpRef.current = scrollingUp;
      if (scrollingUp) {
        gsap.killTweensOf(canvasRef.current);
        rowRefs.current.forEach((row) => row && gsap.killTweensOf(row));
        return;
      }
      const bounds = shellRef.current.getBoundingClientRect();
      const sectionBounds = shellRef.current.parentElement?.getBoundingClientRect();
      const sectionHeight = sectionBounds?.height || bounds.height;
      const scrollDistance = Math.max(sectionHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -(sectionBounds?.top || 0) / scrollDistance));
      gsap.to(canvasRef.current, {
        x: (progress - 0.5) * -180,
        y: (progress - 0.5) * 260,
        rotation: -15 + (progress - 0.5) * 7,
        scale: 1.08 + progress * 0.08,
        duration: 0.85,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };
    const updateMotion = () => {
      if (scrollingUpRef.current) return;
      const maxMoveAmount = 300;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
        gsap.to(row, { x: moveAmount, duration: 0.8 + inertiaFactors[index % inertiaFactors.length], ease: 'power3.out', overwrite: 'auto' });
      });
    };
    gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateMotion);
      rowRefs.current.forEach((row) => row && gsap.killTweensOf(row));
      if (canvasRef.current) gsap.killTweensOf(canvasRef.current);
    };
  }, []);

  if (!images.length) return null;

  return (
    <section id="grid-motion" className="grid-motion-section" style={{ '--grid-gradient': gradientColor }} aria-label="Moving visual archive">
      <div className="grid-motion-shell" ref={shellRef}>
        <div className="grid-motion-intro">
          <div className="grid-motion-container" ref={canvasRef}>
            {Array.from({ length: 4 }, (_, rowIndex) => (
              <div className="grid-motion-row" key={rowIndex} ref={(element) => { rowRefs.current[rowIndex] = element; }}>
                {Array.from({ length: 7 }, (_, itemIndex) => {
                  const image = images[rowIndex * 7 + itemIndex];
                  return (
                    <figure className="grid-motion-tile" key={`${rowIndex}-${itemIndex}`}>
                      <img src={image.image} alt={image.title || 'Portfolio visual'} loading="lazy" />
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid-motion-exit" aria-hidden="true">
        <span>CONTINUE TO CONTACT</span>
        <i />
      </div>
    </section>
  );
}

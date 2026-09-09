import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

const TOTAL_ITEMS = 28;

// React Bits Grid Motion, adapted to accept the portfolio's image records.
export default function GridMotion({ items = [] }) {
  const rowRefs = useRef([]);
  const mouseXRef = useRef(typeof window === 'undefined' ? 0 : window.innerWidth / 2);
  const images = useMemo(() => {
    const validImages = items.filter((item) => item?.image);
    if (!validImages.length) return [];
    return Array.from({ length: TOTAL_ITEMS }, (_, index) => validImages[index % validImages.length]);
  }, [items]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    const handleMouseMove = (event) => { mouseXRef.current = event.clientX; };
    const updateMotion = () => {
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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateMotion);
      rowRefs.current.forEach((row) => row && gsap.killTweensOf(row));
    };
  }, []);

  if (!images.length) return null;

  return (
    <section id="grid-motion" className="grid-motion-section" aria-label="Moving visual archive">
      <div className="grid-motion-shell">
        <div className="grid-motion-intro">
          <div className="grid-motion-container">
            {Array.from({ length: 4 }, (_, rowIndex) => (
              <div className="grid-motion-row" key={rowIndex} ref={(element) => { rowRefs.current[rowIndex] = element; }}>
                {Array.from({ length: 7 }, (_, itemIndex) => {
                  const image = images[rowIndex * 7 + itemIndex];
                  return (
                    <figure className="grid-motion-tile" key={`${rowIndex}-${itemIndex}`}>
                      <img src={image.image} alt={image.title || 'Portfolio visual'} loading="lazy" />
                      {image.title && <figcaption>{image.title}</figcaption>}
                    </figure>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Sparkles, Eye } from 'lucide-react';

export default function GridMotion({ items = [], gradientColor = '#5227FF' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // 1. Process & Filter Items
  const processedItems = useMemo(() => {
    const valid = items.filter((item) => item?.image);
    if (!valid.length) return [];
    if (filter === 'PROJECTS') return valid.filter((i) => i._id?.includes('project') || i.title?.toLowerCase().includes('project'));
    if (filter === 'CERTIFICATIONS') return valid.filter((i) => i._id?.includes('certification') || i.title?.toLowerCase().includes('certificate'));
    return valid;
  }, [items, filter]);

  const total = processedItems.length;

  // 2. Navigation Handlers
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // 3. Autoplay Timer
  useEffect(() => {
    if (!isPlaying || total <= 1 || selectedImage) return undefined;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, total, selectedImage, handleNext]);

  // 4. Particle Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '#6366f1' : '#3b82f6',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation lines
      for (let i = 0; i < particleCount; i += 1) {
        for (let j = i + 1; j < particleCount; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Drag Gesture logic
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const diff = endX - dragStartX.current;
    if (diff > 40) handlePrev();
    else if (diff < -40) handleNext();
  };

  if (!items.length) return null;

  return (
    <section id="grid-motion" className="grid-motion-shell relative min-h-[90vh] py-20 px-4 sm:px-8 bg-[#060710] overflow-hidden flex flex-col justify-center items-center isolate">
      {/* ── Background Particle Canvas & Glow ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,rgba(59,130,246,0.05)_45%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,23,42,0.8)_0%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-center">
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-4"
          >
            <Sparkles size={14} className="text-indigo-400" />
            <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">3D Holographic Vault</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white mb-4 uppercase"
          >
            Holographic <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            An interactive 3D perspective arc showcasing key project visual artifacts, model interfaces, and certificates. Drag or use controls to rotate through the vault.
          </motion.p>
        </div>

        {/* ── Category Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 z-20"
        >
          {['ALL', 'PROJECTS', 'CERTIFICATIONS'].map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setActiveIndex(0); }}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 border ${
                filter === cat
                  ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── 3D Curved Carousel Stage ── */}
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[440px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none [perspective:1200px]"
        >
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[300px] sm:h-[340px] flex items-center justify-center [transform-style:preserve-3d]">
            {processedItems.map((item, index) => {
              // Calculate relative offset from activeIndex
              let offset = index - activeIndex;
              if (offset > Math.floor(total / 2)) offset -= total;
              if (offset < -Math.floor(total / 2)) offset += total;

              // Only render items within 3 positions of center for performance & aesthetics
              if (Math.abs(offset) > 3) return null;

              const isCenter = offset === 0;

              // 3D positioning calculations
              const rotateY = offset * -25; // Curved arc rotation angle
              const translateX = offset * 180; // Horizontal offset
              const translateZ = -Math.abs(offset) * 130; // Depth setback
              const scale = isCenter ? 1.05 : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
              const opacity = Math.max(0, 1 - Math.abs(offset) * 0.32);

              return (
                <motion.div
                  key={item._id || `${item.title}-${index}`}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    if (isCenter) setSelectedImage(item);
                    else setActiveIndex(index);
                  }}
                  className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer backdrop-blur-xl ${
                    isCenter
                      ? 'border-indigo-400/80 shadow-[0_0_50px_rgba(99,102,241,0.35)] z-30'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/30 z-10'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Image */}
                  <img
                    src={item.image}
                    alt={item.title || 'Visual tile'}
                    className="w-full h-full object-cover filter contrast-[1.03] saturate-[0.9] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060710] via-[#060710]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                  {/* Glass Header Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 border border-white/15 text-indigo-300 backdrop-blur-md">
                      {item.title ? item.title.split(' ')[0] : 'ARTIFACT'}
                    </span>
                    {isCenter && (
                      <span className="p-2 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200">
                        <Maximize2 size={13} />
                      </span>
                    )}
                  </div>

                  {/* Card Footer Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {item.title || 'Visual Archive Item'}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1">
                      <Eye size={12} className="text-indigo-400" /> Click to inspect
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Controls & Progress Bar ── */}
        <div className="flex items-center justify-between w-full max-w-md mt-6 px-4 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl z-20">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-white/10 hover:border-indigo-400/60 bg-white/5 hover:bg-indigo-500/20 text-white transition-all active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-white/10 hover:border-indigo-400/60 bg-white/5 hover:bg-indigo-500/20 text-white transition-all active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Index Counter */}
          <div className="font-mono text-xs tracking-widest text-slate-300">
            <span className="text-indigo-400 font-bold">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>

          {/* Autoplay Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-indigo-400/60 bg-white/5 text-xs font-mono text-slate-300 transition-all"
          >
            {isPlaying ? <Pause size={13} className="text-amber-400" /> : <Play size={13} className="text-emerald-400" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[88vh] rounded-3xl overflow-hidden border border-white/20 bg-slate-900/90 shadow-[0_0_80px_rgba(99,102,241,0.3)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{selectedImage.title || 'Visual Specimen'}</h3>
                  <span className="text-xs font-mono text-indigo-400">HIGH-RESOLUTION INSPECTION</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 text-slate-300 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center p-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title || 'Selected detail'}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

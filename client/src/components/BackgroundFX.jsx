import React from 'react';

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#07070b]">
      {/* 1. Subtle Top Center Studio Spotlight (Apple / Linear style) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124, 58, 237, 0.14) 0%, rgba(6, 182, 212, 0.06) 50%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 2. Soft Mid-page Ambient Falloff */}
      <div 
        className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* 3. Ultra-subtle Micro-dot grid (Barely perceptible, extremely clean) */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
        }}
      />
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="min-h-screen bg-[#07070b] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-cyan-400"
          />
          <span className="font-display font-black text-xl gradient-text">P</span>
        </div>
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase animate-pulse">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
}

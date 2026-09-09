import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AeroShards() {
  const shards = useMemo(() => Array.from({ length: 15 }, (_, index) => ({
    id: index,
    left: `${(index * 23) % 108 - 4}%`,
    top: `${(index * 41) % 86 - 8}%`,
    width: 80 + (index % 4) * 46,
    height: 14 + (index % 3) * 8,
    rotate: -38 + (index % 5) * 18,
    delay: (index % 7) * 0.32,
    duration: 8 + (index % 5) * 1.2,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(79,160,255,0.16),transparent_36%),radial-gradient(circle_at_78%_18%,rgba(196,92,255,0.1),transparent_30%)]" />
      {shards.map((shard) => (
        <motion.span
          key={shard.id}
          className="absolute rounded-full border border-cyan-200/20 bg-gradient-to-r from-cyan-300/20 via-blue-400/10 to-transparent blur-[0.5px]"
          style={{ left: shard.left, top: shard.top, width: shard.width, height: shard.height, rotate: shard.rotate }}
          animate={{ x: [0, 46, -24, 0], y: [0, -22, 18, 0], opacity: [0.12, 0.5, 0.2, 0.12], scale: [0.84, 1.06, 0.92, 0.84] }}
          transition={{ duration: shard.duration, delay: shard.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10"
        animate={{ rotate: 360, scale: [0.96, 1.04, 0.96] }}
        transition={{ rotate: { duration: 36, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
      />
    </div>
  );
}
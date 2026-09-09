import React from 'react';

export function TextField({ label, ...props }) {
  return (
    <div>
      {label && <label className="text-xs font-mono text-slate-400 block mb-1.5 uppercase tracking-wider">{label}</label>}
      <input
        {...props}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
      />
    </div>
  );
}

export function TextArea({ label, ...props }) {
  return (
    <div>
      {label && <label className="text-xs font-mono text-slate-400 block mb-1.5 uppercase tracking-wider">{label}</label>}
      <textarea
        {...props}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none font-sans"
      />
    </div>
  );
}

export function SaveButton({ children = 'Save', ...props }) {
  return (
    <button
      {...props}
      className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-[#050508] text-xs font-mono font-semibold tracking-wider transition-colors disabled:opacity-50 shadow-md"
    >
      {children}
    </button>
  );
}

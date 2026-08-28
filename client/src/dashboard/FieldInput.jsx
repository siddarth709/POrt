import React from 'react';

export function TextField({ label, ...props }) {
  return (
    <div>
      {label && <label className="text-xs text-muted block mb-1.5">{label}</label>}
      <input
        {...props}
        className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

export function TextArea({ label, ...props }) {
  return (
    <div>
      {label && <label className="text-xs text-muted block mb-1.5">{label}</label>}
      <textarea
        {...props}
        className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
      />
    </div>
  );
}

export function SaveButton({ children = 'Save', ...props }) {
  return (
    <button
      {...props}
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-accent to-accent2 text-black text-sm font-medium disabled:opacity-50"
    >
      {children}
    </button>
  );
}

import React from 'react';
import { TextField } from './FieldInput';
import { Plus, Trash2 } from 'lucide-react';

// Helper for editing an array of {platform, url} social links inline.
export default function SocialsEditor({ label = 'Social links', socials = [], onChange }) {
  const update = (i, key, value) => {
    const next = [...socials];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };
  const add = () => onChange([...socials, { platform: '', url: '' }]);
  const remove = (i) => onChange(socials.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="text-xs font-mono text-slate-400 block mb-2 uppercase tracking-wider">{label}</label>
      <div className="flex flex-col gap-2.5">
        {socials.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1/3">
              <TextField placeholder="Platform (e.g. GitHub)" value={s.platform} onChange={(e) => update(i, 'platform', e.target.value)} />
            </div>
            <div className="flex-1">
              <TextField placeholder="URL" value={s.url} onChange={(e) => update(i, 'url', e.target.value)} />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-2.5 rounded-xl border border-white/[0.08] hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-colors"
              title="Remove link"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 mt-2 hover:text-cyan-300 transition-colors"
      >
        <Plus size={13} />
        <span>Add link</span>
      </button>
    </div>
  );
}

import React from 'react';
import { TextField } from './FieldInput';

// Small helper for editing an array of {platform, url} social links inline.
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
      <label className="text-xs text-muted block mb-1.5">{label}</label>
      <div className="flex flex-col gap-2">
        {socials.map((s, i) => (
          <div key={i} className="flex gap-2">
            <TextField placeholder="Platform (e.g. GitHub)" value={s.platform} onChange={(e) => update(i, 'platform', e.target.value)} />
            <TextField placeholder="URL" value={s.url} onChange={(e) => update(i, 'url', e.target.value)} />
            <button onClick={() => remove(i)} className="text-red-400 text-xs px-2">✕</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="text-xs text-accent2 mt-2 hover:underline">+ Add link</button>
    </div>
  );
}

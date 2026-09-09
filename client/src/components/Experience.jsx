import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Experience({ data }) {
  if (!data?.items?.length || data.visible === false) return null;
  return <section id="experience" className="capabilities-section">
    <div className="editorial-grid"><div className="capabilities-label"><p className="eyebrow">04 / EXPERIENCE</p><p>Selected roles and ongoing practice.</p></div>
      <div className="capability-list">{data.items.map((item, index) => <article key={item._id || `${item.role}-${index}`} className="capability-row">
        <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.role || item.company || 'CAPABILITY'}</h3><p>{[item.company, item.duration].filter(Boolean).join(' / ') || item.description || ''}</p><ArrowUpRight size={16} aria-hidden="true" />
      </article>)}</div>
    </div>
  </section>;
}

import React from 'react';

export default function StatementSection({ text }) {
  if (!text) return null;

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <section id="statement" className="statement-section">
      <div className="editorial-grid statement-grid">
        <p className="eyebrow">01 / APPROACH</p>
        <p className="statement-copy" aria-label={text}>
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>{word}{' '}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

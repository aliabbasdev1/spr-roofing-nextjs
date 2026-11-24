'use client';

import { useId, useState } from 'react';

/** Accessible accordion. Answers are always in the HTML (good for SEO). */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <div className="faq-list">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          // `rv` lives on a static wrapper so React re-renders never reset the reveal state
          <div className="rv" key={f.q}>
          <div className={`faq-item${isOpen ? ' open' : ''}`}>
            <h3>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                id={`${id}-q${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-a" id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`}>
              <div><p>{f.a}</p></div>
            </div>
          </div>
          </div>
        );
      })}
    </div>
  );
}

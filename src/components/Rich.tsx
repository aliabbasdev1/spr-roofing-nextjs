import { Fragment } from 'react';

/** Split "Roof repairs *Sydney*" into plain / gold segments. */
function segments(text: string) {
  return text.split(/(\*[^*]+\*)/).filter(Boolean).map(part =>
    part.startsWith('*') ? { text: part.slice(1, -1), gold: true } : { text: part, gold: false },
  );
}

/** Inline text where *asterisks* mark the gold-gradient words. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {segments(text).map((s, i) =>
        s.gold ? <span key={i} className="gold">{s.text}</span> : <Fragment key={i}>{s.text}</Fragment>,
      )}
    </>
  );
}

/** Plain-text version (for metadata, aria-labels, schema). */
export const plain = (text: string) => text.replace(/\*/g, '');

/**
 * Hero title split into masked words, rendered on the server so the
 * entrance animation is pure CSS (no layout work in JavaScript).
 */
export function SplitTitle({ text }: { text: string }) {
  let i = 0;
  const out: React.ReactNode[] = [];
  segments(text).forEach((s, si) => {
    const words = s.text.split(/\s+/).filter(Boolean);
    words.forEach((w, wi) => {
      const idx = i++;
      out.push(
        <span className="w" key={`${si}-${wi}`} style={{ '--i': idx } as React.CSSProperties}>
          <span className={s.gold ? 'gold' : undefined}>{w}</span>
        </span>,
      );
      out.push(' ');
    });
  });
  out.pop();
  return <>{out}</>;
}

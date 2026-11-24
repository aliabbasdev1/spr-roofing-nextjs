/** All inline SVG icons used on the site (from the original design). */
const icons = {
  // service icons (32 grid)
  leak: { vb: 32, sw: 1.7, d: <><path d="M4 14 16 4l12 10" /><path d="M16 15c-2.5 3.5-4 5.7-4 7.5a4 4 0 0 0 8 0c0-1.8-1.5-4-4-7.5z" /></> },
  tile: { vb: 32, sw: 1.7, d: <path d="M3 12c3 0 3 4 6.5 4S13 12 16 12s3 4 6.5 4S26 12 29 12M3 20c3 0 3 4 6.5 4S13 20 16 20s3 4 6.5 4S26 20 29 20" /> },
  metal: { vb: 32, sw: 1.7, d: <><path d="M4 26 12 6h16l-8 20z" /><path d="M8 26 16 6M12 26l8-20M16 26l8-20" /></> },
  restore: { vb: 32, sw: 1.7, d: <><path d="M4 16 16 5l12 11M8 13v14h16V13" /><path d="M13 21l2 2 4-5" /></> },
  paint: { vb: 32, sw: 1.7, d: <><rect x="5" y="4" width="20" height="8" rx="1" /><path d="M25 8h3v7H16v4" /><rect x="14" y="19" width="4" height="9" rx="1" /></> },
  gutter: { vb: 32, sw: 1.7, d: <><path d="M3 9h26v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" /><path d="M22 17v10M10 21v2M14 23v2" /></> },
  storm: { vb: 32, sw: 1.7, d: <><path d="M9 20a6 6 0 1 1 2-11.6A8 8 0 0 1 26 12a5 5 0 0 1-1 9.9" /><path d="M17 17l-3 6h5l-3 6" /></> },
  inspect: { vb: 32, sw: 1.7, d: <><circle cx="14" cy="14" r="8" /><path d="m20 20 8 8M10 14l3 3 5-6" /></> },
  commercial: { vb: 32, sw: 1.7, d: <path d="M3 28h26M6 28V12l7-4v20M13 14l13-5v19M17 16h5M17 20h5M17 24h5" /> },
  realtor: { vb: 32, sw: 1.8, d: <path d="M4 15 16 5l12 10M7 13v14h18V13M13 27v-8h6v8" /> },
  shield: { vb: 32, sw: 1.7, d: <><path d="M16 3 5 7v8c0 7 5 12 11 14 6-2 11-7 11-14V7z" /><path d="m11 16 4 4 7-8" /></> },
  award: { vb: 32, sw: 1.7, d: <path d="m16 4 3.6 7.4 8.1 1.2-5.9 5.7 1.4 8.1L16 22.6l-7.2 3.8 1.4-8.1-5.9-5.7 8.1-1.2z" /> },
  timer: { vb: 32, sw: 1.7, d: <><circle cx="16" cy="16" r="12" /><path d="M16 9v7l5 3" /></> },
  // ui icons (24 grid)
  phone: { vb: 24, sw: 2, d: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /> },
  mail: { vb: 24, sw: 2, d: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></> },
  whatsapp: { vb: 24, sw: 2, d: <><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" /></> },
  pin: { vb: 24, sw: 2, d: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></> },
  arrow: { vb: 24, sw: 2.2, d: <path d="M5 12h14M13 6l6 6-6 6" /> },
  check: { vb: 24, sw: 3, d: <path d="M4 12l5 5L20 6" /> },
  chevron: { vb: 24, sw: 2.4, d: <path d="m6 9 6 6 6-6" /> },
  clock: { vb: 24, sw: 2, d: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  star: { vb: 24, sw: 2, d: <path d="m12 3 2.6 5.4 5.9.9-4.3 4.1 1 5.9L12 16.5l-5.2 2.8 1-5.9-4.3-4.1 5.9-.9z" /> },
  dollar: { vb: 24, sw: 2, d: <path d="M12 3v18M16 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H7" /> },
  home: { vb: 24, sw: 2, d: <path d="M3 11 12 4l9 7M6 9v11h12V9" /> },
  camera: { vb: 24, sw: 1.8, d: <><rect x="3" y="6" width="18" height="13" rx="2" /><circle cx="12" cy="12.5" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></> },
  search: { vb: 24, sw: 1.8, d: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></> },
  doc: { vb: 24, sw: 1.8, d: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></> },
  homecheck: { vb: 24, sw: 1.8, d: <><path d="M3 11 12 4l9 7M6 9v11h12V9" /><path d="m9.5 14 2 2 3.5-4" /></> },
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, className, strokeWidth }: { name: IconName; className?: string; strokeWidth?: number }) {
  const icon = icons[name];
  return (
    <svg
      viewBox={`0 0 ${icon.vb} ${icon.vb}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? icon.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {icon.d}
    </svg>
  );
}

import { type ReactNode } from 'react';
import s from './styles.module.css';

// The Golden Gate as an inline illustration: a sunset in the light theme, a
// night with stars and deck lights in the dark one. Every colour is a --gg-*
// variable (styles.module.css) so both themes come from the same drawing.

const DECK = 262;
const TOWERS = [360, 840];
const TOP = 74;

type Pt = [number, number];
const quad = (a: Pt, c: Pt, b: Pt, t: number): Pt => [
  (1 - t) ** 2 * a[0] + 2 * t * (1 - t) * c[0] + t ** 2 * b[0],
  (1 - t) ** 2 * a[1] + 2 * t * (1 - t) * c[1] + t ** 2 * b[1],
];

// The three cable spans, as quadratic curves: [start, control, end].
const SPANS: [Pt, Pt, Pt][] = [
  [[TOWERS[0], TOP], [250, 255], [40, DECK]],
  [[TOWERS[0], TOP], [600, 430], [TOWERS[1], TOP]],
  [[TOWERS[1], TOP], [950, 255], [1160, DECK]],
];

// Vertical suspender ropes, hanging from the cable to the deck.
const suspenders: [number, number][] = SPANS.flatMap(([a, c, b], i) => {
  const n = i === 1 ? 38 : 16;
  const out: [number, number][] = [];
  for (let k = 1; k < n; k++) {
    const [x, y] = quad(a, c, b, k / n);
    if (DECK - y > 4) out.push([x, y]);
  }
  return out;
});

const STARS: [number, number, number][] = [
  [80, 40, 1.2], [170, 95, 0.9], [260, 30, 1.4], [420, 52, 0.8], [520, 24, 1.1], [690, 60, 0.9],
  [760, 26, 1.3], [1010, 44, 1], [1090, 120, 0.8], [1150, 36, 1.2], [300, 150, 0.7], [640, 140, 0.8],
];

function Tower({ x }: { x: number }): ReactNode {
  const legW = 14;
  const gap = 24;
  const l = x - gap / 2 - legW;
  const r = x + gap / 2;
  const beams = [[TOP + 6, 10], [128, 9], [178, 8], [226, 8], [292, 8]];
  return (
    <g className={s.bridge}>
      {/* the stepped tops of each leg */}
      <rect x={l + 2} y={TOP - 8} width={legW - 4} height={10} />
      <rect x={r + 2} y={TOP - 8} width={legW - 4} height={10} />
      <rect x={l} y={TOP} width={legW} height={320 - TOP} />
      <rect x={r} y={TOP} width={legW} height={320 - TOP} />
      {beams.map(([y, h]) => <rect key={y} x={l} y={y} width={legW * 2 + gap} height={h} />)}
      <rect className={s.pier} x={x - 34} y={316} width={68} height={14} rx={2} />
      <circle className={s.beacon} cx={l + legW / 2} cy={TOP - 10} r={2.4} />
      <circle className={s.beacon} cx={r + legW / 2} cy={TOP - 10} r={2.4} />
    </g>
  );
}

export default function GoldenGate({ className = '' }: { className?: string }): ReactNode {
  return (
    <figure className={`${s.frame} ${className}`}>
      <svg viewBox="0 0 1200 460" className={s.svg} role="img" aria-label="Illustration of the Golden Gate Bridge in San Francisco">
        <defs>
          <linearGradient id="gg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--gg-sky-1)' }} />
            <stop offset="0.6" style={{ stopColor: 'var(--gg-sky-2)' }} />
            <stop offset="1" style={{ stopColor: 'var(--gg-sky-3)' }} />
          </linearGradient>
          <linearGradient id="gg-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--gg-water-1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--gg-water-2)' }} />
          </linearGradient>
          <radialGradient id="gg-sun">
            <stop offset="0" style={{ stopColor: 'var(--gg-sun)', stopOpacity: 1 }} />
            <stop offset="0.55" style={{ stopColor: 'var(--gg-sun)', stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: 'var(--gg-sun)', stopOpacity: 0 }} />
          </radialGradient>
          <filter id="gg-blur" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* sky, stars and the sun or moon */}
        <rect width="1200" height="460" fill="url(#gg-sky)" />
        <g className={s.stars}>
          {STARS.map(([x, y, r]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />)}
        </g>
        <circle className={s.sun} cx="600" cy="318" r="120" fill="url(#gg-sun)" />
        <circle className={s.moon} cx="985" cy="92" r="22" />

        {/* far hills: the Marin Headlands on the right, the city on the left */}
        <path className={s.hillFar} d="M700 320 C760 300 800 250 880 228 C960 206 1030 196 1090 214 C1140 228 1180 240 1200 236 L1200 320 Z" />
        <path className={s.hillFar} d="M0 286 C60 276 120 282 170 290 C220 296 260 300 300 320 L0 320 Z" />
        <g className={s.city}>
          <rect x="40" y="262" width="12" height="26" /><rect x="58" y="252" width="10" height="36" />
          <path d="M80 288 L86 236 L92 288 Z" /><rect x="100" y="266" width="14" height="22" />
          <rect x="120" y="258" width="9" height="30" /><rect x="134" y="270" width="16" height="18" />
        </g>

        {/* the bay */}
        <rect y="320" width="1200" height="140" fill="url(#gg-water)" />
        <g className={s.glint}>
          <rect x="540" y="338" width="120" height="2.5" rx="1.25" />
          <rect x="560" y="356" width="80" height="2" rx="1" />
          <rect x="575" y="374" width="50" height="2" rx="1" />
          <rect x="586" y="392" width="28" height="1.5" rx="0.75" />
        </g>

        {/* fog rolling in under the bridge */}
        <g className={s.fog} filter="url(#gg-blur)">
          <ellipse cx="220" cy="306" rx="260" ry="26" />
          <ellipse cx="980" cy="300" rx="300" ry="30" />
        </g>

        {/* near shore on each side */}
        <path className={s.hillNear} d="M0 300 C30 290 60 280 90 284 C110 288 130 300 150 320 L150 330 L0 330 Z" />
        <path className={s.hillNear} d="M1080 330 C1100 300 1130 276 1170 268 L1200 266 L1200 330 Z" />

        {/* the bridge: suspenders, cables, deck, towers */}
        <g className={s.ropes}>
          {suspenders.map(([x, y]) => <line key={x} x1={x} y1={y} x2={x} y2={DECK} />)}
        </g>
        <g className={s.cable}>
          {SPANS.map(([a, c, b]) => <path key={a[0] + b[0]} d={`M${a[0]} ${a[1]} Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`} />)}
        </g>
        <g className={s.bridge}>
          <rect x="0" y={DECK} width="1200" height="7" />
          <rect className={s.truss} x="0" y={DECK + 7} width="1200" height="4" />
        </g>
        {TOWERS.map((x) => <Tower key={x} x={x} />)}
        <g className={s.lights}>
          {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={15 + i * 30} cy={DECK - 2} r={1.6} />)}
        </g>

        {/* a drifting veil of fog in front */}
        <g className={`${s.fog} ${s.fogFront}`} filter="url(#gg-blur)">
          <ellipse cx="520" cy="334" rx="320" ry="18" />
        </g>
      </svg>
      <figcaption className={s.caption}>San Francisco, CA</figcaption>
    </figure>
  );
}

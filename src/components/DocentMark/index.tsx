import { type ReactNode } from 'react';

// Docent's mark: a lit lantern, in pixels. A docent is a guide, and a guide
// lights the way.
//   # frame, o glow.
// Both products share it; the tile tells them apart:
//   code:   the console, on the pink tile (.docent-tile--code in custom.css).
//   studio: the desktop app, on the white tile (.docent-tile--studio).
// In both the lantern is dark; Code's fire is yellow and Studio's pink.
// The colors are fixed rather than theme tokens, so both look the same in
// either site theme.
export const LANTERN = [
  '...###...',
  '...#.#...',
  '.#######.',
  '..#####..',
  '..#o#o#..',
  '..#o#o#..',
  '..#o#o#..',
  '..#####..',
  '.#######.',
];

const INK = '#0a0a0f';
const FIRE = '#facc15';
const PINK = '#ec4899';

// Horizontal runs of one color, so neighbouring pixels draw as one rect and
// no hairline seams show between them.
function runs(): { x: number; y: number; w: number; glow: boolean }[] {
  const out: { x: number; y: number; w: number; glow: boolean }[] = [];
  LANTERN.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let w = 1;
      while (x + w < row.length && row[x + w] === c) w++;
      if (c !== '.') out.push({ x, y, w, glow: c === 'o' });
      x += w;
    }
  });
  return out;
}

const RUNS = runs();
const W = LANTERN[0].length;
const H = LANTERN.length;

export default function DocentMark({ product, size = 18 }: { product: 'code' | 'studio'; size?: number }): ReactNode {
  // A square box with the lantern centred in it.
  const side = Math.max(W, H) + 1;
  return (
    <svg
      viewBox={`${-(side - W) / 2} ${-(side - H) / 2} ${side} ${side}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {RUNS.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.glow ? (product === 'studio' ? PINK : FIRE) : INK} />
      ))}
    </svg>
  );
}

import { type ReactNode } from 'react';
import styles from '../../pages/home.module.css';

// The open models we run and the machines we fit them to. They drift past
// either side of the hero headline on the home and Studio pages.
export const MODELS = ['Gemma 4', 'Qwen 3.5', 'Qwen2-VL', 'Ministral 3', 'sl-mini', 'Gemma 3', 'Qwen3', 'Phi'];
export const HARDWARE = ['Apple Silicon', 'NVIDIA', 'AMD', 'Intel', 'Integrated graphics', 'Windows 11', 'Linux', 'macOS'];

export function Marquee({ items, reverse = false, slow = false }: { items: string[]; reverse?: boolean; slow?: boolean }): ReactNode {
  // Two copies of the row, translated by half: the seam is invisible.
  const row = [...items, ...items];
  return (
    <div className={styles.marquee}>
      <div className={`${styles.marqueeTrack} ${reverse ? styles.marqueeReverse : ''} ${slow ? styles.marqueeSlow : ''}`}>
        {row.map((item, i) => (
          <span key={i} className={styles.chip}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/** Model and hardware names drifting past both sides of the hero; wide screens only. */
export default function HeroDrift(): ReactNode {
  return (
    <>
      <div className={`${styles.heroDrift} ${styles.heroDriftLeft}`} aria-hidden="true">
        <Marquee items={MODELS} />
        <Marquee items={HARDWARE} reverse slow />
        <Marquee items={[...MODELS].reverse()} />
      </div>
      <div className={`${styles.heroDrift} ${styles.heroDriftRight}`} aria-hidden="true">
        <Marquee items={HARDWARE} reverse />
        <Marquee items={MODELS} slow />
        <Marquee items={[...HARDWARE].reverse()} reverse />
      </div>
    </>
  );
}


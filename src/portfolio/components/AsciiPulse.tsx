import {useMemo} from 'react';

const COLS = 180;
const ROWS = 22;

// Idealized EKG beat over x ∈ [0,1): P bump, QRS spike, T bump
function ekg(x: number) {
  const g = (c: number, w: number, a: number) =>
    a * Math.exp(-((x - c) * (x - c)) / (w * w));
  return (
    g(0.16, 0.03, 0.16) + // P
    -g(0.3, 0.012, 0.22) + // Q
    g(0.335, 0.012, 1.0) + // R
    -g(0.37, 0.014, 0.42) + // S
    g(0.56, 0.045, 0.3) // T
  );
}

const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

/**
 * The footer ASCII art (lukebaffait.fr renders Michelangelo's hands in red
 * dotted glyphs) — ours is the studio heartbeat: two EKG beats traced in
 * brand-orange characters with sparse static around them.
 */
export function AsciiPulse({className = ''}: {className?: string}) {
  const art = useMemo(() => {
    const mid = ROWS * 0.58;
    const amp = ROWS * 0.42;
    const lines: string[] = [];
    for (let r = 0; r < ROWS; r++) {
      let line = '';
      for (let c = 0; c < COLS; c++) {
        const x = ((c / COLS) * 2) % 1; // two beats across the width
        const y = mid - ekg(x) * amp;
        const d = Math.abs(r - y);
        if (d < 0.65) line += '@';
        else if (d < 1.5) line += '+';
        else if (d < 2.6 && hash(c, r) > 0.5) line += '·';
        else line += hash(c * 3.7, r * 9.1) > 0.978 ? '·' : ' ';
      }
      lines.push(line);
    }
    return lines.join('\n');
  }, []);

  return (
    <pre
      aria-hidden="true"
      className={`select-none overflow-hidden text-brand-orange/70 font-mono font-bold leading-[1.05] text-[clamp(4px,0.55vw,9px)] tracking-[0.08em] whitespace-pre ${className}`}
    >
      {art}
    </pre>
  );
}

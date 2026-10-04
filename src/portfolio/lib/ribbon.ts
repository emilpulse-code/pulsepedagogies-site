/**
 * The orange ribbon, shared by every section that draws a stretch of it:
 * Manifesto (01) where it pours out of the marquee band, Flagships (02), and
 * Work (03). Each section draws its own path in its own scroll context, and
 * they read as one stroke because they agree on two things at every boundary:
 * the x where the ribbon crosses the edge, and its width — RIBBON_W of the
 * section's width, which is Work.tsx's 72-unit stroke over its 1000-unit
 * viewBox. Change either and the seams show.
 */

export const RIBBON_COLOR = '#FF6321';

/** Stroke width as a fraction of the section's width. */
export const RIBBON_W = 0.072;

/** Where the ribbon crosses the 01 → 02 boundary, as a fraction of width. */
export const X_INTO_02 = 0.9;

/** Where it crosses the 02 → 03 boundary — where Work.tsx's ribbon is at y=0. */
export const X_INTO_03 = 0.3155;

/** Catmull-Rom through the points, emitted as cubic Béziers. */
export function smoothPath(p: [number, number][]) {
  let d = `M ${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/**
 * Samples a ribbon path once and returns a function that draws it to the edge
 * of the screen.
 *
 * A point counts as reached once it is above the bottom edge of the viewport
 * (and, for a sideways track, left of the right edge). The drawn length runs
 * to the first point that is not reached, so the tip always sits just
 * off-screen and the ribbon reads as running off the page rather than
 * stopping in it. Drawing to a fraction of the path's LENGTH instead looks
 * right only when the path runs straight down; on the sweeps it falls behind
 * the reader.
 *
 * The path's user units must be pixels (viewBox = its pixel size), which is
 * what every ribbon svg on the page uses.
 */
export function edgeDrawer(path: SVGPathElement, samples = 400) {
  const len = path.getTotalLength();
  const pts: {x: number; y: number}[] = [];
  for (let i = 0; i <= samples; i++) pts.push(path.getPointAtLength((i / samples) * len));
  path.style.strokeDasharray = `${len}`;

  /** `top`: the svg's top on screen. `shift`: how far a sideways track has moved. */
  return (top: number, shift = 0, viewW = Infinity) => {
    const h = window.innerHeight;
    let k = 0;
    while (k <= samples && pts[k].x - shift <= viewW && pts[k].y + top <= h) k++;
    path.style.strokeDashoffset = String(len - (Math.min(k, samples) / samples) * len);
  };
}

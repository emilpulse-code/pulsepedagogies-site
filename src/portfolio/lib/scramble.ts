const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&/—';

/**
 * Character-scramble text effect (the lukebaffait.fr nav-link treatment):
 * letters resolve left-to-right out of random glyph noise. Safe to re-trigger;
 * a new run cancels the previous one on the same element.
 */
export function scramble(el: HTMLElement, finalText: string, duration = 420) {
  const prev = Number(el.dataset.scrambleRaf ?? 0);
  if (prev) cancelAnimationFrame(prev);

  const start = performance.now();
  const len = finalText.length;

  const frame = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const settled = Math.floor(p * len);
    let out = finalText.slice(0, settled);
    for (let i = settled; i < len; i++) {
      const ch = finalText[i];
      out += ch === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (p < 1) {
      el.dataset.scrambleRaf = String(requestAnimationFrame(frame));
    } else {
      el.textContent = finalText;
      delete el.dataset.scrambleRaf;
    }
  };
  el.dataset.scrambleRaf = String(requestAnimationFrame(frame));
}

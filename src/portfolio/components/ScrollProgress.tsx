import {useEffect, useRef} from 'react';
import {ScrollTrigger} from '../lib/gsapSetup';

/**
 * Fixed scroll readout — "(42)" percentage bottom-left and a thin filling
 * timeline bar bottom-right, in the lukebaffait.fr idiom. Blend-difference
 * keeps it legible over both ink and paper sections.
 */
export function ScrollProgress() {
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (pctRef.current) {
          pctRef.current.textContent = `(${String(Math.round(self.progress * 100)).padStart(2, '0')})`;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-5 inset-x-0 z-[55] pointer-events-none px-6 md:px-10 hidden md:flex items-end justify-between mix-blend-difference text-[#F5F2ED] font-sans"
    >
      <span ref={pctRef} className="text-[10px] font-bold tracking-[0.25em] tabular-nums">
        (00)
      </span>
      <div className="flex flex-col items-end gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-50">
          Pulse Pedagogies
        </span>
        <div className="w-40 h-px bg-white/25 overflow-hidden">
          <div ref={barRef} className="h-full w-full bg-[#F5F2ED] origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}

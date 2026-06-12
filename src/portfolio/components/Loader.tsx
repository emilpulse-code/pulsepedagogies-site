import {useEffect, useRef} from 'react';
import {gsap, prefersReducedMotion} from '../lib/gsapSetup';

export function Loader({onDone}: {onDone: () => void}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      root.style.display = 'none';
      doneRef.current();
      return;
    }

    document.documentElement.classList.add('is-loading');
    const counter = {v: 0};

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove('is-loading');
        doneRef.current();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = String(Math.round(counter.v)).padStart(2, '0');
        }
      },
    })
      .to(barRef.current, {scaleX: 1, duration: 1.5, ease: 'power2.inOut'}, 0)
      .to(root, {yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.12})
      .set(root, {display: 'none'});

    return () => {
      document.documentElement.classList.remove('is-loading');
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] bg-brand-ink text-brand-paper flex flex-col items-center justify-center gap-8"
      aria-hidden="true"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-paper/40">
        Pulse Pedagogies · Design Portfolio
      </p>
      <div className="font-serif font-light italic text-8xl md:text-9xl leading-none tabular-nums">
        <span ref={numRef}>00</span>
        <span className="text-brand-orange not-italic text-5xl md:text-6xl align-top">%</span>
      </div>
      <span className="block w-48 h-px bg-brand-paper/15 overflow-hidden">
        <span ref={barRef} className="block h-full w-full bg-brand-orange origin-left scale-x-0" />
      </span>
    </div>
  );
}

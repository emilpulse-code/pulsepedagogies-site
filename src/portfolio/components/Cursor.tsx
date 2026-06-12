import {useEffect, useRef} from 'react';
import {gsap, prefersReducedMotion} from '../lib/gsapSetup';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const dotX = gsap.quickTo(dot, 'x', {duration: 0.12, ease: 'power3.out'});
    const dotY = gsap.quickTo(dot, 'y', {duration: 0.12, ease: 'power3.out'});
    const ringX = gsap.quickTo(ring, 'x', {duration: 0.45, ease: 'power3.out'});
    const ringY = gsap.quickTo(ring, 'y', {duration: 0.45, ease: 'power3.out'});

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      ring.classList.toggle('is-active', !!t.closest('a, button, [data-cursor]'));
    };

    window.addEventListener('pointermove', onMove, {passive: true});
    document.addEventListener('mouseover', onOver, {passive: true});
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="pp-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="pp-cursor-ring" aria-hidden="true" />
    </>
  );
}

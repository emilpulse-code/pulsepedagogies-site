import {useEffect} from 'react';
import Lenis from 'lenis';
import {gsap, ScrollTrigger, prefersReducedMotion} from './gsapSetup';

/* A multiplier on wheel travel, for a stretch of page that should read slower
   than the rest (the exit from section 02). 1 = normal. It scales the wheel
   delta before Lenis uses it, so the page still eases. Touch scrolling is
   native and unaffected, as are the keyboard and the scrollbar. */
let wheelSpeed = 1;
export function setWheelSpeed(f: number) {
  wheelSpeed = f;
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree. Anchor links are routed through Lenis for
 * eased in-page travel. No-op under prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      // Lenis reads the deltas after this returns, so scaling them here works.
      virtualScroll: (data) => {
        data.deltaX *= wheelSpeed;
        data.deltaY *= wheelSpeed;
        return true;
      },
    });
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href === '#top') {
        e.preventDefault();
        lenis.scrollTo(0, {duration: 1.4});
        return;
      }
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {duration: 1.4});
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

import {Suspense, lazy, useLayoutEffect, useRef} from 'react';
import {ArrowDown, ArrowRight} from 'lucide-react';
import {gsap} from '../lib/gsapSetup';
import {Chars} from '../components/Chars';

// Three.js loads in its own chunk so first paint never waits on WebGL
const PulseScene = lazy(() =>
  import('../components/PulseScene').then((m) => ({default: m.PulseScene})),
);

export function Hero({start}: {start: boolean}) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!start || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline()
          .to('.pp-char', {y: 0, ease: 'power4.out', duration: 1.15, stagger: 0.022})
          .to(
            '.pp-hero-fade',
            {autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1},
            '-=0.7',
          );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-svh bg-brand-ink text-brand-paper overflow-hidden flex flex-col"
    >
      {/* WebGL pulse field + legibility gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,99,33,0.07),transparent_65%)]" />
      <Suspense fallback={null}>
        <PulseScene className="absolute inset-0" />
      </Suspense>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-ink/90 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-ink to-transparent pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[100rem] mx-auto w-full px-6 md:px-10 pt-32 pb-28">
        <p className="pp-hero-fade inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-paper/50 mb-8 font-sans">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
          </span>
          UI/UX Studio · K–12 EdTech · Glendale, CA
        </p>

        <h1
          className="font-serif font-light leading-[0.88] tracking-tight text-[clamp(4rem,14vw,12rem)]"
          aria-label="Design with a Pulse."
        >
          <span className="block">
            <Chars text="Design" />
          </span>
          <span className="block text-brand-paper/60">
            <Chars text="with a" />
          </span>
          <span className="block italic text-brand-orange">
            <Chars text="Pulse." />
          </span>
        </h1>

        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
          <p className="pp-hero-fade max-w-md text-lg text-brand-paper/65 leading-relaxed">
            The design portfolio of{' '}
            <strong className="text-brand-paper font-semibold">Pulse Pedagogies, LLC</strong> —
            AI-powered web &amp; mobile products for K–12 classrooms, designed and
            engineered by educators.
          </p>
          <div className="pp-hero-fade flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-medium hover:bg-brand-paper hover:text-brand-ink transition-colors"
            >
              View selected work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="mailto:emil@vapapulse.com?subject=Project%20inquiry%20%E2%80%94%20Pulse%20Pedagogies"
              className="group inline-flex items-center gap-2 border border-brand-paper/25 px-8 py-4 rounded-full font-medium hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="pp-hero-fade relative z-10 max-w-[100rem] mx-auto w-full px-6 md:px-10 pb-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-brand-paper/35 font-sans">
        <span>Scroll</span>
        <span className="hidden sm:block">Built by educators — for the classroom</span>
        <span>09 Products · 03 Suites</span>
      </div>
    </section>
  );
}

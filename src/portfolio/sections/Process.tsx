import {useLayoutEffect, useRef} from 'react';
import {gsap} from '../lib/gsapSetup';

const STEPS = [
  {
    n: '01',
    title: 'Listen',
    body: 'Embedded classroom research. We shadow teachers, counselors, and administrators to find the exact moment a tool must win — usually mid-lesson, one-handed, with thirty students watching.',
  },
  {
    n: '02',
    title: 'Define',
    body: 'Problem statements with compliance as a hard constraint. COPPA, FERPA, and accessibility shape the architecture before a single pixel is placed.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Typography-led, mobile-first interface systems in one brand language — elegant enough to win awards, simple enough to drive from a teacher’s phone.',
  },
  {
    n: '04',
    title: 'Build',
    body: 'React, TypeScript, AI pipelines, and Cloudflare’s edge network — production engineering by the same hands that designed it. Instant on restricted school networks.',
  },
  {
    n: '05',
    title: 'Ship & listen again',
    body: 'Pilots in real classrooms, measured iteration, district-ready scale. Every release loops straight back into step one.',
  },
];

export function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.pp-process-line',
          {scaleY: 0},
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.pp-process-steps',
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: true,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="process" className="bg-brand-paper py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">03</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Process</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-24">
          <div className="lg:sticky lg:top-32 self-start">
            <h2 className="pp-reveal font-serif font-light text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] mb-8">
              From classroom <br />
              <span className="italic text-brand-orange">to launch.</span>
            </h2>
            <p className="pp-reveal text-brand-ink/55 leading-relaxed max-w-sm">
              A pedagogy-first design practice. Every engagement follows the same
              five-act structure as our lessons — because good design, like good
              teaching, is a rehearsed performance.
            </p>
          </div>

          <div className="pp-process-steps relative">
            <span
              className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-brand-ink/10"
              aria-hidden="true"
            />
            <span
              className="pp-process-line hidden md:block absolute left-0 top-0 bottom-0 w-px bg-brand-orange origin-top"
              aria-hidden="true"
            />
            <ol className="md:pl-14">
              {STEPS.map((s) => (
                <li key={s.n} className="pp-reveal border-t border-brand-ink/10 first:border-t-0 py-10 md:py-12">
                  <div className="flex items-baseline gap-6">
                    <span className="font-serif italic font-light text-2xl text-brand-orange shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-serif font-light text-3xl md:text-4xl mb-3">{s.title}</h3>
                      <p className="text-brand-ink/55 leading-relaxed max-w-xl">{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

import {useLayoutEffect, useRef} from 'react';
import {gsap} from '../lib/gsapSetup';

const MANIFESTO =
  'We build web and mobile applications for education organizations — led by educators, built for education.';

const STATS = [
  {value: 26, suffix: '+', label: 'Combined years of California K–12 classroom and district leadership'},
  {value: 10, suffix: '', pad: 2, label: 'Products designed, in build, or shipping'},
  {value: 100, suffix: '%', label: 'COPPA / FERPA compliant by design'},
];

export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Word-by-word scrubbed reveal
        gsap.to('.pp-word', {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '.pp-manifesto',
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: true,
          },
        });

        // Stat counters
        gsap.utils.toArray<HTMLElement>('.pp-stat-num').forEach((el) => {
          const target = Number(el.dataset.count ?? 0);
          const pad = Number(el.dataset.pad ?? 0);
          const obj = {v: 0};
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {trigger: el, start: 'top 88%', once: true},
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v)).padStart(pad, '0');
            },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="philosophy" className="bg-brand-paper py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">01</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Philosophy</span>
        </div>

        <p
          className="pp-manifesto font-serif font-light text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.18] max-w-6xl"
          aria-label={MANIFESTO}
        >
          {MANIFESTO.split(' ').map((w, i) => (
            <span key={i} aria-hidden="true">
              <span className="pp-word inline">{w}</span>{' '}
            </span>
          ))}
        </p>

        <div className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {STATS.map((s) => (
            <div key={s.label} className="pp-reveal border-t border-brand-ink/15 pt-6">
              <div className="font-serif font-light text-6xl md:text-7xl text-brand-ink">
                <span className="pp-stat-num tabular-nums" data-count={s.value} data-pad={s.pad ?? 0}>
                  {String(s.value).padStart(s.pad ?? 0, '0')}
                </span>
                <span className="text-brand-orange italic">{s.suffix}</span>
              </div>
              <p className="mt-3 text-sm text-brand-ink/55 leading-relaxed max-w-[16rem]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

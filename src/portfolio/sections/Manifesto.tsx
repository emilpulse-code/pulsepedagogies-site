import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import type {RefObject} from 'react';
import {gsap, ScrollTrigger} from '../lib/gsapSetup';
import {edgeDrawer, RIBBON_COLOR, RIBBON_W, smoothPath, X_INTO_02} from '../lib/ribbon';

const MANIFESTO =
  'We build web and mobile applications for education organizations — led by educators, built for education.';

const STATS = [
  {value: 26, suffix: '+', label: 'Combined years of California K–12 classroom and district leadership'},
  {value: 11, suffix: '', pad: 2, label: 'Products designed, in build, or shipping'},
  {value: 100, suffix: '%', label: 'COPPA / FERPA compliant by design'},
];

/**
 * Where the ribbon is born. The marquee above this section is a solid orange
 * band; the ribbon pours out of its bottom edge — a flared root where the two
 * meet, so it reads as drawn out of the band rather than starting under it —
 * and runs down the right-hand margin, clear of the manifesto and the stats,
 * into section 02 at X_INTO_02.
 *
 * Sized in pixels from the section's own box (it grows with the copy), so the
 * stroke width is RIBBON_W of the width exactly as it is in the sections below.
 */
function BannerRibbon({sectionRef}: {sectionRef: RefObject<HTMLElement | null>}) {
  const [size, setSize] = useState({w: 0, h: 0});
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.offsetHeight;
      setSize((s) => (s.w === w && s.h === h ? s : {w, h}));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [sectionRef]);

  const {w, h} = size;
  const sw = RIBBON_W * w;
  const x = X_INTO_02 * w;

  const d = useMemo(
    () =>
      w
        ? smoothPath([
            [x, -4],
            [x, h * 0.14],
            [x - w * 0.022, h * 0.5],
            // Three points on one x, so the last stretch is exactly vertical
            // and crosses the boundary on X_INTO_02 — with two, the spline
            // carried the sway's tangent through and landed 1.7px off.
            [x, h * 0.84],
            [x, h * 0.94],
            [x, h + 60],
          ])
        : '',
    [w, h, x],
  );

  /* The root: concave fillets from the band's edge into the stroke, like
     something being pulled out of it. */
  const flare = w
    ? `M ${x - sw * 1.2} 0 Q ${x - sw * 0.5} 0 ${x - sw * 0.5} ${sw * 1.2}
       L ${x + sw * 0.5} ${sw * 1.2} Q ${x + sw * 0.5} 0 ${x + sw * 1.2} 0 Z`
    : '';

  useLayoutEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section || !w) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const draw = edgeDrawer(path);
        const update = () => draw(section.getBoundingClientRect().top);
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: update,
          onRefresh: update,
        });
        update();
        return () => st.kill();
      });
    });
    return () => ctx.revert();
  }, [w, h, sectionRef]);

  /* SEAM px past the section's bottom edge, over the top of section 02 (this
     section sits above it, z-[1]). Two sections meeting at a fractional pixel
     each antialias their edge, and the ribbon showed a faint seam line across
     it; a few pixels of overlap on the same x covers it. Kept small because
     once section 02 pins and its ribbon slides sideways, anything left here
     would hang as a stub. */
  const SEAM = 3;

  if (!w) return null;
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h + SEAM}
      viewBox={`0 0 ${w} ${h + SEAM}`}
      className="absolute left-0 top-0 pointer-events-none"
    >
      <path d={flare} fill={RIBBON_COLOR} />
      <path ref={pathRef} d={d} fill="none" stroke={RIBBON_COLOR} strokeWidth={sw} strokeLinecap="butt" />
    </svg>
  );
}

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
    <section ref={rootRef} id="philosophy" className="relative z-[1] bg-brand-paper py-28 md:py-40 px-6 md:px-10 overflow-x-clip">
      <BannerRibbon sectionRef={rootRef} />

      <div className="relative max-w-[100rem] mx-auto">
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

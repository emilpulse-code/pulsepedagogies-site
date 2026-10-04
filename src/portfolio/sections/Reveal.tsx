import {Suspense, lazy, useLayoutEffect, useRef} from 'react';
import {gsap} from '../lib/gsapSetup';

// Three.js shatter scene loads in its own chunk
const ShatterScene = lazy(() =>
  import('../components/ShatterScene').then((m) => ({default: m.ShatterScene})),
);

const POSTER = '/reveal-shatter.webp';

/**
 * Pinned cinematic reveal: a corner-bracketed frame scrubs up to fullscreen,
 * and the image inside is alive — a WebGL tile grid that breathes, then tears
 * apart and flies toward the viewer as the frame grows (the lukebaffait.fr
 * sculpture-sequence concept, recast with the studio's film still).
 */
export function Reveal() {
  const rootRef = useRef<HTMLElement>(null);
  const shatterP = useRef(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* The timeline runs in abstract units; the pin maps them onto scroll at
           ~140% of a viewport per unit, the pacing the zoom has always had.

           0.0 ─ 1.6  frame grows to full screen, art zooms underneath
           1.35 ─ 2.15 the art shatters — only once the frame has nearly
                       filled the screen, so the zoom gets its moment first
           1.95 ─ 2.4  the phrase resolves out of the debris
           2.4 ─ 3.1  HOLD. Nothing moves; the reader gets about a screen
                       of scroll to actually read the line before the pin
                       releases. Without it the phrase landed and the next
                       section arrived in the same flick of the wheel. */
        const UNITS = 3.1;
        const SHATTER_FROM = 1.35;
        const SHATTER_TO = 2.15;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: `+=${Math.round(UNITS * 140)}%`,
              scrub: 1,
              pin: '.pp-reveal-stage',
              anticipatePin: 1,
              onUpdate: (self) => {
                const t = self.progress * UNITS;
                shatterP.current = gsap.utils.clamp(0, 1, (t - SHATTER_FROM) / (SHATTER_TO - SHATTER_FROM));
              },
            },
          })
          .fromTo('.pp-reveal-frame', {scale: 0.3}, {scale: 1, ease: 'none', duration: 1.6})
          // the artwork itself keeps growing on top of the frame growth
          .fromTo('.pp-reveal-media', {scale: 1}, {scale: 1.5, ease: 'none', duration: 2.0}, 0)
          .to('.pp-reveal-outline', {autoAlpha: 0, duration: 0.25}, 0.25)
          // hide the static poster just before the shards start tearing away,
          // so the gaps they leave show ink — not a frozen copy of the image
          .to('.pp-reveal-poster', {autoAlpha: 0, duration: 0.1}, SHATTER_FROM - 0.12)
          .to('.pp-reveal-shade', {opacity: 1, duration: 0.5}, 1.8)
          .fromTo(
            '.pp-reveal-phrase',
            {autoAlpha: 0, y: 64},
            {autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out'},
            1.95,
          )
          // the hold: an empty span that pads the timeline out to UNITS
          .to({}, {duration: UNITS - 2.4}, 2.4);
      });

      // Reduced motion: everything simply visible, no pin, no scrub
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.pp-reveal-frame', {scale: 1});
        gsap.set('.pp-reveal-media', {scale: 1});
        gsap.set('.pp-reveal-outline', {autoAlpha: 0});
        gsap.set('.pp-reveal-shade', {opacity: 1});
        gsap.set('.pp-reveal-phrase', {autoAlpha: 1, y: 0});
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label="Studio statement" className="relative bg-brand-ink text-brand-paper">
      <div className="pp-reveal-stage relative h-svh overflow-hidden flex items-center justify-center">
        {/* The scaling frame — full-viewport box scaled down to a window */}
        <div className="pp-reveal-frame absolute inset-0 will-change-transform bg-brand-ink overflow-hidden">
          {/* The growing artwork layer */}
          <div className="pp-reveal-media absolute inset-0 will-change-transform">
            {/* Poster under the WebGL layer: visible until the texture paints,
                and the fallback for reduced motion / no WebGL */}
            <img
              src={POSTER}
              alt=""
              loading="lazy"
              className="pp-reveal-poster absolute inset-0 w-full h-full object-contain"
            />
            <Suspense fallback={null}>
              <ShatterScene src={POSTER} progressRef={shatterP} className="absolute inset-0" />
            </Suspense>
          </div>
          <div className="pp-reveal-shade absolute inset-0 bg-brand-ink/55 opacity-0" />
        </div>

        {/* Corner brackets sized to the frame's resting (scaled-down) state */}
        <div
          aria-hidden="true"
          className="pp-reveal-outline absolute pointer-events-none"
          style={{width: '30vw', height: '30svh', minWidth: 240, minHeight: 150}}
        >
          <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-brand-orange" />
          <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-brand-orange" />
          <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-brand-orange" />
          <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-brand-orange" />
        </div>

        {/* The one-liner */}
        <p className="pp-reveal-phrase relative z-10 max-w-5xl px-6 text-center font-serif font-light leading-[1.05] text-[clamp(2.2rem,6vw,5.5rem)]">
          Basically, we build apps <br />
          <span className="italic text-brand-orange">for education.</span>
        </p>
      </div>
    </section>
  );
}

import {useLayoutEffect, useRef} from 'react';
import {gsap, ScrollTrigger} from '../lib/gsapSetup';

/**
 * Concept marks for the three shipping products — section 02's stations on the
 * orange line.
 *
 * These are arguments, not screenshots. A product mockup on the landing page
 * stops the scroll dead: it is a rectangle of small type that has to be read,
 * and reading is the opposite of what this page does. Each mark below draws one
 * idea in line art and resolves in about a second, so the eye takes the claim
 * and keeps moving. The screenshots, the videos and the live widgets all live
 * on /products, which is where someone who wants detail has asked for it.
 *
 * Shared rules, so the three read as a set:
 *  - One ink line and one orange line. No fills beyond a wash at 6–12%.
 *  - `vector-effect="non-scaling-stroke"` everywhere, because the parent scales
 *    these boxes non-uniformly and a distorted hairline looks like a bug.
 *  - Every mark animates from a scrubbed `once` trigger and is complete and
 *    legible in its final state, which is the state reduced-motion gets.
 *  - `aria-hidden` throughout: the station's own heading and line of copy carry
 *    the meaning. A screen reader gains nothing from "five curves converge".
 */

export interface ConceptProps {
  className?: string;
  /** Caller-driven trigger; see useConcept. Omit for the usual scroll trigger. */
  play?: boolean;
}

const STROKE = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
};

const INK = '#1A1A1A';
const ORANGE = '#FF6321';

/** Draw-on for a path: hidden until the trigger, then traced. */
function drawIn(
  targets: gsap.TweenTarget,
  vars: {duration?: number; stagger?: number; delay?: number} = {},
) {
  const els = gsap.utils.toArray<SVGPathElement>(targets);
  els.forEach((el) => {
    const len = el.getTotalLength();
    gsap.set(el, {strokeDasharray: len, strokeDashoffset: len});
  });
  return gsap.to(els, {
    strokeDashoffset: 0,
    duration: vars.duration ?? 1.1,
    stagger: vars.stagger ?? 0.08,
    delay: vars.delay ?? 0,
    ease: 'power2.inOut',
  });
}

/** Shared scroll hook: build the timeline once, fire it once, honour reduce.
 *
 * `play` hands the trigger to the caller. Section 02 runs its products along
 * a horizontal track inside a pinned stage, where every mark sits at the same
 * vertical position — a vertical ScrollTrigger would fire all three the moment
 * the stage pinned. When `play` is defined, the mark ignores scroll entirely
 * and strikes the first time it turns true. */
function useConcept(build: () => gsap.core.Timeline, play?: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const external = play !== undefined;

  useLayoutEffect(() => {
    if (play) tlRef.current?.play();
  }, [play]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = build();
        tl.pause();
        tlRef.current = tl;
        if (external) {
          if (play) tl.progress(1);
          return () => {
            tlRef.current = null;
            tl.kill();
          };
        }
        // Fires when the mark is comfortably in view, never replays.
        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top 80%',
          once: true,
          onEnter: () => tl.play(),
        });

        /* A paused `fromTo` timeline renders its from-state immediately, so an
           un-triggered mark is not merely unanimated — it is collapsed to
           width 0 / radius 0 / dash-hidden, i.e. invisible. That is correct
           below the fold and wrong anywhere else, and "anywhere else" happens
           more than it sounds: a reload that restores scroll position, a
           /products link followed by Back, or an in-page anchor all mount this
           component with the mark already above the trigger point. Land it
           finished rather than empty. */
        if (root.getBoundingClientRect().top < window.innerHeight * 0.8) tl.progress(1);

        return () => {
          st.kill();
          tl.kill();
        };
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
    // `build` closes over nothing but selectors inside `root`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────────────────────
   VAPA Pulse — "Five disciplines, one engine."

   Five strands enter at five heights and braid into a single line. The claim
   the product actually makes: a generalist teacher does not assemble five arts
   programs, they teach one.
   ───────────────────────────────────────────────────────────────────────────── */

const STRAND_Y = [40, 110, 185, 260, 330];

export function StrandsConcept({className = '', play}: ConceptProps) {
  const ref = useConcept(() =>
    gsap
      .timeline()
      .add(drawIn('.c-strand', {duration: 1.2, stagger: 0.14}))
      .add(drawIn('.c-trunk', {duration: 0.7}), '-=0.45')
      /* Radius, not scale. Scaling an SVG shape makes GSAP bake an origin
         compensation into the element's transform matrix, and it does not
         reliably resolve back to zero — the first cut of this file left every
         scaled circle sitting ~23px off its own centre, which on a concentric
         seal is the whole mark. Tweening the attribute has no origin to get
         wrong. Translation is still safe (it is origin-independent) and is
         used below where a shape needs to move. */
      .fromTo('.c-node-dot', {attr: {r: 0}, autoAlpha: 0}, {attr: {r: 7}, autoAlpha: 1, duration: 0.4, ease: 'back.out(2.2)'}, '-=0.3')
      .fromTo('.c-node-ring', {attr: {r: 0}, autoAlpha: 0}, {attr: {r: 15}, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)'}, '-=0.35')
      .fromTo('.c-tick', {autoAlpha: 0, x: -6}, {autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.05}, '-=0.2'),
    play,
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 620 370" className="w-full h-auto overflow-visible">
        {/* The five strands, converging on the braid point */}
        {STRAND_Y.map((y, i) => (
          <path
            key={y}
            className="c-strand"
            d={`M 10 ${y} C 150 ${y}, 240 ${185 + (y - 185) * 0.28}, 370 185`}
            stroke={i === 2 ? ORANGE : INK}
            strokeOpacity={i === 2 ? 1 : 0.28}
            strokeWidth={i === 2 ? 2.5 : 1.5}
            {...STROKE}
          />
        ))}

        {/* Tiny markers at each entry, so five reads as five */}
        {STRAND_Y.map((y) => (
          <line
            key={`t${y}`}
            className="c-tick"
            x1={10}
            y1={y - 7}
            x2={10}
            y2={y + 7}
            stroke={INK}
            strokeOpacity={0.35}
            strokeWidth={1.5}
            {...STROKE}
          />
        ))}

        {/* The braid point */}
        <circle className="c-node-dot" cx={370} cy={185} r={7} fill={ORANGE} />
        <circle className="c-node-ring" cx={370} cy={185} r={15} fill="none" stroke={ORANGE} strokeOpacity={0.35} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />

        {/* One line out. Stops well short of the box edge — run it to the far
            side and it stops reading as an outcome and starts reading as a
            stray rule across the page. */}
        <path
          className="c-trunk"
          d="M 370 185 L 536 185"
          stroke={ORANGE}
          strokeWidth={3}
          {...STROKE}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   clearAMS — "A plan that cannot be spent wrong."

   An allocation frame fills with planned spend; an orange rule marks the
   staffing floor; the line that would breach it is drawn dashed and struck
   through rather than admitted. The product blocks the save — so the mark
   blocks the bar.
   ───────────────────────────────────────────────────────────────────────────── */

/* Geometry of the meter, so the stop and the fills cannot drift apart. */
const TRACK = {x: 40, y: 150, w: 540, h: 64, r: 32};
const STOP = TRACK.x + TRACK.w * 0.8; // the 80% staffing floor

export function GuardrailConcept({className = '', play}: ConceptProps) {
  const ref = useConcept(() =>
    gsap
      .timeline()
      .add(drawIn('.c-track', {duration: 0.9}))
      // Width, not scaleX — see the note on radius in StrandsConcept.
      .fromTo('.c-staff', {attr: {width: 0}}, {attr: {width: STOP - TRACK.x}, duration: 0.8, ease: 'power2.out'}, '-=0.4')
      .add(drawIn('.c-stop', {duration: 0.4}), '-=0.3')
      .fromTo('.c-stop-label', {autoAlpha: 0, y: -6}, {autoAlpha: 1, y: 0, duration: 0.3}, '-=0.1')
      // Non-staff spend arrives legally, pushes left across the floor, and is
      // refused — the product blocks the save, so the mark blocks the bar.
      .fromTo('.c-breach', {autoAlpha: 0, x: 30}, {autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out'})
      .to('.c-breach', {x: -74, duration: 0.5, ease: 'power2.in'})
      .to('.c-stop-flash', {autoAlpha: 1, duration: 0.12})
      .to('.c-breach', {x: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)'}, '<')
      .to('.c-stop-flash', {autoAlpha: 0, duration: 0.5}, '<'),
    play,
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 620 370" className="w-full h-auto overflow-visible">
        {/* The allocation */}
        <path
          className="c-track"
          d={`M ${TRACK.x + TRACK.r} ${TRACK.y}
              L ${TRACK.x + TRACK.w - TRACK.r} ${TRACK.y}
              A ${TRACK.r} ${TRACK.r} 0 0 1 ${TRACK.x + TRACK.w - TRACK.r} ${TRACK.y + TRACK.h}
              L ${TRACK.x + TRACK.r} ${TRACK.y + TRACK.h}
              A ${TRACK.r} ${TRACK.r} 0 0 1 ${TRACK.x + TRACK.r} ${TRACK.y}`}
          stroke={INK}
          strokeOpacity={0.28}
          strokeWidth={1.5}
          {...STROKE}
        />

        {/* Arts staffing — everything to the left of the floor */}
        <rect
          className="c-staff"
          x={TRACK.x}
          y={TRACK.y}
          width={STOP - TRACK.x}
          height={TRACK.h}
          rx={TRACK.r}
          fill={INK}
          fillOpacity={0.12}
        />

        {/* The floor itself */}
        <path
          className="c-stop"
          d={`M ${STOP} ${TRACK.y - 38} L ${STOP} ${TRACK.y + TRACK.h + 38}`}
          stroke={ORANGE}
          strokeWidth={3}
          {...STROKE}
        />
        <path
          className="c-stop-flash"
          d={`M ${STOP} ${TRACK.y - 38} L ${STOP} ${TRACK.y + TRACK.h + 38}`}
          stroke={ORANGE}
          strokeWidth={9}
          opacity={0}
          {...STROKE}
        />
        <text
          className="c-stop-label"
          x={STOP}
          y={TRACK.y - 52}
          textAnchor="middle"
          fill={ORANGE}
          fontSize={20}
          fontWeight={700}
          letterSpacing="0.08em"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          80%
        </text>

        {/* The spend that tries to cross it */}
        <g className="c-breach">
          <rect
            x={STOP + 4}
            y={TRACK.y + 8}
            width={TRACK.x + TRACK.w - STOP - 12}
            height={TRACK.h - 16}
            rx={24}
            fill={INK}
            fillOpacity={0.04}
            stroke={INK}
            strokeOpacity={0.45}
            strokeWidth={1.5}
            strokeDasharray="7 6"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Signet — "A credential that outlives the system that issued it."

   A seal is struck: the outer ring traces, the inner rings land, the mark sets,
   and then a check traces outside the seal — the verification, which happens
   against a published key rather than by asking the issuer. The check is
   deliberately separate from the seal for that reason.
   ───────────────────────────────────────────────────────────────────────────── */

export function SealConcept({className = '', play}: ConceptProps) {
  const ref = useConcept(() =>
    gsap
      .timeline()
      .add(drawIn('.c-ring-outer', {duration: 1.1}))
      // Radius and opacity only — see the note in StrandsConcept. The seal is
      // concentric by construction and must stay that way.
      .fromTo('.c-ring-mid', {attr: {r: 119}, autoAlpha: 0}, {attr: {r: 88}, autoAlpha: 1, duration: 0.55, ease: 'power3.out'}, '-=0.4')
      .fromTo('.c-serif', {autoAlpha: 0, y: 14}, {autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out'}, '-=0.2')
      .fromTo('.c-ray', {autoAlpha: 0}, {autoAlpha: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out'}, '-=0.25')
      .add(drawIn('.c-chain', {duration: 0.6, stagger: 0.1}), '-=0.1')
      .add(drawIn('.c-check', {duration: 0.45}), '-=0.15'),
    play,
  );

  const cx = 250;
  const cy = 185;

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 620 370" className="w-full h-auto overflow-visible">
        {/* The struck seal */}
        <circle
          className="c-ring-outer"
          cx={cx}
          cy={cy}
          r={118}
          fill="none"
          stroke={ORANGE}
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          className="c-ring-mid"
          cx={cx}
          cy={cy}
          r={88}
          fill={ORANGE}
          fillOpacity={0.07}
          stroke={INK}
          strokeOpacity={0.25}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        {/* Milled edge — the rays around the rim */}
        {Array.from({length: 28}, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          return (
            <line
              key={i}
              className="c-ray"
              x1={cx + Math.cos(a) * 124}
              y1={cy + Math.sin(a) * 124}
              x2={cx + Math.cos(a) * 136}
              y2={cy + Math.sin(a) * 136}
              stroke={ORANGE}
              strokeOpacity={0.45}
              strokeWidth={1.5}
              {...STROKE}
            />
          );
        })}

        {/* The mark in the middle */}
        <text
          className="c-serif"
          x={cx}
          y={cy + 30}
          textAnchor="middle"
          fill={INK}
          fillOpacity={0.75}
          fontSize={86}
          fontFamily="ui-serif, Georgia, serif"
          fontWeight={300}
        >
          S
        </text>

        {/* The chain out to the published key, and the verification */}
        <path className="c-chain" d="M 368 185 L 452 185" stroke={INK} strokeOpacity={0.3} strokeWidth={1.5} strokeDasharray="6 7" {...STROKE} />
        <path className="c-chain" d="M 452 150 L 452 220" stroke={INK} strokeOpacity={0.3} strokeWidth={1.5} {...STROKE} />
        <path
          className="c-check"
          d="M 472 190 L 492 211 L 540 155"
          stroke={ORANGE}
          strokeWidth={3}
          {...STROKE}
        />
      </svg>
    </div>
  );
}

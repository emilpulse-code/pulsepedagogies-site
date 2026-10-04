import {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import type {ComponentType, ReactNode} from 'react';
import {ArrowRight} from 'lucide-react';
import {gsap, ScrollTrigger} from '../lib/gsapSetup';
import {GuardrailConcept, SealConcept, StrandsConcept, type ConceptProps} from '../components/concepts';

/**
 * Section 02 — "Now Shipping", as three moments on the ribbon.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 * The previous version hung the three products off a 2px hairline as a plain
 * vertical list: mark, name, sentence, link, scroll, repeat. Two problems.
 * The line thinned to a hairline for no reason the visitor could see — the
 * ribbon is full weight in section 03 and the swell back up to it at the exit
 * read as a seam — and the three products got no moment each, only a slot in
 * a scroll.
 *
 * So the section pins, and the scroll turns sideways. The ribbon runs at full
 * weight the whole way (the exact width section 03 draws), and the page travels
 * along it: an intro, then one full screen per product, each with its own hero
 * object swinging in out of perspective — VAPA Pulse as the real site on a
 * desktop and a phone, clearAMS as the real site in a browser, Signet as the
 * seal itself. The slide eases into each product and holds there for a stretch of
 * scroll, so every one gets a still frame of its own.
 *
 * Signet has no screenshot, deliberately. The only running deployment carries
 * a licensee's name in its title, and the licence note in `data/signet.ts`
 * forbids naming or implying a deployment. The seal is the product's idea; it
 * carries the moment on its own.
 *
 * Under 1024px, or with reduced motion, there is no pin and no ribbon: the
 * same three moments stack vertically and reveal as they scroll in.
 *
 * ── The seam with section 03 ────────────────────────────────────────────────
 * The ribbon leaves the bottom of the stage at x = 0.3155 of the width, the
 * point where Work.tsx's ribbon (`M 330 -80`, 72 units over a 1000-unit
 * viewBox) crosses y = 0, heading about 12° left of straight down. Its width is
 * 0.072 of the stage width, which is that same 72/1000. Re-draw the ribbon in
 * Work and both numbers here need re-measuring.
 */

interface Moment {
  id: string;
  n: string;
  name: string;
  status: string;
  /** Whether the status pill gets the live dot. */
  live: boolean;
  /** The concept, in the fewest words that still make a claim. */
  claim: string;
  line: string;
  Mark: ComponentType<ConceptProps>;
  /** Which side of the screen the hero object sits on, on the sideways track. */
  side: 'left' | 'right';
}

const MOMENTS: Moment[] = [
  {
    id: 'vapa-pulse',
    n: '01',
    name: 'VAPA Pulse',
    status: 'Live in production',
    live: true,
    claim: 'Five disciplines. One engine.',
    line: 'Theatre, Music, Dance, Visual Art and Media Art arrive as one standards-aligned lesson a generalist teacher can actually run.',
    Mark: StrandsConcept,
    side: 'right',
  },
  {
    id: 'clearams',
    n: '02',
    name: 'clearAMS',
    status: 'Live in production',
    live: true,
    claim: 'A plan that cannot be spent wrong.',
    line: "Prop 28's staffing floor is checked on every save, so a plan that would create audit exposure never gets written in the first place.",
    Mark: GuardrailConcept,
    side: 'left',
  },
  {
    id: 'signet',
    n: '03',
    name: 'Signet',
    status: 'Final development',
    live: false,
    claim: 'A credential that outlives its system.',
    line: 'Registration, attendance and a signed credential are one record at four moments — and it verifies against a published key, not a call home.',
    Mark: SealConcept,
    side: 'left',
  },
];

/* ── Track geometry, in viewport units (W = stage width, H = stage height) ── */
const INTRO_W = 0.85;
const TRACK_W = INTRO_W + MOMENTS.length;
/** Matches Work.tsx's 72-unit stroke over its 1000-unit viewBox. */
const RIBBON_W = 0.072;

/* The ribbon's route, as points it passes through. It threads BEHIND every
   hero object and dips under both copy columns it would otherwise cross
   (the first product's, and clearAMS's), which is why it touches the bottom
   of the screen twice. The last two points are the exit described in the
   header comment. */
const ROUTE: [number, number][] = [
  [0.74, -0.15],
  [0.75, 0.22],
  [0.8, 0.55],
  [0.95, 0.9],
  [1.15, 0.95],
  [1.4, 0.78],
  [1.56, 0.45],
  [1.76, 0.3],
  [1.98, 0.4],
  [2.16, 0.62],
  [2.4, 0.8],
  [2.6, 0.94],
  [2.86, 0.9],
  [3.02, 0.72],
  [3.08, 0.42],
  [3.27, 0.28],
  [3.33, 0.62],
  [3.1655, 1.0],
  [3.12, 1.2],
];

/** Catmull-Rom through the route, emitted as cubic Béziers in pixels. */
function ribbonPath(w: number, h: number) {
  const p = ROUTE.map(([x, y]) => [x * w, y * h]);
  let d = `M ${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const SIDEWAYS_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

function useSideways() {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(SIDEWAYS_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(SIDEWAYS_QUERY);
    const sync = () => setOn(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return on;
}

/* clientWidth, not innerWidth: 100vw includes the scrollbar gutter, and the
   ribbon has to measure exactly what section 03's does to meet it. */
function useStageSize() {
  const read = () =>
    typeof window === 'undefined'
      ? {w: 1440, h: 900}
      : {w: document.documentElement.clientWidth, h: window.innerHeight};
  const [size, setSize] = useState(read);
  useEffect(() => {
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const next = read();
        setSize((s) => (s.w === next.w && s.h === next.h ? s : next));
      }, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return size;
}

/* ── Frames for the real screenshots ──────────────────────────────────────── */

function Browser({host, src, alt, className = ''}: {host: string; src: string; alt: string; className?: string}) {
  return (
    <div className={`rounded-[14px] overflow-hidden bg-[#0d0d0d] ring-1 ring-black/40 shadow-[0_70px_120px_-40px_rgba(26,26,26,0.55)] ${className}`}>
      <div className="h-7 flex items-center gap-1.5 px-3.5 bg-[#1c1c1c]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 px-3 py-0.5 rounded-md bg-white/[0.06] text-[10px] tracking-wide text-white/45 font-sans">
          {host}
        </span>
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full aspect-[16/10] object-cover object-top" />
    </div>
  );
}

function Phone({src, alt, className = ''}: {src: string; alt: string; className?: string}) {
  return (
    <div className={`rounded-[2rem] p-[5px] bg-brand-ink shadow-[0_50px_90px_-25px_rgba(26,26,26,0.6)] ${className}`}>
      <div className="relative rounded-[1.7rem] overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className="block w-full aspect-[390/844] object-cover object-top" />
        <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[30%] h-[3.2%] rounded-full bg-black" />
      </div>
    </div>
  );
}

/** A paper card carrying the product's concept mark, floating in front. */
function IdeaCard({children, className = ''}: {children: ReactNode; className?: string}) {
  return (
    <div
      className={`rounded-2xl bg-[#FBFAF7] ring-1 ring-brand-ink/5 p-5 pt-4 shadow-[0_40px_80px_-30px_rgba(26,26,26,0.45)] ${className}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-ink/35 font-sans mb-2">The idea</p>
      {children}
    </div>
  );
}

/* ── The hero objects, one per product ─────────────────────────────────────
   Each is a self-contained box with its own aspect ratio, so the same object
   serves the sideways track and the stacked fallback. `.m-float` pieces get
   extra parallax on the track, which is what separates them into depth. */

function HeroObject({m, play}: {m: Moment; play?: boolean}) {
  if (m.id === 'vapa-pulse') {
    return (
      <div className="relative aspect-[16/11]">
        <Browser
          host="vapapulse.com"
          src="/flagships/vapa-pulse-desktop.webp"
          alt="The VAPA Pulse home page"
          className="absolute left-0 top-0 w-[86%]"
        />
        <div className="m-float absolute right-0 bottom-0 w-[25%]" data-depth="1.4">
          <Phone src="/flagships/vapa-pulse-phone.webp" alt="VAPA Pulse on a phone" />
        </div>
        <div className="m-float absolute -left-[6%] -bottom-[4%] w-[40%]" data-depth="0.8">
          <IdeaCard>
            <m.Mark play={play} className="w-full" />
          </IdeaCard>
        </div>
      </div>
    );
  }
  if (m.id === 'clearams') {
    return (
      <div className="relative">
        <Browser host="clearams.app" src="/flagships/clearams-desktop.webp" alt="The clearAMS home page" />
        <div className="m-float absolute -right-[7%] -bottom-[16%] w-[44%]" data-depth="1.2">
          <IdeaCard>
            <m.Mark play={play} className="w-full" />
          </IdeaCard>
        </div>
      </div>
    );
  }
  // Signet: the seal is the object. See the header for why there is no screen.
  /* Solid paper under the line art, placed from the mark's own geometry —
     seal centred at (250, 185) in its 620×370 viewBox with the milling out to
     r=136, the key-and-check block at x 432–560 — so the ribbon passes behind
     a medallion and a card rather than tangling through hairlines. */
  return (
    <div className="relative aspect-[620/370]">
      <div
        className="absolute rounded-full bg-[#FBFAF7] ring-1 ring-brand-ink/5 shadow-[0_60px_110px_-30px_rgba(26,26,26,0.45)]"
        style={{left: `${(100 / 620) * 100}%`, top: `${(35 / 370) * 100}%`, width: `${(300 / 620) * 100}%`, aspectRatio: '1'}}
      />
      <div
        className="absolute rounded-[1.25rem] bg-[#FBFAF7] ring-1 ring-brand-ink/5 shadow-[0_40px_80px_-30px_rgba(26,26,26,0.4)]"
        style={{left: `${(430 / 620) * 100}%`, top: `${(128 / 370) * 100}%`, width: `${(130 / 620) * 100}%`, height: `${(114 / 370) * 100}%`}}
      />
      <m.Mark play={play} className="relative w-full" />
    </div>
  );
}

function Copy({m, staggerClass = ''}: {m: Moment; staggerClass?: string}) {
  const item = `${staggerClass}`;
  return (
    <div>
      <div className={`${item} flex flex-wrap items-center gap-4 mb-7`}>
        <span className="font-serif font-light text-2xl text-brand-orange leading-none tabular-nums">
          {m.n}
          <span className="text-brand-ink/25"> / 0{MOMENTS.length}</span>
        </span>
        <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-orange/12 text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
          {m.live && (
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
            </span>
          )}
          {m.status}
        </span>
      </div>

      <h3 className={`${item} font-serif font-light text-[clamp(2.8rem,5.4vw,5.6rem)] leading-[0.92] mb-5`}>{m.name}</h3>

      <p className={`${item} font-serif font-light italic text-brand-orange text-[clamp(1.35rem,2.2vw,2.1rem)] leading-tight mb-6`}>
        {m.claim}
      </p>

      <p className={`${item} text-brand-ink/60 text-lg leading-relaxed max-w-md mb-8`}>{m.line}</p>

      {/* One destination per product. The outbound links to the products' own
          sites live on /products, next to the detail that earns the click. */}
      <a
        href={`/products#${m.id}`}
        className={`${item} group inline-flex items-center gap-2 text-lg font-medium text-brand-ink hover:text-brand-orange transition-colors`}
      >
        See how {m.name} works
        <ArrowRight className="w-5 h-5 text-brand-orange group-hover:translate-x-1.5 transition-transform" />
      </a>
    </div>
  );
}

function Intro({className = '', itemClass = ''}: {className?: string; itemClass?: string}) {
  return (
    <div className={className}>
      <div className={`${itemClass} flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans`}>
        <span className="text-brand-orange">02</span>
        <span className="w-10 h-px bg-brand-ink/20 self-center" />
        <span>Now Shipping</span>
      </div>
      <h2 className={`${itemClass} font-serif font-light text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] mb-8`}>
        Two in production. <br />
        <span className="italic text-brand-orange">One landing.</span>
      </h2>
      <p className={`${itemClass} font-serif font-light text-xl md:text-2xl leading-snug text-brand-ink/70 max-w-xl`}>
        The three products furthest along. Each one is a single idea carried all
        the way to something a school can use on Monday.
      </p>
    </div>
  );
}

/* ── The sideways version ──────────────────────────────────────────────────── */

function Sideways() {
  const rootRef = useRef<HTMLElement>(null);
  const {w, h} = useStageSize();
  const [active, setActive] = useState(-1);
  const [struck, setStruck] = useState<boolean[]>(() => MOMENTS.map(() => false));
  const d = useMemo(() => ribbonPath(w, h), [w, h]);
  const trackW = TRACK_W * w;
  const travel = trackW - w;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>('.m-stage')!;
    const track = root.querySelector<HTMLElement>('.m-track')!;
    const ribbon = root.querySelector<SVGPathElement>('.m-ribbon')!;
    const bar = root.querySelector<HTMLElement>('.m-progress');

    const ctx = gsap.context(() => {
      /* ── The slide, with a held frame at every product ──
         ScrollTrigger's snap was tried first and fought Lenis: both want to
         own the scroll position, and the page lurched backwards. Instead the
         holds are written into the scrubbed timeline itself — the track eases
         into each product, then sits still for a stretch of scroll while
         nothing moves but the reader's eye, then eases on. */
      const MOVE = 1;
      const HOLD = 0.7;
      const units = MOMENTS.length * (MOVE + HOLD) - HOLD * 0.4;
      const slide = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          pin: stage,
          start: 'top top',
          // ~0.9 of a screen of scroll per unit of timeline
          end: () => `+=${Math.round(units * h * 0.9)}`,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });
      MOMENTS.forEach((_, i) => {
        slide.to(track, {x: -(INTRO_W + i) * w, duration: MOVE, ease: 'power2.inOut'});
        slide.to({}, {duration: i === MOMENTS.length - 1 ? HOLD * 0.6 : HOLD});
      });

      /* ── Everything else is a function of where the track is ──
         containerAnimation would be the usual tool, but it requires the slide
         to be linear, and the holds make it anything but. So each frame reads
         the track's actual offset and sets the progress of paused tweens. */
      const len = ribbon.getTotalLength();
      const SAMPLES = 400;
      const pts: {x: number; y: number}[] = [];
      for (let i = 0; i <= SAMPLES; i++) pts.push(ribbon.getPointAtLength((i / SAMPLES) * len));
      ribbon.style.strokeDasharray = `${len}`;

      const clamp01 = gsap.utils.clamp(0, 1);
      const giants = root.querySelectorAll<HTMLElement>('.m-giant');
      const panels = gsap.utils.toArray<HTMLElement>('.m-panel').map((panel, i) => {
        const s = MOMENTS[i].side === 'right' ? 1 : -1;
        const obj = panel.querySelector<HTMLElement>('.m-object');

        // 0 → 1: swings in out of perspective and settles flat as it arrives.
        // 1 → 2: leans away as the next one takes the frame.
        const objTl = gsap.timeline({paused: true});
        if (obj) {
          gsap.set(obj, {transformPerspective: 1800});
          objTl
            .fromTo(
              obj,
              {rotateY: s * -32, rotateX: 8, xPercent: s * 22, scale: 0.82, autoAlpha: 0.35},
              {rotateY: 0, rotateX: 0, xPercent: 0, scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.out'},
            )
            .to(obj, {rotateY: s * 14, xPercent: s * -8, scale: 0.92, autoAlpha: 0.5, duration: 1, ease: 'power1.in'});
        }

        // Across the whole pass: front pieces travel further than the object
        // behind them, and the giant name drifts the other way, slower.
        const passTl = gsap.timeline({paused: true});
        panel.querySelectorAll<HTMLElement>('.m-float').forEach((el) => {
          const depth = Number(el.dataset.depth ?? 1);
          passTl.fromTo(el, {x: 140 * depth, y: 50 * depth}, {x: -90 * depth, y: -20 * depth, duration: 1, ease: 'none'}, 0);
        });
        if (giants[i]) passTl.fromTo(giants[i], {x: w * 0.22}, {x: -w * 0.22, duration: 1, ease: 'none'}, 0);

        const copyTween = gsap.fromTo(
          panel.querySelectorAll('.m-item'),
          {y: 46, autoAlpha: 0},
          {y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', paused: true},
        );

        return {at: (INTRO_W + i) * w, objTl, passTl, copyTween, shown: false};
      });

      let lastShift = NaN;
      let lastTop = NaN;
      let lastActive = -2;
      const update = () => {
        const top = stage.getBoundingClientRect().top;
        const shift = -(gsap.getProperty(track, 'x') as number);
        if (shift === lastShift && top === lastTop) return;
        lastShift = shift;
        lastTop = top;

        /* The ribbon draws to the edge of the screen. A point counts as
           reached once it is left of the right edge AND above the bottom
           edge, and the drawn length runs to the first point that is not —
           so the tip always sits just off-screen: on the bottom edge while the
           section scrolls into place, on the right edge while the track
           slides, and on the bottom again as it exits into section 03. */
        let k = 0;
        while (k <= SAMPLES && pts[k].x - shift <= w && pts[k].y + top <= h) k++;
        ribbon.style.strokeDashoffset = String(len - (Math.min(k, SAMPLES) / SAMPLES) * len);

        if (bar) bar.style.transform = `scaleX(${clamp01(shift / travel)})`;

        let nowActive = -1;
        panels.forEach((p, i) => {
          const left = p.at - shift; // the panel's left edge, on screen
          const enter = clamp01((w - left) / (w * 0.8));
          const exit = clamp01((w * 0.8 - (left + w)) / (w * 0.8));
          p.objTl.progress((enter + exit) / 2);
          p.passTl.progress(clamp01((w - left) / (2 * w)));

          const inView = left < w * 0.6;
          if (inView !== p.shown) {
            p.shown = inView;
            if (inView) p.copyTween.play();
            else p.copyTween.reverse();
          }
          if (Math.abs(left) < w * 0.5) nowActive = i;
        });

        if (nowActive !== lastActive) {
          lastActive = nowActive;
          setActive(nowActive);
          if (nowActive >= 0) setStruck((prev) => (prev[nowActive] ? prev : prev.map((v, j) => v || j === nowActive)));
        }
      };
      gsap.ticker.add(update);
      update();

      // This section can rebuild on resize, after the sections below it have
      // registered — re-sort so its pin is accounted for in their positions.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      return () => gsap.ticker.remove(update);
    }, root);

    return () => ctx.revert();
  }, [w, h, travel]);

  return (
    <section ref={rootRef} id="shipping" className="relative bg-brand-paper">
      <div className="m-stage relative overflow-hidden" style={{height: h}}>
        <div className="m-track absolute left-0 top-0 h-full will-change-transform" style={{width: trackW}}>
          {/* Layer 0: the giant names, behind the ribbon */}
          {MOMENTS.map((m, i) => (
            <div
              key={m.id}
              aria-hidden="true"
              className="absolute top-0 h-full flex items-end pointer-events-none"
              style={{left: (INTRO_W + i) * w, width: w}}
            >
              <span className="m-giant block whitespace-nowrap font-serif italic font-light leading-[0.8] text-brand-ink/[0.045] text-[22vw] translate-y-[8%] px-[4%]">
                {m.name}
              </span>
            </div>
          ))}

          {/* Layer 1: the ribbon */}
          <svg
            aria-hidden="true"
            width={trackW}
            height={h}
            viewBox={`0 0 ${trackW} ${h}`}
            className="absolute left-0 top-0 pointer-events-none overflow-visible"
          >
            <path
              className="m-ribbon"
              d={d}
              fill="none"
              stroke="#FF6321"
              strokeOpacity={0.9}
              strokeWidth={RIBBON_W * w}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Layer 2: intro and the three moments */}
          <div className="absolute top-0 h-full flex items-center" style={{left: 0, width: INTRO_W * w}}>
            <Intro className="relative pl-[7vw] pr-[4vw]" />
          </div>

          {MOMENTS.map((m, i) => {
            const objectRight = m.side === 'right';
            return (
              <article
                key={m.id}
                aria-labelledby={`moment-${m.id}`}
                className="m-panel absolute top-0 h-full"
                style={{left: (INTRO_W + i) * w, width: w}}
              >
                <div
                  className="m-object absolute top-1/2 -translate-y-1/2"
                  style={{
                    width: m.id === 'signet' ? Math.min(w * 0.56, h * 1.2) : Math.min(w * 0.5, h * 1.08),
                    ...(objectRight ? {right: w * 0.06} : {left: m.id === 'signet' ? w * 0.03 : w * 0.06}),
                  }}
                >
                  <HeroObject m={m} play={struck[i]} />
                </div>
                <div
                  id={`moment-${m.id}`}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{width: w * 0.32, ...(objectRight ? {left: w * 0.07} : {left: w * 0.61})}}
                >
                  <Copy m={m} staggerClass="m-item" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Where you are on the track */}
        <div
          className={`absolute left-[7vw] bottom-7 flex items-center gap-6 px-5 py-3 rounded-full bg-brand-paper/90 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(26,26,26,0.25)] text-[10px] font-bold uppercase tracking-[0.25em] font-sans transition-opacity duration-500 ${
            active >= 0 ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <span className="text-brand-orange">02 · Now Shipping</span>
          <span className="relative w-24 h-px bg-brand-ink/15 overflow-hidden">
            <span className="m-progress absolute inset-0 bg-brand-orange origin-left" style={{transform: 'scaleX(0)'}} />
          </span>
          {MOMENTS.map((m, i) => (
            <span key={m.id} className={`transition-colors duration-300 ${i === active ? 'text-brand-ink' : 'text-brand-ink/25'}`}>
              {m.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The stacked version: narrow screens and reduced motion ───────────────── */

function Stacked() {
  return (
    <section id="shipping" className="relative bg-brand-paper py-28 md:py-40 px-6 md:px-10 overflow-hidden">
      <div className="relative max-w-[100rem] mx-auto">
        <Intro className="mb-24 md:mb-32" itemClass="pp-reveal" />
        <div className="space-y-32 md:space-y-44">
          {MOMENTS.map((m) => (
            <article key={m.id} className="grid lg:grid-cols-2 gap-x-16 gap-y-14 items-center">
              <div className={`pp-reveal ${m.side === 'right' ? 'lg:order-2' : ''} max-w-2xl w-full mx-auto pb-[8%]`}>
                <HeroObject m={m} />
              </div>
              <Copy m={m} staggerClass="pp-reveal" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Flagships() {
  const sideways = useSideways();
  return sideways ? <Sideways /> : <Stacked />;
}

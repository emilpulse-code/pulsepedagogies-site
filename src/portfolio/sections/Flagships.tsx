import {useLayoutEffect, useRef} from 'react';
import type {ComponentType} from 'react';
import {ArrowRight} from 'lucide-react';
import {gsap, ScrollTrigger} from '../lib/gsapSetup';
import {GuardrailConcept, SealConcept, StrandsConcept} from '../components/concepts';

/**
 * Section 02 — "Now Shipping", as three stations on the orange line.
 *
 * ── Why this replaced the old section 02 ────────────────────────────────────
 * The previous version tried to be a product page: a full narrative for
 * clearAMS beside a live 80/20 widget, a walkthrough video under it, then a
 * second narrative for Signet with two more widgets. Accurate, and the tallest
 * thing on the site — three screens of small type and interactive controls
 * dropped into the middle of a scroll sequence that is otherwise cinematic. It
 * read as a brochure stapled into a film. Everything in it still exists, on
 * /products, where a visitor who wants that much has gone looking for it.
 *
 * What sits here instead is the line. Section 03 already drew an orange ribbon
 * down itself as you scrolled and then hid it behind a wall of copy; that
 * gesture is the best thing on the page, so it starts here now and the products
 * hang off it. Each station gets a concept mark (see `components/concepts.tsx`),
 * a name, one sentence, and one link. Nothing to read, nothing to operate.
 *
 * The line exits the bottom of this section at x≈330/1000 because that is where
 * section 03's ribbon enters (`M 330 -80` in `Work.tsx`). The two are drawn as
 * separate paths in separate scroll contexts — one continuous SVG across a
 * section boundary would have to survive both sections' pins — but they meet,
 * so the eye reads one stroke running the length of the page. Move one and move
 * the other.
 */

interface Station {
  id: string;
  n: string;
  name: string;
  status: string;
  /** Whether the status pill gets the live dot. */
  live: boolean;
  /** The concept, in the fewest words that still make a claim. */
  claim: string;
  line: string;
  Mark: ComponentType<{className?: string}>;
}

const STATIONS: Station[] = [
  {
    id: 'vapa-pulse',
    n: '01',
    name: 'VAPA Pulse',
    status: 'Live in production',
    live: true,
    claim: 'Five disciplines. One engine.',
    line: 'Theatre, Music, Dance, Visual Art and Media Art arrive as one standards-aligned lesson a generalist teacher can actually run.',
    Mark: StrandsConcept,
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
  },
];

/* The curve itself, shared by every stroke that draws it. */
const SPINE_D = `M 500 -40
   C 520 200, 790 280, 800 470
   C 812 740, 190 790, 182 1060
   C 176 1310, 258 1390, 272 1580
   C 296 1880, 812 1850, 800 2090
   C 792 2258, 338 2282, 315.5 2400
   L 293 2520`;

/* ── Handing off to section 03's ribbon ─────────────────────────────────────
   Three things have to agree at the boundary or the seam shows, and all three
   were wrong at some point:

   1. POSITION. 315.5 is not a round number by accident: it is where Work.tsx's
      ribbon actually crosses y=0, measured rather than guessed. That path
      starts at `M 330 -80` and has already curved left by the time it reaches
      the section edge, so ending this one at 330 left a ~20px step.

   2. DIRECTION. The ribbon leaves `M 330 -80` toward `280 160` — about 12° off
      straight down. This curve used to arrive almost sideways (~64° off), so a
      dart met a column and the join read as a broken shard no matter how well
      the x lined up. The last control point is now 338 2282, which brings it in
      at ~11°.

   3. WIDTH, and no end cap. The taper ends at exactly the ribbon's stroke width
      (see TAPER_W1), and the path runs 120 units PAST the section bottom. The
      section clips at 2400, so the shape has no visible end — it is cut by the
      boundary itself, which is precisely where the ribbon takes over. Trying to
      land a flat cap exactly on the edge is what produced the wedge.

   Re-draw the ribbon and all three need re-measuring. */
const VB_H = 2400;

/* The line does not stop at the section boundary — it swells into the ribbon
   section 03 draws down itself, so the two read as one stroke running the
   length of the page.
 *
 * A stroke cannot change width along its length. The first attempt at this
 * stacked four strokes of increasing width over the tail of the curve, which
 * rendered as four separate round-capped lozenges — a caterpillar, not a
 * taper. So the swell is a filled shape instead: walk the tail of the curve,
 * offset each sample perpendicular to the direction of travel by a width that
 * ramps from hairline to the ribbon's, and close the two edges into one
 * polygon. */
/* Where the swell begins, as a fraction of the curve. Late on purpose: at 0.72
   it started level with the third station and swept a 95px bar of orange
   through the Signet seal. It belongs in the empty run below the last station,
   where the only thing it can collide with is the section boundary it is aimed
   at. */
const TAPER_FROM = 0.85;
const TAPER_W0 = 3;
/* Exactly Work.tsx's `strokeWidth="72"`, not an approximation. Both svgs now
   measure the same pixel width over the same 1000-unit viewBox, and neither
   uses non-scaling-stroke, so 72 user units is the same number of pixels in
   both — the widths match by construction rather than by eye. */
const TAPER_W1 = 72;

function taperedTail(path: SVGPathElement, steps = 64) {
  const total = path.getTotalLength();
  const near: string[] = [];
  const far: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const len = total * (TAPER_FROM + (1 - TAPER_FROM) * t);
    const p = path.getPointAtLength(len);
    // Direction of travel, for the perpendicular. Sampling slightly ahead is
    // enough; the curve has no corners.
    const q = path.getPointAtLength(Math.min(total, len + 1));
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const m = Math.hypot(dx, dy) || 1;
    const nx = -dy / m;
    const ny = dx / m;
    // Ease the ramp so the swell starts imperceptibly rather than as a wedge.
    const half = (TAPER_W0 + (TAPER_W1 - TAPER_W0) * (t * t)) / 2;
    near.push(`${(p.x + nx * half).toFixed(1)},${(p.y + ny * half).toFixed(1)}`);
    far.push(`${(p.x - nx * half).toFixed(1)},${(p.y - ny * half).toFixed(1)}`);
  }

  return `M ${near.join(' L ')} L ${far.reverse().join(' L ')} Z`;
}

export function Flagships() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const line = root.querySelector('.pp-spine-path') as SVGPathElement | null;
    const swell = root.querySelector('.pp-spine-swell') as SVGPathElement | null;
    const maskPath = root.querySelector('.pp-spine-mask-path') as SVGPathElement | null;

    /* Outside the matchMedia on purpose. This is geometry, not animation: under
       prefers-reduced-motion nothing below runs, and a swell still holding
       d="" would leave the line ending in a hairline at the section boundary
       while the ribbon below it starts at full width. Built from the hairline's
       own curve so the two cannot drift apart when it is edited. */
    if (line && swell) swell.setAttribute('d', taperedTail(line));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (!line) return;

        const len = line.getTotalLength();
        const drawn = [line, maskPath].filter(Boolean) as SVGPathElement[];
        drawn.forEach((p) => gsap.set(p, {strokeDasharray: len, strokeDashoffset: len}));

        /* The swell is filled, so it cannot be dash-drawn itself. It is masked
           by a fat stroke of the same curve carrying the same dash offset — so
           the reveal travels ALONG the line instead of down the page. A clip
           rect was tried first and read as a wedge floating free of the line,
           because a horizontal edge has nothing to do with where the curve
           actually is. */

        /* Height lookup, so the line can be drawn to a PAGE POSITION rather
           than to a fraction of its own length.
         *
         * Scrubbing length against scroll looks right only if the curve runs
         * straight down. This one sweeps most of the way across the section
         * twice, and on those sweeps it spends a lot of length gaining very
         * little height — so the leading tip fell further and further behind
         * the reader and ended up hanging in the middle of the screen with
         * blank paper under it. That is the "break".
         *
         * Sampling y at fixed length intervals gives the inverse: ask for a
         * height, get the length that reaches it. 240 samples over ~3000 user
         * units is finer than a pixel once scaled, and it is built once. */
        const SAMPLES = 240;
        const ys: number[] = [];
        for (let i = 0; i <= SAMPLES; i++) ys.push(line.getPointAtLength((i / SAMPLES) * len).y);

        const lengthAtY = (y: number) => {
          if (y <= ys[0]) return 0;
          for (let i = 1; i <= SAMPLES; i++) {
            if (ys[i] >= y) {
              const span = ys[i] - ys[i - 1] || 1;
              return ((i - 1 + (y - ys[i - 1]) / span) / SAMPLES) * len;
            }
          }
          return len;
        };

        /* Draw the line to exactly the bottom edge of the viewport. The tip is
           then always just off-screen, so the line reads as running off the
           bottom of the page rather than stopping somewhere in it. */
        const draw = () => {
          const r = root.getBoundingClientRect();
          if (r.height <= 0) return;
          const edge = ((window.innerHeight - r.top) / r.height) * VB_H;
          const off = String(len - lengthAtY(edge));
          drawn.forEach((p) => {
            p.style.strokeDashoffset = off;
          });
        };

        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: draw,
          onRefresh: draw,
        });
        // Covers a load that restores scroll position inside the section.
        draw();

        return () => st.kill();
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="shipping"
      className="relative bg-brand-paper pb-28 md:pb-40 px-6 md:px-10 overflow-hidden"
    >
      {/* ── The line ──
          Stretched to the section with preserveAspectRatio="none". Sits above
          the paper and under the content.

          NOTE: no `vector-effect="non-scaling-stroke"` on the drawn path, and
          that is deliberate. It keeps the stroke a constant screen width, but
          it also makes stroke-dasharray/offset resolve in SCREEN units while
          getTotalLength() still reports USER units — so the dash and the
          geometry disagree, and the drawn tip lands short of where it was
          computed to land. The line now scales with the section the same way
          section 03's ribbon does, which is also what keeps their widths equal
          at the seam. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 2400"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          {/* Wider than the swell is ever thick, so it reveals and never
              trims. Both the mask stroke and the swell are distorted by
              preserveAspectRatio="none" identically, so the margin holds. */}
          <mask id="pp-spine-reveal" maskUnits="userSpaceOnUse" x="-120" y="-240" width="1240" height="2880">
            <path
              className="pp-spine-mask-path"
              d={SPINE_D}
              fill="none"
              stroke="#fff"
              strokeWidth="130"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* The swell, under the hairline so the hairline stays crisp against
            it. `d` is written by the effect from the curve below. */}
        <path className="pp-spine-swell" d="" fill="#FF6321" opacity="0.9" mask="url(#pp-spine-reveal)" />

        <path
          className="pp-spine-path"
          d={SPINE_D}
          fill="none"
          stroke="#FF6321"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      <div className="relative max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">02</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Now Shipping</span>
        </div>

        <h2 className="pp-reveal font-serif font-light text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] mb-8">
          Two in production. <br />
          <span className="italic text-brand-orange">One landing.</span>
        </h2>

        <p className="pp-reveal font-serif font-light text-xl md:text-2xl leading-snug text-brand-ink/70 max-w-2xl mb-24 md:mb-36">
          The three products furthest along. Each one is a single idea carried all
          the way to something a school can use on Monday.
        </p>

        {/* ── The stations ──
            Alternating sides, so the line passes behind the gap between the
            mark and the copy rather than through either of them. */}
        <div className="space-y-32 md:space-y-48">
          {STATIONS.map((s, i) => {
            const markFirst = i % 2 === 1;
            return (
              <article
                key={s.id}
                className="grid lg:grid-cols-[1fr_1.1fr] gap-x-16 xl:gap-x-24 gap-y-12 items-center"
              >
                {/* The concept mark */}
                <div
                  className={`pp-reveal ${markFirst ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <s.Mark className="w-full max-w-[34rem] mx-auto" />
                </div>

                {/* The claim */}
                <div className={markFirst ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="pp-reveal flex flex-wrap items-center gap-4 mb-7">
                    <span className="font-serif font-light text-2xl text-brand-orange leading-none tabular-nums">
                      {s.n}
                    </span>
                    <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-orange/12 text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                      {s.live && (
                        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
                        </span>
                      )}
                      {s.status}
                    </span>
                  </div>

                  <h3 className="pp-reveal font-serif font-light text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] mb-5">
                    {s.name}
                  </h3>

                  <p className="pp-reveal font-serif font-light italic text-brand-orange text-[clamp(1.35rem,2.4vw,2.1rem)] leading-tight mb-7">
                    {s.claim}
                  </p>

                  <p className="pp-reveal text-brand-ink/60 text-lg leading-relaxed max-w-xl mb-9">
                    {s.line}
                  </p>

                  {/* One destination per station. The outbound links to the
                      products' own sites live on /products, next to the detail
                      that earns the click — not scattered down the reel. */}
                  <a
                    href={`/products#${s.id}`}
                    className="pp-reveal group inline-flex items-center gap-2 text-lg font-medium text-brand-ink hover:text-brand-orange transition-colors"
                  >
                    See how {s.name} works
                    <ArrowRight className="w-5 h-5 text-brand-orange group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {useLayoutEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {gsap} from '../lib/gsapSetup';
import {PIPELINE, type PipelineApp} from '../../data/apps';
import {AppDetail} from '../components/AppDetail';

const FLAGSHIP_VIDEO =
  'https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/iframe?poster=' +
  encodeURIComponent(
    'https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/thumbnails/thumbnail.jpg?time=&height=900',
  );

// First half of the pipeline lives here as the flipping works list;
// the remaining apps orbit in the RingGallery section that follows.
const LIST_APPS = PIPELINE.slice(0, 5);

export function Work({onOpenForm}: {onOpenForm: () => void}) {
  const rootRef = useRef<HTMLElement>(null);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [detail, setDetail] = useState<PipelineApp | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Orange ribbon draws itself down the section as it scrolls into view
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const path = root.querySelector<SVGPathElement>('.pp-ribbon-path');
        if (!path) return;
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          {strokeDasharray: len, strokeDashoffset: len},
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {trigger: root, start: 'top 75%', end: 'bottom bottom', scrub: 1},
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const previewApp = LIST_APPS[previewIdx];

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative z-10 bg-brand-ink text-brand-paper rounded-t-[48px] md:rounded-t-[80px] py-28 md:py-40 overflow-hidden"
    >
      {/* Brand ribbon — curves grow more dramatic the deeper you scroll */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 2400"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 h-full w-screen pointer-events-none opacity-90"
      >
        <path
          className="pp-ribbon-path"
          d="M 330 -80
             C 280 160, 300 320, 380 470
             C 460 620, 580 670, 545 850
             C 505 1060, 170 1090, 195 1330
             C 220 1590, 840 1500, 925 1790
             C 1000 2020, 1070 2150, 1190 2310"
          fill="none"
          stroke="#FF6321"
          strokeWidth="72"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-10">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-paper/40 font-sans">
          <span className="text-brand-orange">02</span>
          <span className="w-10 h-px bg-brand-paper/20 self-center" />
          <span>Selected Work</span>
        </div>

        <h2 className="pp-reveal font-serif font-light text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] mb-20 md:mb-28">
          Ten products. <br />
          <span className="italic text-brand-orange">One heartbeat.</span>
        </h2>

        {/* ── Flagship: VAPA Pulse ── */}
        <div className="pp-flagship max-w-5xl mb-28 md:mb-36">
          <div className="pp-reveal">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-[11px] font-bold uppercase tracking-[0.2em] mb-6 font-sans">
              Flagship · In Development
            </p>
            <h3 className="font-serif font-light text-5xl md:text-7xl mb-6">
              VAPA <span className="italic text-brand-orange">Pulse</span>
            </h3>
            <p className="text-brand-paper/65 text-lg leading-relaxed mb-8 max-w-xl">
              The world's first Artistic Intelligence Engine — a mobile-first app that
              turns any TK–6 generalist teacher into a confident, standards-aligned arts
              educator across Theatre, Music, Dance, Visual Art, and Media Art.
            </p>
            <ul className="flex flex-wrap gap-3 mb-10 text-[11px] font-bold uppercase tracking-[0.2em] font-sans">
              {['TK–6', '5 Disciplines', 'Prop 28 Ready', 'Mobile-First'].map((chip) => (
                <li key={chip} className="px-4 py-2 rounded-full border border-brand-paper/15 text-brand-paper/60">
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="pp-reveal relative mb-10">
            <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden border border-brand-paper/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] bg-black">
              <div className="relative w-full aspect-video">
                <iframe
                  src={FLAGSHIP_VIDEO}
                  title="VAPA Pulse — flagship product video"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                />
              </div>
              <p className="pointer-events-none absolute top-4 left-6 right-6 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/50 font-sans">
                Artistic Intelligence Engine · vapapulse.com
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-brand-orange/25 rounded-full blur-3xl pointer-events-none" />
          </div>

          <a
            href="https://vapapulse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-reveal group inline-flex items-center gap-2 text-lg font-medium text-brand-orange hover:text-brand-paper transition-colors"
          >
            Visit the live proof of concept
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* ── The Development Pipeline: flipping works list + live preview ── */}
        <div className="flex items-end justify-between mb-10">
          <h3 className="pp-reveal font-serif font-light text-3xl md:text-5xl">
            The <span className="italic text-brand-orange">Development Pipeline</span>
          </h3>
          <p className="pp-reveal text-[10px] font-bold uppercase tracking-[0.3em] text-brand-paper/35 font-sans">
            Click a product →
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-20 items-start">
          {/* The list — names flip on hover, lukebaffait works-list style */}
          <ul className="pp-reveal">
            {LIST_APPS.map((app, i) => (
              <li key={app.id}>
                <button
                  type="button"
                  onMouseEnter={() => setPreviewIdx(i)}
                  onFocus={() => setPreviewIdx(i)}
                  onClick={() => setDetail(app)}
                  className="group w-full text-left py-5 md:py-6 border-b border-brand-paper/10 flex items-center gap-5 md:gap-8 cursor-pointer"
                >
                  <span className="shrink-0 w-9 text-[10px] font-bold tracking-[0.2em] text-brand-paper/30 font-sans">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 block h-[1.15em] overflow-hidden font-serif font-light text-[clamp(2.2rem,4.8vw,4.2rem)]">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:[transform:translateY(-50%)]">
                      <span className="block leading-[1.15] text-brand-paper/35">{app.name}</span>
                      <span className="block leading-[1.15] italic text-brand-orange">{app.name}</span>
                    </span>
                  </span>
                  <span className="hidden md:block shrink-0 max-w-[180px] text-right text-[9px] font-bold uppercase tracking-[0.2em] text-brand-paper/30 font-sans">
                    {app.audience}
                  </span>
                  <ArrowUpRight className="shrink-0 w-5 h-5 text-brand-orange opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </li>
            ))}

            {/* End-cap CTA row — opens the inquiry form */}
            <li>
              <button
                type="button"
                onClick={onOpenForm}
                className="group w-full text-left py-5 md:py-6 border-b border-brand-paper/10 flex items-center gap-5 md:gap-8 cursor-pointer"
              >
                <span className="shrink-0 w-9 text-[10px] font-bold tracking-[0.2em] text-brand-orange/60 font-sans">
                  {String(LIST_APPS.length + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 block h-[1.15em] overflow-hidden font-serif font-light text-[clamp(1.6rem,4vw,3.4rem)]">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:[transform:translateY(-50%)]">
                    {/* paper, not orange — the ribbon behind must never swallow it */}
                    <span className="block leading-[1.15] text-brand-paper">Your product, designed next.</span>
                    <span className="block leading-[1.15] italic text-brand-paper/90">Start the conversation</span>
                  </span>
                </span>
                <ArrowRight className="shrink-0 w-5 h-5 text-brand-orange group-hover:translate-x-1.5 transition-transform" />
              </button>
            </li>
          </ul>

          {/* The floating preview card */}
          <div className="pp-reveal hidden lg:block sticky top-28">
            <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/35 font-sans">
              <span>
                {String(previewIdx + 1).padStart(2, '0')} · {previewApp.suite}
              </span>
              <span>Preview</span>
            </div>
            <div className="relative aspect-[4/3] rounded-[28px] border border-brand-paper/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] overflow-hidden">
              {LIST_APPS.map((app, i) => (
                <img
                  key={app.id}
                  src={app.image}
                  alt={`${app.name} interface preview`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-contain p-10 drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)] transition-all duration-500 ${
                    i === previewIdx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-[0.97]'
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-brand-paper/50 leading-relaxed min-h-[3.5rem]">
              {previewApp.tagline}
            </p>
          </div>
        </div>
      </div>

      <AppDetail app={detail} onClose={() => setDetail(null)} />
    </section>
  );
}

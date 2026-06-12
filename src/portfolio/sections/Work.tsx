import {useLayoutEffect, useRef} from 'react';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {gsap} from '../lib/gsapSetup';
import {SUITES} from '../../data/apps';

const FLAGSHIP_VIDEO =
  'https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/iframe?poster=' +
  encodeURIComponent(
    'https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/thumbnails/thumbnail.jpg?time=&height=900',
  );

const PRICING_LABEL = {free: 'Free', freemium: 'Freemium', paid: 'Paid'} as const;

const CARDS = SUITES.flatMap((suite) =>
  suite.apps.map((app) => ({...app, suite: suite.label})),
);

export function Work({onOpenForm}: {onOpenForm: () => void}) {
  const rootRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned horizontal gallery — desktop, motion allowed
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const gallery = galleryRef.current;
        const track = trackRef.current;
        if (!gallery || !track) return;
        const distance = () => track.scrollWidth - gallery.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            start: 'top 12%',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative z-10 bg-brand-ink text-brand-paper rounded-t-[48px] md:rounded-t-[80px] py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[100rem] mx-auto px-6 md:px-10">
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

        {/* ── Suite gallery header ── */}
        <div className="flex items-end justify-between mb-10">
          <h3 className="pp-reveal font-serif font-light text-3xl md:text-5xl">
            The <span className="italic text-brand-orange">Development Pipeline</span>
          </h3>
          <p className="pp-reveal text-[10px] font-bold uppercase tracking-[0.3em] text-brand-paper/35 font-sans">
            <span className="hidden lg:inline">Scroll to explore</span>
            <span className="lg:hidden">Swipe</span> →
          </p>
        </div>
      </div>

      {/* ── Horizontal gallery: GSAP-pinned on desktop, snap-scroll on mobile ── */}
      <div
        ref={galleryRef}
        className="overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none pp-scrollbar-none"
      >
        <div ref={trackRef} className="flex gap-5 md:gap-6 w-max px-6 md:px-10 pb-4">
          {CARDS.map((app, i) => (
            <article
              key={app.id}
              className="group snap-start shrink-0 w-[80vw] sm:w-[420px] lg:w-[460px] min-h-[440px] md:min-h-[500px] rounded-[28px] md:rounded-[36px] border border-brand-paper/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-8 md:p-10 flex flex-col justify-between hover:border-brand-orange/40 transition-colors duration-500"
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <span className="font-serif italic font-light text-6xl md:text-7xl leading-none text-brand-paper/15 group-hover:text-brand-orange/60 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="px-3 py-1.5 rounded-full border border-brand-orange/30 text-brand-orange text-[9px] font-bold uppercase tracking-[0.2em] font-sans text-right">
                    {app.suite}
                  </span>
                </div>
                <h4 className="font-serif text-4xl md:text-5xl font-light mb-1">{app.name}</h4>
                {app.subtitle && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/35 mb-4 font-sans">
                    {app.subtitle}
                  </p>
                )}
                <p className="mt-4 text-brand-paper/60 leading-relaxed">{app.tagline}</p>
              </div>

              <div className="mt-10 pt-6 border-t border-brand-paper/10 flex items-center justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-paper/40 font-sans">
                  {app.audience}
                </p>
                <span className="shrink-0 px-3 py-1 rounded-full bg-brand-paper/5 text-brand-paper/50 text-[9px] font-bold uppercase tracking-[0.2em] font-sans">
                  {PRICING_LABEL[app.pricing]}
                </span>
              </div>
            </article>
          ))}

          {/* End-cap CTA card — opens the inquiry form */}
          <button
            type="button"
            onClick={onOpenForm}
            className="group snap-start shrink-0 w-[80vw] sm:w-[420px] lg:w-[460px] min-h-[440px] md:min-h-[500px] rounded-[28px] md:rounded-[36px] bg-brand-orange text-brand-ink p-8 md:p-10 flex flex-col justify-between text-left cursor-pointer hover:bg-brand-paper transition-colors duration-500"
          >
            <span className="font-serif italic font-light text-6xl md:text-7xl leading-none opacity-30">
              {String(CARDS.length + 1).padStart(2, '0')}
            </span>
            <div>
              <h4 className="font-serif font-light text-4xl md:text-5xl leading-tight mb-6">
                Your product, <br />
                <span className="italic">designed next.</span>
              </h4>
              <span className="inline-flex items-center gap-2 font-medium text-lg">
                Start the conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

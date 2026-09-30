import {ArrowUpRight} from 'lucide-react';
import {SPOTLIGHT} from '../../data/spotlight';
import {GuardrailDemo} from '../components/GuardrailDemo';
import {Walkthroughs} from '../components/Walkthroughs';

/**
 * Section 02 — "Now Shipping".
 *
 * Sits between Philosophy and Selected Work on purpose. Everything in Work is
 * flagship-in-development or pipeline; this is the one product a visitor can
 * open right now, which makes it the page's strongest proof and the wrong
 * thing to bury under ten things that haven't shipped.
 *
 * Kept on brand-paper rather than brand-ink so Work's rounded dark cap still
 * lands against a light section above it — and so "shipped" reads visually
 * distinct from the dark pipeline that follows.
 */
export function Spotlight() {
  const app = SPOTLIGHT;

  return (
    <section id="shipping" className="bg-brand-paper pb-28 md:pb-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">02</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Now Shipping</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 xl:gap-28 items-start">
          {/* ── Narrative half ── */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="pp-reveal flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-orange/12 text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
                </span>
                {app.status}
              </span>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/45 hover:text-brand-ink transition-colors font-sans"
              >
                {app.urlLabel}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <h2 className="pp-reveal font-serif font-light text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.95] mb-5">
              {app.name}
            </h2>

            <p className="pp-reveal font-serif font-light italic text-brand-orange text-[clamp(1.5rem,2.6vw,2.4rem)] leading-tight mb-8">
              {app.headline}
            </p>

            <p className="pp-reveal font-serif font-light text-xl md:text-2xl leading-snug text-brand-ink/85 mb-6 max-w-2xl">
              {app.tagline}
            </p>

            <p className="pp-reveal text-brand-ink/55 leading-relaxed mb-9 max-w-2xl">
              {app.body}
            </p>

            <ul className="pp-reveal flex flex-wrap gap-2.5 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
              {app.chips.map((chip) => (
                <li
                  key={chip}
                  className="px-3.5 py-2 rounded-full border border-brand-ink/15 text-brand-ink/50"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-reveal group inline-flex items-center gap-2 text-lg font-medium text-brand-ink hover:text-brand-orange transition-colors"
            >
              Visit the live product
              <ArrowUpRight className="w-5 h-5 text-brand-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* ── Interactive half ── */}
          {app.demo && (
            <div className="pp-reveal">
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-3 font-sans">
                  Try the guardrail
                </p>
                <p className="text-brand-ink/55 leading-relaxed max-w-md">
                  Toggle the lines on this sample plan. Both Prop 28 rules answer live — the
                  allocation ceiling and the {app.demo.staffFloor * 100}% arts-staffing floor —
                  so a plan that would create exposure can never be saved in the first place.
                </p>
              </div>
              <GuardrailDemo config={app.demo} />
            </div>
          )}
        </div>

        {/* ── Walkthroughs ── */}
        {app.walkthroughs && (
          <div className="mt-24 md:mt-32">
            <Walkthroughs items={app.walkthroughs} />
          </div>
        )}

        {/* ── Proof stats ── */}
        <div className="mt-24 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {app.stats.map((stat) => (
            <div key={stat.label} className="pp-reveal border-t border-brand-ink/15 pt-6">
              <div className="font-serif font-light text-5xl md:text-6xl text-brand-ink tabular-nums">
                {stat.value}
              </div>
              <p className="mt-3 text-sm text-brand-ink/55 leading-relaxed max-w-[16rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

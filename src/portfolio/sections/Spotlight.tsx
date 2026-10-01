import {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {SPOTLIGHT} from '../../data/spotlight';
import {GuardrailDemo} from '../components/GuardrailDemo';
import {NextToShip} from '../components/NextToShip';
import {WalkthroughStage} from '../components/Walkthroughs';

/**
 * Section 02 — "Now Shipping".
 *
 * Sits between Philosophy and Selected Work on purpose: the newest product to
 * reach production is the page's freshest proof, and the wrong thing to bury
 * under a pipeline of nine that haven't shipped yet.
 *
 * Deliberately a teaser, not the product. Status, name, headline, one line of
 * what it is, the live guardrail, one walkthrough — then out to clearams.app,
 * which is the product's own marketing site and does the selling. Same shape as
 * the VAPA Pulse block in Work: show enough to prove it, then hand off. The
 * section was the tallest on the page when it tried to be the product page too.
 *
 * Kept on brand-paper rather than brand-ink so Work's rounded dark cap still
 * lands against a light section above it — and so "shipped" reads visually
 * distinct from the dark pipeline that follows.
 */
export function Spotlight({onOpenForm}: {onOpenForm: () => void}) {
  const app = SPOTLIGHT;
  const featured = app.walkthroughs?.find((w) => w.id === app.featuredWalkthrough);
  const [playing, setPlaying] = useState(false);

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
            </div>

            <h2 className="pp-reveal font-serif font-light text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.95] mb-5">
              {app.name}
            </h2>

            <p className="pp-reveal font-serif font-light italic text-brand-orange text-[clamp(1.5rem,2.6vw,2.4rem)] leading-tight mb-8">
              {app.headline}
            </p>

            <p className="pp-reveal font-serif font-light text-xl md:text-2xl leading-snug text-brand-ink/85 mb-9 max-w-2xl">
              {app.tagline}
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

            {/* One outbound CTA, not two. The small hostname link that used to
                sit in the status row above pointed at the same place. */}
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-reveal group inline-flex items-center gap-2 text-lg font-medium text-brand-ink hover:text-brand-orange transition-colors"
            >
              Visit {app.urlLabel}
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
                {/* The widget labels both rules in place — don't restate them here. */}
                <p className="text-brand-ink/55 leading-relaxed max-w-md">
                  Toggle the lines on this sample plan. Both Prop 28 rules answer live, and a
                  plan that would create exposure can never be saved in the first place.
                </p>
              </div>
              <GuardrailDemo config={app.demo} />
            </div>
          )}
        </div>

        {/* ── One walkthrough ──
            Four players here made this section as tall as all of Selected Work;
            one is enough to prove the thing is real and running. The rest of the
            product story belongs to clearams.app.
            No stat grid either — Philosophy's sits a few hundred pixels above,
            in the same treatment, and the two read as duplicate scoreboards. */}
        {featured && (
          <div className="pp-reveal mt-20 md:mt-28 max-w-3xl">
            <WalkthroughStage
              item={featured}
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
            <div className="flex items-baseline gap-3 mt-5 mb-2">
              {featured.act && (
                <span
                  className="font-serif font-light text-2xl text-brand-orange leading-none"
                  aria-hidden="true"
                >
                  {featured.act}
                </span>
              )}
              <h3 className="font-serif font-light text-2xl md:text-3xl leading-none">
                {featured.title}
              </h3>
            </div>
            <p className="text-brand-ink/55 leading-relaxed">{featured.blurb}</p>
          </div>
        )}

        <NextToShip onOpenForm={onOpenForm} />
      </div>
    </section>
  );
}

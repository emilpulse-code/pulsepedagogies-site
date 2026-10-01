import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {ArrowUpRight, Mail} from 'lucide-react';
import {SPOTLIGHT} from '../data/spotlight';
import {NEXT_UP} from '../data/signet';
import {GuardrailDemo} from '../portfolio/components/GuardrailDemo';
import {CredentialDemo} from '../portfolio/components/CredentialDemo';
import {SeatDemo} from '../portfolio/components/SeatDemo';
import {WalkthroughStage} from '../portfolio/components/Walkthroughs';
import {PageShell, SectionLabel} from './PageShell';

/**
 * /products — where the detail that used to crowd the landing page lives.
 *
 * The landing page now carries the three shipping products as concept marks on
 * the orange line: a name, a claim, a sentence, a link here. That works only if
 * this page actually pays off the click, so everything that was cut lands here
 * at full size — the flagship video, the live 80/20 guardrail, all four clearAMS
 * walkthroughs, and both Signet widgets.
 *
 * Deliberately NOT a marketing site for any of these. clearAMS has clearams.app
 * and VAPA Pulse has vapapulse.com, both with their own pricing and signup; a
 * second copy of that here would intercept people on the way to it. What this
 * page is, is the studio's own account of three things it built — the problem,
 * the mechanism, and proof the mechanism runs — with the link out placed where
 * someone who wants to buy will find it.
 *
 * Signet is the exception and has no outbound link. Not for want of a domain —
 * `signetsystem.net` and `signetsystems.net` are both held in Cloudflare — but
 * neither is mapped yet, so there is no page to send anyone to, and the licence
 * behind Signet's only deployment forbids using that deployment as a marketing
 * reference. When one of those domains goes live this becomes an ordinary
 * outbound link like the two above it. See the standing note at the top of
 * `data/signet.ts` before adding anything about who runs it.
 *
 * Anchors (`#vapa-pulse`, `#clearams`, `#signet`) are load-bearing: the landing
 * page's three stations link straight to them.
 */

const FLAGSHIP_VIDEO =
  'https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/iframe?poster=' +
  encodeURIComponent(
    'https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/thumbnails/thumbnail.jpg?time=&height=900',
  );

const VAPA_CHIPS = ['TK–6', '5 Disciplines', 'Prop 28 Ready', 'Mobile-First'];

function Chips({items}: {items: string[]}) {
  return (
    <ul className="flex flex-wrap gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
      {items.map((c) => (
        <li key={c} className="px-3.5 py-2 rounded-full border border-brand-paper/15 text-brand-paper/55">
          {c}
        </li>
      ))}
    </ul>
  );
}

function OutLink({href, children}: {href: string; children: ReactNode}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-lg font-medium text-brand-orange hover:text-brand-paper transition-colors"
    >
      {children}
      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </a>
  );
}

/** Heading block shared by the three product sections. */
function ProductHead({
  id,
  n,
  name,
  italic,
  status,
  live,
  claim,
  body,
  chips,
}: {
  id: string;
  n: string;
  name: string;
  italic?: string;
  status: string;
  live: boolean;
  claim: string;
  body: string;
  chips: string[];
}) {
  return (
    <>
      {/* scroll-mt clears the anchor from under nothing in particular here —
          this page has no fixed header — but keeps a little air above the
          heading when arriving from the landing page's station link. */}
      <div id={id} className="scroll-mt-10" />
      <SectionLabel n={n}>{name}</SectionLabel>

      <div className="max-w-3xl mb-12 md:mb-16">
        <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-7 rounded-full bg-brand-orange/15 text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
          {live && (
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
            </span>
          )}
          {status}
        </span>

        <h2 className="font-serif font-light text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] mb-6">
          {name.replace(italic ?? '', '').trim()}{' '}
          {italic && <span className="italic text-brand-orange">{italic}</span>}
        </h2>

        <p className="font-serif font-light italic text-brand-orange text-[clamp(1.35rem,2.4vw,2.1rem)] leading-tight mb-8">
          {claim}
        </p>

        <p className="text-brand-paper/65 text-lg leading-relaxed">{body}</p>
      </div>

      <div className="mb-12 md:mb-14">
        <Chips items={chips} />
      </div>
    </>
  );
}

export default function ProductsPage() {
  const clearams = SPOTLIGHT;
  const signet = NEXT_UP;
  const [playing, setPlaying] = useState<string | null>(null);

  /* Land on the right product when arriving from a station link.
     The anchors are rendered by React, so the browser's own hash scroll runs
     before they exist and leaves you at the top of the page — which is every
     link in section 02 of the landing page, so this is not an edge case. One
     frame's delay lets the first layout settle before measuring. */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({block: 'start'});
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <PageShell
      eyebrow="Selected Work"
      title={
        <>
          Three products, <br />
          <span className="italic text-brand-orange">in detail.</span>
        </>
      }
      intro="Two are in production and one is landing. Each section below is the problem it was built for, the mechanism that solves it, and something you can run yourself to check that the mechanism is real."
    >
      {/* ═══ VAPA Pulse ═══ */}
      <section className="pb-28 md:pb-40 border-b border-brand-paper/10">
        <ProductHead
          id="vapa-pulse"
          n="01"
          name="VAPA Pulse"
          italic="Pulse"
          status="Live in production"
          live
          claim="Five disciplines. One engine."
          body="The world's first Artistic Intelligence Engine — a mobile-first app that turns any TK–6 generalist teacher into a confident, standards-aligned arts educator across Theatre, Music, Dance, Visual Art, and Media Art. One lesson, aligned to California's five VAPA content standards and the National Core Arts Standards, ready to run in a classroom by a teacher who has never taught a day of arts."
          chips={VAPA_CHIPS}
        />

        <div className="relative mb-10 max-w-5xl">
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

        <OutLink href="https://vapapulse.com">Visit the live product</OutLink>
      </section>

      {/* ═══ clearAMS ═══ */}
      <section className="py-28 md:py-40 border-b border-brand-paper/10">
        <ProductHead
          id="clearams"
          n="02"
          name="clearAMS"
          status={clearams.status}
          live
          claim={clearams.headline}
          body={clearams.body}
          chips={clearams.chips}
        />

        {/* The long-form claims kept with the record in `spotlight.ts`. They
            were cut from the landing page because Philosophy's stat grid sits a
            few hundred pixels above in the same treatment; here there is no
            second scoreboard to collide with. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20 md:mb-28">
          {clearams.stats.map((s) => (
            <div key={s.label} className="border-t border-brand-paper/15 pt-6">
              <div className="font-serif font-light text-5xl md:text-6xl text-brand-orange">
                {s.value}
              </div>
              <p className="mt-3 text-sm text-brand-paper/55 leading-relaxed max-w-[16rem]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {clearams.demo && (
          <div className="mb-20 md:mb-28 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-3 font-sans">
              Try the guardrail
            </p>
            {/* The widget labels both rules in place — don't restate them here. */}
            <p className="text-brand-paper/60 leading-relaxed mb-8">
              Toggle the lines on this sample plan. Both Prop 28 rules answer live, and a plan
              that would create exposure can never be saved in the first place.
            </p>
            <GuardrailDemo config={clearams.demo} />
          </div>
        )}

        {/* All four walkthroughs. The landing page showed one; this is the
            place for the full lifecycle, which is the thing that actually
            explains the product. */}
        {clearams.walkthroughs && (
          <div className="mb-14">
            <h3 className="font-serif font-light text-3xl md:text-5xl mb-4">
              One plan&apos;s <span className="italic text-brand-orange">lifecycle</span>
            </h3>
            <p className="text-brand-paper/55 leading-relaxed max-w-2xl mb-12">
              Three acts in order, and the district desk all three run from. Nothing is
              simulated — these are screen recordings of the running product.
            </p>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-14">
              {clearams.walkthroughs.map((w) => (
                <div key={w.id}>
                  <WalkthroughStage
                    item={w}
                    playing={playing === w.id}
                    onPlay={() => setPlaying(w.id)}
                  />
                  <div className="flex items-baseline gap-3 mt-5 mb-2">
                    {w.act && (
                      <span
                        className="font-serif font-light text-2xl text-brand-orange leading-none"
                        aria-hidden="true"
                      >
                        {w.act}
                      </span>
                    )}
                    <h4 className="font-serif font-light text-xl md:text-2xl leading-none">
                      {w.title}
                    </h4>
                  </div>
                  <p className="text-sm text-brand-paper/55 leading-relaxed">{w.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <OutLink href={clearams.url}>Visit {clearams.urlLabel}</OutLink>
      </section>

      {/* ═══ Signet ═══ */}
      <section className="pt-28 md:pt-40">
        <ProductHead
          id="signet"
          n="03"
          name="Signet"
          status={signet.status}
          live={false}
          claim={signet.headline}
          body={signet.tagline}
          chips={signet.chips}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3 font-sans">
              Verify a credential
            </p>
            <p className="text-brand-paper/60 leading-relaxed mb-8 max-w-md">
              Check the seal against the issuer&apos;s published key — then revoke it. A
              withdrawn credential still resolves, and says so, because revocation is recorded
              rather than deleted.
            </p>
            <CredentialDemo config={signet.credential} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3 font-sans">
              Approve a seat
            </p>
            <p className="text-brand-paper/60 leading-relaxed mb-8 max-w-md">
              Registering is a request, not a reservation. Approving issues the seat, the
              confirmation and the calendar invitation in one act — and approving into a full
              room waitlists rather than failing.
            </p>
            <SeatDemo config={signet.seats} />
          </div>
        </div>

        {/* No outbound link, by licence. See the file note in data/signet.ts. */}
        <a
          href="mailto:emil@pulsepedagogies.com?subject=Signet"
          className="group inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-paper hover:text-brand-ink transition-colors"
        >
          <Mail className="w-5 h-5" />
          Talk to us about Signet
        </a>
      </section>
    </PageShell>
  );
}

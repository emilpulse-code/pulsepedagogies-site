import {ArrowRight} from 'lucide-react';
import {NEXT_UP} from '../../data/signet';
import {CredentialDemo} from './CredentialDemo';
import {SeatDemo} from './SeatDemo';

/**
 * The "next to ship" half of section 02, under the product that already has.
 *
 * Sits inside Now Shipping rather than taking a number of its own: the two
 * belong to one story — one landed, one landing — and a numbered section here
 * would renumber everything below it for a product that isn't out yet.
 *
 * Laid out deliberately unlike the clearAMS block above it, which is
 * narrative-beside-demo. Here the narrative runs full width and the two widgets
 * sit below it, so the shipped product keeps the heavier treatment and this one
 * reads as the lighter note it is.
 *
 * It carries no outbound link on purpose. Signet has no public site to send
 * anyone to, and the licence behind its only deployment forbids using that
 * deployment as a marketing reference, so the only honest call to action is to
 * start a conversation. See the note at the top of `data/signet.ts`.
 */
export function NextToShip({onOpenForm}: {onOpenForm: () => void}) {
  const app = NEXT_UP;

  return (
    <div className="mt-24 md:mt-32 border-t border-brand-ink/15 pt-16 md:pt-20">
      <div className="pp-reveal flex items-baseline gap-5 mb-12 md:mb-14 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
        <span className="text-brand-orange">Next to ship</span>
        <span className="flex-1 h-px bg-brand-ink/10 self-center" />
      </div>

      {/* ── Narrative ── */}
      <div className="grid lg:grid-cols-[auto_1fr] gap-x-16 gap-y-8 items-end mb-14 md:mb-20">
        <div className="max-w-3xl">
          <span className="pp-reveal inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 rounded-full border border-brand-ink/15 text-brand-ink/50 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
            {app.status}
          </span>

          <h3 className="pp-reveal font-serif font-light text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] mb-5">
            {app.name}
          </h3>

          <p className="pp-reveal font-serif font-light italic text-brand-orange text-[clamp(1.35rem,2.4vw,2.2rem)] leading-tight">
            {app.headline}
          </p>
        </div>

        <div className="max-w-xl lg:justify-self-end">
          <p className="pp-reveal text-brand-ink/55 leading-relaxed mb-7">{app.tagline}</p>

          <ul className="pp-reveal flex flex-wrap gap-2.5 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
            {app.chips.map((chip) => (
              <li
                key={chip}
                className="px-3.5 py-2 rounded-full border border-brand-ink/15 text-brand-ink/50"
              >
                {chip}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpenForm}
            className="pp-reveal group inline-flex items-center gap-2 text-lg font-medium text-brand-ink hover:text-brand-orange transition-colors cursor-pointer"
          >
            Talk to us about Signet
            <ArrowRight className="w-5 h-5 text-brand-orange group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── The two demos ──
          Kept to half-width each: the section above already carries a full-size
          widget and a video, and this product has not shipped. */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div className="pp-reveal">
          <div className="mb-5 max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-2.5 font-sans">
              Verify a credential
            </p>
            <p className="text-brand-ink/55 leading-relaxed">
              Check the seal against the issuer's published key — then revoke it. A withdrawn
              credential still resolves, and says so.
            </p>
          </div>
          <CredentialDemo config={app.credential} />
        </div>

        <div className="pp-reveal">
          <div className="mb-5 max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-2.5 font-sans">
              Approve a seat
            </p>
            <p className="text-brand-ink/55 leading-relaxed">
              Registering is a request, not a reservation. Approve into a full room and it
              waitlists rather than failing.
            </p>
          </div>
          <SeatDemo config={app.seats} />
        </div>
      </div>
    </div>
  );
}

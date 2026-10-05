import {Fragment, useState} from 'react';
import type {ReactNode} from 'react';
import {ArrowRight, Mail, ShieldCheck} from 'lucide-react';
import {NEXT_UP, SIGNET_CHAPTERS, SIGNET_OVERVIEW} from '../data/signet';
import {CredentialDemo} from '../portfolio/components/CredentialDemo';
import {SeatDemo} from '../portfolio/components/SeatDemo';
import {StreamStage} from '../portfolio/components/StreamStage';
import {DemoModal} from '../components/DemoModal';
import {PageShell, SectionLabel} from './PageShell';

/**
 * /signet — the page that asks an organization to bring Signet in.
 *
 * ── Why this exists next to /products ───────────────────────────────────────
 * /products says in its own header that it is "deliberately NOT a marketing
 * site for any of these", and that is right: it is the studio's account of
 * three things it built, with the link out placed where someone who wants to
 * buy will find it. VAPA Pulse and clearAMS can be written about that way
 * because each has its own site doing the selling. Signet had neither — no
 * outbound link and no selling surface — so the only page addressed to a buyer
 * was a `mailto:`.
 *
 * This is that surface. It is addressed to one reader: a professional-learning
 * director or district administrator who has never heard of Signet, arriving
 * cold, deciding whether to subscribe for their organization.
 *
 * ── Why it is HERE, and not on signetsystems.net ────────────────────────────
 * Because `signetsystem.net` and `signetsystems.net` are both held in
 * Cloudflare and neither is mapped, and a page that exists beats a page that
 * waits for DNS. When one resolves, this moves: the copy and every video
 * reference already live in `data/signet.ts`, so the port is a re-skin, not a
 * rewrite. See the plan note about the Signet app's root path — it resolves a
 * tenant and redirects, so a marketing front door there needs a home that
 * tenant resolution does not own yet.
 *
 * ── Why there are moving pictures here when Flagships refuses a screenshot ──
 * Not an inconsistency, and worth reading before "fixing" it.
 * `sections/Flagships.tsx` gives Signet a seal instead of a screen because the
 * only running deployment carries a licensee's name in its window title, and
 * the licence note in `data/signet.ts` forbids naming or implying a deployment.
 * These five films were recorded against invented data with nothing
 * identifying in frame, which is the condition that makes them publishable.
 * Any replacement film has to clear the same bar.
 *
 * ── Structure ───────────────────────────────────────────────────────────────
 * Seven and a half minutes of video across five files, so this is not a video
 * grid. It is an argument with a player at each beat, and every beat reads with
 * nothing played: the blurbs carry it, the films prove it. One player runs at a
 * time — see `playing` below, the same single-id pattern /products uses.
 */

function Chips({items}: {items: string[]}) {
  return (
    <ul className="flex flex-wrap gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
      {items.map((c) => (
        <li
          key={c}
          className="px-3.5 py-2 rounded-full border border-brand-paper/15 text-brand-paper/55"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

/** The four numbered beats. `n` comes from the array index, never typed in. */
function Chapter({
  n,
  title,
  blurb,
  takeaway,
  children,
}: {
  n: string;
  title: string;
  blurb: string;
  takeaway: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-20 md:pt-28 first:pt-0">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-16">
          <div className="flex items-baseline gap-4 mb-6 text-[11px] font-bold uppercase tracking-[0.3em] font-sans">
            <span className="text-brand-orange">{n}</span>
            <span className="w-10 h-px bg-brand-paper/20 self-center" />
          </div>
          <h3 className="font-serif font-light text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] mb-6">
            {title}
          </h3>
          <p className="text-brand-paper/60 text-lg leading-relaxed mb-6">{blurb}</p>
          <p className="font-serif font-light italic text-brand-orange text-xl leading-snug">
            {takeaway}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function SignetPage() {
  const signet = NEXT_UP;
  /* One id, so starting a film stops whichever was running. Five iframes all
     live at once would also mean five autoplaying soundtracks. */
  const [playing, setPlaying] = useState<string | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <PageShell
      eyebrow="Signet"
      title={
        <>
          A credential that outlives <br />
          <span className="italic text-brand-orange">the system that issued it.</span>
        </>
      }
      intro={signet.tagline}
    >
      {/* ═══ The overview film ═══ */}
      <section className="pb-24 md:pb-32 border-b border-brand-paper/10">
        <div className="max-w-5xl mb-10">
          <StreamStage
            item={SIGNET_OVERVIEW}
            playing={playing === SIGNET_OVERVIEW.id}
            onPlay={setPlaying}
          />
        </div>

        <div className="max-w-3xl mb-12">
          <p className="text-brand-paper/65 text-lg leading-relaxed mb-8">
            {SIGNET_OVERVIEW.blurb}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="group inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-paper hover:text-brand-ink transition-colors"
            >
              Bring Signet to your organization
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-brand-paper/40 text-sm font-sans">
              {signet.status} · no student data, ever
            </span>
          </div>
        </div>

        <Chips items={signet.chips} />
      </section>

      {/* ═══ The problem ═══ */}
      <section className="py-24 md:py-32 border-b border-brand-paper/10">
        <SectionLabel n="Why">The problem</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <p className="font-serif font-light text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05]">
            Most organizations run professional learning on{' '}
            <span className="italic text-brand-orange">four systems</span> that do not agree with
            each other.
          </p>
          <div className="space-y-6 text-brand-paper/65 text-lg leading-relaxed">
            <p>
              A sign-up form. A calendar. A sign-in sheet that becomes a spreadsheet. And a
              certificate someone types up afterwards. Each one is a separate copy of the same
              facts, and the work of keeping them in step falls on one coordinator who did not
              choose any of them.
            </p>
            <p>
              Signet treats those as one record at four moments in its life — registered,
              scheduled, attended, credentialed. Nothing is re-entered, because there is nothing
              to re-enter it into. And the credential at the end is signed, so it still verifies
              after the staff member leaves, after the budget changes, and after this software is
              gone.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ The four chapters ═══ */}
      <section className="py-24 md:py-32 border-b border-brand-paper/10">
        <SectionLabel n="How">In four parts</SectionLabel>
        <div className="space-y-4">
          {/* Keyed on a Fragment rather than on Chapter itself: a wrapper
              element would make every section the first child of its own
              wrapper and `first:pt-0` would then apply to all four. */}
          {SIGNET_CHAPTERS.map((v, i) => (
            <Fragment key={v.id}>
              <Chapter
                n={String(i + 1).padStart(2, '0')}
                title={v.title}
                blurb={v.blurb}
                takeaway={v.takeaway}
              >
                <StreamStage item={v} playing={playing === v.id} onPlay={setPlaying} />
              </Chapter>
            </Fragment>
          ))}
        </div>
      </section>

      {/* ═══ Proof you can operate ═══
          Both widgets already existed for /products. They are the strongest
          thing on either page: a claim about verification that the reader can
          falsify in ten seconds without talking to anyone. */}
      <section className="py-24 md:py-32 border-b border-brand-paper/10">
        <SectionLabel n="Proof">Try it yourself</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3 font-sans">
              Verify a credential
            </p>
            <p className="text-brand-paper/60 leading-relaxed mb-8 max-w-md">
              Check the seal against the issuer&apos;s published key — then revoke it. A withdrawn
              credential still resolves, and says so, because revocation is recorded rather than
              deleted.
            </p>
            <CredentialDemo config={signet.credential} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3 font-sans">
              Approve a seat
            </p>
            <p className="text-brand-paper/60 leading-relaxed mb-8 max-w-md">
              Registering is a request, not a reservation. Approving issues the seat, the
              confirmation and the calendar invitation in one act — and approving into a full room
              waitlists rather than failing.
            </p>
            <SeatDemo config={signet.seats} />
          </div>
        </div>
      </section>

      {/* ═══ What IT will ask ═══
          Put before the CTA on purpose. In K–12 the person who wants the
          product is rarely the person who can approve it, and these four
          answers are what the approver asks for. */}
      <section className="py-24 md:py-32 border-b border-brand-paper/10">
        <SectionLabel n="Trust">What your IT department will ask</SectionLabel>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl">
          {[
            [
              'No student data.',
              'Signet is a system for staff. There is no student record in it to breach, which takes most of a district privacy review off the table before it starts.',
            ],
            [
              'No passwords.',
              'Staff sign in with the work Google account they already have. Nothing to issue, nothing to reset, and access ends when the account does.',
            ],
            [
              'Open standards, not our format.',
              'Credentials are Open Badges 3.0 and W3C Verifiable Credentials. They verify against a published key with no call home — including after a contract ends.',
            ],
            [
              'Your data stays yours.',
              'A credential already issued keeps verifying whatever happens to the subscription. Nothing about the record is held hostage to renewal.',
            ],
          ].map(([h, p]) => (
            <div key={h}>
              <h3 className="flex items-start gap-3 font-serif font-light text-2xl mb-3">
                <ShieldCheck className="w-5 h-5 mt-1.5 shrink-0 text-brand-orange" />
                {h}
              </h3>
              <p className="text-brand-paper/60 leading-relaxed pl-8">{p}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-brand-paper/45 text-sm font-sans">
          More detail on the{' '}
          <a href="/compliance" className="text-brand-orange hover:text-brand-paper transition-colors">
            compliance page
          </a>
          .
        </p>
      </section>

      {/* ═══ Close ═══ */}
      <section className="pt-24 md:pt-32">
        <div className="max-w-3xl">
          <h2 className="font-serif font-light text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.98] mb-8">
            Bring it to your <span className="italic text-brand-orange">organization.</span>
          </h2>
          <p className="text-brand-paper/65 text-lg leading-relaxed mb-10">
            Signet is sold per organization, with your own domain, your own branding and your own
            credential designs. Tell us roughly how many staff you run professional learning for
            and we will come back with what it looks like for you.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="group inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-paper hover:text-brand-ink transition-colors"
            >
              Request a walkthrough
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="mailto:emil@pulsepedagogies.com?subject=Signet"
              className="group inline-flex items-center gap-2 text-lg font-medium text-brand-paper/70 hover:text-brand-orange transition-colors"
            >
              <Mail className="w-5 h-5" />
              Or just email us
            </a>
          </div>
        </div>
      </section>

      <DemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        heading="Bring Signet to your organization"
        blurb="Tell us about your organization and roughly how many staff you run professional learning for. We will come back with what Signet looks like for you."
        subject="Signet"
        messagePlaceholder="How many staff, what you run today, and what you would want Signet to replace…"
      />
    </PageShell>
  );
}

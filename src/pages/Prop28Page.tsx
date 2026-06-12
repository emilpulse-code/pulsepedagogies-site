import {ArrowUpRight} from 'lucide-react';
import {PageShell, SectionLabel} from './PageShell';

const KEY_FACTS = [
  {value: '~$1B', label: 'New arts education funding per year — 1% of the prior year’s Proposition 98 guarantee'},
  {value: '70 / 30', label: 'Distribution split: 70% by enrollment, 30% weighted to economically disadvantaged students'},
  {value: '80 / 20 / 1', label: '80% personnel · 20% supplies & partnerships · 1% cap on administrative costs'},
  {value: '3 yrs', label: 'Expenditure window per allocation before unspent funds revert to the CDE'},
  {value: '6770', label: 'SACS Resource Code identifying Prop 28 AMS funds (Revenue Code 8590)'},
  {value: '5,400', label: 'New arts teachers California must hire to satisfy the 80% personnel mandate'},
];

const COMPLIANCE_ROWS = [
  {
    metric: 'Personnel Expenditure',
    limit: 'Minimum 80% of total expended funds',
    risk: 'Disallowance of ineligible costs; loss of future funds',
  },
  {
    metric: 'Supplies & Partnerships',
    limit: 'Maximum 20% of total expended funds',
    risk: 'Reversion of unspent or misspent funds',
  },
  {
    metric: 'Administrative / Indirect',
    limit: 'Maximum 1% of the annual allocation',
    risk: 'Potential for total loss of annual allocation',
  },
  {
    metric: 'Expenditure Period',
    limit: 'Three fiscal years per allocation',
    risk: 'Automatic collection and reallocation by the CDE',
  },
  {
    metric: 'Supplement, Not Supplant',
    limit: '2022–23 arts spending baseline must be maintained',
    risk: 'Litigation risk and public fraud allegations',
  },
];

const PAIN_POINTS = [
  {
    who: 'Administrators',
    pain: 'Multi-year SACS compliance, the 80/20/1 audit, and waiver documentation assembled by hand',
  },
  {
    who: 'Teachers',
    pain: 'Credentialing complexity and itinerant scheduling across pooled school sites',
  },
  {
    who: 'Families',
    pain: 'Two-thirds are unsure whether or how Prop 28 is being enacted at their school',
  },
];

export default function Prop28Page() {
  return (
    <PageShell
      eyebrow="Research · Proposition 28"
      title={
        <>
          The $1 billion <span className="italic text-brand-orange">arts mandate.</span>
        </>
      }
      intro="Proposition 28 — the Arts and Music in Schools (AMS) Funding Guarantee and Accountability Act — is the most significant structural change to California’s education funding since LCFF. It guarantees nearly $1 billion a year for arts education, and it arrives wrapped in an architecture of compliance requirements, credentialing bottlenecks, and transparency expectations that most district systems were never built to manage. That gap is exactly where Pulse Pedagogies builds."
    >
      {/* ── Key facts ── */}
      <section className="mb-24 md:mb-32">
        <SectionLabel n="01">The Mandate by the Numbers</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FACTS.map((f) => (
            <div key={f.value} className="rounded-[28px] border border-brand-paper/10 bg-white/[0.03] p-8">
              <p className="font-serif font-light text-5xl md:text-6xl mb-4">
                <span className="text-brand-orange italic">{f.value}</span>
              </p>
              <p className="text-brand-paper/55 leading-relaxed text-sm">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Compliance framework ── */}
      <section className="mb-24 md:mb-32">
        <SectionLabel n="02">The Compliance Framework</SectionLabel>
        <p className="max-w-3xl text-lg text-brand-paper/65 leading-relaxed mb-10">
          Every Prop 28 dollar is tracked through the Standardized Account Code Structure
          (SACS) under Resource Code 6770 and audited annually under Education Code
          Section 41020. Districts must differentiate expenditures by school site and by
          allocation year, prove the 80% personnel threshold across a rolling three-year
          window, and demonstrate that funds expand programs beyond the 2022–23 baseline
          — the “supplement, not supplant” rule that has already drawn litigation against
          large districts.
        </p>
        <div className="rounded-[28px] border border-brand-paper/10 overflow-hidden">
          <div className="hidden md:grid grid-cols-3 gap-6 px-8 py-4 bg-white/[0.04] text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/40 font-sans">
            <span>Compliance Metric</span>
            <span>Statutory Limitation</span>
            <span>Consequence of Non-Compliance</span>
          </div>
          {COMPLIANCE_ROWS.map((row) => (
            <div
              key={row.metric}
              className="grid md:grid-cols-3 gap-2 md:gap-6 px-8 py-6 border-t border-brand-paper/10"
            >
              <p className="font-semibold text-brand-paper">{row.metric}</p>
              <p className="text-brand-paper/60 text-sm md:text-base">{row.limit}</p>
              <p className="text-brand-paper/45 text-sm md:text-base">{row.risk}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The human problem ── */}
      <section className="mb-24 md:mb-32">
        <SectionLabel n="03">The Staffing & Trust Gap</SectionLabel>
        <div className="max-w-3xl space-y-6 text-lg text-brand-paper/65 leading-relaxed mb-12">
          <p>
            Meeting the 80% personnel mandate requires roughly 5,400 new credentialed arts
            teachers — a 50% increase over the statewide pool — while the pipelines for
            Dance and Theatre remain underdeveloped. Districts that cannot hire must file
            “good cause” waivers backed by documented good-faith recruitment efforts,
            today assembled by hand from HR portals, interview notes, and board minutes.
          </p>
          <p>
            Meanwhile, public support has not translated into public trust: 89% of
            Californians call Prop 28 very important, yet only 20% have been involved in
            implementation, and two-thirds of families don’t know how — or whether — it is
            being enacted at their school.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((p) => (
            <div key={p.who} className="rounded-[28px] border border-brand-paper/10 bg-white/[0.03] p-8">
              <h3 className="font-serif font-light text-2xl md:text-3xl mb-3 text-brand-orange italic">
                {p.who}
              </h3>
              <p className="text-brand-paper/55 leading-relaxed">{p.pain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How Pulse responds ── */}
      <section>
        <SectionLabel n="04">How Pulse Pedagogies Responds</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-[28px] md:rounded-[36px] bg-brand-orange text-brand-ink p-8 md:p-12">
            <h3 className="font-serif font-light text-4xl md:text-5xl mb-4">
              VAPA <span className="italic">Pulse</span>
            </h3>
            <p className="leading-relaxed mb-8 text-brand-ink/80">
              The world’s first Artistic Intelligence Engine turns any TK–6 generalist
              teacher into a confident, standards-aligned arts educator across all five
              VAPA disciplines — directly addressing the credentialed-staffing gap at the
              point of instruction, and built to qualify under Prop 28’s 20% strategic
              partnership allocation.
            </p>
            <a
              href="https://vapapulse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium text-lg"
            >
              Visit the live proof of concept
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
          <div className="rounded-[28px] md:rounded-[36px] border border-brand-paper/10 bg-white/[0.03] p-8 md:p-12">
            <h3 className="font-serif font-light text-4xl md:text-5xl mb-4">CPQ</h3>
            <p className="text-brand-paper/60 leading-relaxed">
              The Categorical Program Qualifier gives administrators an immediate,
              rule-based eligibility determination for Prop 28, Title I, Title III, and
              Special Education requisitions — with audit-trail documentation, allowable
              cost summaries, and plain-language rationale generated at the point of
              decision, before the auditor ever asks.
            </p>
          </div>
        </div>
        <p className="mt-10 text-sm text-brand-paper/35 max-w-3xl leading-relaxed">
          Compiled May 2026 from California Department of Education guidance, the
          Commission on Teacher Credentialing, CSBA, Arts for LA, CalMatters, and
          district annual reports.
        </p>
      </section>
    </PageShell>
  );
}

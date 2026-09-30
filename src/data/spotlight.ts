/**
 * The "Now Shipping" spotlight on the landing page.
 *
 * This is deliberately a single swappable object rather than a list: the
 * section exists to feature the ONE newest application that is actually live
 * in production, which is a different claim from the Development Pipeline in
 * `apps.ts` (designed / in build / coming soon). When the next product ships,
 * replace SPOTLIGHT — the section renders whatever is here.
 *
 * `demo` is optional. It drives the interactive guardrail widget, which only
 * makes sense for a product whose core promise is a spend rule. A future
 * spotlight without one renders the narrative half and skips the widget.
 */

export interface DemoLine {
  id: string;
  /** `staff` counts toward the staffing floor; `other` does not. */
  kind: 'staff' | 'other';
  label: string;
  amount: number;
  /** Checked on first render. */
  on: boolean;
}

export interface GuardrailDemoConfig {
  /** Shown in the mock address bar. */
  host: string;
  /** Sample school name + fiscal year shown in the mock app header. */
  school: string;
  fiscalYear: string;
  /** The school's allocation ceiling, in whole dollars. */
  allocation: number;
  /** Minimum share of the plan that must go to staffing, 0–1. */
  staffFloor: number;
  /** Label for the two meter segments. */
  staffLabel: string;
  otherLabel: string;
  lines: DemoLine[];
}

export interface Walkthrough {
  id: string;
  /** YouTube video id — embedded via youtube-nocookie, click-to-load only. */
  youtubeId: string;
  /**
   * Act number, or null. Null is meaningful, not missing: the three numbered
   * acts are one plan's lifecycle told in order, so an unnumbered walkthrough
   * renders apart from them rather than implying a fourth step.
   */
  act: string | null;
  title: string;
  /** Accessible video title, spoken form. */
  label: string;
  duration: string;
  blurb: string;
  poster: string;
}

export interface SpotlightApp {
  id: string;
  name: string;
  /** Rendered in italic orange under the product name. */
  headline: string;
  status: string;
  url: string;
  /** Hostname only — used as the visible link label. */
  urlLabel: string;
  tagline: string;
  body: string;
  chips: string[];
  stats: {value: string; label: string}[];
  demo?: GuardrailDemoConfig;
  walkthroughs?: Walkthrough[];
}

export const SPOTLIGHT: SpotlightApp = {
  id: 'clearams',
  name: 'clearAMS',
  headline: 'Prop 28 plans that survive an audit.',
  status: 'Live in production',
  url: 'https://clearams.app',
  urlLabel: 'clearams.app',
  tagline:
    "The site expenditure planning and audit-evidence platform for California's Arts & Music in Schools program.",
  body:
    'Prop 28 money arrives per school, but the exposure lands on the district — and a finding comes out of the General Fund, not the arts budget. clearAMS runs the per-school proportionality test and the supplement-not-supplant baseline continuously, across every site and every year of the three-year cycle, and keeps the approval trail assembled. When an auditor asks, the answer is a dated evidence packet instead of a month of spreadsheet archaeology.',
  chips: ['Prop 28', 'AB 2440', 'California LEAs', 'Multi-Tenant', 'No Student Data'],
  stats: [
    {value: '80%', label: 'minimum to arts staffing, enforced on every save'},
    {value: '3', label: 'fiscal years of the cycle, reconciled together'},
    {value: '1', label: 'dated evidence packet, instead of a month of reconstruction'},
    {value: '0', label: 'Prop 28 dollars spent on this software'},
  ],
  demo: {
    host: 'yourdistrict.clearams.app',
    school: 'Sample Elementary',
    fiscalYear: 'FY 2026–27',
    allocation: 120_000,
    staffFloor: 0.8,
    staffLabel: 'Arts staff',
    otherLabel: 'Supplies & services',
    lines: [
      {id: 'music', kind: 'staff', label: 'Music teacher, 1.0 FTE', amount: 86_000, on: true},
      {id: 'dance', kind: 'staff', label: 'Dance instructor, after-school stipend', amount: 14_000, on: true},
      {id: 'ukuleles', kind: 'other', label: '24 student ukuleles with cases', amount: 9_500, on: true},
      {id: 'residency', kind: 'other', label: 'Touring theatre residency, 6 weeks', amount: 11_000, on: false},
    ],
  },
  walkthroughs: [
    {
      id: 'planning',
      youtubeId: 'stkFqw4b-xo',
      act: '01',
      title: 'Plan it',
      label: 'Act I, Plan it',
      duration: '2:52',
      blurb:
        'A principal opens a site expenditure plan, enters certificated positions and supplies, and watches the 80/20 guardrail answer in real time — then signs and formalizes it.',
      poster: '/walkthrough/planning.webp',
    },
    {
      id: 'district-review',
      youtubeId: 'gAxH4t7OE_0',
      act: '02',
      title: 'Review and approve',
      label: 'Act II, District review and approval',
      duration: '1:49',
      blurb:
        'The district side: every school’s plan in one queue, a resubmission checked line by line against what was asked, and a decision that either approves the plan or sends back a written request for revisions.',
      poster: '/walkthrough/district-review.webp',
    },
    {
      id: 'waivers',
      youtubeId: 'GXyjuhp4niw',
      act: '03',
      title: 'When it changes',
      label: 'Act III, When it changes',
      duration: '2:35',
      blurb:
        'Mid-year, the plan stops matching the year. A formalized plan is revised, the cap is re-checked against what was actually spent, and a waiver clears the one line that needs it.',
      poster: '/walkthrough/waivers.webp',
    },
    {
      id: 'onboarding',
      youtubeId: 'pCD7R3zv0Pc',
      act: null,
      title: 'And the desk it all runs from',
      label: "From the coordinator's desk",
      duration: '2:10',
      blurb:
        'The district side of the other three: authorizing each person by their district Google account, importing the plans schools already wrote in Word or PDF, splitting a line that puts a year over its allocation, and checking whether something a school wants to buy is already planned.',
      poster: '/walkthrough/onboarding.webp',
    },
  ],
};

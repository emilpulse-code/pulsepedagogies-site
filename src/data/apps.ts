export interface AppEntry {
  id: string;
  name: string;
  subtitle: string;
  audience: string;
  tagline: string;
  problemStatement: string;
  description: string;
  pricing: 'free' | 'freemium' | 'paid';
  collectsStudentData: boolean;
  /** Product mockup shown on the Development Pipeline card (public/pipeline/) */
  image?: string;
  /**
   * `live` — in production. `next` — final development, shipping next.
   * Absent means in design or in build, the default for this catalog.
   */
  status?: 'live' | 'next';
  /** The product's own site, for the few that have one. */
  href?: string;
}

export interface Suite {
  id: string;
  label: string;
  description: string;
  apps: AppEntry[];
}

// ── Compliance & Operations ──────────────────────────────────────────────────

export const complianceOps: AppEntry[] = [
  {
    // Shipped. Deliberately has no `image`: there is no pipeline mockup for a
    // product that is already in production, and it is surfaced on the landing
    // page by its own "Now Shipping" section rather than the pipeline list.
    id: 'clearams',
    name: 'clearAMS',
    subtitle: 'Arts & Music in Schools Planning',
    audience: 'District & Site Administrators',
    status: 'live',
    href: 'https://clearams.app',
    tagline:
      "Site expenditure planning and audit evidence for California's Arts & Music in Schools program.",
    problemStatement:
      'Prop 28 money arrives per school, but the exposure lands on the district — and a finding comes out of the General Fund, not the arts budget.',
    description:
      'clearAMS runs the per-school proportionality test and the supplement-not-supplant baseline continuously, across every site and every year of the three-year cycle, and keeps the approval trail assembled. Principals build site expenditure plans against a live 80/20 guardrail that blocks a non-compliant plan rather than warning about it; the district reviews, approves, or returns each plan with written revision requests; waivers and mid-year revisions are re-checked against what was actually spent. When an auditor asks, the answer is a dated evidence packet instead of a month of spreadsheet archaeology. Multi-tenant per district, and no student data in the system at all.',
    pricing: 'paid',
    collectsStudentData: false,
  },
  {
    id: 'cpq',
    image: '/pipeline/cpq.webp',
    name: 'CPQ',
    subtitle: 'Categorical Program Qualifier',
    audience: 'Administrators & Program Directors',
    tagline: 'Instant categorical funding eligibility determinations with built-in audit documentation.',
    problemStatement:
      'Categorical compliance is costing districts hours they cannot afford — and every mistake is a liability.',
    description:
      'Every misallocated dollar is a liability: audit findings, funding clawbacks, and hours spent reconstructing rationale that should have been captured at the point of decision. Administrators and program directors lose days each month to manual qualification work across Title I, Title III, Arts & Music in Schools (Prop 28), Special Education, and more. CPQ eliminates that exposure: enter the requisition, select the applicable programs, and receive an immediate, rule-based eligibility determination — with audit-trail documentation, allowable cost summaries, and plain-language rationale already written.',
    pricing: 'freemium',
    collectsStudentData: false,
  },
  {
    id: 'adjunct-central',
    image: '/pipeline/adjunct-central.webp',
    name: 'AdjunctCentral',
    subtitle: '',
    audience: 'Adjunct Professors',
    tagline: 'Pay tracking, timesheet generation, and tax reporting for faculty teaching across multiple institutions.',
    problemStatement:
      'Adjunct faculty are the most financially precarious workers in higher education — and the most underdocumented.',
    description:
      'Teaching at two schools this semester and three next quarter? AdjunctCentral tracks your courses, hours, and per-unit pay rates across every institution — semester, quarter, or mixed — and projects your next paycheck in real time. At tax time, export a TurboTax-ready income summary or generate a Schedule C report automatically. Built-in timesheet generation logs your hours per pay period, applies your digital signature, and routes directly to your department coordinator by email — on schedule, without chasing anyone down.',
    pricing: 'paid',
    collectsStudentData: false,
  },
  {
    // Note for anyone editing this entry: Signet's licence waives any right to
    // use a licensee's name, logo, or the existence of their deployment as a
    // marketing reference (ToS §3.1, survives termination). Describe the
    // product, never a customer. Same constraint documented in `signet.ts`.
    id: 'signet',
    image: '/pipeline/signet.webp',
    name: 'Signet',
    subtitle: 'Professional Learning Credentials',
    audience: 'Professional Learning Departments',
    status: 'next',
    tagline:
      'Registration, attendance, and verifiable credentials for professional learning — one record, not four systems.',
    problemStatement:
      'A sign-up sheet cannot tell the difference between someone who has a seat and someone who merely asked for one — and "I attended that training" proves nothing to anyone outside the organization.',
    description:
      'Signet carries a single session from the moment someone registers, through administrative approval, to the record of who attended and the credential they earned for it. The decision that shapes everything else: registering is a request, not a reservation. Approval is the one act that issues the seat, the confirmation email, and the calendar invitation together — seats counted under a database lock, so two administrators working the same queue cannot seat the same person into the last chair, and a full room waitlists rather than fails, promoting the longest-waiting person automatically when a seat is released. Attendance comes from a roster check-in or an imported webinar report, never from memory; payable hours are computed the same way every time. Sessions carrying a badge issue an Open Badges 3.0 credential that is cryptographically signed and independently verifiable — the signature and metadata ride inside the badge image, so an issued credential stays verifiable whether or not the application is still running. Sign-in is Google Workspace only: no passwords stored, nothing to steal or reset. No student data of any kind, and no course content — it is not a learning management system.',
    pricing: 'paid',
    collectsStudentData: false,
  },
  {
    id: 'vitae',
    image: '/pipeline/vitae.webp',
    name: 'Vitae',
    subtitle: '',
    audience: 'College Faculty',
    tagline: 'A real-time CV builder that writes your annual review narrative automatically.',
    problemStatement:
      'Faculty spend weeks every January reconstructing a year of work they already lived.',
    description:
      'Every publication, grant, committee seat, and course — logged as it happens, not reconstructed every January. Vitae builds your CV in real time and generates your annual review narrative automatically. When tenure season or promotion arrives, your dossier is already done. Professor-owned and institution-independent: your data is not locked in your university\'s enterprise system. It travels with you when you move.',
    pricing: 'freemium',
    collectsStudentData: false,
  },
];

// ── Intelligent Classroom ────────────────────────────────────────────────────

export const intelligentClassroom: AppEntry[] = [
  {
    id: 'focusbridge',
    image: '/pipeline/focusbridge.webp',
    name: 'FocusBridge',
    subtitle: '',
    audience: 'Teachers',
    tagline: 'Visual transition timers and a discreet sensory check-in for classrooms that need calm.',
    problemStatement:
      'Classroom transitions are a daily source of anxiety and lost instructional time.',
    description:
      'A classroom transition manager with a visual countdown students can actually feel — choose from a disappearing liquid fill, a slowly completing mosaic, or a soft progress arc so students can anticipate transitions without anxiety. The built-in Sensory Check-in lets students discreetly tap one icon on any shared classroom device to privately alert the teacher\'s tablet that they\'re approaching overload — enabling quiet, dignified support before dysregulation occurs.',
    pricing: 'freemium',
    collectsStudentData: true,
  },
  {
    id: 'skillvault',
    image: '/pipeline/skillvault.webp',
    name: 'SkillVault',
    subtitle: '',
    audience: 'High School Students, Teachers & Mentors',
    tagline: 'Verified competency badges for high school students, granted by teachers and mentors.',
    problemStatement:
      'Students are earning real skills with no verifiable record to show for it.',
    description:
      'A micro-credentialing platform for the skills-based economy. Teachers and community mentors grant verified competency badges to students after witnessing them in action — from Peer Tutoring to Prompt Engineering to Basic Fabrication. Students collect and display earned badges, and each credential generates a portable, verifiable link for email signatures, messages, and digital portfolios. No student self-registers: accounts are provisioned exclusively through district-controlled SIS integration or spreadsheet upload, and every badge is teacher- or mentor-granted — never self-awarded. Purpose-built for FERPA and COPPA compliance.',
    pricing: 'freemium',
    collectsStudentData: true,
  },
  {
    id: 'clearear',
    image: '/pipeline/clearear.webp',
    name: 'ClearEar',
    subtitle: '',
    audience: 'Students & Teachers',
    tagline: 'Real-time speech isolation that delivers crystal-clear teacher audio to any student\'s earbuds.',
    problemStatement:
      'Students with auditory differences lose access to instruction every day — not from lack of technology, but because the wrong technology is in the room.',
    description:
      'The teacher speaks into their own device. ClearEar isolates the speech signal from background classroom noise in real time and delivers crystal-clear audio directly to a student\'s own earbuds — no special hardware, no hearing loop installation. Equitable access to instruction for students with auditory processing differences, hearing challenges, or attention difficulties, on any device they already carry.',
    pricing: 'freemium',
    collectsStudentData: true,
  },
];

// ── Specialized Support ──────────────────────────────────────────────────────

export const specializedSupport: AppEntry[] = [
  {
    id: 'fieldnote',
    image: '/pipeline/fieldnote.webp',
    name: 'FieldNote',
    subtitle: '',
    audience: 'Special Education Teams',
    tagline: 'AI-powered observation notes from a single photo — ready for IEP workflows in seconds.',
    problemStatement:
      'Special education documentation is eating teachers and specialists alive — written from memory, hours after the moment that mattered.',
    description:
      'IEP progress notes, observation records, and workflow entries pile up outside contract hours — reconstructed from memory long after the instructional moment has passed. FieldNote closes that gap: photograph the work sample or classroom moment, and receive structured, progress-monitoring-ready observation notes in seconds. Intelligent visual processing identifies learning patterns, flags progress indicators, and generates documentation ready for existing workflows — at the moment learning actually happens. No sensitive records stored. No reconstruction from memory.',
    pricing: 'freemium',
    collectsStudentData: true,
  },
  {
    id: 'meridian',
    image: '/pipeline/meridian.webp',
    name: 'Meridian',
    subtitle: '',
    audience: 'School Counselors',
    tagline: 'Culturally responsive counseling action plans grounded in ASCA, CASEL, and MTSS frameworks.',
    problemStatement:
      'Counselors carry caseloads that make individualized, research-backed planning nearly impossible — so students in genuine need get generic plans.',
    description:
      'Without time to consult frameworks or literature, action plans default to generic — and students fall through the cracks. Meridian gives every counselor on-demand access to the ASCA National Model, CASEL\'s five SEL competencies, and evidence-based multicultural counseling frameworks. Dial in a case temperature — from structured and clinical (aligned to MTSS Tier 2/3 protocols) to exploratory and open-ended — and receive a culturally responsive, individualized action plan in the time it once took to open the binder. Every plan is counselor-reviewed, ethically grounded, and student-centered.',
    pricing: 'freemium',
    collectsStudentData: true,
  },
];

// ── Flat pipeline (suite label attached) for the portfolio page ─────────────
export interface PipelineApp extends AppEntry {
  suite: string;
}

// ── Assembled suites (for ordered rendering) ────────────────────────────────
export const SUITES: Suite[] = [
  {
    id: 'compliance-ops',
    label: 'Compliance & Operations',
    description: 'Tools that reduce administrative burden, documentation risk, and financial exposure for district leaders and faculty.',
    apps: complianceOps,
  },
  {
    id: 'intelligent-classroom',
    label: 'Intelligent Classroom',
    description: 'Tools that improve the daily instructional environment — for every learner, on every device.',
    apps: intelligentClassroom,
  },
  {
    id: 'specialized-support',
    label: 'Specialized Support',
    description: 'Tools built for the professionals serving students with the highest needs.',
    apps: specializedSupport,
  },
];

export const PIPELINE: PipelineApp[] = SUITES.flatMap((suite) =>
  suite.apps.map((app) => ({...app, suite: suite.label})),
);

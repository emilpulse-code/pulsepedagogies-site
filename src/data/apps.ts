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
    id: 'cpq',
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
    id: 'signet',
    name: 'Signet',
    subtitle: '',
    audience: 'K–12, Corporate & Government HR',
    tagline: 'Gamified micro-credentials that turn employee growth into visible, verifiable recognition.',
    problemStatement:
      'Employee recognition is an afterthought in most organizations — generic, infrequent, and invisible to the people deciding promotions.',
    description:
      'Signet is a gamification utility for human resources teams: assign micro-credentials — digital badges — to employees as a motivating mechanism for professional growth, training completion, and exceptional contribution. Designed for K–12 districts as well as corporate and government HR departments, Signet makes recognition systematic instead of sporadic: badge criteria are defined once, awards are tracked automatically, and every employee builds a visible record of verified accomplishment. Entirely employee-facing — never student-facing — so there is no student data in the system at all.',
    pricing: 'paid',
    collectsStudentData: false,
  },
  {
    id: 'vitae',
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

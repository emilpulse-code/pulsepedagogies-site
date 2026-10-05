/**
 * "Next to ship" — the product in final development, shown under the live one
 * in section 02.
 *
 * Sibling to `spotlight.ts` and deliberately a separate object, because it
 * makes a different claim: SPOTLIGHT is the newest product a visitor can open
 * today, NEXT_UP is the one landing after it. When Signet ships, it becomes the
 * SPOTLIGHT and whatever is behind it moves in here.
 *
 * ── A standing constraint on this file ──────────────────────────────────────
 * Nothing here may reference a customer, a district, a deployment, or the
 * existence of one. Signet's licence (ToS §3.1) waives any right to use the
 * licensee's name, logo, or the fact of its deployment as a marketing
 * reference, case study, testimonial, customer-list entry, or sales
 * demonstration without separate written authorization — and that restriction
 * survives termination. The product is sold here on what it does, not on who
 * runs it. The sample data below is invented for this page; it is not a
 * screenshot of anyone's instance, and the institution names that appear in the
 * internal design mockups must not be copied into it.
 */

/* ── Cloudflare Stream ───────────────────────────────────────────────────────
   The account's Stream subdomain. Already hardcoded against the VAPA Pulse
   video in `App.tsx` and `ProductsPage.tsx`; named here so the five Signet
   films reference it once. */
export const STREAM_CUSTOMER = 'customer-40uk5te8zbrtkkan';

const streamBase = (uid: string) => `https://${STREAM_CUSTOMER}.cloudflarestream.com/${uid}`;

/** The player URL, click-to-load only — see `components/StreamStage.tsx`. */
export const streamEmbed = (uid: string, poster: string) =>
  `${streamBase(uid)}/iframe?autoplay=true&poster=${encodeURIComponent(poster)}`;

/** Stream's own generated thumbnail. Two seconds in, because frame zero of a
    screen recording is usually a half-painted window. */
export const streamPoster = (uid: string) =>
  `${streamBase(uid)}/thumbnails/thumbnail.jpg?time=2s&height=720`;

/** Where the poster links when scripting is off. Stream serves a real watch
    page per video, so the facade degrades to a working link exactly as the
    YouTube one does. */
export const streamWatch = (uid: string) => `${streamBase(uid)}/watch`;

/**
 * One of the five product films.
 *
 * Bound by the licence note above like everything else in this file: these are
 * recordings of the application running on invented data, not of anyone's
 * instance. That is also why they can exist at all when
 * `sections/Flagships.tsx` deliberately refuses Signet a screenshot — the
 * refusal there is about a deployment whose window title carries a licensee's
 * name, not about showing the product.
 */
export interface StreamVideo {
  id: string;
  /** Cloudflare Stream video UID. */
  uid: string;
  title: string;
  /** Accessible title, spoken form, for the facade's screen-reader line. */
  label: string;
  duration: string;
  blurb: string;
  /** What a buyer takes away from it — rendered under the player. */
  takeaway: string;
  /** Overrides Stream's generated thumbnail when a frame lands badly. */
  poster?: string;
}

/* The hero film. Kept separate from the chapters rather than flagged inside
   them, so the chapter numbering can be derived from array position without
   having to skip an entry. */
export const SIGNET_OVERVIEW: StreamVideo = {
  id: 'overview',
  uid: 'REPLACE_WITH_STREAM_UID_overview',
  title: 'Signet in two minutes',
  label: 'Signet system overview',
  duration: '1:58',
  blurb:
    'The whole system end to end: a session goes on the calendar, staff register with their work account, attendance is taken, and a signed credential lands in the earner’s hands.',
  takeaway: 'Start here if you have two minutes and nothing else.',
};

/**
 * The four chapters, in the order a buyer cares about rather than the order
 * they were recorded: schedule → credential → motivate → pay. That is the
 * product's own claim about itself — one record at four moments in its life —
 * so the page's spine argues the thesis. Reorder this array and the numbering
 * follows; it is derived from the index, never typed in.
 */
export const SIGNET_CHAPTERS: StreamVideo[] = [
  {
    id: 'event-builder',
    uid: 'REPLACE_WITH_STREAM_UID_event_builder',
    title: 'Put a session on the calendar',
    label: 'The event builder',
    duration: '—',
    blurb:
      'The act a coordinator repeats every week. A session is described once — date, capacity, location, who may register — and the registration page, the confirmation mail and the calendar invitation are generated from that one description rather than assembled by hand.',
    takeaway: 'One description, not four systems kept in step with each other.',
  },
  {
    id: 'badge-studio',
    uid: 'REPLACE_WITH_STREAM_UID_badge_studio',
    title: 'Design the credential',
    label: 'The badge studio',
    duration: '1:16',
    blurb:
      'Credentials are drawn in the product, not commissioned. Each one carries its criteria, its hour value and its issuer key, and is signed on issue — so it verifies against a published key years later, with no call home to the system that minted it.',
    takeaway: 'Open Badges 3.0 and W3C Verifiable Credentials, issued by you.',
  },
  {
    id: 'gamification',
    uid: 'REPLACE_WITH_STREAM_UID_gamification',
    title: 'Make it worth earning',
    label: 'The gamification system',
    duration: '1:29',
    blurb:
      'Points, levels and collections turn a compliance exercise into something staff pursue. The progression is yours to define, and it reads from the same attendance record the credential does — so there is no second ledger to keep honest.',
    takeaway: 'Participation you do not have to chase.',
  },
  {
    id: 'payroll',
    uid: 'REPLACE_WITH_STREAM_UID_payroll',
    title: 'Hours payroll will accept',
    label: 'Payroll tracking',
    duration: '1:27',
    blurb:
      'Attendance was taken once, at the session. The hours that follow from it are reported per person, per site and per funding source, in the shape a business office already works in — which is the difference between a professional-learning record and a payable one.',
    takeaway: 'The report the business office asks for, without reconstruction.',
  },
];

/** One row of the credential's verification chain. */
export interface ChainRow {
  label: string;
  value: string;
  /** Rendered in the monospace face — ids, signatures, key material. */
  mono?: boolean;
}

export interface CredentialDemoConfig {
  /** Credential name, and the competency area it sits under. */
  badge: string;
  category: string;
  issued: string;
  /** Short facts shown under the title, e.g. "5 points", "8 hours". */
  facts: {label: string; value: string}[];
  /** What the earner did to get it. */
  criteria: string[];
  chain: ChainRow[];
  /** Shown once the credential is revoked. Revocation is recorded, not erased. */
  revokedOn: string;
}

export interface SeatRequest {
  id: string;
  name: string;
  role: string;
}

export interface SeatDemoConfig {
  session: string;
  date: string;
  format: string;
  capacity: number;
  /** Seats already confirmed before the visitor touches anything. */
  taken: number;
  queue: SeatRequest[];
}

export interface NextApp {
  id: string;
  name: string;
  /** Rendered in italic orange under the product name. */
  headline: string;
  /** Never "live", never "in production" — see the file note above. */
  status: string;
  tagline: string;
  chips: string[];
  credential: CredentialDemoConfig;
  seats: SeatDemoConfig;
}

export const NEXT_UP: NextApp = {
  id: 'signet',
  name: 'Signet',
  headline: 'A credential that outlives the system that issued it.',
  status: 'Final development',
  tagline:
    'Registration, attendance, and verifiable credentials for professional learning — the sign-up list, the calendar entry, the attendance record and the credential are one record at four moments in its life, not four systems to reconcile.',
  chips: ['Open Badges 3.0', 'W3C Verifiable Credentials', 'Workspace SSO', 'No Passwords', 'No Student Data'],

  credential: {
    badge: 'Restorative Practices',
    category: 'Equity',
    issued: 'March 14, 2026',
    facts: [
      {label: 'Issued', value: 'Mar 14, 2026'},
      {label: 'PD value', value: '5 points · 8 hrs'},
      {label: 'Standard', value: 'Open Badges 3.0'},
    ],
    criteria: [
      'Completed an 8-hour facilitator training on restorative circle structures.',
      'Submitted three classroom artifacts — agendas, reflection logs, a student-voice survey.',
      'Observed and validated by a site Authority during a live circle.',
    ],
    chain: [
      {label: 'Credential ID', value: 'urn:uuid:9f2a7c41-bd86-4e03-a1c7', mono: true},
      {label: 'Issuer key', value: 'published at /keys/issuer', mono: true},
      {label: 'Signature', value: 'ed25519', mono: true},
    ],
    revokedOn: 'April 2, 2026',
  },

  seats: {
    session: 'Designing for Multilingual Learners',
    date: 'Thu, Apr 16 · 3:30 PM',
    format: 'On-grounds',
    capacity: 12,
    taken: 11,
    queue: [
      {id: 'r1', name: 'M. Vance', role: 'Grade 4 Teacher'},
      {id: 'r2', name: 'L. Hartley', role: 'Instructional Coach'},
    ],
  },
};

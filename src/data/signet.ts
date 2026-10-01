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

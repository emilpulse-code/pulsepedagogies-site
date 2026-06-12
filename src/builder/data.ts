import type {LucideIcon} from 'lucide-react';
import {
  BookOpen,
  Briefcase,
  Backpack,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Fingerprint,
  GraduationCap,
  Hash,
  HeartHandshake,
  LayoutDashboard,
  MessageCircle,
  PenLine,
  Presentation,
  School,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Video,
} from 'lucide-react';

// ── Identifiers ──────────────────────────────────────────────────────────────

export type VerticalId = 'k12' | 'highered' | 'hr';
export type PersonaId = 'student' | 'teacher' | 'parent' | 'employee' | 'hrlead';
export type EngineId =
  | 'lms'
  | 'onboarding'
  | 'performance'
  | 'grading'
  | 'recruiting'
  | 'campushub';
export type CapabilityId = 'ai' | 'chat' | 'video' | 'gamification' | 'biometric' | 'signatures';
export type IntegrationId = 'canvas' | 'workday' | 'googleclassroom' | 'stripe' | 'slack';

export interface Selections {
  vertical: VerticalId | null;
  persona: PersonaId | null;
  engine: EngineId | null;
  capabilities: CapabilityId[];
  integrations: IntegrationId[];
}

export const EMPTY_SELECTIONS: Selections = {
  vertical: null,
  persona: null,
  engine: null,
  capabilities: [],
  integrations: [],
};

// ── Themes (static class strings so Tailwind can see them) ──────────────────

export interface Theme {
  label: string;
  gradient: string; // bg-gradient-to-r …
  text: string;
  bg: string;
  softBg: string;
  border: string;
  ring: string;
  glow: string;
  dot: string;
}

export const THEMES: Record<VerticalId, Theme> = {
  k12: {
    label: 'Sky',
    gradient: 'bg-gradient-to-r from-sky-500 to-cyan-400',
    text: 'text-sky-400',
    bg: 'bg-sky-500',
    softBg: 'bg-sky-500/15',
    border: 'border-sky-400/40',
    ring: 'ring-sky-400',
    glow: 'shadow-[0_0_40px_rgba(56,189,248,0.35)]',
    dot: 'bg-sky-400',
  },
  highered: {
    label: 'Indigo',
    gradient: 'bg-gradient-to-r from-indigo-500 to-violet-500',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500',
    softBg: 'bg-indigo-500/15',
    border: 'border-indigo-400/40',
    ring: 'ring-indigo-400',
    glow: 'shadow-[0_0_40px_rgba(129,140,248,0.35)]',
    dot: 'bg-indigo-400',
  },
  hr: {
    label: 'Emerald',
    gradient: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    softBg: 'bg-emerald-500/15',
    border: 'border-emerald-400/40',
    ring: 'ring-emerald-400',
    glow: 'shadow-[0_0_40px_rgba(52,211,153,0.35)]',
    dot: 'bg-emerald-400',
  },
};

// Neutral theme before a vertical is chosen
export const NEUTRAL_THEME: Theme = {
  label: 'Slate',
  gradient: 'bg-gradient-to-r from-slate-500 to-slate-400',
  text: 'text-slate-400',
  bg: 'bg-slate-500',
  softBg: 'bg-slate-500/15',
  border: 'border-slate-400/40',
  ring: 'ring-slate-400',
  glow: 'shadow-[0_0_40px_rgba(148,163,184,0.25)]',
  dot: 'bg-slate-400',
};

// ── Step 1 · Verticals ───────────────────────────────────────────────────────

export interface VerticalOption {
  id: VerticalId;
  label: string;
  blurb: string;
  icon: LucideIcon;
  brandName: string; // appears in the mockup chrome
}

export const VERTICALS: VerticalOption[] = [
  {
    id: 'k12',
    label: 'K–12 Education',
    blurb: 'Districts, school sites & classrooms',
    icon: School,
    brandName: 'DistrictOne',
  },
  {
    id: 'highered',
    label: 'Higher Ed',
    blurb: 'Universities, colleges & faculty',
    icon: GraduationCap,
    brandName: 'CampusCore',
  },
  {
    id: 'hr',
    label: 'HR & Workforce',
    blurb: 'Corporate, government & people ops',
    icon: Briefcase,
    brandName: 'PeoplePulse',
  },
];

// ── Step 2 · Personas ────────────────────────────────────────────────────────

export interface PersonaOption {
  id: PersonaId;
  label: string;
  blurb: string;
  icon: LucideIcon;
  verticals: VerticalId[];
  welcome: string;
  subtitle: string;
  stats: {label: string; value: string}[];
}

export const PERSONAS: PersonaOption[] = [
  {
    id: 'student',
    label: 'Student',
    blurb: 'Learners on any device',
    icon: Backpack,
    verticals: ['k12', 'highered'],
    welcome: 'Hey Jordan 👋',
    subtitle: 'You have 3 things due this week.',
    stats: [
      {label: 'Streak', value: '12d'},
      {label: 'Due soon', value: '3'},
      {label: 'Avg score', value: '94%'},
    ],
  },
  {
    id: 'teacher',
    label: 'Teacher / Faculty',
    blurb: 'Instruction-first workflows',
    icon: Presentation,
    verticals: ['k12', 'highered'],
    welcome: 'Good morning, Ms. Rivera',
    subtitle: 'Period 3 starts in 25 minutes.',
    stats: [
      {label: 'Classes', value: '5'},
      {label: 'To grade', value: '18'},
      {label: 'Alerts', value: '2'},
    ],
  },
  {
    id: 'parent',
    label: 'Parent / Guardian',
    blurb: 'Family engagement views',
    icon: HeartHandshake,
    verticals: ['k12'],
    welcome: "Welcome back, Alex's family",
    subtitle: 'Two updates from Roosevelt Elementary.',
    stats: [
      {label: 'Attendance', value: '98%'},
      {label: 'Messages', value: '2'},
      {label: 'Events', value: '1'},
    ],
  },
  {
    id: 'employee',
    label: 'Employee',
    blurb: 'Self-service & growth',
    icon: UserRound,
    verticals: ['hr'],
    welcome: 'Welcome aboard, Sam',
    subtitle: 'Day 4 of onboarding — almost there.',
    stats: [
      {label: 'Tasks done', value: '78%'},
      {label: 'Docs', value: '2'},
      {label: 'Team intros', value: '5'},
    ],
  },
  {
    id: 'hrlead',
    label: 'HR Lead',
    blurb: 'People analytics & ops',
    icon: ClipboardList,
    verticals: ['hr'],
    welcome: 'Your people pulse',
    subtitle: '142 employees · 6 open requisitions.',
    stats: [
      {label: 'Headcount', value: '142'},
      {label: 'Open roles', value: '6'},
      {label: 'eNPS', value: '+41'},
    ],
  },
];

// ── Step 3 · Core App Engines ────────────────────────────────────────────────

export interface EngineOption {
  id: EngineId;
  label: string;
  blurb: string;
  icon: LucideIcon;
  verticals: VerticalId[];
  nav: string[];
  screenTitle: string;
  rows: {title: string; meta: string; pct: number}[];
}

export const ENGINES: EngineOption[] = [
  {
    id: 'lms',
    label: 'LMS / Learning',
    blurb: 'Courses, lessons & mastery',
    icon: BookOpen,
    verticals: ['k12', 'highered'],
    nav: ['Home', 'Courses', 'Assignments', 'Progress'],
    screenTitle: 'My Courses',
    rows: [
      {title: 'Algebra II — Unit 4', meta: '2 assignments due', pct: 72},
      {title: 'World History', meta: 'New lesson posted', pct: 45},
      {title: 'Visual Arts Studio', meta: 'Critique on Friday', pct: 90},
    ],
  },
  {
    id: 'grading',
    label: 'Grading & Assessment',
    blurb: 'Gradebooks, rubrics & reports',
    icon: PenLine,
    verticals: ['k12', 'highered'],
    nav: ['Classes', 'Gradebook', 'Rubrics', 'Reports'],
    screenTitle: 'Gradebook — Period 3',
    rows: [
      {title: 'Essay: The New Deal', meta: '24 of 31 graded', pct: 77},
      {title: 'Quiz 7 — Functions', meta: 'Auto-scored', pct: 100},
      {title: 'Lab Report 4', meta: '7 missing', pct: 58},
    ],
  },
  {
    id: 'campushub',
    label: 'Campus Hub',
    blurb: 'Feed, events & community',
    icon: CalendarDays,
    verticals: ['k12', 'highered'],
    nav: ['Feed', 'Events', 'Clubs', 'Map'],
    screenTitle: "What's happening",
    rows: [
      {title: 'Spring Showcase', meta: 'Fri 6:00 PM · Main Hall', pct: 64},
      {title: 'Robotics Club', meta: '3 new posts', pct: 38},
      {title: 'Career Fair', meta: 'RSVP open', pct: 81},
    ],
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    blurb: 'Day-one to fully ramped',
    icon: ClipboardList,
    verticals: ['hr'],
    nav: ['Welcome', 'Tasks', 'Documents', 'Team'],
    screenTitle: 'Your onboarding plan',
    rows: [
      {title: 'Sign policy documents', meta: '2 remaining', pct: 60},
      {title: 'Meet your team', meta: '5 of 6 intros done', pct: 83},
      {title: 'Security training', meta: 'Due Thursday', pct: 20},
    ],
  },
  {
    id: 'performance',
    label: 'Performance Tracking',
    blurb: 'Goals, reviews & insights',
    icon: Target,
    verticals: ['hr'],
    nav: ['Dashboard', 'Goals', 'Reviews', 'Insights'],
    screenTitle: 'Q2 Goals',
    rows: [
      {title: 'Ship customer portal v2', meta: 'On track', pct: 70},
      {title: 'Mentor two juniors', meta: 'Ahead', pct: 88},
      {title: 'Reduce ticket backlog', meta: 'At risk', pct: 34},
    ],
  },
  {
    id: 'recruiting',
    label: 'Recruiting',
    blurb: 'Pipeline to offer letter',
    icon: LayoutDashboard,
    verticals: ['hr'],
    nav: ['Pipeline', 'Candidates', 'Interviews', 'Offers'],
    screenTitle: 'Hiring pipeline',
    rows: [
      {title: 'Sr. Product Designer', meta: '12 in pipeline', pct: 55},
      {title: 'Data Engineer', meta: '3 onsite this week', pct: 42},
      {title: 'People Ops Manager', meta: 'Offer extended', pct: 95},
    ],
  },
];

// ── Step 4 · Advanced Capabilities ───────────────────────────────────────────

export interface CapabilityOption {
  id: CapabilityId;
  label: string;
  blurb: string;
  icon: LucideIcon;
}

export const CAPABILITIES: CapabilityOption[] = [
  {id: 'ai', label: 'AI Assistant', blurb: 'Context-aware insights & help', icon: Sparkles},
  {id: 'chat', label: 'Real-time Chat', blurb: 'Direct + group messaging', icon: MessageCircle},
  {id: 'video', label: 'Live Video', blurb: 'Embedded calls & broadcasts', icon: Video},
  {id: 'gamification', label: 'Gamification', blurb: 'Badges, streaks & levels', icon: Trophy},
  {id: 'biometric', label: 'Biometric Lock', blurb: 'FaceID / fingerprint entry', icon: Fingerprint},
  {id: 'signatures', label: 'Document Signatures', blurb: 'Legally binding e-sign', icon: PenLine},
];

// ── Step 5 · Enterprise Integrations ─────────────────────────────────────────

export interface IntegrationOption {
  id: IntegrationId;
  label: string;
  monogram: string;
  icon: LucideIcon;
}

export const INTEGRATIONS: IntegrationOption[] = [
  {id: 'canvas', label: 'Canvas', monogram: 'Cv', icon: BookOpen},
  {id: 'workday', label: 'Workday', monogram: 'Wd', icon: Briefcase},
  {id: 'googleclassroom', label: 'Google Classroom', monogram: 'GC', icon: GraduationCap},
  {id: 'stripe', label: 'Stripe', monogram: 'St', icon: CreditCard},
  {id: 'slack', label: 'Slack', monogram: 'Sl', icon: Hash},
];

// ── Compile-sequence flavor text ─────────────────────────────────────────────

export const COMPILE_LINES = [
  '> resolving design tokens…',
  '> hydrating persona dashboard…',
  '> wiring core engine routes…',
  '> injecting capability widgets…',
  '> linking enterprise connectors…',
  '> optimizing for mobile + desktop…',
  '> packaging blueprint v1.0 ✓',
];

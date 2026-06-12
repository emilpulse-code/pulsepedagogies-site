// ── Identifiers ──────────────────────────────────────────────────────────────

export type PaletteId = 'sky' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet';

/** Widgets the live canvas knows how to render. */
export type WidgetId =
  | 'ai'
  | 'chat'
  | 'video'
  | 'gamification'
  | 'ar'
  | 'game'
  | 'biometric'
  | 'signatures';
export const WIDGET_IDS: WidgetId[] = ['ai', 'chat', 'video', 'gamification', 'ar', 'game', 'biometric', 'signatures'];

// ── The imagined app blueprint (rendered on the live canvas) ─────────────────

export interface Blueprint {
  appName: string;
  tagline: string;
  palette: PaletteId;
  welcome: string;
  subtitle: string;
  nav: string[]; // 4 items
  stats: {label: string; value: string}[]; // 3 items
  rows: {title: string; meta: string; pct: number}[]; // 3 items
  widgets: WidgetId[];
  integrations: string[]; // up to 4 short labels
  insight: string;
  summary: string;
}

// ── Themes (static class strings so Tailwind can see them) ──────────────────

export interface Theme {
  label: string;
  gradient: string;
  text: string;
  bg: string;
  softBg: string;
  border: string;
  ring: string;
  glow: string;
  dot: string;
}

export const PALETTES: Record<PaletteId, Theme> = {
  sky: {
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
  indigo: {
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
  emerald: {
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
  amber: {
    label: 'Amber',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-400',
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    softBg: 'bg-amber-500/15',
    border: 'border-amber-400/40',
    ring: 'ring-amber-400',
    glow: 'shadow-[0_0_40px_rgba(251,191,36,0.35)]',
    dot: 'bg-amber-400',
  },
  rose: {
    label: 'Rose',
    gradient: 'bg-gradient-to-r from-rose-500 to-pink-400',
    text: 'text-rose-400',
    bg: 'bg-rose-500',
    softBg: 'bg-rose-500/15',
    border: 'border-rose-400/40',
    ring: 'ring-rose-400',
    glow: 'shadow-[0_0_40px_rgba(251,113,133,0.35)]',
    dot: 'bg-rose-400',
  },
  violet: {
    label: 'Violet',
    gradient: 'bg-gradient-to-r from-violet-500 to-fuchsia-400',
    text: 'text-violet-400',
    bg: 'bg-violet-500',
    softBg: 'bg-violet-500/15',
    border: 'border-violet-400/40',
    ring: 'ring-violet-400',
    glow: 'shadow-[0_0_40px_rgba(167,139,250,0.35)]',
    dot: 'bg-violet-400',
  },
};

// Neutral theme before the canvas has anything to draw
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

// ── The narrative interview ──────────────────────────────────────────────────

export type QuestionId = 'vision' | 'people' | 'moment' | 'magic' | 'connections';

export interface Question {
  id: QuestionId;
  label: string; // short chip label
  prompt: string; // the big question
  helper: string;
  placeholder: string;
  optional?: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: 'vision',
    label: 'The Idea',
    prompt: 'What are you imagining?',
    helper:
      'In your own words — what is this app, and what problem does it make disappear? Any kind of application is on the table: web, mobile, an internal tool, a public product, an augmented-reality experience, even a computer game.',
    placeholder:
      'e.g. An app that lets our parent volunteers sign up for field trips without twelve reply-all emails…',
  },
  {
    id: 'people',
    label: 'The People',
    prompt: 'Who opens it every day?',
    helper:
      'Describe the people who will live in this app — their roles, their day, what they are juggling when they reach for it.',
    placeholder:
      'e.g. Front-office staff in the morning, coaches after school, parents checking in at night…',
  },
  {
    id: 'moment',
    label: 'The Moment',
    prompt: 'Walk us through one perfect use.',
    helper:
      'Someone opens the app, and sixty seconds later something is done. Narrate it like a scene — what do they see, tap, and walk away with?',
    placeholder:
      'e.g. Maria opens it, sees today’s roster, taps the two absent students, and the kitchen gets updated lunch counts instantly…',
  },
  {
    id: 'magic',
    label: 'The Magic',
    prompt: 'What would make it indispensable?',
    helper:
      'Anything goes — AI helpers, live updates, badges, augmented reality, mini-games, signatures, dashboards, translations. If you’ve seen it somewhere and loved it, say so.',
    placeholder:
      'e.g. It should write the weekly summary for me, and message families in their own language…',
  },
  {
    id: 'connections',
    label: 'The Fit',
    prompt: 'What does it need to play nicely with?',
    helper:
      'Systems it should connect to, devices it must run on, rules it has to respect — privacy, approvals, contracts. Not sure? Skip this one.',
    placeholder:
      'e.g. Google Classroom and our Aeries SIS; has to work on classroom iPads; student privacy matters…',
    optional: true,
  },
];

export type Answers = Record<QuestionId, string>;

export const EMPTY_ANSWERS: Answers = {
  vision: '',
  people: '',
  moment: '',
  magic: '',
  connections: '',
};

// ── Compile-sequence flavor text ─────────────────────────────────────────────

export const COMPILE_LINES = [
  '> reading your story…',
  '> naming the concept…',
  '> sketching the first screen…',
  '> placing your people on the dashboard…',
  '> wiring the magic in…',
  '> checking connections & constraints…',
  '> packaging concept blueprint v1.0 ✓',
];

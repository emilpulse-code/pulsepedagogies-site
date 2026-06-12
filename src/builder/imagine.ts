// Turns the visitor's narrative answers into a renderable Blueprint.
//
// Primary path: POST /api/imagine (Cloudflare Pages Function → Google Gemini).
// Fallback path: a deterministic local sketcher, so the canvas always draws —
// in local dev, if the API key is missing, or if Gemini is slow/unreachable.

import {
  PALETTES,
  WIDGET_IDS,
  type Answers,
  type Blueprint,
  type PaletteId,
  type WidgetId,
} from './data';

export type SketchSource = 'gemini' | 'studio';

export interface ImagineResult {
  blueprint: Blueprint;
  source: SketchSource;
}

export async function imagineApp(answers: Answers, signal?: AbortSignal): Promise<ImagineResult> {
  try {
    const res = await fetch('/api/imagine', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({answers}),
      signal,
    });
    if (res.ok) {
      const json = (await res.json()) as {blueprint?: unknown};
      const blueprint = sanitizeBlueprint(json.blueprint);
      if (blueprint) return {blueprint, source: 'gemini'};
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    // fall through to the local sketcher
  }
  return {blueprint: localImagine(answers), source: 'studio'};
}

// ── Validation of whatever the model returns ────────────────────────────────

const str = (v: unknown, max: number, fallback = ''): string =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : fallback;

export function sanitizeBlueprint(raw: unknown): Blueprint | null {
  if (!raw || typeof raw !== 'object') return null;
  const b = raw as Record<string, unknown>;

  const appName = str(b.appName, 18);
  if (!appName) return null;

  const palette: PaletteId =
    typeof b.palette === 'string' && b.palette in PALETTES ? (b.palette as PaletteId) : 'indigo';

  const nav = (Array.isArray(b.nav) ? b.nav : [])
    .map((n) => str(n, 14))
    .filter(Boolean)
    .slice(0, 4);
  while (nav.length < 4) nav.push(['Home', 'Activity', 'Library', 'Profile'][nav.length]);

  const stats = (Array.isArray(b.stats) ? b.stats : [])
    .map((s) => {
      const o = (s ?? {}) as Record<string, unknown>;
      return {label: str(o.label, 16), value: str(o.value, 8)};
    })
    .filter((s) => s.label && s.value)
    .slice(0, 3);

  const rows = (Array.isArray(b.rows) ? b.rows : [])
    .map((r) => {
      const o = (r ?? {}) as Record<string, unknown>;
      const pct = typeof o.pct === 'number' ? Math.round(Math.min(98, Math.max(8, o.pct))) : 50;
      return {title: str(o.title, 38), meta: str(o.meta, 28), pct};
    })
    .filter((r) => r.title)
    .slice(0, 3);

  const widgets = (Array.isArray(b.widgets) ? b.widgets : []).filter((w): w is WidgetId =>
    WIDGET_IDS.includes(w as WidgetId),
  );

  const integrations = (Array.isArray(b.integrations) ? b.integrations : [])
    .map((i) => str(i, 18))
    .filter(Boolean)
    .slice(0, 4);

  return {
    appName,
    tagline: str(b.tagline, 110, 'A concept imagined with Pulse Pedagogies.'),
    palette,
    welcome: str(b.welcome, 36, 'Welcome back 👋'),
    subtitle: str(b.subtitle, 70, 'Here’s what needs you today.'),
    nav,
    stats: stats.length ? stats : FALLBACK_STATS,
    rows: rows.length ? rows : FALLBACK_ROWS,
    widgets: [...new Set(widgets)],
    integrations,
    insight: str(b.insight, 130, FALLBACK_INSIGHT),
    summary: str(b.summary, 480, ''),
  };
}

// ── Local sketcher (no network, no key) ─────────────────────────────────────

const FALLBACK_STATS = [
  {label: 'Today', value: '12'},
  {label: 'In progress', value: '4'},
  {label: 'Done this week', value: '37'},
];

const FALLBACK_ROWS = [
  {title: 'First milestone — discovery', meta: 'In progress', pct: 68},
  {title: 'Core workflow — sketching', meta: 'Ready for review', pct: 41},
  {title: 'Launch checklist', meta: 'Updated just now', pct: 86},
];

const FALLBACK_INSIGHT =
  'Two items can be cleared before lunch — and Friday is trending quiet.';

const STOPWORDS = new Set([
  'about', 'after', 'all', 'also', 'and', 'any', 'app', 'application', 'are', 'because',
  'been', 'before', 'being', 'but', 'can', 'could', 'does', 'each', 'every', 'for', 'from',
  'get', 'gets', 'has', 'have', 'her', 'him', 'his', 'how', 'into', 'its', 'just', 'let',
  'lets', 'like', 'make', 'makes', 'more', 'most', 'much', 'need', 'needs', 'not', 'one',
  'our', 'out', 'over', 'should', 'site', 'some', 'than', 'that', 'the', 'their', 'them',
  'then', 'there', 'they', 'thing', 'this', 'tool', 'use', 'user', 'users', 'want', 'wants',
  'web', 'website', 'were', 'what', 'when', 'where', 'which', 'who', 'will', 'with',
  'without', 'would', 'you', 'your',
]);

const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

const significantWords = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w));

const KNOWN_INTEGRATIONS = [
  'Google Classroom', 'Canvas', 'PowerSchool', 'Aeries', 'Clever', 'Infinite Campus',
  'Schoology', 'Workday', 'Slack', 'Stripe', 'Salesforce', 'QuickBooks', 'Outlook',
  'Microsoft Teams', 'Zoom', 'Google Drive', 'Calendly', 'Twilio',
];

export function localImagine(answers: Answers): Blueprint {
  const all = Object.values(answers).join(' \n ');
  const has = (re: RegExp) => re.test(all);

  // Name: the two most prominent content words, fused into a working title
  const counts = new Map<string, number>();
  for (const w of significantWords(answers.vision || all)) {
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  const appName =
    top.length >= 2
      ? (cap(top[0][0]) + cap(top[1][0])).slice(0, 16)
      : top.length === 1
        ? (cap(top[0][0]) + 'Hub').slice(0, 16)
        : 'ConceptOne';

  // Palette by subject matter
  const palette: PaletteId = has(/kid|school|classroom|teacher|student|campus/i)
    ? 'sky'
    : has(/health|care|wellness|patient|counsel|therap/i)
      ? 'rose'
      : has(/financ|pay|budget|fund|money|invoice|grant/i)
        ? 'emerald'
        : has(/art|music|creativ|design|media|theat/i)
          ? 'violet'
          : has(/food|outdoor|sport|coach|safet|field/i)
            ? 'amber'
            : 'indigo';

  // Widgets implied by the story
  const widgets: WidgetId[] = [];
  if (has(/\bai\b|smart|automat|generat|summar|assist|intelligen|translat/i)) widgets.push('ai');
  if (has(/chat|messag|communicat|notify|notification/i)) widgets.push('chat');
  if (has(/video|stream|broadcast|webinar|live class/i)) widgets.push('video');
  if (has(/badge|streak|level|point|gamif|reward|leaderboard|credential/i)) widgets.push('gamification');
  if (has(/augmented[\s-]*reality|\bar experience|camera overlay|hologra/i) || /\bAR\b/.test(all)) widgets.push('ar');
  if (has(/\b(?:video|computer|mobile|mini)[\s-]*game\b|\bgame\b|gameplay|arcade|platformer|multiplayer|side[\s-]?scroller|playable/i)) widgets.push('game');
  if (has(/biometric|face ?id|fingerprint|privacy|ferpa|hipaa|secure/i)) widgets.push('biometric');
  if (has(/\bsign|signature|approv|contract|consent|permission slip/i)) widgets.push('signatures');

  // Navigation from detected nouns of work
  const nav: string[] = ['Home'];
  const navIf = (re: RegExp, label: string) => {
    if (nav.length < 4 && has(re) && !nav.includes(label)) nav.push(label);
  };
  navIf(/schedul|calendar|event|appointment/i, 'Schedule');
  navIf(/roster|student|member|people|staff|class|family|parent/i, 'People');
  navIf(/messag|chat|announce/i, 'Messages');
  navIf(/report|analytic|insight|dashboard|data/i, 'Reports');
  navIf(/pay|invoice|fee|billing|fund/i, 'Payments');
  navIf(/map|route|location|bus/i, 'Map');
  navIf(/badge|credential|award/i, 'Badges');
  navIf(/librar|resource|lesson|course|content|curricul/i, 'Library');
  navIf(/task|todo|checklist|workflow|form/i, 'Tasks');
  for (const filler of ['Activity', 'Library', 'Profile']) {
    if (nav.length < 4 && !nav.includes(filler)) nav.push(filler);
  }

  // Work rows pulled from the user's own scene
  const fragments = `${answers.moment} ${answers.magic}`
    .split(/[.!?\n;,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 12 && s.length <= 58)
    .slice(0, 3);
  const metas = ['In progress', 'Ready for review', 'Updated just now'];
  const pcts = [68, 41, 86];
  const rows = fragments.length
    ? fragments.map((f, i) => ({
        title: f.charAt(0).toUpperCase() + f.slice(1, 38),
        meta: metas[i],
        pct: pcts[i],
      }))
    : FALLBACK_ROWS;

  // Integrations explicitly named
  const integrations = KNOWN_INTEGRATIONS.filter((k) =>
    new RegExp(k.replace(/ /g, '\\s*'), 'i').test(answers.connections || ''),
  ).slice(0, 4);

  const firstSentence = (answers.vision.split(/[.!?\n]/)[0] || '').trim();

  return {
    appName,
    tagline: firstSentence
      ? firstSentence.charAt(0).toUpperCase() + firstSentence.slice(1, 108)
      : 'A concept sketched with Pulse Pedagogies.',
    palette,
    welcome: 'Good morning 👋',
    subtitle: answers.people
      ? `Built around ${significantWords(answers.people).slice(0, 2).join(' & ') || 'your team'}.`
      : 'Here’s what needs you today.',
    nav,
    stats: FALLBACK_STATS,
    rows,
    widgets,
    integrations,
    insight: FALLBACK_INSIGHT,
    summary: '',
  };
}

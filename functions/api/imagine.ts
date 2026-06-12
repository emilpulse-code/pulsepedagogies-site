// Cloudflare Pages Function: POST /api/imagine
//
// Receives the visitor's narrative interview answers and asks Google Gemini to
// imagine the app as a structured Blueprint the live canvas can render.
//
// Requires a GEMINI_API_KEY environment variable (set in the Cloudflare Pages
// dashboard → Settings → Environment variables). Without it, this returns 503
// and the client falls back to its local sketcher.

interface Env {
  GEMINI_API_KEY?: string;
}

const MODEL = 'gemini-2.5-flash';

const QUESTION_LABELS: Record<string, string> = {
  vision: 'What are they imagining (the idea)',
  people: 'Who opens it every day (the people)',
  moment: 'One perfect use, narrated (the moment)',
  magic: 'What would make it indispensable (the magic)',
  connections: 'Systems, devices & rules it must respect (the fit)',
};

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    appName: {type: 'STRING', description: 'Brandable working title, <= 16 chars, no spaces preferred'},
    tagline: {type: 'STRING', description: 'One line, <= 100 chars'},
    palette: {type: 'STRING', enum: ['sky', 'indigo', 'emerald', 'amber', 'rose', 'violet']},
    welcome: {type: 'STRING', description: 'Short dashboard greeting for the primary user, <= 32 chars'},
    subtitle: {type: 'STRING', description: 'One short line under the greeting, <= 64 chars'},
    nav: {type: 'ARRAY', items: {type: 'STRING'}, description: 'Exactly 4 short nav labels'},
    stats: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {label: {type: 'STRING'}, value: {type: 'STRING'}},
        required: ['label', 'value'],
      },
      description: 'Exactly 3 believable dashboard stats',
    },
    rows: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {title: {type: 'STRING'}, meta: {type: 'STRING'}, pct: {type: 'NUMBER'}},
        required: ['title', 'meta', 'pct'],
      },
      description: 'Exactly 3 concrete in-app work items with progress 10-95',
    },
    widgets: {
      type: 'ARRAY',
      items: {type: 'STRING', enum: ['ai', 'chat', 'video', 'gamification', 'biometric', 'signatures']},
      description: 'Only widgets the answers actually imply',
    },
    integrations: {
      type: 'ARRAY',
      items: {type: 'STRING'},
      description: 'Up to 4 short product names, only if implied',
    },
    insight: {type: 'STRING', description: 'One believable AI-insight sentence for this app'},
    summary: {type: 'STRING', description: '2-3 sentence concept summary addressed to the client'},
  },
  required: [
    'appName', 'tagline', 'palette', 'welcome', 'subtitle',
    'nav', 'stats', 'rows', 'widgets', 'integrations', 'insight', 'summary',
  ],
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-store'},
  });

export async function onRequestPost(context: {request: Request; env: Env}): Promise<Response> {
  const {request, env} = context;
  if (!env.GEMINI_API_KEY) return json({error: 'not-configured'}, 503);

  const body = (await request.json().catch(() => null)) as {answers?: Record<string, unknown>} | null;
  if (!body?.answers || typeof body.answers !== 'object') return json({error: 'bad-request'}, 400);

  // Keep only known questions, clamp lengths, require some substance
  const answers: [string, string][] = [];
  for (const [id, label] of Object.entries(QUESTION_LABELS)) {
    const v = body.answers[id];
    if (typeof v === 'string' && v.trim()) answers.push([label, v.trim().slice(0, 1500)]);
  }
  if (answers.length === 0) return json({error: 'bad-request'}, 400);

  const prompt = [
    'You are the concept artist for Pulse Pedagogies, a digital development studio.',
    'A prospective client is describing an application they are imagining, in their own words,',
    'through a short interview. From their answers, imagine the app as if its main dashboard',
    'already exists, and return a blueprint for rendering a believable mockup of it.',
    '',
    'Rules:',
    '- The app can be ANY kind of application. Take the client literally; do not force it into education.',
    '- appName: a brandable working title, max 16 characters, CamelCase preferred, no generic words like "App".',
    '- nav: exactly 4 short labels matching how THIS app would actually be organized.',
    '- stats: exactly 3, with realistic values a real dashboard would show on a typical morning.',
    '- rows: exactly 3 concrete work items written in the vocabulary of the client\'s world, each with a short meta note and progress pct between 10 and 95.',
    '- widgets: include only what the answers imply. ai = assistant/automation, chat = messaging, video = live video, gamification = badges/streaks, biometric = strong privacy/secure access, signatures = approvals/e-sign.',
    '- integrations: up to 4 short product names, only ones the client implied.',
    '- welcome/subtitle: greet the primary daily user.',
    '- insight: one sentence the app\'s AI might genuinely surface, specific to this app.',
    '- summary: 2-3 warm, concrete sentences addressed to the client about the concept ("Your app …").',
    '',
    'The interview:',
    ...answers.map(([label, text]) => `${label}:\n"""${text}"""`),
  ].join('\n');

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contents: [{parts: [{text: prompt}]}],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1400,
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
            // Latency matters more than deliberation for a live sketch
            thinkingConfig: {thinkingBudget: 0},
          },
        }),
      },
    );
    if (!res.ok) return json({error: 'upstream', status: res.status}, 502);

    const data = (await res.json()) as {
      candidates?: {content?: {parts?: {text?: string}[]}}[];
    };
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
    const blueprint = JSON.parse(text);
    return json({blueprint});
  } catch {
    return json({error: 'upstream'}, 502);
  }
}

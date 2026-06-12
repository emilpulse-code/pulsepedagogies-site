import {useCallback, useEffect, useRef, useState} from 'react';
import type {FormEvent, KeyboardEvent} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheckBig,
  Cpu,
  Fingerprint,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Monitor,
  PenLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Video,
  Zap,
} from 'lucide-react';
import {PulseEmblem} from '../portfolio/components/PulseEmblem';
import {
  COMPILE_LINES,
  EMPTY_ANSWERS,
  NEUTRAL_THEME,
  PALETTES,
  QUESTIONS,
  type Answers,
  type Blueprint,
  type Theme,
  type WidgetId,
} from './data';
import {imagineApp, type SketchSource} from './imagine';

const WEB3FORMS_KEY = '32c86377-fb57-4110-a513-67fd523cf413';

type Phase = 'intro' | 'interview' | 'compiling' | 'capture' | 'done';
type Device = 'mobile' | 'desktop';

// ─────────────────────────────────────────────────────────────────────────────
// Master component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectBuilder() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [qIndex, setQIndex] = useState(0);
  const [device, setDevice] = useState<Device>('desktop');
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [source, setSource] = useState<SketchSource | null>(null);
  const [imagining, setImagining] = useState(false);

  const seqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const lastPayloadRef = useRef('');

  const theme = blueprint ? PALETTES[blueprint.palette] : NEUTRAL_THEME;

  const runImagine = useCallback(async (current: Answers, force = false) => {
    const payload = JSON.stringify(current);
    if (!force && payload === lastPayloadRef.current) return;
    if (!Object.values(current).some((a) => a.trim().length >= 16)) return;
    lastPayloadRef.current = payload;

    const seq = ++seqRef.current;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setImagining(true);
    try {
      const result = await imagineApp(current, ctrl.signal);
      if (seq === seqRef.current) {
        setBlueprint(result.blueprint);
        setSource(result.source);
      }
    } catch {
      // aborted — a fresher imagination is already underway
    } finally {
      if (seq === seqRef.current) setImagining(false);
    }
  }, []);

  // Live re-imagining while the visitor writes (debounced)
  useEffect(() => {
    if (phase !== 'interview') return;
    const t = setTimeout(() => runImagine(answers), 1400);
    return () => clearTimeout(t);
  }, [answers, phase, runImagine]);

  const advance = () => {
    runImagine(answers);
    if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1);
    else setPhase('compiling');
  };

  return (
    <div className="min-h-svh bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-[100rem] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <PulseEmblem size={30} />
            <span className="leading-tight">
              <span className="block text-xs font-bold uppercase tracking-[0.25em]">
                Pulse Pedagogies
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Project Builder
              </span>
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to studio
          </a>
        </div>
      </header>

      <main className="max-w-[100rem] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className={`text-[11px] font-bold uppercase tracking-[0.3em] mb-4 ${blueprint ? theme.text : 'text-violet-400'}`}>
            A simple planning tool
          </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl leading-[1.02] mb-4">
            Describe it. Watch it <span className={`italic ${blueprint ? theme.text : 'text-violet-400'}`}>take shape.</span>
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Five questions in plain language — no menus, no jargon. As you write, the
            canvas imagines your app in real time. When you finish, your specs are saved
            and we&rsquo;ll reach out by email to discuss possibilities and development costs.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* ── Left: the conversation ── */}
          <section aria-label="Project interview">
            {phase === 'intro' && <Intro onStart={() => setPhase('interview')} />}

            {phase === 'interview' && (
              <Interview
                answers={answers}
                qIndex={qIndex}
                theme={theme}
                onChange={(next) => setAnswers(next)}
                onBack={() => setQIndex(Math.max(0, qIndex - 1))}
                onAdvance={advance}
              />
            )}

            {phase === 'compiling' && <CompileSequence onDone={() => setPhase('capture')} />}

            {(phase === 'capture' || phase === 'done') && (
              <LeadCapture
                answers={answers}
                blueprint={blueprint}
                source={source}
                theme={theme}
                done={phase === 'done'}
                onDone={() => setPhase('done')}
              />
            )}
          </section>

          {/* ── Right: the live canvas ── */}
          <section className="lg:sticky lg:top-10" aria-label="Live app preview">
            <div className="flex items-center justify-between mb-4 gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Live Canvas
              </p>
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {imagining ? (
                    <motion.span
                      key="imagining"
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300"
                    >
                      <Loader2 className="w-3 h-3 animate-spin" /> Imagining…
                    </motion.span>
                  ) : source ? (
                    <motion.span
                      key={source}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500"
                    >
                      <Sparkles className="w-3 h-3" />
                      {source === 'gemini' ? 'Imagined by Gemini' : 'Studio sketch'}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
                <div className="inline-flex rounded-full border border-white/10 p-1 bg-slate-900">
                  {(['desktop', 'mobile'] as Device[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDevice(d)}
                      aria-pressed={device === d}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        device === d ? `${theme.bg} text-white` : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {d === 'desktop' ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                      {d === 'desktop' ? 'Desktop' : 'Mobile'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="relative"
              animate={phase === 'compiling' ? {scale: [1, 1.015, 1]} : {scale: 1}}
              transition={
                phase === 'compiling' ? {duration: 0.7, repeat: Infinity, ease: 'easeInOut'} : {}
              }
            >
              <DeviceMockup blueprint={blueprint} theme={theme} device={device} />
              {/* Imagination shimmer */}
              <AnimatePresence>
                {imagining && (
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
                  >
                    <motion.div
                      animate={{x: ['-100%', '160%']}}
                      transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-violet-400/10 to-transparent"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Concept summary under the canvas */}
            <AnimatePresence>
              {blueprint?.summary && phase !== 'intro' && (
                <motion.div
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0}}
                  className={`mt-5 rounded-2xl border ${theme.border} ${theme.softBg} p-5`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${theme.text} mb-2`}>
                    {blueprint.appName} — concept read
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">{blueprint.summary}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Intro — what this is, before anything else
// ─────────────────────────────────────────────────────────────────────────────

function Intro({onStart}: {onStart: () => void}) {
  const points: {icon: typeof PenLine; text: string}[] = [
    {
      icon: PenLine,
      text: 'Answer five plain-language questions about the app you’re imagining — any kind of application, for any audience.',
    },
    {
      icon: Sparkles,
      text: 'As you write, a live concept sketch takes shape on the canvas, imagined in as close to real time as we can manage.',
    },
    {
      icon: Mail,
      text: 'When you finish, your specs — your own words plus the generated blueprint — are saved, and Pulse Pedagogies will reach out by email to discuss possibilities and development costs.',
    },
  ];

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.45}}
      className="rounded-3xl border border-white/10 bg-slate-900 p-8 md:p-10"
    >
      <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
        <Sparkles className="w-3 h-3" /> Before we begin
      </p>
      <h2 className="font-serif font-light text-3xl md:text-4xl mb-4">
        This is a planning tool — <span className="italic text-violet-400">not a commitment.</span>
      </h2>
      <p className="text-slate-400 leading-relaxed mb-8">
        Think of it as the first sketch on a napkin, with better handwriting. Here&rsquo;s
        exactly how it works:
      </p>

      <ul className="space-y-5 mb-10">
        {points.map(({icon: Icon, text}) => (
          <li key={text} className="flex gap-4">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-slate-800 text-violet-300 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5" />
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-2xl px-8 py-5 text-lg font-bold tracking-wide flex items-center justify-center gap-3 hover:opacity-90 transition-opacity cursor-pointer"
      >
        Start imagining <ArrowRight className="w-5 h-5" />
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        No payment, no obligation — just a clearer picture of what we&rsquo;d build together.
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The narrative interview
// ─────────────────────────────────────────────────────────────────────────────

function Interview({
  answers,
  qIndex,
  theme,
  onChange,
  onBack,
  onAdvance,
}: {
  answers: Answers;
  qIndex: number;
  theme: Theme;
  onChange: (next: Answers) => void;
  onBack: () => void;
  onAdvance: () => void;
}) {
  const q = QUESTIONS[qIndex];
  const value = answers[q.id];
  const isLast = qIndex === QUESTIONS.length - 1;
  const canAdvance = q.optional || value.trim().length >= 10;

  const keyAdvance = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canAdvance) {
      e.preventDefault();
      onAdvance();
    }
  };

  return (
    <div>
      {/* Progress chips */}
      <ol className="flex items-center gap-2 mb-8 flex-wrap" aria-label="Interview progress">
        {QUESTIONS.map((question, i) => (
          <li key={question.id} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                i < qIndex
                  ? `${theme.softBg} ${theme.text}`
                  : i === qIndex
                    ? 'bg-white/10 text-white ring-1 ring-white/20'
                    : 'bg-slate-900 text-slate-600'
              }`}
              aria-current={i === qIndex ? 'step' : undefined}
            >
              {i < qIndex && <Check className="w-3 h-3" />}
              {question.label}
            </span>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{opacity: 0, x: 24}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: -24}}
          transition={{duration: 0.3, ease: 'easeOut'}}
        >
          <h2 className="font-serif font-light text-3xl md:text-4xl mb-3">{q.prompt}</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">{q.helper}</p>

          <textarea
            value={value}
            onChange={(e) => onChange({...answers, [q.id]: e.target.value})}
            onKeyDown={keyAdvance}
            placeholder={q.placeholder}
            rows={6}
            autoFocus
            className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/10 focus:outline-none focus:border-violet-400 transition-colors text-[15px] leading-relaxed resize-none placeholder:text-slate-600"
          />
          <p className="mt-2 text-xs text-slate-600">
            {q.optional
              ? 'Optional — skip if you’re not sure.'
              : 'A sentence is enough. A paragraph is better.'}
            <span className="hidden md:inline"> Ctrl+Enter to continue.</span>
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={qIndex === 0}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {isLast ? (
          <motion.button
            type="button"
            onClick={onAdvance}
            disabled={!canAdvance}
            animate={
              canAdvance
                ? {
                    boxShadow: [
                      '0 0 24px rgba(129,140,248,0.35)',
                      '0 0 56px rgba(167,139,250,0.65)',
                      '0 0 24px rgba(129,140,248,0.35)',
                    ],
                  }
                : {}
            }
            transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
            whileHover={canAdvance ? {scale: 1.02} : {}}
            whileTap={canAdvance ? {scale: 0.98} : {}}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%_100%] text-white rounded-2xl px-7 py-4 text-base font-bold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Cpu className="w-5 h-5" />
            Compile the Concept Blueprint
            <Zap className="w-4 h-4" />
          </motion.button>
        ) : (
          <button
            type="button"
            onClick={onAdvance}
            disabled={!canAdvance}
            className={`inline-flex items-center gap-2 ${theme.bg} text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
          >
            {q.optional && !value.trim() ? 'Skip' : 'Continue'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Compile sequence
// ─────────────────────────────────────────────────────────────────────────────

function CompileSequence({onDone}: {onDone: () => void}) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 3000;
    let raf = 0;
    const tick = (t: number) => {
      const pct = Math.min(((t - start) / DURATION) * 100, 100);
      setProgress(pct);
      setLineIdx(Math.min(Math.floor((pct / 100) * COMPILE_LINES.length), COMPILE_LINES.length - 1));
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="rounded-3xl border border-white/10 bg-slate-900 p-8 md:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
        <h2 className="font-serif font-light text-2xl md:text-3xl">Compiling your blueprint…</h2>
      </div>

      <div className="h-2 rounded-full bg-slate-800 overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-400"
          style={{width: `${progress}%`}}
        />
      </div>

      <div className="font-mono text-sm space-y-2" aria-live="polite">
        {COMPILE_LINES.slice(0, lineIdx + 1).map((line, i) => (
          <motion.p
            key={line}
            initial={{opacity: 0, x: -8}}
            animate={{opacity: i === lineIdx ? 1 : 0.45}}
            className={i === lineIdx ? 'text-violet-300' : 'text-slate-500'}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lead capture
// ─────────────────────────────────────────────────────────────────────────────

function LeadCapture({
  answers,
  blueprint,
  source,
  theme,
  done,
  onDone,
}: {
  answers: Answers;
  blueprint: Blueprint | null;
  source: SketchSource | null;
  theme: Theme;
  done: boolean;
  onDone: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `App Concept — ${blueprint?.appName ?? 'Untitled'} (${name || email})`,
          name: name || 'Not provided',
          email,
          'Concept Name': blueprint?.appName ?? '—',
          'Concept Summary': blueprint?.summary || blueprint?.tagline || '—',
          'The Idea': answers.vision || '—',
          'The People': answers.people || '—',
          'The Moment': answers.moment || '—',
          'The Magic': answers.magic || '—',
          'The Fit (systems & constraints)': answers.connections || '—',
          'Generated Blueprint (JSON)': blueprint ? JSON.stringify(blueprint) : '—',
          'Sketch Source': source === 'gemini' ? 'Google Gemini' : 'Local studio sketch',
          message: 'Project Builder narrative submission from pulsepedagogies.com/builder',
        }),
      });
      const json = await res.json();
      if (json.success) onDone();
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{opacity: 0, scale: 0.96}}
        animate={{opacity: 1, scale: 1}}
        className="rounded-3xl border border-white/10 bg-slate-900 p-10 text-center"
      >
        <CircleCheckBig className={`w-14 h-14 mx-auto mb-6 ${theme.text}`} />
        <h2 className="font-serif font-light text-3xl mb-3">Blueprint saved.</h2>
        <p className="text-slate-400 leading-relaxed max-w-sm mx-auto mb-8">
          Your answers and the concept sketch are in our queue. We&rsquo;ll reach out by
          email to discuss possibilities, timelines, and development costs.
        </p>
        <a
          href="/"
          className={`inline-flex items-center gap-2 ${theme.bg} text-white px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity`}
        >
          Back to the studio <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}} transition={{duration: 0.45}}>
      {/* The hand-off note */}
      <div className={`rounded-2xl border ${theme.border} ${theme.softBg} p-6 mb-6 flex gap-4`}>
        <ShieldCheck className={`w-6 h-6 shrink-0 ${theme.text}`} />
        <p className="text-sm leading-relaxed text-slate-200">
          Your blueprint — your answers in your own words, plus the concept sketch we
          imagined together — has been packaged with this inquiry. Send it, and we&rsquo;ll
          review it and reach out by email to discuss possibilities, timelines, and
          development costs. <span className="font-semibold">Your time is fully preserved.</span>
        </p>
      </div>

      <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-slate-900 p-8 md:p-10">
        <h2 className="font-serif font-light text-3xl mb-2">Where should we follow up?</h2>
        <p className="text-slate-400 text-sm mb-8">
          Drop your email and your saved blueprint — plus next steps — lands in your inbox.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="pb-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Your Name
            </label>
            <input
              id="pb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name (optional)"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:outline-none focus:border-violet-400 transition-colors text-sm"
            />
          </div>
          <div>
            <label htmlFor="pb-email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              Work Email *
            </label>
            <input
              id="pb-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.org"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 focus:outline-none focus:border-violet-400 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Blueprint summary */}
        <div className="rounded-xl bg-slate-950 border border-white/5 p-4 mb-6 text-xs text-slate-400 space-y-1">
          <p><span className="text-slate-500">Working title:</span> {blueprint?.appName ?? '—'}</p>
          <p><span className="text-slate-500">Concept:</span> {blueprint?.tagline ?? '—'}</p>
          <p>
            <span className="text-slate-500">Includes:</span>{' '}
            Your five answers, verbatim, plus the generated screen blueprint.
          </p>
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-400 mb-4">
            Something went wrong — please try again, or email emil@pulsepedagogies.com directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" /> Save my blueprint
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Device mockup (the live canvas)
// ─────────────────────────────────────────────────────────────────────────────

function DeviceMockup({
  blueprint,
  theme,
  device,
}: {
  blueprint: Blueprint | null;
  theme: Theme;
  device: Device;
}) {
  if (!blueprint) {
    return (
      <div className="rounded-[28px] border-2 border-dashed border-white/10 min-h-[460px] flex flex-col items-center justify-center text-center p-10">
        <Sparkles className="w-8 h-8 text-slate-600 mb-4" />
        <p className="text-slate-500 max-w-xs leading-relaxed">
          Your concept sketch appears here. Start describing your app — the canvas draws
          while you write.
        </p>
      </div>
    );
  }

  const screen = <MockScreen blueprint={blueprint} theme={theme} device={device} />;

  if (device === 'mobile') {
    return (
      <div className="flex justify-center">
        <motion.div
          layout
          className="w-[300px] rounded-[44px] border-[10px] border-slate-800 bg-slate-950 overflow-hidden shadow-2xl"
        >
          <div className="h-7 flex items-center justify-center">
            <span className="w-24 h-4 rounded-full bg-slate-800" />
          </div>
          <div className="h-[560px] overflow-hidden relative">{screen}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div layout className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-950/60">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 flex-1 max-w-xs px-3 py-1 rounded-md bg-slate-800 text-[10px] text-slate-400 truncate">
          app.{blueprint.appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
        </span>
      </div>
      <div className="h-[480px] relative overflow-hidden">{screen}</div>
    </motion.div>
  );
}

function MockScreen({
  blueprint,
  theme,
  device,
}: {
  blueprint: Blueprint;
  theme: Theme;
  device: Device;
}) {
  const has = (w: WidgetId) => blueprint.widgets.includes(w);
  const isMobile = device === 'mobile';

  return (
    <div className="absolute inset-0 flex bg-slate-950 text-slate-100">
      {/* Sidebar (desktop only) */}
      {!isMobile && (
        <aside className="w-44 shrink-0 border-r border-white/5 p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-5">
            <motion.span
              key={blueprint.appName}
              initial={{scale: 0.6, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              className={`w-7 h-7 rounded-lg ${theme.gradient}`}
            />
            <span className="text-xs font-bold truncate">{blueprint.appName}</span>
          </div>
          {blueprint.nav.map((item, i) => (
            <motion.span
              key={`${item}-${i}`}
              initial={{opacity: 0, x: -10}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: i * 0.05}}
              className={`px-3 py-2 rounded-lg text-xs font-medium ${
                i === 0 ? `${theme.softBg} ${theme.text}` : 'text-slate-400'
              }`}
            >
              {item}
            </motion.span>
          ))}
          <div className="mt-auto">
            <AnimatePresence>
              {blueprint.integrations.length > 0 && (
                <motion.div
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0}}
                  className="space-y-1.5"
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                    Integrated with
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {blueprint.integrations.map((label, i) => (
                      <motion.span
                        key={`${label}-${i}`}
                        layout
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 text-[9px] font-semibold text-slate-300"
                      >
                        <span className={`w-3.5 h-3.5 rounded-sm ${theme.gradient} text-[7px] text-white flex items-center justify-center font-bold`}>
                          {label[0]}
                        </span>
                        {label}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          {isMobile ? (
            <div className="flex items-center gap-2">
              <motion.span
                key={blueprint.appName}
                initial={{scale: 0.6}}
                animate={{scale: 1}}
                className={`w-6 h-6 rounded-lg ${theme.gradient}`}
              />
              <span className="text-xs font-bold">{blueprint.appName}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">{blueprint.nav[0] ?? 'Dashboard'}</span>
          )}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {has('biometric') && (
                <motion.span
                  initial={{scale: 0, rotate: -90}}
                  animate={{scale: 1, rotate: 0}}
                  exit={{scale: 0}}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${theme.softBg} ${theme.text} text-[9px] font-bold`}
                  title="Secure access enabled"
                >
                  <Fingerprint className="w-3 h-3" /> Secured
                </motion.span>
              )}
            </AnimatePresence>
            <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
              {blueprint.appName[0]}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-hidden p-4 space-y-4">
          {/* Welcome */}
          <AnimatePresence mode="wait">
            <motion.div
              key={blueprint.welcome}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.3}}
            >
              <h3 className="font-semibold text-base leading-tight">{blueprint.welcome}</h3>
              <p className="text-xs text-slate-500">{blueprint.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {blueprint.stats.map((s, i) => (
              <motion.div
                key={`${s.label}-${i}`}
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: i * 0.07}}
                className="rounded-xl bg-slate-900 border border-white/5 p-3"
              >
                <p className={`text-sm font-bold ${theme.text}`}>{s.value}</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-500">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Gamification badges */}
          <AnimatePresence>
            {has('gamification') && (
              <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                exit={{opacity: 0, height: 0}}
                className="flex items-center gap-2"
              >
                {['Streak ×12', 'Level 8', 'Top 5%'].map((b, i) => (
                  <motion.span
                    key={b}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300}}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${theme.softBg} ${theme.text} text-[10px] font-bold`}
                  >
                    <Trophy className="w-3 h-3" /> {b}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Work rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={blueprint.rows.map((r) => r.title).join('|')}
              initial={{opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -14}}
              transition={{duration: 0.3}}
              className="space-y-2"
            >
              {blueprint.rows.map((r, i) => (
                <motion.div
                  key={`${r.title}-${i}`}
                  initial={{opacity: 0, x: 16}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: i * 0.08}}
                  className="rounded-xl bg-slate-900 border border-white/5 p-3"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-semibold truncate">{r.title}</p>
                    <p className="text-[9px] text-slate-500 shrink-0 ml-2">{r.meta}</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{width: 0}}
                      animate={{width: `${r.pct}%`}}
                      transition={{delay: 0.2 + i * 0.08, duration: 0.6, ease: 'easeOut'}}
                      className={`h-full ${theme.gradient}`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* AI insights panel */}
          <AnimatePresence>
            {has('ai') && (
              <motion.div
                initial={{opacity: 0, scale: 0.95, y: 10}}
                animate={{opacity: 1, scale: 1, y: 0}}
                exit={{opacity: 0, scale: 0.95}}
                className={`rounded-xl border ${theme.border} ${theme.softBg} p-3`}
              >
                <p className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${theme.text} mb-1.5`}>
                  <Sparkles className="w-3 h-3" /> AI Insights
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">{blueprint.insight}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live video tile */}
          <AnimatePresence>
            {has('video') && (
              <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                className="rounded-xl bg-slate-900 border border-white/5 p-3 flex items-center gap-3"
              >
                <span className="relative w-14 h-9 rounded-md bg-slate-800 flex items-center justify-center overflow-hidden">
                  <Video className="w-4 h-4 text-slate-400" />
                  <span className="absolute top-1 left-1 flex items-center gap-0.5 text-[7px] font-bold text-red-400">
                    <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" /> LIVE
                  </span>
                </span>
                <div>
                  <p className="text-xs font-semibold">Live session — Room A</p>
                  <p className="text-[9px] text-slate-500">14 watching now</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Signatures row */}
          <AnimatePresence>
            {has('signatures') && (
              <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                className="rounded-xl bg-slate-900 border border-white/5 p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <PenLine className={`w-4 h-4 ${theme.text}`} />
                  <p className="text-xs font-semibold">2 documents awaiting signature</p>
                </div>
                <span className={`text-[10px] font-bold ${theme.text}`}>Sign →</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile integrations footer */}
          {isMobile && blueprint.integrations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {blueprint.integrations.map((label, i) => (
                <motion.span
                  key={`${label}-${i}`}
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  className="px-2 py-1 rounded-full bg-slate-800 text-[9px] font-semibold text-slate-300"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Mobile bottom tab bar */}
        {isMobile && (
          <div className="border-t border-white/5 px-2 py-2 grid grid-cols-4 gap-1">
            {blueprint.nav.map((item, i) => (
              <motion.span
                key={`tab-${item}-${i}`}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: i * 0.05}}
                className={`text-center text-[9px] font-semibold py-1.5 rounded-lg truncate ${
                  i === 0 ? `${theme.softBg} ${theme.text}` : 'text-slate-500'
                }`}
              >
                {item}
              </motion.span>
            ))}
          </div>
        )}

        {/* Floating chat bubble */}
        <AnimatePresence>
          {has('chat') && (
            <motion.div
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0, opacity: 0}}
              transition={{type: 'spring', stiffness: 260, damping: 18}}
              className={`absolute ${isMobile ? 'bottom-16 right-3' : 'bottom-4 right-4'} w-11 h-11 rounded-full ${theme.bg} ${theme.glow} flex items-center justify-center`}
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[8px] font-bold flex items-center justify-center text-white">
                3
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Biometric splash hint (mobile) */}
        <AnimatePresence>
          {isMobile && has('biometric') && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="absolute bottom-16 left-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-[9px] font-semibold text-slate-300"
            >
              <Lock className="w-3 h-3" /> Unlocked securely
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

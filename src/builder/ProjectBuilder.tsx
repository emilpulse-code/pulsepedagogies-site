import {useEffect, useMemo, useState} from 'react';
import type {ElementType, FormEvent} from 'react';
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
  CAPABILITIES,
  COMPILE_LINES,
  EMPTY_SELECTIONS,
  ENGINES,
  INTEGRATIONS,
  NEUTRAL_THEME,
  PERSONAS,
  THEMES,
  VERTICALS,
  type CapabilityId,
  type EngineId,
  type IntegrationId,
  type PersonaId,
  type Selections,
  type Theme,
  type VerticalId,
} from './data';

const WEB3FORMS_KEY = '32c86377-fb57-4110-a513-67fd523cf413';

type Phase = 'wizard' | 'compiling' | 'capture' | 'done';
type Device = 'mobile' | 'desktop';

const STEP_LABELS = ['Vertical', 'Persona', 'Engine', 'Capabilities', 'Integrations'];

// ─────────────────────────────────────────────────────────────────────────────
// Master component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectBuilder() {
  const [sel, setSel] = useState<Selections>(EMPTY_SELECTIONS);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>('wizard');
  const [device, setDevice] = useState<Device>('desktop');

  const theme = sel.vertical ? THEMES[sel.vertical] : NEUTRAL_THEME;
  const wizardComplete = step === 4 && sel.vertical && sel.persona && sel.engine;

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
          <p className={`text-[11px] font-bold uppercase tracking-[0.3em] mb-4 ${theme.text}`}>
            Build your app in 60 seconds
          </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl leading-[1.02] mb-4">
            Design it. Watch it <span className={`italic ${theme.text}`}>come alive.</span>
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Five quick choices — no forms, no jargon. The live canvas on the right builds
            your app in real time as you decide.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* ── Left: the wizard ── */}
          <section aria-label="Project wizard">
            {phase === 'wizard' && (
              <>
                <StepIndicator step={step} theme={theme} onJump={(i) => i < step && setStep(i)} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{opacity: 0, x: 24}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -24}}
                    transition={{duration: 0.3, ease: 'easeOut'}}
                  >
                    <WizardStep
                      step={step}
                      sel={sel}
                      theme={theme}
                      onSelect={(next, autoAdvance) => {
                        setSel(next);
                        if (autoAdvance) setTimeout(() => setStep((s) => Math.min(s + 1, 4)), 320);
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(s - 1, 0))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  {step >= 3 && step < 4 && (
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className={`inline-flex items-center gap-2 ${theme.bg} text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer`}
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* The Hero Build Sequence trigger */}
                <AnimatePresence>
                  {wizardComplete && (
                    <motion.div
                      initial={{opacity: 0, y: 24, scale: 0.96}}
                      animate={{opacity: 1, y: 0, scale: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.45, ease: 'easeOut'}}
                      className="mt-10"
                    >
                      <motion.button
                        type="button"
                        onClick={() => setPhase('compiling')}
                        animate={{
                          boxShadow: [
                            '0 0 24px rgba(129,140,248,0.35)',
                            '0 0 56px rgba(167,139,250,0.65)',
                            '0 0 24px rgba(129,140,248,0.35)',
                          ],
                        }}
                        transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className="w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%_100%] text-white rounded-2xl px-8 py-6 text-lg font-bold tracking-wide flex items-center justify-center gap-3 cursor-pointer"
                      >
                        <Cpu className="w-6 h-6" />
                        Construct &amp; Compile App Blueprint
                        <Zap className="w-5 h-5" />
                      </motion.button>
                      <p className="mt-3 text-center text-xs text-slate-500">
                        Generates a technical blueprint from your exact selections.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {phase === 'compiling' && <CompileSequence onDone={() => setPhase('capture')} />}

            {(phase === 'capture' || phase === 'done') && (
              <LeadCapture
                sel={sel}
                theme={theme}
                done={phase === 'done'}
                onDone={() => setPhase('done')}
              />
            )}
          </section>

          {/* ── Right: the live canvas ── */}
          <section className="lg:sticky lg:top-10" aria-label="Live app preview">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Live Canvas
              </p>
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

            <motion.div
              animate={phase === 'compiling' ? {scale: [1, 1.015, 1]} : {scale: 1}}
              transition={
                phase === 'compiling' ? {duration: 0.7, repeat: Infinity, ease: 'easeInOut'} : {}
              }
            >
              <DeviceMockup sel={sel} theme={theme} device={device} />
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────────────────────────────────────

function StepIndicator({
  step,
  theme,
  onJump,
}: {
  step: number;
  theme: Theme;
  onJump: (i: number) => void;
}) {
  return (
    <ol className="flex items-center gap-2 mb-8" aria-label="Wizard progress">
      {STEP_LABELS.map((label, i) => (
        <li key={label} className="flex items-center gap-2 flex-1 last:flex-none">
          <button
            type="button"
            onClick={() => onJump(i)}
            className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
            aria-current={i === step ? 'step' : undefined}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                i < step
                  ? `${theme.bg} text-white`
                  : i === step
                    ? `${theme.softBg} ${theme.text} ring-1 ${theme.ring}`
                    : 'bg-slate-800 text-slate-500'
              }`}
            >
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </span>
            <span
              className={`hidden xl:block text-[10px] font-bold uppercase tracking-[0.15em] ${
                i === step ? 'text-white' : 'text-slate-500'
              }`}
            >
              {label}
            </span>
          </button>
          {i < STEP_LABELS.length - 1 && <span className="h-px flex-1 bg-slate-800" />}
        </li>
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Wizard steps
// ─────────────────────────────────────────────────────────────────────────────

function WizardStep({
  step,
  sel,
  theme,
  onSelect,
}: {
  step: number;
  sel: Selections;
  theme: Theme;
  onSelect: (next: Selections, autoAdvance: boolean) => void;
}) {
  const personas = useMemo(
    () => PERSONAS.filter((p) => !sel.vertical || p.verticals.includes(sel.vertical)),
    [sel.vertical],
  );
  const engines = useMemo(
    () => ENGINES.filter((e) => !sel.vertical || e.verticals.includes(sel.vertical)),
    [sel.vertical],
  );

  const heading = (title: string, sub: string) => (
    <div className="mb-6">
      <h2 className="font-serif font-light text-3xl md:text-4xl mb-2">{title}</h2>
      <p className="text-slate-400 text-sm">{sub}</p>
    </div>
  );

  switch (step) {
    case 0:
      return (
        <div>
          {heading('Who is this for?', 'Your vertical sets the theme, branding, and defaults.')}
          <div className="grid sm:grid-cols-3 gap-4">
            {VERTICALS.map((v) => (
              <ChoiceCard
                key={v.id}
                icon={v.icon}
                label={v.label}
                blurb={v.blurb}
                theme={THEMES[v.id]}
                selected={sel.vertical === v.id}
                onClick={() =>
                  onSelect(
                    {...EMPTY_SELECTIONS, vertical: v.id as VerticalId},
                    true,
                  )
                }
              />
            ))}
          </div>
        </div>
      );
    case 1:
      return (
        <div>
          {heading('Who opens it every day?', 'The dashboard reshapes itself around your primary user.')}
          <div className="grid sm:grid-cols-2 gap-4">
            {personas.map((p) => (
              <ChoiceCard
                key={p.id}
                icon={p.icon}
                label={p.label}
                blurb={p.blurb}
                theme={theme}
                selected={sel.persona === p.id}
                onClick={() => onSelect({...sel, persona: p.id as PersonaId}, true)}
              />
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          {heading('Pick the core engine', 'This defines the main navigation and primary workflow.')}
          <div className="grid sm:grid-cols-2 gap-4">
            {engines.map((e) => (
              <ChoiceCard
                key={e.id}
                icon={e.icon}
                label={e.label}
                blurb={e.blurb}
                theme={theme}
                selected={sel.engine === e.id}
                onClick={() => onSelect({...sel, engine: e.id as EngineId}, true)}
              />
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          {heading('Layer in capabilities', 'Select as many as you like — watch them appear live.')}
          <div className="grid sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((c) => {
              const active = sel.capabilities.includes(c.id);
              return (
                <ChoiceCard
                  key={c.id}
                  icon={c.icon}
                  label={c.label}
                  blurb={c.blurb}
                  theme={theme}
                  selected={active}
                  multi
                  onClick={() =>
                    onSelect(
                      {
                        ...sel,
                        capabilities: active
                          ? sel.capabilities.filter((x) => x !== c.id)
                          : [...sel.capabilities, c.id as CapabilityId],
                      },
                      false,
                    )
                  }
                />
              );
            })}
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          {heading('Connect your stack', 'Enterprise integrations your tools already speak.')}
          <div className="grid sm:grid-cols-2 gap-4">
            {INTEGRATIONS.map((i) => {
              const active = sel.integrations.includes(i.id);
              return (
                <ChoiceCard
                  key={i.id}
                  icon={i.icon}
                  label={i.label}
                  blurb={`Sync with ${i.label}`}
                  theme={theme}
                  selected={active}
                  multi
                  onClick={() =>
                    onSelect(
                      {
                        ...sel,
                        integrations: active
                          ? sel.integrations.filter((x) => x !== i.id)
                          : [...sel.integrations, i.id as IntegrationId],
                      },
                      false,
                    )
                  }
                />
              );
            })}
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ChoiceCard({
  icon: Icon,
  label,
  blurb,
  theme,
  selected,
  multi = false,
  onClick,
}: {
  /* `key` is consumed by React, but this project's transitive react types
     lack JSX.IntrinsicAttributes, so it must be declared to satisfy tsc */
  key?: string;
  icon: ElementType;
  label: string;
  blurb: string;
  theme: Theme;
  selected: boolean;
  multi?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{y: -3}}
      whileTap={{scale: 0.98}}
      aria-pressed={selected}
      className={`relative text-left rounded-2xl border p-5 md:p-6 transition-colors cursor-pointer ${
        selected
          ? `${theme.softBg} ${theme.border} ${theme.glow}`
          : 'bg-slate-900 border-white/10 hover:border-white/25'
      }`}
    >
      <span
        className={`inline-flex w-11 h-11 rounded-xl items-center justify-center mb-4 ${
          selected ? `${theme.bg} text-white` : 'bg-slate-800 text-slate-300'
        }`}
      >
        <Icon className="w-5 h-5" />
      </span>
      <span className="block font-semibold mb-1">{label}</span>
      <span className="block text-sm text-slate-400 leading-snug">{blurb}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
            className={`absolute top-4 right-4 w-6 h-6 rounded-full ${theme.bg} text-white flex items-center justify-center`}
          >
            <Check className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      {multi && !selected && (
        <span className="absolute top-4 right-4 w-6 h-6 rounded-full border border-white/15" />
      )}
    </motion.button>
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
  sel,
  theme,
  done,
  onDone,
}: {
  sel: Selections;
  theme: Theme;
  done: boolean;
  onDone: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const blueprint = useMemo(() => {
    const v = VERTICALS.find((x) => x.id === sel.vertical)?.label ?? '—';
    const p = PERSONAS.find((x) => x.id === sel.persona)?.label ?? '—';
    const e = ENGINES.find((x) => x.id === sel.engine)?.label ?? '—';
    const caps =
      sel.capabilities.map((c) => CAPABILITIES.find((x) => x.id === c)?.label).join(', ') || 'None';
    const ints =
      sel.integrations.map((i) => INTEGRATIONS.find((x) => x.id === i)?.label).join(', ') || 'None';
    return {v, p, e, caps, ints};
  }, [sel]);

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `App Blueprint — ${name || email}`,
          name: name || 'Not provided',
          email,
          'Industry Vertical': blueprint.v,
          'Primary Persona': blueprint.p,
          'Core Engine': blueprint.e,
          'Capabilities': blueprint.caps,
          'Integrations': blueprint.ints,
          message: 'Project Builder blueprint submission from pulsepedagogies.com/builder',
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
        <h2 className="font-serif font-light text-3xl mb-3">Blueprint received.</h2>
        <p className="text-slate-400 leading-relaxed max-w-sm mx-auto mb-8">
          Your configuration is in our engineering queue. We&rsquo;ll reach out within one
          business day to schedule your discovery call.
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
          Your exact design selections, feature configurations, and mockup architecture
          have been securely packaged. Our engineering team is reviewing these technical
          specifications right now so we can hit the ground running on our discovery
          call. <span className="font-semibold">Your time is fully preserved.</span>
        </p>
      </div>

      <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-slate-900 p-8 md:p-10">
        <h2 className="font-serif font-light text-3xl mb-2">Where should we send it?</h2>
        <p className="text-slate-400 text-sm mb-8">
          Drop your email and the blueprint — plus next steps — lands in your inbox.
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
          <p><span className="text-slate-500">Vertical:</span> {blueprint.v}</p>
          <p><span className="text-slate-500">Persona:</span> {blueprint.p}</p>
          <p><span className="text-slate-500">Engine:</span> {blueprint.e}</p>
          <p><span className="text-slate-500">Capabilities:</span> {blueprint.caps}</p>
          <p><span className="text-slate-500">Integrations:</span> {blueprint.ints}</p>
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
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" /> Send my blueprint
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

function DeviceMockup({sel, theme, device}: {sel: Selections; theme: Theme; device: Device}) {
  const vertical = VERTICALS.find((v) => v.id === sel.vertical);
  const persona = PERSONAS.find((p) => p.id === sel.persona);
  const engine = ENGINES.find((e) => e.id === sel.engine);

  if (!vertical) {
    return (
      <div className="rounded-[28px] border-2 border-dashed border-white/10 min-h-[460px] flex flex-col items-center justify-center text-center p-10">
        <Sparkles className="w-8 h-8 text-slate-600 mb-4" />
        <p className="text-slate-500 max-w-xs leading-relaxed">
          Your live app preview appears here. Pick a vertical to lay the foundation.
        </p>
      </div>
    );
  }

  const screen = (
    <MockScreen sel={sel} theme={theme} device={device} vertical={vertical} persona={persona} engine={engine} />
  );

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
          app.{vertical.brandName.toLowerCase()}.com
        </span>
      </div>
      <div className="h-[480px] relative overflow-hidden">{screen}</div>
    </motion.div>
  );
}

function MockScreen({
  sel,
  theme,
  device,
  vertical,
  persona,
  engine,
}: {
  sel: Selections;
  theme: Theme;
  device: Device;
  vertical: NonNullable<ReturnType<typeof VERTICALS.find>>;
  persona?: ReturnType<typeof PERSONAS.find>;
  engine?: ReturnType<typeof ENGINES.find>;
}) {
  const nav = engine?.nav ?? ['Home', '—', '—', '—'];
  const has = (c: CapabilityId) => sel.capabilities.includes(c);
  const isMobile = device === 'mobile';

  return (
    <div className="absolute inset-0 flex bg-slate-950 text-slate-100">
      {/* Sidebar (desktop only) */}
      {!isMobile && (
        <aside className="w-44 shrink-0 border-r border-white/5 p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-5">
            <motion.span
              key={vertical.id}
              initial={{scale: 0.6, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              className={`w-7 h-7 rounded-lg ${theme.gradient}`}
            />
            <span className="text-xs font-bold truncate">{vertical.brandName}</span>
          </div>
          {nav.map((item, i) => (
            <motion.span
              key={`${engine?.id ?? 'none'}-${item}`}
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
              {sel.integrations.length > 0 && (
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
                    {sel.integrations.map((id) => {
                      const integ = INTEGRATIONS.find((x) => x.id === id)!;
                      return (
                        <motion.span
                          key={id}
                          layout
                          initial={{scale: 0}}
                          animate={{scale: 1}}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 text-[9px] font-semibold text-slate-300"
                        >
                          <span className={`w-3.5 h-3.5 rounded-sm ${theme.gradient} text-[7px] text-white flex items-center justify-center font-bold`}>
                            {integ.monogram[0]}
                          </span>
                          {integ.label}
                        </motion.span>
                      );
                    })}
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
              <motion.span key={vertical.id} initial={{scale: 0.6}} animate={{scale: 1}} className={`w-6 h-6 rounded-lg ${theme.gradient}`} />
              <span className="text-xs font-bold">{vertical.brandName}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">{engine?.screenTitle ?? 'Dashboard'}</span>
          )}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {has('biometric') && (
                <motion.span
                  initial={{scale: 0, rotate: -90}}
                  animate={{scale: 1, rotate: 0}}
                  exit={{scale: 0}}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${theme.softBg} ${theme.text} text-[9px] font-bold`}
                  title="Biometric lock enabled"
                >
                  <Fingerprint className="w-3 h-3" /> Secured
                </motion.span>
              )}
            </AnimatePresence>
            <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
              {persona ? persona.label[0] : '?'}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-hidden p-4 space-y-4">
          {/* Welcome */}
          <AnimatePresence mode="wait">
            <motion.div
              key={persona?.id ?? 'nopersona'}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.3}}
            >
              <h3 className="font-semibold text-base leading-tight">
                {persona?.welcome ?? 'Welcome'}
              </h3>
              <p className="text-xs text-slate-500">{persona?.subtitle ?? 'Choose a persona to personalize this view.'}</p>
            </motion.div>
          </AnimatePresence>

          {/* Persona stats */}
          {persona && (
            <div className="grid grid-cols-3 gap-2">
              {persona.stats.map((s, i) => (
                <motion.div
                  key={`${persona.id}-${s.label}`}
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
          )}

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

          {/* Engine rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={engine?.id ?? 'noengine'}
              initial={{opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -14}}
              transition={{duration: 0.3}}
              className="space-y-2"
            >
              {(engine?.rows ?? []).map((r, i) => (
                <motion.div
                  key={r.title}
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
              {!engine && (
                <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-[11px] text-slate-600">
                  Choose a core engine to lay out this screen.
                </div>
              )}
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
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {persona?.id === 'hrlead'
                    ? 'Attrition risk is trending down 14% this quarter. Two teams need check-ins.'
                    : 'Based on recent activity, tomorrow is your best focus window — two items can be finished early.'}
                </p>
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
                  <p className="text-xs font-semibold">Office hours — Room A</p>
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
          {isMobile && sel.integrations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {sel.integrations.map((id) => {
                const integ = INTEGRATIONS.find((x) => x.id === id)!;
                return (
                  <motion.span
                    key={id}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className="px-2 py-1 rounded-full bg-slate-800 text-[9px] font-semibold text-slate-300"
                  >
                    {integ.label}
                  </motion.span>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile bottom tab bar */}
        {isMobile && (
          <div className="border-t border-white/5 px-2 py-2 grid grid-cols-4 gap-1">
            {nav.map((item, i) => (
              <motion.span
                key={`${engine?.id ?? 'none'}-tab-${item}`}
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
              <Lock className="w-3 h-3" /> Unlocked via FaceID
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

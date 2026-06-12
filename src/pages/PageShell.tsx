import {ArrowLeft, Mail} from 'lucide-react';
import type {ReactNode} from 'react';

/** Shared chrome for the standalone info pages (/compliance, /prop28). */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-svh bg-brand-ink text-brand-paper selection:bg-brand-orange selection:text-white">
      <header className="max-w-[100rem] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-paper/60 hover:text-brand-orange transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Pulse Pedagogies
        </a>
        <a
          href="mailto:emil@pulsepedagogies.com?subject=Project%20inquiry%20%E2%80%94%20Pulse%20Pedagogies"
          className="whitespace-nowrap border border-brand-paper/25 rounded-full px-4 md:px-5 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:border-brand-orange hover:text-brand-orange transition-colors font-sans"
        >
          Start a project
        </a>
      </header>

      <main className="max-w-[100rem] mx-auto px-6 md:px-10 pb-28">
        <section className="pt-16 md:pt-24 pb-16 md:pb-24 max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-6 font-sans">
            {eyebrow}
          </p>
          <h1 className="font-serif font-light leading-[0.95] tracking-tight text-[clamp(2.8rem,8vw,7rem)] mb-8">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-brand-paper/65 leading-relaxed max-w-3xl">{intro}</p>
        </section>

        {children}
      </main>

      <footer className="border-t border-brand-paper/10">
        <div className="max-w-[100rem] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/35 font-sans">
          <p>© 2026 Pulse Pedagogies, LLC · Glendale, CA · All Rights Reserved</p>
          <a
            href="mailto:emil@pulsepedagogies.com"
            className="inline-flex items-center gap-2 hover:text-brand-orange transition-colors"
          >
            <Mail className="w-4 h-4" />
            emil@pulsepedagogies.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export function SectionLabel({n, children}: {n: string; children: ReactNode}) {
  return (
    <div className="flex items-baseline gap-4 mb-10 md:mb-14 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-paper/40 font-sans">
      <span className="text-brand-orange">{n}</span>
      <span className="w-10 h-px bg-brand-paper/20 self-center" />
      <span>{children}</span>
    </div>
  );
}

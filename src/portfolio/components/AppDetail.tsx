import {useEffect} from 'react';
import {X} from 'lucide-react';
import type {PipelineApp} from '../../data/apps';

const PRICING_LABEL = {free: 'Free', freemium: 'Freemium', paid: 'Paid'} as const;

/** Full pipeline-app description, revealed when a work or orbit item is clicked. */
export function AppDetail({app, onClose}: {app: PipelineApp | null; onClose: () => void}) {
  useEffect(() => {
    if (!app) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [app, onClose]);

  if (!app) return null;

  return (
    <div
      className="pp-detail-backdrop fixed inset-0 z-[95] bg-brand-ink/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} — full description`}
      onClick={onClose}
    >
      <div
        className="pp-detail-panel relative w-full max-w-3xl max-h-[88svh] overflow-y-auto rounded-[28px] md:rounded-[36px] border border-brand-paper/15 bg-brand-ink text-brand-paper p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-brand-paper/20 flex items-center justify-center text-brand-paper/60 hover:text-brand-orange hover:border-brand-orange transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {app.image && (
          <img
            src={app.image}
            alt={`${app.name} interface preview`}
            className="w-full max-h-60 object-contain mb-8 drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
          />
        )}

        <div className="flex flex-wrap items-center gap-2 mb-5 text-[9px] font-bold uppercase tracking-[0.2em] font-sans">
          <span className="px-3 py-1.5 rounded-full border border-brand-orange/30 text-brand-orange">
            {app.suite}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-brand-paper/5 text-brand-paper/50">
            {PRICING_LABEL[app.pricing]}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-brand-paper/5 text-brand-paper/50">
            {app.audience}
          </span>
        </div>

        <h3 className="font-serif font-light text-4xl md:text-5xl mb-1">{app.name}</h3>
        {app.subtitle && (
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/35 font-sans">
            {app.subtitle}
          </p>
        )}

        <p className="mt-6 font-serif italic font-light text-xl md:text-2xl leading-snug text-brand-orange">
          {app.problemStatement}
        </p>

        <p className="mt-6 text-brand-paper/70 leading-relaxed">{app.description}</p>
      </div>
    </div>
  );
}

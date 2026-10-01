import {useEffect, useRef, useState} from 'react';
import {BadgeCheck, Ban, Check, Loader2} from 'lucide-react';
import type {CredentialDemoConfig} from '../../data/signet';
import {useHeightSync} from '../lib/useHeightSync';

/**
 * Signet's hardest claim, made touchable: a credential verifies against a
 * published key rather than against the issuer, and revoking one leaves the
 * revocation visible instead of deleting the history.
 *
 * Illustrative, and labelled as such at the bottom — no key material ships to
 * this page and nothing here is actually signed. What it reproduces faithfully
 * is the *shape* of the answer: the chain you check, and the fact that a
 * revoked credential still resolves, still shows its signature as sound, and
 * says plainly that it was withdrawn.
 *
 * The verdict is an aria-live region so the outcome is announced rather than
 * only coloured, and the check runs on a timer that is cleaned up on unmount.
 */

type Status = 'idle' | 'checking' | 'verified';

export function CredentialDemo({config}: {config: CredentialDemoConfig}) {
  const {badge, category, facts, criteria, chain, revokedOn} = config;

  const [status, setStatus] = useState<Status>('idle');
  const [revoked, setRevoked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => clearTimeout(timer.current ?? undefined), []);

  // Both of these change the card's height — see the hook.
  useHeightSync([status, revoked]);

  const check = () => {
    setStatus('checking');
    timer.current = setTimeout(() => setStatus('verified'), 900);
  };

  return (
    <div className="rounded-[28px] border border-brand-ink/12 bg-white shadow-[0_40px_80px_-40px_rgba(26,26,26,0.35)] overflow-hidden flex flex-col">
      {/* Header — the credential itself */}
      <div className="p-6 md:p-7 border-b border-brand-ink/8">
        <div className="flex items-start gap-4">
          <span
            className={`shrink-0 grid place-items-center w-14 h-14 rounded-2xl transition-colors duration-500 ${
              revoked ? 'bg-brand-ink/10 text-brand-ink/30' : 'bg-brand-orange/15 text-brand-orange'
            }`}
            aria-hidden="true"
          >
            <BadgeCheck className="w-7 h-7" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-brand-ink/[0.06] text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/50 font-sans">
                {category}
              </span>
              {revoked && (
                <span className="px-2.5 py-1 rounded-full bg-red-600/10 text-[9px] font-bold uppercase tracking-[0.2em] text-red-700 font-sans">
                  Revoked
                </span>
              )}
            </div>
            <h4
              className={`font-serif font-light text-2xl md:text-3xl leading-none transition-colors duration-500 ${
                revoked ? 'text-brand-ink/40 line-through decoration-1' : 'text-brand-ink'
              }`}
            >
              {badge}
            </h4>
          </div>
        </div>

        <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-2 font-sans">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/35">
                {f.label}
              </dt>
              <dd className="text-[13px] text-brand-ink/70 tabular-nums mt-0.5">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Criteria */}
      <div className="px-6 md:px-7 py-5 border-b border-brand-ink/8">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/35 mb-3 font-sans">
          Criteria met
        </p>
        <ul className="space-y-2">
          {criteria.map((c) => (
            <li key={c} className="flex gap-2.5 text-[13px] text-brand-ink/60 leading-snug">
              <Check
                className="shrink-0 w-3.5 h-3.5 mt-0.5 text-brand-orange"
                strokeWidth={3}
                aria-hidden="true"
              />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Verification chain */}
      <div className="px-6 md:px-7 py-5 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/35 mb-3 font-sans">
          Verification chain
        </p>
        <dl className="space-y-2.5">
          {chain.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 text-[12px]">
              <dt className="shrink-0 text-brand-ink/45 font-sans">{row.label}</dt>
              <dd
                className={`truncate text-right text-brand-ink/75 ${
                  row.mono ? 'font-mono text-[11px]' : 'font-sans'
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
          {revoked && (
            <div className="flex items-baseline justify-between gap-4 text-[12px]">
              <dt className="shrink-0 text-brand-ink/45 font-sans">Revoked</dt>
              <dd className="text-right text-red-700 font-sans">{revokedOn}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Verdict + controls */}
      <div className="px-6 md:px-7 pb-6 md:pb-7">
        <div
          aria-live="polite"
          className={`rounded-2xl border px-4 py-3 mb-4 transition-colors duration-300 ${
            status === 'verified'
              ? 'border-brand-ink/15 bg-brand-paper/80'
              : 'border-brand-ink/10 bg-brand-paper/40'
          }`}
        >
          {status === 'idle' && (
            <p className="text-[13px] font-sans text-brand-ink/45">
              Not checked yet. The signature verifies against the issuer's published key.
            </p>
          )}
          {status === 'checking' && (
            <p className="flex items-center gap-2 text-[13px] font-sans text-brand-ink/55">
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              Checking the signature against the published key…
            </p>
          )}
          {status === 'verified' && (
            <div className="flex gap-3">
              <Check className="shrink-0 w-4 h-4 mt-0.5 text-brand-orange" strokeWidth={3} />
              <div>
                <p className="text-[13px] font-semibold font-sans text-brand-ink mb-1">
                  {revoked ? 'Signature valid — but this credential was revoked' : 'Signature valid'}
                </p>
                <p className="text-[12px] font-sans text-brand-ink/50 leading-relaxed">
                  {revoked
                    ? 'The seal is sound and the record is intact. Revocation is recorded on the credential rather than deleted, so the history stays readable.'
                    : 'Checked against the issuer’s published key — no request to the issuer, and no account needed. Anyone can run this.'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={check}
            disabled={status === 'checking'}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-ink text-brand-paper text-[11px] font-bold uppercase tracking-[0.15em] font-sans hover:bg-brand-orange transition-colors disabled:opacity-50 disabled:hover:bg-brand-ink cursor-pointer"
          >
            {status === 'verified' ? 'Check again' : 'Check signature'}
          </button>
          <button
            type="button"
            onClick={() => setRevoked((r) => !r)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-ink/15 text-brand-ink/60 text-[11px] font-bold uppercase tracking-[0.15em] font-sans hover:border-brand-ink/40 hover:text-brand-ink transition-colors cursor-pointer"
          >
            <Ban className="w-3.5 h-3.5" aria-hidden="true" />
            {revoked ? 'Reinstate' : 'Revoke it'}
          </button>
        </div>

        <p className="mt-4 text-[10px] font-sans text-brand-ink/35 leading-relaxed">
          Illustrative sample — no key material is shipped to this page. In Signet the signature and
          metadata are carried inside the badge image itself, so an issued credential stays
          verifiable whether or not the application is still running.
        </p>
      </div>
    </div>
  );
}

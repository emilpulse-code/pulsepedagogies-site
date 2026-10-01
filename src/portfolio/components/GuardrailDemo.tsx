import {useMemo, useState} from 'react';
import {Check, TriangleAlert} from 'lucide-react';
import type {GuardrailDemoConfig} from '../../data/spotlight';
import {useHeightSync} from '../lib/useHeightSync';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

/**
 * A live, client-only re-creation of the clearAMS 80/20 guardrail.
 *
 * Toggle plan lines and both compliance rules answer immediately: the plan may
 * not exceed the school's allocation, and at least `staffFloor` of it must go
 * to arts staffing. Failing either is what blocks a save in the real product,
 * so the demo blocks too rather than merely warning.
 *
 * Deliberately stateless beyond the checkbox set — no network, no persistence.
 * The checkboxes are real inputs inside real labels so the whole thing is
 * keyboard-operable, and the verdict is an aria-live region so a screen reader
 * hears the rule answer on every toggle.
 */
export function GuardrailDemo({config}: {config: GuardrailDemoConfig}) {
  const {host, school, fiscalYear, allocation, staffFloor, staffLabel, otherLabel, lines} = config;

  const [active, setActive] = useState<string[]>(() =>
    lines.filter((l) => l.on).map((l) => l.id),
  );

  const toggle = (id: string) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const s = useMemo(() => {
    const on = lines.filter((l) => active.includes(l.id));
    const sum = (kind: 'staff' | 'other') =>
      on.filter((l) => l.kind === kind).reduce((t, l) => t + l.amount, 0);

    const staff = sum('staff');
    const other = sum('other');
    const total = staff + other;
    const empty = total === 0;

    // Guard the divide: an empty plan has no share, it is simply not a plan yet.
    const share = empty ? 0 : staff / total;
    const overBy = Math.max(0, total - allocation);

    const reasons: string[] = [];
    if (overBy > 0) reasons.push(`${usd(overBy)} over this school's allocation`);
    if (!empty && share < staffFloor) {
      reasons.push(
        `only ${(share * 100).toFixed(1)}% to arts staff — the floor is ${staffFloor * 100}%`,
      );
    }

    return {
      staff,
      other,
      total,
      empty,
      share,
      reasons,
      remaining: allocation - total,
      // Percentages of the planned total, for the split meter.
      staffPct: empty ? 0 : (staff / total) * 100,
      otherPct: empty ? 0 : (other / total) * 100,
      // Percentage of the allocation consumed, capped for the bar width.
      usedPct: Math.min(100, (total / allocation) * 100),
      ok: !empty && reasons.length === 0,
    };
  }, [active, lines, allocation, staffFloor]);

  const blocked = s.reasons.length > 0;

  // The verdict box grows with the number of reasons — see the hook.
  useHeightSync([s.reasons.length, s.empty]);

  return (
    <div className="rounded-[28px] border border-brand-ink/12 bg-white shadow-[0_40px_80px_-40px_rgba(26,26,26,0.35)] overflow-hidden">
      {/* Mock browser chrome — the tenant hostname is the point, so it is legible */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-brand-ink/8 bg-brand-paper/70">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block w-2.5 h-2.5 rounded-full bg-brand-ink/15" />
          <i className="block w-2.5 h-2.5 rounded-full bg-brand-ink/15" />
          <i className="block w-2.5 h-2.5 rounded-full bg-brand-ink/15" />
        </span>
        <span className="ml-2 truncate text-[11px] font-medium text-brand-ink/45 font-sans">
          {host}
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Plan header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-ink/40 font-sans mb-1">
              Site expenditure plan · {fiscalYear}
            </p>
            <p className="font-serif font-light text-2xl md:text-3xl leading-none">{school}</p>
          </div>
          <span className="shrink-0 mt-1 px-3 py-1 rounded-full border border-brand-ink/15 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/50 font-sans">
            Draft
          </span>
        </div>

        {/* ── Rule 1: the staffing split ── */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40">
              Share to arts staff
            </span>
            <span
              className={`text-sm font-semibold tabular-nums ${
                s.empty ? 'text-brand-ink/30' : s.share < staffFloor ? 'text-red-600' : 'text-brand-ink'
              }`}
            >
              {s.empty ? '—' : `${(s.share * 100).toFixed(1)}%`}
            </span>
          </div>

          <div className="relative h-4 rounded-full bg-brand-ink/8 overflow-hidden flex">
            <div
              className="h-full bg-brand-ink transition-[width] duration-500 ease-out"
              style={{width: `${s.staffPct}%`}}
            />
            <div
              className="h-full bg-brand-orange transition-[width] duration-500 ease-out"
              style={{width: `${s.otherPct}%`}}
            />
          </div>

          {/* The 80% floor marker sits outside the clipped bar so it stays visible */}
          <div className="relative h-4 mt-1" aria-hidden="true">
            <div
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{left: `${staffFloor * 100}%`}}
            >
              <span className="block w-px h-2 bg-brand-ink/35" />
              <span className="mt-0.5 text-[9px] font-bold tracking-[0.1em] text-brand-ink/40 font-sans whitespace-nowrap">
                {staffFloor * 100}% floor
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] font-sans text-brand-ink/50">
            <span className="inline-flex items-center gap-2">
              <i className="block w-2.5 h-2.5 rounded-sm bg-brand-ink" aria-hidden="true" />
              {staffLabel} <span className="tabular-nums text-brand-ink/70">{usd(s.staff)}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="block w-2.5 h-2.5 rounded-sm bg-brand-orange" aria-hidden="true" />
              {otherLabel} <span className="tabular-nums text-brand-ink/70">{usd(s.other)}</span>
            </span>
          </div>
        </div>

        {/* ── Rule 2: the allocation ceiling ── */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40">
              Against allocation
            </span>
            <span className="text-sm tabular-nums text-brand-ink/60">
              <span className={`font-semibold ${s.total > allocation ? 'text-red-600' : 'text-brand-ink'}`}>
                {usd(s.total)}
              </span>{' '}
              of {usd(allocation)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-brand-ink/8 overflow-hidden">
            <div
              className={`h-full transition-[width] duration-500 ease-out ${
                s.total > allocation ? 'bg-red-600' : 'bg-brand-ink/45'
              }`}
              style={{width: `${s.usedPct}%`}}
            />
          </div>
          <p className="mt-2 text-[11px] font-sans tabular-nums text-brand-ink/45">
            {s.remaining >= 0
              ? `${usd(s.remaining)} remaining`
              : `${usd(-s.remaining)} over the ceiling`}
          </p>
        </div>

        {/* ── The plan lines ── */}
        <fieldset className="border-t border-brand-ink/10 pt-4">
          <legend className="sr-only">
            Sample plan lines for {school} — toggle each to see the guardrail respond
          </legend>
          <ul className="space-y-0.5">
            {lines.map((line) => {
              const checked = active.includes(line.id);
              return (
                <li key={line.id}>
                  <label className="group flex items-center gap-3 py-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(line.id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`shrink-0 grid place-items-center w-[18px] h-[18px] rounded-[5px] border transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange peer-focus-visible:ring-offset-2 ${
                        checked
                          ? 'bg-brand-ink border-brand-ink'
                          : 'border-brand-ink/25 group-hover:border-brand-ink/50'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 text-white transition-opacity duration-200 ${
                          checked ? 'opacity-100' : 'opacity-0'
                        }`}
                        strokeWidth={3}
                      />
                    </span>
                    <span
                      className={`flex-1 text-sm font-sans transition-colors duration-200 ${
                        checked ? 'text-brand-ink/80' : 'text-brand-ink/35'
                      }`}
                    >
                      {line.label}
                    </span>
                    <span
                      className={`shrink-0 text-sm tabular-nums font-sans transition-colors duration-200 ${
                        checked ? 'text-brand-ink/80' : 'text-brand-ink/30'
                      }`}
                    >
                      {usd(line.amount)}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        {/* ── The verdict ── */}
        <div
          aria-live="polite"
          className={`rounded-2xl border px-4 py-3.5 transition-colors duration-300 ${
            blocked
              ? 'border-red-600/25 bg-red-600/[0.06]'
              : s.ok
                ? 'border-brand-ink/15 bg-brand-paper/80'
                : 'border-brand-ink/10 bg-brand-paper/50'
          }`}
        >
          {s.empty ? (
            <p className="text-sm font-sans text-brand-ink/45">
              Nothing planned yet. Add a line to run the guardrail.
            </p>
          ) : blocked ? (
            <div className="flex gap-3">
              <TriangleAlert className="shrink-0 w-4 h-4 mt-0.5 text-red-600" strokeWidth={2} />
              <div>
                <p className="text-sm font-semibold font-sans text-red-700 mb-1">
                  Blocked — this plan cannot be saved
                </p>
                <ul className="text-[13px] font-sans text-red-700/80 space-y-0.5">
                  {s.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Check className="shrink-0 w-4 h-4 mt-0.5 text-brand-orange" strokeWidth={3} />
              <div>
                <p className="text-sm font-semibold font-sans text-brand-ink mb-1">
                  Compliant — clear to submit for review
                </p>
                <p className="text-[13px] font-sans text-brand-ink/50">
                  Within allocation, and above the {staffFloor * 100}% staffing floor.
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-[10px] font-sans text-brand-ink/35 leading-relaxed">
          Illustrative sample. In clearAMS these rules are enforced in the browser and again on
          the server, so a non-compliant plan never reaches the record.
        </p>
      </div>
    </div>
  );
}

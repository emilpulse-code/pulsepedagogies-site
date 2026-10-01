import {useMemo, useState} from 'react';
import {CalendarCheck, Mail, RotateCcw, Ticket} from 'lucide-react';
import type {SeatDemoConfig} from '../../data/signet';
import {useHeightSync} from '../lib/useHeightSync';

/**
 * The decision the Signet brief says shapes everything else, made touchable:
 * registering is a request, not a reservation.
 *
 * Approving is the single act that issues the seat, the confirmation email and
 * the calendar invitation together — so there is exactly one place where
 * "you're in" becomes true, and a person decides it. Approve into a full room
 * and it waitlists rather than failing, because the decision is about the
 * person and the room is a separate fact. Release a seat and the longest-waiting
 * person is promoted automatically.
 *
 * Illustrative and client-only — no network, no persistence. The outcome line
 * is an aria-live region so each approval is announced rather than only shown.
 */

type SeatState = 'pending' | 'confirmed' | 'waitlisted';

export function SeatDemo({config}: {config: SeatDemoConfig}) {
  const {session, date, format, capacity, taken, queue} = config;

  const initial = useMemo(
    () => Object.fromEntries(queue.map((r) => [r.id, 'pending' as SeatState])),
    [queue],
  );

  const [states, setStates] = useState<Record<string, SeatState>>(initial);
  const [released, setReleased] = useState(0);
  const [note, setNote] = useState<{tone: 'seat' | 'wait' | 'release'; text: string} | null>(null);

  const confirmed =
    taken - released + queue.filter((r) => states[r.id] === 'confirmed').length;
  const waiting = queue.filter((r) => states[r.id] === 'waitlisted');
  const seatsLeft = Math.max(0, capacity - confirmed);
  const settled = queue.every((r) => states[r.id] !== 'pending');

  const approve = (id: string) => {
    const person = queue.find((r) => r.id === id)!;
    if (seatsLeft > 0) {
      setStates((s) => ({...s, [id]: 'confirmed'}));
      setNote({
        tone: 'seat',
        text: `${person.name} is in. Seat, confirmation email and calendar invitation issued together, in one act.`,
      });
    } else {
      setStates((s) => ({...s, [id]: 'waitlisted'}));
      setNote({
        tone: 'wait',
        text: `Room is full, so ${person.name} is waitlisted — told plainly, not refused. They move up the moment a seat is released.`,
      });
    }
  };

  // Releasing frees a seat and immediately promotes whoever has waited longest,
  // which is the whole point: the waitlist has to move on its own.
  const release = () => {
    const next = queue.find((r) => states[r.id] === 'waitlisted');
    setReleased((n) => n + 1);
    if (next) {
      setStates((s) => ({...s, [next.id]: 'confirmed'}));
      setNote({
        tone: 'release',
        text: `A seat was released. ${next.name} was longest-waiting and was promoted automatically — their invitation is already sent.`,
      });
    } else {
      setNote({tone: 'release', text: 'A seat was released. Nobody is waiting, so the room simply has room.'});
    }
  };

  const reset = () => {
    setStates(initial);
    setReleased(0);
    setNote(null);
  };

  const fillPct = Math.min(100, (confirmed / capacity) * 100);

  // The outcome line and the Reset button both change the card's height.
  useHeightSync([note, settled, released]);

  return (
    <div className="rounded-[28px] border border-brand-ink/12 bg-white shadow-[0_40px_80px_-40px_rgba(26,26,26,0.35)] overflow-hidden flex flex-col">
      {/* Session header */}
      <div className="p-6 md:p-7 border-b border-brand-ink/8">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/35 mb-2 font-sans">
          Session · {format}
        </p>
        <h4 className="font-serif font-light text-2xl md:text-3xl leading-tight text-brand-ink mb-1">
          {session}
        </h4>
        <p className="text-[13px] text-brand-ink/50 font-sans">{date}</p>
      </div>

      {/* Seats */}
      <div className="px-6 md:px-7 py-5 border-b border-brand-ink/8">
        <div className="flex items-baseline justify-between mb-2.5 font-sans">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/35">
            Confirmed seats
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-brand-ink">
            {confirmed}
            <span className="text-brand-ink/40 font-normal"> of {capacity}</span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-brand-ink/8 overflow-hidden">
          <div
            className={`h-full transition-[width] duration-500 ease-out ${
              seatsLeft === 0 ? 'bg-brand-orange' : 'bg-brand-ink/45'
            }`}
            style={{width: `${fillPct}%`}}
          />
        </div>
        <p className="mt-2 text-[11px] font-sans tabular-nums text-brand-ink/45">
          {seatsLeft === 0
            ? 'Room is full'
            : `${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} left`}
          {waiting.length > 0 && ` · ${waiting.length} waiting`}
        </p>
      </div>

      {/* The queue */}
      <div className="px-6 md:px-7 py-5 flex-1">
        {/* The real roster opens on "Awaiting approval" whenever someone is
            waiting, because that is the one thing on the page blocking a
            colleague. Once nobody is, calling it that would be a lie. */}
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-ink/35 mb-3 font-sans">
          {settled ? 'Registrations' : 'Awaiting approval'}
        </p>
        <ul className="space-y-2">
          {queue.map((r) => {
            const state = states[r.id];
            return (
              <li
                key={r.id}
                className="flex items-center gap-3 py-2 border-b border-brand-ink/[0.07] last:border-0"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-brand-ink/80 font-sans truncate">{r.name}</span>
                  <span className="block text-[11px] text-brand-ink/40 font-sans truncate">
                    {r.role}
                  </span>
                </span>

                {state === 'pending' ? (
                  <button
                    type="button"
                    onClick={() => approve(r.id)}
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-brand-ink text-brand-paper text-[10px] font-bold uppercase tracking-[0.15em] font-sans hover:bg-brand-orange transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                ) : (
                  <span
                    className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] font-sans ${
                      state === 'confirmed'
                        ? 'bg-brand-orange/15 text-brand-orange'
                        : 'bg-brand-ink/[0.06] text-brand-ink/45'
                    }`}
                  >
                    {state === 'confirmed' ? 'Confirmed' : 'Waitlisted'}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* What approval actually issued */}
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-sans text-brand-ink/40">
          {[
            {icon: Ticket, label: 'Seat'},
            {icon: Mail, label: 'Confirmation'},
            {icon: CalendarCheck, label: 'Calendar invite'},
          ].map(({icon: Icon, label}) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome + controls */}
      <div className="px-6 md:px-7 pb-6 md:pb-7">
        <div
          aria-live="polite"
          className={`rounded-2xl border px-4 py-3 mb-4 transition-colors duration-300 ${
            note ? 'border-brand-ink/15 bg-brand-paper/80' : 'border-brand-ink/10 bg-brand-paper/40'
          }`}
        >
          <p className="text-[13px] font-sans leading-relaxed text-brand-ink/60">
            {note
              ? note.text
              : 'Nobody holds a seat yet. Registering is a request — approve someone and watch what that single act issues.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={release}
            disabled={confirmed === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-ink/15 text-brand-ink/60 text-[11px] font-bold uppercase tracking-[0.15em] font-sans hover:border-brand-ink/40 hover:text-brand-ink transition-colors disabled:opacity-40 cursor-pointer"
          >
            Release a seat
          </button>
          {(settled || released > 0) && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-brand-ink/40 text-[11px] font-bold uppercase tracking-[0.15em] font-sans hover:text-brand-ink transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>

        <p className="mt-4 text-[10px] font-sans text-brand-ink/35 leading-relaxed">
          Illustrative sample. In Signet the seat is counted at approval under a database lock, so
          two administrators working the same queue cannot seat the same person into the last chair.
        </p>
      </div>
    </div>
  );
}

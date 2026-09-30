import {useRef, useState} from 'react';
import type {MouseEvent} from 'react';
import {Play} from 'lucide-react';
import type {Walkthrough} from '../../data/spotlight';

/**
 * Click-to-load YouTube facades.
 *
 * Nothing from YouTube is requested until someone actually asks for a video:
 * each card is a local poster over an ordinary link to youtube.com, and only on
 * activation is that swapped for a youtube-nocookie iframe. That keeps four
 * third-party players off a landing page that already ships a Three.js scene,
 * and means the cards still work if JS never runs — the link just opens YouTube.
 *
 * Only one plays at a time. Starting a second returns the first to its poster,
 * so the section never turns into competing audio.
 */

const EMBED = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

function Stage({
  item,
  playing,
  onPlay,
}: {
  item: Walkthrough;
  playing: boolean;
  onPlay: (id: string) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const start = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, download) fall through to YouTube.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onPlay(item.id);
    // Move focus into the player that replaces this control.
    requestAnimationFrame(() => frameRef.current?.focus());
  };

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-ink/12 bg-brand-ink/5">
      {playing ? (
        <iframe
          ref={frameRef}
          src={EMBED(item.youtubeId)}
          title={`${item.label} — clearAMS walkthrough`}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <a
          href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
          onClick={start}
          className="group absolute inset-0 block"
        >
          <img
            src={item.poster}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-brand-ink/15 group-hover:bg-brand-ink/25 transition-colors duration-500" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-14 h-14 rounded-full bg-brand-orange text-white shadow-[0_0_30px_rgba(255,99,33,0.5)] transition-transform duration-300 group-hover:scale-110">
              <Play className="w-5 h-5 translate-x-px" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-brand-ink/70 text-brand-paper text-[10px] font-bold tracking-[0.1em] tabular-nums font-sans">
            {item.duration}
          </span>
          <span className="sr-only">
            Play {item.label} — {item.duration}, plays with sound. Opens on YouTube if
            scripting is off.
          </span>
        </a>
      )}
    </div>
  );
}

export function Walkthroughs({items}: {items: Walkthrough[]}) {
  const [playing, setPlaying] = useState<string | null>(null);

  const acts = items.filter((i) => i.act !== null);
  const extras = items.filter((i) => i.act === null);

  return (
    <div>
      <div className="max-w-2xl mb-10 md:mb-14">
        <p className="pp-reveal text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 font-sans">
          The walkthroughs
        </p>
        <h3 className="pp-reveal font-serif font-light text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] mb-5">
          Watch it <span className="italic text-brand-orange">hold up</span>
        </h3>
        <p className="pp-reveal text-brand-ink/55 leading-relaxed">
          A principal builds a compliant plan, the district answers it, then the year happens
          to it. Three takes, unedited, in the real application.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {acts.map((item) => (
          <article key={item.id} className="pp-reveal">
            <Stage item={item} playing={playing === item.id} onPlay={setPlaying} />
            <div className="flex items-baseline gap-3 mt-5 mb-2">
              <span
                className="font-serif font-light text-2xl text-brand-orange leading-none"
                aria-hidden="true"
              >
                {item.act}
              </span>
              <h4 className="font-serif font-light text-2xl md:text-3xl leading-none">
                {item.title}
              </h4>
            </div>
            <p className="text-sm text-brand-ink/55 leading-relaxed">{item.blurb}</p>
          </article>
        ))}
      </div>

      {/* Deliberately not a fourth act — no number, its own row. The three above
          are one plan's lifecycle in order; this is the program office's other
          work, so numbering it 04 would imply a step in a sequence that ends
          at three. */}
      {extras.map((item) => (
        <article
          key={item.id}
          className="pp-reveal mt-12 md:mt-16 grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-center border-t border-brand-ink/12 pt-12 md:pt-16"
        >
          <Stage item={item} playing={playing === item.id} onPlay={setPlaying} />
          <div>
            <h4 className="font-serif font-light text-2xl md:text-3xl leading-tight mb-3">
              {item.title}
            </h4>
            <p className="text-sm text-brand-ink/55 leading-relaxed">{item.blurb}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

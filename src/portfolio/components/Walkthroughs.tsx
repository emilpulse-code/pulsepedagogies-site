import {useRef} from 'react';
import type {MouseEvent} from 'react';
import {Play} from 'lucide-react';
import type {Walkthrough} from '../../data/spotlight';

/**
 * A click-to-load YouTube facade.
 *
 * Nothing from YouTube is requested until someone actually asks for the video:
 * the card is a local poster over an ordinary link to youtube.com, and only on
 * activation is that swapped for a youtube-nocookie iframe. That keeps a
 * third-party player off a landing page that already ships a Three.js scene,
 * and means the card still works if JS never runs — the link just opens YouTube.
 *
 * Playback is controlled by the caller rather than held here, so a caller that
 * renders several of these can guarantee only one plays at a time.
 */

const EMBED = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

export function WalkthroughStage({
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

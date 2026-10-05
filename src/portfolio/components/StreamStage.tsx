import {useRef} from 'react';
import type {MouseEvent} from 'react';
import {Play} from 'lucide-react';
import {streamEmbed, streamPoster, streamWatch, type StreamVideo} from '../../data/signet';

/**
 * A click-to-load Cloudflare Stream facade.
 *
 * The sibling of `Walkthroughs.tsx`'s `WalkthroughStage`, and deliberately a
 * second component rather than a `provider` prop on that one: it renders inside
 * section 02 of the landing page and on /products, both on the critical path,
 * and neither needed to change to put a Signet page up. If a third provider
 * ever appears, lift the poster/button/pill chrome into one presentational
 * component and let both call it — until then two small files beat one
 * component with a branch down the middle of it.
 *
 * Same contract as its sibling, for the same reasons: nothing is requested from
 * the player until someone asks for it, the card is a poster over an ordinary
 * link, and with scripting off the link still opens the video on Stream's own
 * watch page. Playback state is held by the caller so that a page rendering
 * five of these can guarantee only one plays.
 */

export function StreamStage({
  item,
  playing,
  onPlay,
}: {
  item: StreamVideo;
  playing: boolean;
  onPlay: (id: string) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const poster = item.poster ?? streamPoster(item.uid);

  const start = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, download) fall through to Stream.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onPlay(item.id);
    // Move focus into the player that replaces this control.
    requestAnimationFrame(() => frameRef.current?.focus());
  };

  return (
    <div className="relative aspect-video rounded-2xl md:rounded-[28px] overflow-hidden border border-brand-paper/12 bg-black">
      {playing ? (
        <iframe
          ref={frameRef}
          src={streamEmbed(item.uid, poster)}
          title={`${item.label} — Signet`}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        />
      ) : (
        <a href={streamWatch(item.uid)} onClick={start} className="group absolute inset-0 block">
          {/* Stream generates thumbnails a moment after an upload finishes, so
              a freshly uploaded video can 404 its own poster for a while — and
              a UID that has not been filled in yet 404s forever. Either way the
              broken-image glyph is worse than the black frame underneath, which
              still carries the play button and reads as a video. */}
          <img
            src={poster}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-brand-ink/25 group-hover:bg-brand-ink/10 transition-colors duration-500" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-orange text-white shadow-[0_0_40px_rgba(255,99,33,0.55)] transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 md:w-7 md:h-7 translate-x-px" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
          {/* An em dash means the length is not known yet — a video still being
              cut. Rendering the pill anyway would claim a duration of "—". */}
          {item.duration !== '—' && (
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-brand-ink/75 text-brand-paper text-[10px] font-bold tracking-[0.1em] tabular-nums font-sans">
              {item.duration}
            </span>
          )}
          <span className="sr-only">
            Play {item.label}
            {item.duration !== '—' ? ` — ${item.duration}` : ''}, plays with sound. Opens on
            Cloudflare Stream if scripting is off.
          </span>
        </a>
      )}
    </div>
  );
}

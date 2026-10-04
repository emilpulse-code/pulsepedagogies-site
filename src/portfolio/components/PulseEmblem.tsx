/**
 * Full-color brand emblem for the portfolio nav: the orbital P, rendered from
 * brand/pulse-p-emblem-source.png (see public/brand/). Transparent, so it reads
 * on light and dark sections alike.
 * Sits outside the nav's mix-blend layer so the colors stay true.
 */
export function PulseEmblem({size = 34}: {size?: number}) {
  return (
    <img
      src="/brand/emblem-128.webp"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="block shrink-0 select-none"
    />
  );
}

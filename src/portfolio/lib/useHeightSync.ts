import {useEffect} from 'react';
import {ScrollTrigger} from './gsapSetup';

/**
 * Keep ScrollTrigger honest when an interactive widget changes the page height.
 *
 * The demo widgets in section 02 answer by growing — a verdict box goes from
 * one line to three, a chain gains a row — and every one of them sits *above*
 * the pinned RingGallery. A pin caches its start and end in pixels, so adding
 * 40-odd pixels above it leaves those numbers stale and the page lurches the
 * next time you scroll.
 *
 * Refreshing on the frame after the change is the documented fix for "the
 * content changed size". It runs only on an actual interaction, never on
 * scroll, so the cost is irrelevant.
 */
export function useHeightSync(deps: readonly unknown[]) {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

import {useLayoutEffect, useRef, useState} from 'react';
import {gsap} from '../lib/gsapSetup';
import {PIPELINE, type PipelineApp} from '../../data/apps';
import {AppDetail} from '../components/AppDetail';

// The back half of the pipeline orbits here; the front half lives in the
// flipping works list inside the Work section.
const SHOTS = PIPELINE.slice(5);

/**
 * Pinned 3D ring carousel (the lukebaffait.fr gallery). One full revolution
 * scrubs with the scroll; every mockup is clickable and opens its full
 * pipeline description. As the fourth app sweeps past, the whole ring drifts
 * toward the viewer, growing and dissolving while the next section arrives.
 */
export function RingGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useState<PipelineApp | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const place = () => {
      const radius = Math.min(580, Math.max(280, window.innerWidth * 0.34));
      Array.from(track.children).forEach((el, i) => {
        (el as HTMLElement).style.transform =
          `translate(-50%, -50%) rotateY(${(360 / SHOTS.length) * i}deg) translateZ(${radius}px)`;
      });
    };
    place();
    window.addEventListener('resize', place);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(track, {rotateX: -9});
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=380%',
            scrub: 1,
            pin: stageRef.current,
            anticipatePin: 1,
          },
        });
        // One revolution: with 4 shots, the 4th fronts at 3/4 of the spin —
        // that's when the ring starts flying toward the viewer and dissolving.
        tl.to(track, {rotateY: -360, ease: 'none', duration: 4}).to(
          zoomRef.current,
          {scale: 2.4, autoAlpha: 0, ease: 'power2.in', duration: 1.2},
          3,
        );
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(track, {rotateX: -9, rotateY: 18});
      });
    }, root);

    return () => {
      window.removeEventListener('resize', place);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Product gallery in orbit"
      className="relative bg-brand-ink text-brand-paper overflow-hidden"
    >
      <div ref={stageRef} className="relative h-svh flex items-center justify-center">
        {/* The orbit (zoom wrapper flies toward the viewer at the end) */}
        <div ref={zoomRef} className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 [perspective:1500px] pointer-events-none">
            <div
              ref={trackRef}
              className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
            >
              {SHOTS.map((shot) => (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => setDetail(shot)}
                  aria-label={`${shot.name} — read the full description`}
                  className="absolute left-1/2 top-1/2 w-[60vw] sm:w-[340px] lg:w-[400px] [transform-style:preserve-3d] pointer-events-auto cursor-pointer group"
                >
                  {/* Screen assembly — back slab gives the housing real depth */}
                  <span className="block relative [transform-style:preserve-3d]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl bg-slate-800 [transform:translateZ(-14px)] shadow-[0_48px_90px_rgba(0,0,0,0.65)]"
                    />
                    <span className="relative block rounded-2xl border border-white/10 bg-[#0c0c0e] overflow-hidden transition-transform duration-300 group-hover:[transform:translateZ(10px)]">
                      {/* Browser chrome — these are web apps, shown as web apps */}
                      <span className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-[#16161a]">
                        <span className="w-2 h-2 rounded-full bg-red-400/70" />
                        <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                        <span className="ml-2 flex-1 max-w-[180px] px-2.5 py-0.5 rounded bg-white/5 text-left text-[8px] font-sans text-brand-paper/40 truncate">
                          pulse{shot.id.replace(/-/g, '')}.app
                        </span>
                      </span>
                      {/* Viewport */}
                      <span className="block aspect-[16/10] bg-slate-950 overflow-hidden">
                        <img
                          src={shot.image}
                          alt={`${shot.name} interface preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                      </span>
                    </span>
                  </span>
                  {/* Laptop deck + hinge */}
                  <span
                    aria-hidden="true"
                    className="block h-2.5 w-[114%] -mx-[7%] rounded-[4px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 shadow-[0_20px_36px_rgba(0,0,0,0.55)]"
                  />
                  <span aria-hidden="true" className="block mx-auto h-1 w-[26%] rounded-b-md bg-slate-900" />
                  <span className="block mt-3 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/0 group-hover:text-brand-paper/60 transition-colors font-sans">
                    {shot.name} — view details
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Edge label, lukebaffait-style */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[10px] font-bold uppercase tracking-[0.3em] text-brand-paper/30 font-sans hidden md:block">
          Gallery
        </span>
      </div>

      {/* Sibling of the pinned stage — `fixed` breaks inside pinned transforms */}
      <AppDetail app={detail} onClose={() => setDetail(null)} />
    </section>
  );
}

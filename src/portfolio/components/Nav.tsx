import {useEffect, useRef} from 'react';
import {gsap, ScrollTrigger} from '../lib/gsapSetup';

const LINKS = [
  {name: 'Work', href: '#work'},
  {name: 'Studio', href: '#studio'},
  {name: 'Founders', href: '#founders'},
  {name: 'Capabilities', href: '#capabilities'},
];

/** EKG wordmark drawn in currentColor so it survives mix-blend-difference. */
function EkgMark({size = 30}: {size?: number}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path
        d="M 7 50 A 43 43 0 0 1 93 50 A 43 43 0 0 1 7 50"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M 7 50 L 26 50 L 33 38 L 40 72 L 47 29 L 54 50 L 93 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="29" r="6" fill="currentColor" />
    </svg>
  );
}

export function Nav() {
  const ref = useRef<HTMLElement>(null);

  // Hide on scroll down, return on scroll up
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const show = gsap
        .from(header, {yPercent: -110, paused: true, duration: 0.35, ease: 'power2.out'})
        .progress(1);
      ScrollTrigger.create({
        start: 'top -120',
        end: 'max',
        onUpdate: (self) => (self.direction === -1 ? show.play() : show.reverse()),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <header ref={ref} className="fixed top-0 inset-x-0 z-[60] mix-blend-difference text-[#F5F2ED]">
      <nav className="max-w-[100rem] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <EkgMark />
          <span className="leading-tight">
            <span className="block text-xs font-bold uppercase tracking-[0.25em]">
              Pulse Pedagogies
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] opacity-50">
              Digital Development Studio
            </span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:emil@vapapulse.com?subject=Project%20inquiry%20%E2%80%94%20Pulse%20Pedagogies"
          className="whitespace-nowrap border border-current rounded-full px-4 md:px-5 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#F5F2ED] hover:text-[#1A1A1A] transition-colors"
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}

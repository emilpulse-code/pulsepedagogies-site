import {useEffect, useRef} from 'react';
import {gsap, ScrollTrigger} from '../lib/gsapSetup';
import {PulseEmblem} from './PulseEmblem';

const LINKS = [
  {name: 'Work', href: '#work'},
  {name: 'Founders', href: '#founders'},
  {name: 'Capabilities', href: '#capabilities'},
];

export function Nav({onOpenForm}: {onOpenForm: () => void}) {
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

  /* The full-color emblem must NOT sit inside a mix-blend-difference layer or
     its colors invert over light sections — so blending is applied per text
     element instead of on the header. */
  return (
    <header ref={ref} className="fixed top-0 inset-x-0 z-[60]">
      <nav className="max-w-[100rem] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <PulseEmblem />
          <span className="leading-tight mix-blend-difference text-[#F5F2ED]">
            <span className="block text-xs font-bold uppercase tracking-[0.25em]">
              Pulse Pedagogies
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] opacity-50">
              Digital Development Studio
            </span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8 mix-blend-difference text-[#F5F2ED]">
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

        <button
          type="button"
          onClick={onOpenForm}
          className="whitespace-nowrap mix-blend-difference text-[#F5F2ED] border border-current rounded-full px-4 md:px-5 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#F5F2ED] hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          Start a project
        </button>
      </nav>
    </header>
  );
}

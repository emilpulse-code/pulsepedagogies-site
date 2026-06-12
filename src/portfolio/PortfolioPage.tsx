import {useLayoutEffect, useState} from 'react';
import {gsap, ScrollTrigger} from './lib/gsapSetup';
import {Loader} from './components/Loader';
import {Cursor} from './components/Cursor';
import {Nav} from './components/Nav';
import {Hero} from './sections/Hero';
import {Marquee} from './sections/Marquee';
import {Manifesto} from './sections/Manifesto';
import {Work} from './sections/Work';
import {Process} from './sections/Process';
import {Capabilities} from './sections/Capabilities';
import {Contact} from './sections/Contact';

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);

  // Generic scroll reveals for everything tagged .pp-reveal
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.batch('.pp-reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.09}),
      });
    });

    // Re-measure pinned sections once webfonts settle
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-brand-ink selection:bg-brand-orange selection:text-white">
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <div className="pp-noise" aria-hidden="true" />
      <Nav />

      <main>
        <Hero start={loaded} />
        <Marquee />
        <Manifesto />
        <Work />
        <Process />
        <Capabilities />
        <Contact />
      </main>
    </div>
  );
}

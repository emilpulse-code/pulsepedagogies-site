import {useLayoutEffect, useState} from 'react';
import {gsap, ScrollTrigger} from './lib/gsapSetup';
import {useLenis} from './lib/useLenis';
import {DemoModal} from '../components/DemoModal';
import {Loader} from './components/Loader';
import {Cursor} from './components/Cursor';
import {Nav} from './components/Nav';
import {ScrollProgress} from './components/ScrollProgress';
import {Hero} from './sections/Hero';
import {Reveal} from './sections/Reveal';
import {Marquee} from './sections/Marquee';
import {Manifesto} from './sections/Manifesto';
import {Work} from './sections/Work';
import {RingGallery} from './sections/RingGallery';
import {Studio} from './sections/Studio';
import {Founders} from './sections/Founders';
import {Capabilities} from './sections/Capabilities';
import {Contact} from './sections/Contact';

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  useLenis();

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
      <ScrollProgress />

      <main>
        <Hero start={loaded} onOpenForm={openForm} />
        <Reveal />
        <Marquee />
        <Manifesto />
        <Work onOpenForm={openForm} />
        <RingGallery />
        <Studio />
        <Founders />
        <Capabilities />
        <Contact onOpenForm={openForm} />
      </main>

      <DemoModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}

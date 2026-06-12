import {useLayoutEffect, useRef} from 'react';
import {Linkedin, Mail} from 'lucide-react';
import {gsap} from '../lib/gsapSetup';

interface Founder {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  email: string;
  dark: boolean;
  bio: string[];
}

const FOUNDERS: Founder[] = [
  {
    name: 'Satenik Ahangarzadeh, M.Ed.',
    role: 'COO · Co-Founder',
    photo: '/satenik.jpg',
    linkedin: 'https://www.linkedin.com/in/satenik-grigoryan-aa931731',
    email: 'emil@pulsepedagogies.com',
    dark: false,
    bio: [
      "A career educator with over 17 years of experience in southern California schools, Satenik has spent her career serving students with disabilities as a Special Education Teacher and Teacher Specialist. She served as Department Chairperson for Special Education and Committee Member for Inclusive Settings — developing district-wide systems that ensure every student has access to rigorous, equitable instruction. As COO of Pulse Pedagogies, Satenik brings a practitioner's lens to every product decision — ensuring that VAPA Pulse and all future tools are truly accessible, inclusive, and effective for every learner.",
    ],
  },
  {
    name: 'Emil Ahangarzadeh, Ed.D.',
    role: 'CEO & CTO · Co-Founder',
    photo: 'https://pbs.twimg.com/profile_images/1727193455175294976/535c3hgh_400x400.jpg',
    linkedin: 'https://www.linkedin.com/in/emil-ahangarzadeh',
    email: 'emil@pulsepedagogies.com',
    dark: true,
    bio: [
      'Emil Ahangarzadeh, Ed.D. is a veteran educator, performing arts professional, and education technologist whose career spans the classroom, the stage, and the highest levels of district and state leadership. He has served as Administrator of Visual and Performing Arts for a southern California school district, and teaches concurrently as a professor in fine art and education.',
      'Before building Pulse Pedagogies, Emil spent a decade in the entertainment industry producing and directing live stunt shows performed across the country — including productions for Six Flags parks in Chicago, Six Flags Magic Mountain, Universal Studios Hollywood, and at the MGM Grand in Las Vegas. An award-winning technical provider for theatre, he trained and worked professionally as a lighting designer.',
      'His education technology career spans LAUSD, the San Diego County Office of Education (SDCOE), and the Imperial County Office of Education. As Director at SDCOE, he led a 13-person unit producing online professional development, broadcast-quality video, and mobile applications for educators statewide. He administered TechSETS — one of the longest-running technology support services for the education sector — and partnered with the K–12 High Speed Network to develop and administer a statewide cybersecurity education program for K–12 education employees. He is the architect of the Pulse Pedagogical Engine.',
    ],
  },
];

/**
 * Cinematic founder deck: Satenik opens large and in focus while Emil waits
 * behind her in the distance, soft-focused. The pinned scrub sends her card
 * gently into the background as his comes forward and sharpens.
 */
export function Founders() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const sat = '.pp-founder-0';
        const emil = '.pp-founder-1';
        gsap.set(sat, {
          xPercent: -54,
          yPercent: -50,
          scale: 1,
          zIndex: 2,
          filter: 'blur(0px) brightness(1)',
        });
        gsap.set(emil, {
          xPercent: -42,
          yPercent: -56,
          scale: 0.85,
          zIndex: 1,
          filter: 'blur(10px) brightness(0.72)',
        });

        gsap
          .timeline({
            scrollTrigger: {
              // Pin off the stage itself: the "partnership" heading scrolls
              // up and away naturally, the cards rise and lock at center
              trigger: stageRef.current,
              start: 'top top',
              end: '+=170%',
              scrub: 1,
              pin: stageRef.current,
              anticipatePin: 1,
            },
          })
          // ── Phase 1: subtle — the cards breathe toward each other ──
          .to(sat, {
            xPercent: -56,
            yPercent: -49,
            scale: 0.975,
            filter: 'blur(1.5px) brightness(0.97)',
            ease: 'none',
            duration: 0.8,
          }, 0)
          .to(emil, {
            xPercent: -41,
            yPercent: -55,
            scale: 0.87,
            filter: 'blur(8px) brightness(0.76)',
            ease: 'none',
            duration: 0.8,
          }, 0)
          // ── Phase 2: the flip — fast, decisive focus pull ──
          .to(sat, {
            xPercent: -63,
            yPercent: -42,
            scale: 0.84,
            filter: 'blur(10px) brightness(0.72)',
            ease: 'power2.inOut',
            duration: 0.6,
          }, 0.8)
          .to(emil, {
            xPercent: -46,
            yPercent: -50,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
            ease: 'power2.inOut',
            duration: 0.6,
          }, 0.8)
          .set(sat, {zIndex: 1}, 1.1)
          .set(emil, {zIndex: 2}, 1.1)
          // ── Phase 3: subtle settle while the visitor reads ──
          .to(sat, {
            yPercent: -40,
            xPercent: -64,
            ease: 'none',
            duration: 0.6,
          }, 1.4)
          .to(emil, {
            yPercent: -51,
            ease: 'none',
            duration: 0.6,
          }, 1.4);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="founders" className="bg-brand-paper overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 md:px-10 pt-28 md:pt-40">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">04</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Founders</span>
        </div>

        <h2 className="pp-reveal font-serif font-light text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] text-brand-ink">
          A partnership of <br />
          <span className="italic text-brand-orange">pedagogy &amp; leadership.</span>
        </h2>
      </div>

      {/* The deck stage — pinned on desktop, stacked flow on mobile */}
      <div
        ref={stageRef}
        className="relative px-6 md:px-10 py-16 lg:py-0 lg:h-svh space-y-10 lg:space-y-0"
      >
        {FOUNDERS.map((f, i) => (
          <article
            key={f.name}
            className={`pp-founder-${i} relative overflow-hidden rounded-[36px] md:rounded-[48px] flex flex-col lg:flex-row shadow-[0_50px_110px_-30px_rgba(26,26,26,0.45)] will-change-transform lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[min(1020px,82vw)] lg:h-[min(660px,80svh)] ${
              f.dark
                ? 'bg-brand-ink text-brand-paper'
                : 'bg-white border border-brand-ink/10 text-brand-ink'
            }`}
          >
            {/* Portrait — full column height, far more of the person visible */}
            <div className="h-[26rem] lg:h-auto lg:w-[42%] shrink-0 overflow-hidden">
              <img
                src={f.photo}
                alt={f.name}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="relative z-10 flex-1 p-8 md:p-10 lg:overflow-y-auto pp-scrollbar-none">
              <h3 className="font-serif text-3xl md:text-4xl font-light mb-1">{f.name}</h3>
              <p className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-6 font-sans">
                {f.role}
              </p>
              <div
                className={`leading-relaxed mb-8 space-y-4 lg:text-[15px] ${
                  f.dark ? 'text-brand-paper/70' : 'text-brand-ink/60'
                }`}
              >
                {f.bio.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${f.name} on LinkedIn`}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all ${
                    f.dark ? 'border-brand-paper/20' : 'border-brand-ink/20'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${f.email}`}
                  aria-label={`Email ${f.name}`}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all ${
                    f.dark ? 'border-brand-paper/20' : 'border-brand-ink/20'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div
              className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
                f.dark ? 'bg-brand-orange/10' : 'bg-brand-orange/5'
              }`}
            />
          </article>
        ))}

        {/* Scroll cue, desktop only */}
        <p className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-ink/35 font-sans">
          Scroll — meet both founders
        </p>
      </div>
    </section>
  );
}

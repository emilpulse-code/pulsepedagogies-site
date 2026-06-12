import {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';

const ITEMS = [
  {
    title: 'Product Strategy',
    note: 'From district pain point to roadmap',
    body: 'Every engagement starts inside the problem, not the tech. We map the workflows of the people who will live in the product — teachers, counselors, program directors — and define the moment the tool has to win: usually mid-lesson, one-handed, with thirty students watching. From there we shape scope, pricing model, and a roadmap a district can actually budget against.',
    link: {label: 'See the product suite', href: '#work'},
  },
  {
    title: 'UI & UX Design',
    note: 'Interfaces teachers actually love',
    body: 'Typography-led, mobile-first interface systems designed for the realities of a classroom: glare, interruptions, restricted devices, and zero time to read a manual. Big targets, calm motion, WCAG 2.1 AA contrast, and flows that survive being driven from a phone in one hand.',
  },
  {
    title: 'Design Systems',
    note: 'One brand pulse across ten products',
    body: 'Ten products, three suites, one heartbeat. A shared system of color, type, motion, and components keeps every Pulse product instantly recognizable — and lets a new app go from concept to on-brand interface in days, not months.',
  },
  {
    title: 'Web & Mobile Engineering',
    note: 'React · TypeScript · edge-deployed',
    body: 'Production engineering by the same hands that designed it: React and TypeScript front ends, Google Cloud and Firebase backends, and edge-distributed delivery that loads instantly even on filtered, bandwidth-starved school networks. Browser-native — no install, no app store, no IT ticket.',
  },
  {
    title: 'AI-Powered Experiences',
    note: 'Gemini & Veo pipelines, responsibly applied',
    body: 'We build with frontier models — Gemini for vision and instruction, Veo for video, neural voice for narration — behind a serverless proxy layer, so no raw API key ever ships to the client and no student data is ever transmitted or retained. AI where it multiplies an educator, never where it replaces one.',
    link: {label: 'How the AI stack is architected', href: '/compliance'},
  },
  {
    title: 'Compliance-First Architecture',
    note: 'COPPA · FERPA · WCAG',
    body: 'Student privacy law is a design constraint, not a legal review at the end. Zero-PII posture, session-only processing wherever architecture permits, district-controlled account provisioning, and always-on captions. Compliance is the foundation every other capability stands on.',
    link: {label: 'Read the full security & compliance posture', href: '/compliance'},
  },
];

export function Capabilities() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="capabilities" className="bg-brand-paper pt-4 pb-28 md:pb-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">05</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Capabilities</span>
        </div>

        <ul className="border-t border-brand-ink/15">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.title} className="pp-reveal border-b border-brand-ink/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`pp-cap-${i}`}
                  className="group w-full text-left flex items-center justify-between gap-6 py-7 md:py-9 transition-all duration-500 hover:pl-4 md:hover:pl-8 cursor-pointer"
                >
                  <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
                    <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-ink/30 group-hover:text-brand-orange transition-colors shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`font-serif font-light text-3xl md:text-5xl group-hover:italic group-hover:text-brand-orange transition-colors duration-300 truncate ${
                        isOpen ? 'italic text-brand-orange' : ''
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8 shrink-0">
                    <p className="hidden md:block text-sm text-brand-ink/45 max-w-[16rem] text-right">
                      {item.note}
                    </p>
                    <span
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand-orange border-brand-orange text-white rotate-45'
                          : 'border-brand-ink/15 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                  </div>
                </button>

                <div
                  id={`pp-cap-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 md:pb-10 md:pl-[4.5rem] max-w-3xl">
                      <p className="text-brand-ink/60 leading-relaxed text-base md:text-lg">
                        {item.body}
                      </p>
                      {item.link && (
                        <a
                          href={item.link.href}
                          className="group/link mt-5 inline-flex items-center gap-2 font-medium text-brand-orange hover:text-brand-ink transition-colors"
                        >
                          {item.link.label}
                          <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

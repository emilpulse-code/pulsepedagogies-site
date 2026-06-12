import {ArrowUpRight} from 'lucide-react';

const ITEMS = [
  {title: 'Product Strategy', note: 'From district pain point to roadmap'},
  {title: 'UI & UX Design', note: 'Interfaces teachers actually love'},
  {title: 'Design Systems', note: 'One brand pulse across nine products'},
  {title: 'Web & Mobile Engineering', note: 'React · TypeScript · edge-deployed'},
  {title: 'AI-Powered Experiences', note: 'Gemini & Veo pipelines, responsibly applied'},
  {title: 'Compliance-First Architecture', note: 'COPPA · FERPA · WCAG'},
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-brand-paper pt-4 pb-28 md:pb-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">05</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Capabilities</span>
        </div>

        <ul className="border-t border-brand-ink/15">
          {ITEMS.map((item, i) => (
            <li key={item.title} className="pp-reveal border-b border-brand-ink/15">
              <div className="group flex items-center justify-between gap-6 py-7 md:py-9 transition-all duration-500 hover:pl-4 md:hover:pl-8">
                <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
                  <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-brand-ink/30 group-hover:text-brand-orange transition-colors shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif font-light text-3xl md:text-5xl group-hover:italic group-hover:text-brand-orange transition-colors duration-300 truncate">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 md:gap-8 shrink-0">
                  <p className="hidden md:block text-sm text-brand-ink/45 max-w-[16rem] text-right">
                    {item.note}
                  </p>
                  <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-ink/15 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

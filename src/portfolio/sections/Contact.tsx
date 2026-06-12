import {ArrowUpRight, Mail, Phone} from 'lucide-react';

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 bg-brand-ink text-brand-paper rounded-t-[48px] md:rounded-t-[80px] pt-28 md:pt-40 px-6 md:px-10 overflow-hidden"
    >
      <div className="absolute -top-24 right-0 w-[480px] h-[480px] bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[100rem] mx-auto relative">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-paper/40 font-sans">
          <span className="text-brand-orange">06</span>
          <span className="w-10 h-px bg-brand-paper/20 self-center" />
          <span>Contact</span>
        </div>

        <h2 className="pp-reveal font-serif font-light text-[clamp(3rem,9vw,9rem)] leading-[0.92] mb-12">
          Have a product <br />
          in mind? <span className="italic text-brand-orange">Let’s give</span> <br />
          <span className="italic text-brand-orange">it a pulse.</span>
        </h2>

        <div className="pp-reveal flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-24 md:mb-32">
          <a
            href="mailto:emil@pulsepedagogies.com?subject=Project%20inquiry%20%E2%80%94%20Pulse%20Pedagogies"
            className="group inline-flex items-center gap-3 bg-brand-orange text-white px-9 py-5 rounded-full text-lg font-medium hover:bg-brand-paper hover:text-brand-ink transition-colors w-fit"
          >
            <Mail className="w-5 h-5" />
            emil@pulsepedagogies.com
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a
            href="tel:6196638382"
            className="inline-flex items-center gap-3 text-brand-paper/60 hover:text-brand-orange transition-colors text-lg font-medium w-fit"
          >
            <Phone className="w-5 h-5" />
            (619) 663-8382
          </a>
        </div>

        <footer className="border-t border-brand-paper/10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-paper/35 font-sans">
          <p>© 2026 Pulse Pedagogies, LLC · Glendale, CA · All Rights Reserved</p>
          <div className="flex flex-wrap gap-8">
            <a
              href="https://vapapulse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
            >
              VAPA Pulse
            </a>
            <a href="/compliance" className="hover:text-brand-orange transition-colors">
              Security &amp; Compliance
            </a>
            <a href="/prop28" className="hover:text-brand-orange transition-colors">
              Prop 28 Research
            </a>
            <a href="#top" className="hover:text-brand-orange transition-colors">
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}

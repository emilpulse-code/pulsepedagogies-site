import {Cpu, GraduationCap, Wrench} from 'lucide-react';

const PILLARS = [
  {
    icon: GraduationCap,
    title: 'Education First',
    body: "Every product we build is led by educators who have stood in front of students. We don't guess what schools need — we know.",
  },
  {
    icon: Wrench,
    title: 'Custom Built',
    body: 'No off-the-shelf templates. We build purpose-designed apps tailored to the exact needs of your district, site, or program.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    body: 'We leverage the latest in generative AI — from Google Gemini to Veo 3 — to deliver tools that were impossible to build just two years ago.',
  },
];

export function Studio() {
  return (
    <section id="studio" className="bg-brand-paper py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">03</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Studio</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-24 mb-20 md:mb-28">
          <div className="lg:sticky lg:top-32 self-start">
            <h2 className="pp-reveal font-serif font-light text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] mb-8">
              Built by educators. <br />
              <span className="italic text-brand-orange">Built for schools.</span>
            </h2>
            <div className="pp-reveal border-t border-brand-ink/15 pt-6 max-w-sm">
              <div className="font-serif font-light text-6xl md:text-7xl text-brand-ink">
                26<span className="text-brand-orange italic">+</span>
              </div>
              <p className="mt-3 text-sm text-brand-ink/55 leading-relaxed">
                Combined years of California K–12 classroom and district leadership
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="pp-reveal">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 font-sans">
                Who We Are
              </h3>
              <p className="font-serif font-light text-2xl md:text-3xl leading-snug text-brand-ink/85 max-w-3xl">
                Pulse Pedagogies is a K–12 education technology company based in Glendale,
                CA. We design and build custom web and mobile applications for schools,
                districts, and county offices — combining decades of real classroom and
                administrative experience with modern, AI-powered development.
              </p>
            </div>
            <div className="pp-reveal">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange mb-4 font-sans">
                What We Build
              </h3>
              <p className="text-lg text-brand-ink/60 leading-relaxed max-w-3xl">
                From instructional tools and parent engagement platforms to
                standards-aligned curriculum apps and district reporting dashboards — if
                your school needs it, we can build it. Every solution is grounded in
                pedagogy, not just technology.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="pp-reveal rounded-[28px] border border-brand-ink/10 bg-white/60 p-8 md:p-10 hover:border-brand-orange/40 transition-colors duration-500"
            >
              <p.icon className="w-7 h-7 text-brand-orange mb-6" strokeWidth={1.5} />
              <h3 className="font-serif font-light text-3xl mb-3">{p.title}</h3>
              <p className="text-brand-ink/55 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

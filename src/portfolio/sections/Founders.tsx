import {Linkedin, Mail} from 'lucide-react';

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
    name: 'Emil Ahangarzadeh, Ed.D.',
    role: 'CEO & CTO · Co-Founder',
    photo: 'https://pbs.twimg.com/profile_images/1727193455175294976/535c3hgh_400x400.jpg',
    linkedin: 'https://www.linkedin.com/in/emil-ahangarzadeh',
    email: 'emil@vapapulse.com',
    dark: true,
    bio: [
      'Emil Ahangarzadeh, Ed.D. is a veteran educator, performing arts professional, and education technologist whose career spans the classroom, the stage, and the highest levels of district and state leadership. He has served as Administrator of Visual and Performing Arts for a southern California school district, and teaches concurrently as a professor in fine art and education.',
      'Before building Pulse Pedagogies, Emil spent a decade in the entertainment industry producing and directing live stunt shows performed across the country — including productions for Six Flags parks in Chicago, Six Flags Magic Mountain, Universal Studios Hollywood, and at the MGM Grand in Las Vegas. An award-winning technical provider for theatre, he trained and worked professionally as a lighting designer.',
      'His education technology career spans LAUSD, the San Diego County Office of Education (SDCOE), and the Imperial County Office of Education. As Director at SDCOE, he led a 13-person unit producing online professional development, broadcast-quality video, and mobile applications for educators statewide. He administered TechSETS — one of the longest-running technology support services for the education sector — and partnered with the K–12 High Speed Network to develop and administer a statewide cybersecurity education program for K–12 education employees. He is the architect of the Pulse Pedagogical Engine.',
    ],
  },
  {
    name: 'Satenik Ahangarzadeh, M.Ed.',
    role: 'COO · Co-Founder',
    photo: '/satenik.jpg',
    linkedin: 'https://www.linkedin.com/in/satenik-grigoryan-aa931731',
    email: 'coo@vapapulse.com',
    dark: false,
    bio: [
      "A career educator with over 17 years of experience in southern California schools, Satenik has spent her career serving students with disabilities as a Special Education Teacher and Teacher Specialist. She served as Department Chairperson for Special Education and Committee Member for Inclusive Settings — developing district-wide systems that ensure every student has access to rigorous, equitable instruction. As COO of Pulse Pedagogies, Satenik brings a practitioner's lens to every product decision — ensuring that VAPA Pulse and all future tools are truly accessible, inclusive, and effective for every learner.",
    ],
  },
];

export function Founders() {
  return (
    <section id="founders" className="bg-brand-paper py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-baseline gap-4 mb-12 md:mb-16 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-ink/40 font-sans">
          <span className="text-brand-orange">04</span>
          <span className="w-10 h-px bg-brand-ink/20 self-center" />
          <span>Founders</span>
        </div>

        <h2 className="pp-reveal font-serif font-light text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] mb-16 md:mb-24">
          A partnership of <br />
          <span className="italic text-brand-orange">pedagogy &amp; leadership.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {FOUNDERS.map((f) => (
            <article
              key={f.name}
              className={`pp-reveal group relative overflow-hidden rounded-[36px] md:rounded-[48px] ${
                f.dark
                  ? 'bg-brand-ink text-brand-paper'
                  : 'bg-white border border-brand-ink/10 text-brand-ink'
              }`}
            >
              <div className="h-80 overflow-hidden">
                <img
                  src={f.photo}
                  alt={f.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="font-serif text-3xl md:text-4xl font-light mb-1">{f.name}</h3>
                <p className="text-brand-orange font-bold uppercase tracking-[0.2em] text-xs mb-6 font-sans">
                  {f.role}
                </p>
                <div
                  className={`leading-relaxed mb-8 space-y-4 ${
                    f.dark ? 'text-brand-paper/70' : 'text-brand-ink/60'
                  }`}
                >
                  {f.bio.map((p, i) => (
                    <p key={i}>{p}</p>
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
                className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl transition-all ${
                  f.dark
                    ? 'bg-brand-orange/10 group-hover:bg-brand-orange/20'
                    : 'bg-brand-orange/5 group-hover:bg-brand-orange/10'
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

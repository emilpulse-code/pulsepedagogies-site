/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PulseLogo } from './components/PulseLogo';
import { DemoModal } from './components/DemoModal';
import { LegalModal, type LegalDoc } from './components/LegalModal';
import {
  Video,
  Camera,
  Share2,
  Mic2,
  Layout,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  Code2,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { name: 'Mission', href: '#mission' },
  { name: 'VAPA Pulse', href: '#vapa-pulse' },
  { name: 'Founders', href: '#founders' },
  { name: 'Contact', href: '#contact' },
];

const VAPA_ACTS = [
  {
    number: '01',
    title: 'Teacher Briefing',
    description: 'A professional 60-second briefing prepares the teacher with lesson context, key vocabulary, and delivery tips — before the bell rings.',
    icon: Mic2,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    number: '02',
    title: 'Cinematic Hook',
    description: 'A high-quality video opens the lesson with a visual that stops students in their tracks and activates curiosity before a single word is spoken.',
    icon: Video,
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    number: '03',
    title: 'Studio Instruction',
    description: 'An elegant, step-by-step interactive studio interface guides the teacher through the lesson — no art degree required. Every standard, every grade level.',
    icon: Layout,
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    number: '04',
    title: 'Real-Time Feedback',
    description: 'The teacher photographs student artwork. In seconds, they receive direct, standards-based instructional scripts — developmentally appropriate guidance for real-time in-class response.',
    icon: Camera,
    color: 'bg-green-500/10 text-green-600',
  },
  {
    number: '05',
    title: 'Parent Advocacy',
    description: 'Automated parent communications showcase student growth, keep families engaged, and build the community visibility that sustains district arts funding.',
    icon: Share2,
    color: 'bg-pink-500/10 text-pink-600',
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc>(null);

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">

      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PulseLogo size={44} />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-brand-ink/60 hover:text-brand-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setShowDemo(true)}
              className="bg-brand-ink text-brand-paper px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-orange transition-all duration-300"
            >
              Schedule a Demo
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-brand-paper border-b border-brand-ink/10 px-6 py-8 flex flex-col gap-6"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium font-serif"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { setIsMenuOpen(false); setShowDemo(true); }}
              className="bg-brand-ink text-brand-paper px-6 py-3 rounded-full text-sm font-medium text-center"
            >
              Schedule a Demo
            </button>
          </motion.div>
        )}
      </nav>

      <main>

        {/* ── Hero ── */}
        <section className="relative pt-40 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 relative z-20"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
                  </span>
                  K–12 Education Technology · Glendale, CA
                </div>
                <h1 className="text-7xl md:text-9xl font-light leading-[0.85] mb-8 tracking-tighter">
                  Pulse <br />
                  <span className="italic font-medium text-brand-orange">Pedagogies.</span>
                </h1>
                <p className="text-xl text-brand-ink/70 max-w-xl mb-10 leading-relaxed">
                  We build AI-powered web and mobile applications for schools and districts —
                  led by educators, built for the classroom. Our flagship product,{' '}
                  <span className="font-bold text-brand-ink">VAPA Pulse</span>, is the world's first
                  Artistic Intelligence Engine for K–6 arts education.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowDemo(true)}
                    className="group bg-brand-ink text-brand-paper px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-orange transition-all flex items-center gap-2 shadow-2xl shadow-brand-ink/20"
                  >
                    Schedule a Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="https://vapapulse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 rounded-full text-lg font-medium border border-brand-ink/20 hover:border-brand-orange hover:text-brand-orange transition-all backdrop-blur-sm flex items-center gap-2"
                  >
                    See the Proof of Concept
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:col-span-5 relative lg:-ml-24 z-10"
              >
                <div className="relative rounded-[40px] overflow-hidden bg-brand-ink shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                  <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      src="https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/iframe?poster=https%3A%2F%2Fcustomer-40uk5te8zbrtkkan.cloudflarestream.com%2Fd6785457b28b6961ba6611def16225ac%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&autoplay=true&loop=true&muted=true"
                      loading="lazy"
                      style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-3">Flagship Project · In Development</p>
                    <h3 className="text-white font-serif text-2xl mb-3">Our flagship project: VAPA Pulse</h3>
                    <p className="text-white/60 text-base leading-relaxed">
                      A complete web and mobile app providing schools and districts with a grade-level curricular program across all five Visual and Performing Arts standards of California and the National Art Education Standards.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Company Mission ── */}
        <section id="mission" className="relative py-32 bg-brand-ink text-brand-paper overflow-hidden -mt-16 z-20 rounded-t-[80px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-2">
                <h2 className="text-5xl md:text-6xl font-light mb-12">
                  Built by Educators. <br /><span className="italic">Built for Schools.</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-brand-orange mb-4">Who We Are</h3>
                    <p className="text-brand-paper/70 leading-relaxed">
                      Pulse Pedagogies is a K–12 education technology company based in Glendale, CA. We design and build custom web and mobile applications for schools, districts, and county offices — combining decades of real classroom and administrative experience with modern, AI-powered development.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-brand-orange mb-4">What We Build</h3>
                    <p className="text-brand-paper/70 leading-relaxed">
                      From instructional tools and parent engagement platforms to standards-aligned curriculum apps and district reporting dashboards — if your school needs it, we can build it. Every solution is grounded in pedagogy, not just technology.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center border-l border-brand-paper/10 pl-12">
                <div className="text-8xl font-serif italic text-brand-orange mb-4">26+</div>
                <p className="text-sm font-bold uppercase tracking-widest opacity-50">
                  Combined years of California K–12 classroom and district leadership
                </p>
              </div>
            </div>

            {/* 3 pillars */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">Education First</h3>
                <p className="text-brand-paper/50 text-base leading-relaxed">
                  Every product we build is led by educators who have stood in front of students. We don't guess what schools need — we know.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">Custom Built</h3>
                <p className="text-brand-paper/50 text-base leading-relaxed">
                  No off-the-shelf templates. We build purpose-designed apps tailored to the exact needs of your district, site, or program.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">AI-Powered</h3>
                <p className="text-brand-paper/50 text-base leading-relaxed">
                  We leverage the latest in generative AI — from Google Gemini to Veo 3 — to deliver tools that were impossible to build just two years ago.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VAPA Pulse ── */}
        <section id="vapa-pulse" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                Flagship Product · In Development
              </div>
              <h2 className="text-6xl font-light mb-6">Introducing <span className="italic text-brand-orange">VAPA Pulse</span></h2>
              <p className="text-xl text-brand-ink/60 mb-4">
                The world's first Artistic Intelligence Engine — a mobile-first web app that solves the national TK–6 arts curriculum crisis by turning any generalist teacher into a confident, standards-aligned arts educator.
              </p>
              <p className="text-brand-ink/50 mb-10">
                VAPA Pulse delivers a complete, grade-level curricular program across all five California VAPA content standards and the National Art Education Standards — powered by Google's Frontier AI stack.
              </p>
              <a
                href="https://vapapulse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-ink transition-all shadow-xl"
              >
                Explore the Proof of Concept
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* 3 key benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Cinematic Lesson Hooks</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  High-quality video sequences open every lesson with a visual that commands student attention — setting the creative tone before a single word is spoken.
                </p>
              </div>
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Real-Time Teacher Guidance</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  The teacher photographs student artwork and receives instant, standards-based instructional scripts — direct, developmentally appropriate guidance for real-time in-class response. 100% COPPA/FERPA compliant by design.
                </p>
              </div>
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">District-Ready Scale</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  Built on Cloudflare's global edge network — instant performance on restricted school networks. Available to districts via the Google Cloud Marketplace with no lengthy RFP required.
                </p>
              </div>
            </div>

            {/* 5-Act Experience */}
            <div className="bg-brand-paper/60 rounded-[48px] border border-brand-ink/5 p-12 md:p-16">
              <div className="text-center mb-14">
                <h3 className="text-4xl font-light mb-4">The <span className="italic text-brand-orange">5-Act</span> Learning Experience</h3>
                <p className="text-brand-ink/50 max-w-2xl mx-auto">
                  Every VAPA Pulse lesson follows a research-backed five-act structure — from teacher preparation to parent communication — automated, elegant, and ready to teach.
                </p>
              </div>
              <div className="grid md:grid-cols-5 gap-6">
                {VAPA_ACTS.map((act) => (
                  <motion.div
                    key={act.number}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${act.color}`}>
                      <act.icon className="w-8 h-8" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/30 mb-2">Act {act.number}</div>
                    <h4 className="font-bold text-base mb-2">{act.title}</h4>
                    <p className="text-brand-ink/50 text-sm leading-relaxed">{act.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowDemo(true)}
                  className="inline-flex items-center gap-2 bg-brand-ink text-brand-paper px-8 py-4 rounded-full font-medium hover:bg-brand-orange transition-all"
                >
                  See it in action
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Opportunity ── */}
        <section className="py-32 px-6 bg-brand-paper/50 border-y border-brand-ink/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-light mb-8">A <span className="italic text-brand-orange">Once-in-a-Generation</span> Opportunity</h2>
                <p className="text-xl text-brand-ink/60 mb-10 leading-relaxed">
                  California's Proposition 28 mandates new arts funding for schools — with a dedicated 20% "Strategic Partnership" bucket reserved for qualified digital providers. VAPA Pulse is built to unlock it.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                    <p className="text-brand-ink/70"><strong>California TAM:</strong> $15.6M in the Prop 28 Strategic Partnership fund alone.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                    <p className="text-brand-ink/70"><strong>National TAM:</strong> $212M+ targeting Arts & Music in Schools programs nationwide.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                    <p className="text-brand-ink/70"><strong>Google Marketplace shortcut:</strong> Districts purchase with a single click using existing Google Cloud credits — bypassing lengthy RFP cycles entirely.</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-ink text-brand-paper p-12 rounded-[48px] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-8 text-center">Pricing Tiers</div>
                  <div className="space-y-4">
                    <div className="p-6 bg-brand-paper/5 rounded-2xl border border-brand-paper/10 flex items-center justify-between">
                      <div className="text-sm text-brand-paper/50 uppercase tracking-widest">Solo Educator</div>
                      <div className="text-brand-orange text-xl font-serif font-bold">$399 / yr</div>
                    </div>
                    <div className="p-6 bg-brand-paper/5 rounded-2xl border border-brand-paper/10 flex items-center justify-between">
                      <div className="text-sm text-brand-paper/50 uppercase tracking-widest">Single School Site</div>
                      <div className="text-brand-orange text-xl font-serif font-bold">$3,500 / yr</div>
                    </div>
                    <div className="p-6 bg-brand-orange/20 rounded-2xl border border-brand-orange/30 flex items-center justify-between">
                      <div className="text-sm text-brand-paper/70 uppercase tracking-widest">District (Volume)</div>
                      <div className="text-brand-orange text-xl font-serif font-bold">$2,950–$3,300 / school</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDemo(true)}
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-4 rounded-full font-medium hover:bg-white hover:text-brand-orange transition-all"
                  >
                    Talk to Our Team
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Founders ── */}
        <section id="founders" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-light">
                A Partnership of <br /><span className="italic text-brand-orange">Pedagogy & Leadership</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">

              {/* Emil */}
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-brand-ink text-brand-paper rounded-[48px] overflow-hidden group relative"
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src="https://pbs.twimg.com/profile_images/1727193455175294976/535c3hgh_400x400.jpg"
                    alt="Emil Ahangarzadeh, Ed.D."
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <div className="relative z-10 p-10">
                  <h3 className="text-3xl font-serif mb-1">Emil Ahangarzadeh, Ed.D.</h3>
                  <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-6">CEO & CTO · Co-Founder</p>
                  <p className="text-brand-paper/70 leading-relaxed mb-8">
                    Emil Ahangarzadeh, Ed.D. is a veteran educator, performing arts professional, and education technologist whose career spans the classroom, the stage, and the highest levels of district and state leadership. He has served as Administrator of Visual and Performing Arts for a southern California school district, and teaches concurrently as a professor in fine art and education.
                  <br /><br />
                  Before building Pulse Pedagogies, Emil spent a decade in the entertainment industry producing and directing live stunt shows performed across the country — including productions for Six Flags parks in Chicago, Six Flags Magic Mountain, Universal Studios Hollywood, and at the MGM Grand in Las Vegas. An award-winning technical provider for theatre, he trained and worked professionally as a lighting designer.
                  <br /><br />
                  His education technology career spans LAUSD, the San Diego County Office of Education (SDCOE), and the Imperial County Office of Education. As Director at SDCOE, he led a 13-person unit producing online professional development, broadcast-quality video, and mobile applications for educators statewide. He administered TechSETS — one of the longest-running technology support services for the education sector, providing C-level guidance for district and school technology initiatives, including tech architectures, usage policies, network infrastructure, and storage solutions. He also partnered with the K–12 High Speed Network to develop and administer a statewide cybersecurity education program for K–12 education employees. He is the architect of the Pulse Pedagogical Engine.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/emil-ahangarzadeh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-brand-paper/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:emil@vapapulse.com"
                      className="w-10 h-10 rounded-full border border-brand-paper/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl group-hover:bg-brand-orange/20 transition-all" />
              </motion.div>

              {/* Satenik */}
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white border border-brand-ink/10 rounded-[48px] overflow-hidden group relative"
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src="/satenik.jpg"
                    alt="Satenik Ahangarzadeh, M.Ed."
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <div className="relative z-10 p-10">
                  <h3 className="text-3xl font-serif mb-1 text-brand-ink">Satenik Ahangarzadeh, M.Ed.</h3>
                  <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-6">COO · Co-Founder</p>
                  <p className="text-brand-ink/60 leading-relaxed mb-8">
                    A career educator with over 17 years of experience in southern California schools, Satenik has spent her career serving students with disabilities as a Special Education Teacher and Teacher Specialist. She served as Department Chairperson for Special Education and Committee Member for Inclusive Settings — developing district-wide systems that ensure every student has access to rigorous, equitable instruction. She also serves as a Board Member of Friends of Warm Hearth, a humanitarian organization supporting children in Armenia and the United States. As COO of Pulse Pedagogies, Satenik brings a practitioner's lens to every product decision — ensuring that VAPA Pulse and all future tools are truly accessible, inclusive, and effective for every learner.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/satenik-grigoryan-aa931731"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-brand-ink/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all text-brand-ink"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:coo@vapapulse.com"
                      className="w-10 h-10 rounded-full border border-brand-ink/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all text-brand-ink"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Coming Soon ── */}
        <section className="py-32 px-6 bg-brand-ink text-brand-paper overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                In Development
              </div>
              <h2 className="text-5xl md:text-6xl font-light mb-6">
                What's <span className="italic text-brand-orange">Coming Next</span>
              </h2>
              <p className="text-brand-paper/60 text-lg">
                VAPA Pulse is just the beginning. We're building a suite of purpose-designed tools for every role in the school ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Categorical Qualifier — featured full-width */}
              <motion.div
                whileHover={{ y: -4 }}
                className="md:col-span-2 p-10 md:p-12 rounded-[40px] bg-brand-paper/5 border border-brand-paper/10 flex flex-col md:flex-row gap-10 items-start"
              >
                <div className="shrink-0">
                  <svg viewBox="0 0 120 120" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="cq-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#662D91" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FF6321" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="56" fill="url(#cq-bg)" />
                    <rect x="30" y="22" width="52" height="68" rx="6" fill="none" stroke="#F5F2ED" strokeWidth="2.5" />
                    <path d="M 70 22 L 82 34 L 70 34 Z" fill="#FF6321" opacity="0.7" />
                    <path d="M 70 22 L 82 34 L 70 34" fill="none" stroke="#F5F2ED" strokeWidth="2.5" strokeLinejoin="round" />
                    <line x1="40" y1="50" x2="70" y2="50" stroke="#8DC63F" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="36" cy="50" r="3.5" fill="#8DC63F" />
                    <line x1="40" y1="62" x2="65" y2="62" stroke="#29ABE2" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="36" cy="62" r="3.5" fill="#29ABE2" />
                    <line x1="40" y1="74" x2="58" y2="74" stroke="#FF6321" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="36" cy="74" r="3.5" fill="#FF6321" />
                    <circle cx="88" cy="38" r="16" fill="#662D91" />
                    <text x="88" y="43" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="serif">$</text>
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block mb-3">For Administrators &amp; Program Directors</span>
                  <h3 className="text-3xl font-serif mb-1">CPQ</h3>
                  <p className="text-brand-paper/40 text-xs uppercase tracking-widest font-bold mb-4">Categorical Program Qualifier</p>
                  <p className="text-brand-paper/60 leading-relaxed mb-4">
                    Administrators and program directors spend hours — sometimes days — determining whether a purchase, service, or staffing requisition qualifies under a specific categorical funding source. This tool changes that. Enter the requisition details, select the applicable programs, and get an immediate, rule-based eligibility determination across Title I, Title III, Arts &amp; Music in Schools (Prop 28), Special Education, and more.
                  </p>
                  <p className="text-brand-paper/40 text-base">
                    Includes audit-trail documentation, allowable cost summaries, and plain-language rationale.
                  </p>
                </div>
              </motion.div>

              {/* FieldNote */}
              <motion.div whileHover={{ y: -4 }} className="p-10 rounded-[40px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 40 40" width="28" height="28">
                    {/* Outer scan ring */}
                    <circle cx="20" cy="20" r="17" fill="none" stroke="#29ABE2" strokeWidth="2" strokeDasharray="4 3" />
                    {/* Eye whites */}
                    <ellipse cx="20" cy="20" rx="11" ry="7.5" fill="none" stroke="#29ABE2" strokeWidth="2.5" />
                    {/* Iris */}
                    <circle cx="20" cy="20" r="4.5" fill="#29ABE2" opacity="0.7" />
                    {/* Pupil */}
                    <circle cx="20" cy="20" r="2" fill="#F5F2ED" />
                    {/* Corner scan marks */}
                    <path d="M 4 8 L 4 4 L 8 4" fill="none" stroke="#8DC63F" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 36 8 L 36 4 L 32 4" fill="none" stroke="#8DC63F" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 4 32 L 4 36 L 8 36" fill="none" stroke="#8DC63F" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 36 32 L 36 36 L 32 36" fill="none" stroke="#8DC63F" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-paper/30 mb-2">For Special Education Teams</div>
                <h3 className="text-2xl font-serif mb-3">FieldNote</h3>
                <p className="text-brand-paper/55 text-base leading-relaxed">
                  Teachers and support specialists photograph a student's work sample, learning environment, or classroom moment. Intelligent visual processing converts each image into structured observation notes — identifying learning patterns, flagging progress indicators, and generating documentation ready for progress monitoring workflows. No sensitive records required. No student data stored between sessions. Just fast, accurate, educator-driven documentation at the moment it matters.
                </p>
              </motion.div>

              {/* Meridian */}
              <motion.div whileHover={{ y: -4 }} className="p-10 rounded-[40px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 40 40" width="28" height="28">
                    {/* Dial arc background */}
                    <path d="M 6 28 A 15 15 0 0 1 34 28" fill="none" stroke="#662D91" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                    {/* Dial arc filled — warm zone */}
                    <path d="M 6 28 A 15 15 0 0 1 22 13" fill="none" stroke="#FF6321" strokeWidth="3" strokeLinecap="round" />
                    {/* Needle */}
                    <line x1="20" y1="28" x2="22" y2="14" stroke="#F5F2ED" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="20" cy="28" r="3" fill="#662D91" />
                    {/* Tick marks */}
                    <line x1="6" y1="28" x2="8" y2="26" stroke="#F5F2ED" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    <line x1="20" y1="13" x2="20" y2="16" stroke="#F5F2ED" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    <line x1="34" y1="28" x2="32" y2="26" stroke="#F5F2ED" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    {/* Person icon below */}
                    <circle cx="20" cy="35" r="2.5" fill="#8DC63F" />
                  </svg>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-paper/30 mb-2">For School Counselors</div>
                <h3 className="text-2xl font-serif mb-3">Meridian</h3>
                <p className="text-brand-paper/55 text-base leading-relaxed">
                  Grounded in the ASCA National Model, CASEL's five SEL competencies, and evidence-based multicultural counseling frameworks, Meridian helps school counselors build comprehensive, culturally responsive action plans for students' emotional, social, and mental health needs. Counselors dial in a case temperature — from structured and clinical (aligned to MTSS Tier 2/3 protocols) to exploratory and open-ended — and Meridian formulates individualized plans informed by national student wellness research and best-practice counseling literature. Every plan is counselor-reviewed, ethically grounded, and student-centered.
                </p>
              </motion.div>

              {/* FocusBridge */}
              <motion.div whileHover={{ y: -4 }} className="p-10 rounded-[40px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 40 40" width="28" height="28">
                    {/* Hourglass outline */}
                    <path d="M 10 4 L 30 4 L 20 20 L 30 36 L 10 36 L 20 20 Z" fill="none" stroke="#FF6321" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Liquid fill in bottom half */}
                    <path d="M 20 20 L 27 31 L 13 31 Z" fill="#29ABE2" opacity="0.6" />
                    {/* Small signal dot — sensory alert */}
                    <circle cx="32" cy="8" r="4" fill="#8DC63F" />
                    <circle cx="32" cy="8" r="4" fill="#8DC63F" opacity="0.4">
                      <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-paper/30 mb-2">For Teachers</div>
                <h3 className="text-2xl font-serif mb-3">FocusBridge</h3>
                <p className="text-brand-paper/55 text-base leading-relaxed">
                  A classroom transition manager with a visual countdown students can actually feel — choose from a disappearing liquid fill, a slowly completing mosaic, or a soft progress arc so students can anticipate transitions without anxiety. The built-in Sensory Check-in lets students discreetly tap one icon on any shared classroom device to privately alert the teacher's tablet that they're approaching overload — enabling quiet, dignified support before dysregulation occurs.
                </p>
              </motion.div>

              {/* SkillVault */}
              <motion.div whileHover={{ y: -4 }} className="p-10 rounded-[40px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 40 40" width="28" height="28">
                    {/* Badge shield */}
                    <path d="M 20 3 L 34 9 L 34 22 Q 34 32 20 37 Q 6 32 6 22 L 6 9 Z" fill="none" stroke="#8DC63F" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Star stamp */}
                    <path d="M 20 12 L 21.5 17 L 26.5 17 L 22.5 20 L 24 25 L 20 22 L 16 25 L 17.5 20 L 13.5 17 L 18.5 17 Z" fill="#FF6321" />
                    {/* Verified tick */}
                    <path d="M 28 6 L 30 9 L 36 4" fill="none" stroke="#29ABE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-paper/30 mb-2">For High School Students, Teachers &amp; Mentors</div>
                <h3 className="text-2xl font-serif mb-3">SkillVault</h3>
                <p className="text-brand-paper/55 text-base leading-relaxed">
                  A micro-credentialing platform for the skills-based economy. Teachers and community mentors grant verified competency badges to students after witnessing them in action — from Peer Tutoring to Prompt Engineering to Basic Fabrication. Students have their own SkillVault accounts to collect and display their earned badges, and each credential generates a portable, verifiable link students can embed in email signatures, messages, and digital portfolios. No student self-registers: accounts are provisioned exclusively through district-controlled SIS integration or spreadsheet upload, and every badge is teacher- or mentor-granted — never self-awarded. The architecture is purpose-built to meet FERPA requirements and, for students under 13, COPPA — with districts acting as the authorizing school official. See our COPPA/FERPA Compliance statement for the full privacy architecture.
                </p>
              </motion.div>

              {/* ClearEar */}
              <motion.div whileHover={{ y: -4 }} className="p-10 rounded-[40px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 40 40" width="28" height="28">
                    {/* Ear shape */}
                    <path d="M 22 6 Q 32 6 32 18 Q 32 26 24 28 Q 22 32 20 34 Q 18 34 18 32 Q 18 28 22 26 Q 26 24 26 18 Q 26 12 20 12 Q 14 12 14 18 Q 14 22 18 22" fill="none" stroke="#29ABE2" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Sound waves emanating left */}
                    <path d="M 8 14 Q 5 18 8 22" fill="none" stroke="#8DC63F" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 4 11 Q 0 18 4 25" fill="none" stroke="#8DC63F" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    {/* Filter slash — noise cancelled */}
                    <line x1="34" y1="4" x2="28" y2="10" stroke="#FF6321" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="34" cy="6" r="5" fill="none" stroke="#FF6321" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-paper/30 mb-2">For Students &amp; Teachers</div>
                <h3 className="text-2xl font-serif mb-3">ClearEar</h3>
                <p className="text-brand-paper/55 text-base leading-relaxed">
                  The teacher speaks into their own device. ClearEar isolates the speech signal from background classroom noise in real time and delivers crystal-clear audio directly to a student's own earbuds — no special hardware, no hearing loop installation. Equitable access to instruction for students with auditory processing differences, hearing challenges, or attention difficulties, on any device they already carry.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brand-orange rounded-[64px] p-16 md:p-24 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-6xl md:text-7xl font-light mb-8">Ready to <span className="italic">see it live?</span></h2>
                <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">
                  Explore the VAPA Pulse proof of concept, or schedule a live demo with our team.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    href="https://vapapulse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white text-brand-orange px-10 py-5 rounded-full text-xl font-bold hover:bg-brand-ink hover:text-white transition-all flex items-center gap-2"
                  >
                    Visit vapapulse.com
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setShowDemo(true)}
                    className="bg-brand-ink text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-brand-orange transition-all"
                  >
                    Schedule a Demo
                  </button>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-ink/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-brand-paper border-t border-brand-ink/10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <a href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity w-fit">
                <PulseLogo size={36} />
              </a>
              <p className="text-brand-ink/50 max-w-sm text-base">
                K–12 education technology built by educators. Solving the national arts gap — one district at a time.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:6196638382" className="flex items-center gap-2 text-brand-ink/40 hover:text-brand-orange transition-colors text-base font-medium">
                <Phone className="w-4 h-4" />
                (619) 663-8382
              </a>
              <a href="mailto:emil@vapapulse.com" className="text-brand-ink/40 hover:text-brand-orange transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-30">
            <div>© 2026 Pulse Pedagogies, LLC. All rights reserved.</div>
            <div className="flex gap-8">
              <button onClick={() => setLegalDoc('privacy')} className="hover:text-brand-ink transition-colors">Privacy Policy</button>
              <button onClick={() => setLegalDoc('terms')} className="hover:text-brand-ink transition-colors">Terms of Service</button>
              <button onClick={() => setLegalDoc('coppa')} className="hover:text-brand-ink transition-colors">COPPA/FERPA</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

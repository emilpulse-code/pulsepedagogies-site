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
  Presentation,
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
  Shield,
  Lock,
  DatabaseZap,
  UserX,
} from 'lucide-react';
import { useState } from 'react';
import { SUITES } from './data/apps';

const NAV_LINKS = [
  { name: 'Mission', href: '#mission' },
  { name: 'VAPA Pulse', href: '#vapa-pulse' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Founders', href: '#founders' },
  { name: 'Contact', href: '#contact' },
];

const VAPA_ACTS = [
  {
    number: '01',
    title: 'Teacher Briefing',
    description: 'A professional briefing video brings the teacher up to speed — covering everything she needs to know and do to prepare and implement the lesson.',
    icon: Presentation,
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
                  <div className="px-8 pt-5 pb-3 border-b border-white/5">
                    <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest select-none">
                      Proprietary &amp; Confidential · © 2026 Pulse Pedagogies, LLC
                    </p>
                  </div>
                  <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      src="https://customer-40uk5te8zbrtkkan.cloudflarestream.com/d6785457b28b6961ba6611def16225ac/iframe?poster=https%3A%2F%2Fcustomer-40uk5te8zbrtkkan.cloudflarestream.com%2Fd6785457b28b6961ba6611def16225ac%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&autoplay=true&loop=true"
                      loading="lazy"
                      style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: 'calc(100% - 52px)' }}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-8 pt-14 pb-8 bg-brand-ink relative z-10" style={{ marginTop: '-52px', borderRadius: '0 72px 0 0' }}>
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
            <p className="text-brand-ink/30 text-[10px] font-bold uppercase tracking-widest text-center mb-6 select-none">
              Proprietary &amp; Confidential · © 2026 Pulse Pedagogies, LLC
            </p>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                Flagship Product · In Development
              </div>
              <h2 className="text-6xl font-light mb-6">Introducing <span className="italic text-brand-orange">VAPA Pulse</span></h2>
              <p className="text-xl text-brand-ink/60 mb-4">
                The world's first Artistic Intelligence Engine — a mobile-first web app that solves the national TK–6 arts curriculum crisis by turning any generalist teacher into a confident, standards-aligned arts educator.
              </p>
              <p className="text-brand-ink/50 mb-10">
                VAPA Pulse delivers a full-spectrum arts curriculum across all five disciplines — Theatre, Music, Dance, Visual Art, and Media Art — for every grade from Kindergarten through 6th, calibrated to each developmental stage and aligned to California's VAPA content standards and the National Art Education Standards.
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

            {/* Discipline pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-20">
              {['Theatre', 'Music', 'Dance', 'Visual Art', 'Media Art'].map((d) => (
                <div key={d} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-brand-ink/8 shadow-sm">
                  <span className="font-medium text-brand-ink">{d}</span>
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">K – 6</span>
                </div>
              ))}
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
                  VAPA Pulse · Proprietary Feature
                </div>
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

        {/* ── Portfolio ── */}
        <section id="portfolio" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-brand-ink/30 text-[10px] font-bold uppercase tracking-widest text-center mb-6 select-none">
              Proprietary &amp; Confidential · © 2026 Pulse Pedagogies, LLC
            </p>

            <div className="text-center max-w-3xl mx-auto mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                Full Portfolio
              </div>
              <h2 className="text-6xl font-light mb-6">
                Beyond the <span className="italic text-brand-orange">Flagship</span>
              </h2>
              <p className="text-xl text-brand-ink/60 leading-relaxed">
                Every tool we build starts with a real problem inside a real school. Three suites. Nine tools.
              </p>
            </div>

            <div className="space-y-6">
              {SUITES.map((suite, si) => (
                <motion.div
                  key={suite.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.1 }}
                  className="rounded-[40px] border border-brand-ink/8 overflow-hidden"
                >
                  {/* Suite header */}
                  <div className="bg-brand-ink px-10 py-8 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <div className="shrink-0">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-1">Suite</div>
                      <h3 className="text-2xl font-serif text-brand-paper">{suite.label}</h3>
                    </div>
                    <div className="w-px h-10 bg-brand-paper/10 hidden md:block" />
                    <p className="text-brand-paper/50 text-sm leading-relaxed">{suite.description}</p>
                  </div>

                  {/* App rows */}
                  <div className="divide-y divide-brand-ink/5">
                    {suite.apps.map((app) => (
                      <div
                        key={app.id}
                        className="px-10 py-6 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 bg-white hover:bg-brand-paper/60 transition-colors"
                      >
                        <div className="shrink-0 w-36">
                          <span className="font-serif text-lg text-brand-ink">{app.name}</span>
                          {app.subtitle && (
                            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/30 mt-0.5">{app.subtitle}</div>
                          )}
                        </div>
                        <div className="w-px h-4 bg-brand-ink/10 hidden sm:block self-center" />
                        <p className="text-brand-ink/55 text-sm leading-relaxed">{app.tagline}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Privacy-First Architecture ── */}
        <section id="privacy" className="relative py-32 px-6 bg-brand-ink text-brand-paper overflow-hidden">
          <div className="max-w-7xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                <Shield className="w-3 h-3" /> Privacy &amp; Compliance
              </div>
              <h2 className="text-5xl md:text-6xl font-light mb-6">
                Privacy-First <br /><span className="italic text-brand-orange">Architecture</span>
              </h2>
              <p className="text-xl text-brand-paper/60 leading-relaxed">
                Every Pulse Pedagogies product is designed with compliance as a hard constraint — not a retrofit. Federal student privacy law governs our architecture before a single line of production code is written.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="p-10 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">FERPA Compliance</h3>
                <p className="text-brand-paper/50 text-sm leading-relaxed">
                  Every tool that processes student education records is architected with strict access controls, limited disclosure paths, and full compliance with parental rights requirements under the Family Educational Rights and Privacy Act. Student records are never shared with third parties outside the scope of the educational service.
                </p>
              </div>
              <div className="p-10 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">COPPA Compliance</h3>
                <p className="text-brand-paper/50 text-sm leading-relaxed">
                  For tools serving students under 13, Pulse Pedagogies operates under the school consent exception defined in COPPA — with the district acting as the authorizing school official. No direct data collection from children occurs outside this framework. No child creates an account directly.
                </p>
              </div>
              <div className="p-10 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <DatabaseZap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">Zero Persistent Student Data</h3>
                <p className="text-brand-paper/50 text-sm leading-relaxed">
                  Where product architecture permits, we design for session-only processing. FieldNote analyzes photos in real time and stores nothing between sessions. FocusBridge check-in alerts are ephemeral by design. When data does not need to persist, we ensure it does not.
                </p>
              </div>
              <div className="p-10 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <UserX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">District-Controlled Provisioning</h3>
                <p className="text-brand-paper/50 text-sm leading-relaxed">
                  Student accounts in Pulse Pedagogies tools are never self-created. All provisioning flows through district SIS integration or administrator-controlled upload. Students cannot register themselves. Every badge, credential, and account originates with a district-authorized educator.
                </p>
              </div>
            </div>

            <div className="border border-brand-paper/10 rounded-[32px] px-10 py-8 text-center">
              <p className="text-brand-paper/30 text-xs font-bold uppercase tracking-widest">
                © 2026 Pulse Pedagogies, LLC · All product names, system architectures, pedagogical frameworks, and AI implementations described herein are the exclusive intellectual property of Pulse Pedagogies, LLC and are protected under applicable U.S. copyright, trade secret, and intellectual property law. Unauthorized reproduction, distribution, or use is strictly prohibited.
              </p>
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
                    A career educator with over 17 years of experience in southern California schools, Satenik has spent her career serving students with disabilities as a Special Education Teacher and Teacher Specialist. She served as Department Chairperson for Special Education and Committee Member for Inclusive Settings — developing district-wide systems that ensure every student has access to rigorous, equitable instruction. As COO of Pulse Pedagogies, Satenik brings a practitioner's lens to every product decision — ensuring that VAPA Pulse and all future tools are truly accessible, inclusive, and effective for every learner.
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

        {/* ── Contact ── */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">

              {/* Contact info */}
              <div className="bg-brand-ink text-brand-paper rounded-[48px] p-14 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-8">Get in Touch</div>
                  <h2 className="text-5xl font-light mb-4">Let's <span className="italic text-brand-orange">talk.</span></h2>
                  <p className="text-brand-paper/50 mb-12 leading-relaxed">
                    Questions about VAPA Pulse, a custom project, or a district partnership? Reach out directly.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-paper/30 mb-1">Contact</p>
                      <p className="font-serif text-xl">Dr. Emil Ahangarzadeh</p>
                      <p className="text-brand-orange text-xs font-bold uppercase tracking-widest">CEO & CTO · Co-Founder</p>
                    </div>
                    <a
                      href="mailto:emil@vapapulse.com"
                      className="flex items-center gap-3 text-brand-paper/70 hover:text-brand-orange transition-colors group"
                    >
                      <Mail className="w-4 h-4 shrink-0 group-hover:text-brand-orange" />
                      <span className="text-sm font-medium">emil@vapapulse.com</span>
                    </a>
                    <a
                      href="tel:6196638382"
                      className="flex items-center gap-3 text-brand-paper/70 hover:text-brand-orange transition-colors group"
                    >
                      <Phone className="w-4 h-4 shrink-0 group-hover:text-brand-orange" />
                      <span className="text-sm font-medium">(619) 663-8382</span>
                    </a>
                  </div>
                </div>
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl" />
              </div>

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
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#mission" className="hover:text-brand-orange transition-colors">Mission</a></li>
                <li><a href="#founders" className="hover:text-brand-orange transition-colors">Founders</a></li>
                <li><a href="mailto:coo@vapapulse.com" className="hover:text-brand-orange transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Product</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#vapa-pulse" className="hover:text-brand-orange transition-colors">VAPA Pulse</a></li>
                <li>
                  <button onClick={() => setShowDemo(true)} className="hover:text-brand-orange transition-colors">
                    Schedule a Demo
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-ink/10 space-y-4">
            <p className="text-[11px] text-brand-ink/40 leading-relaxed">
              All product names, system architectures, pedagogical frameworks, AI implementations, and designs described on this site are the exclusive intellectual property of Pulse Pedagogies, LLC and are protected under applicable U.S. copyright, trade secret, and intellectual property law. Unauthorized reproduction, distribution, or use is strictly prohibited.
            </p>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-bold uppercase tracking-widest">
              <div className="text-brand-ink/70">© 2026 Pulse Pedagogies, LLC · All Rights Reserved · Proprietary &amp; Confidential</div>
              <div className="flex gap-8 text-brand-ink/40">
                <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
                <a href="#privacy" className="hover:text-brand-orange transition-colors">COPPA/FERPA</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PulseLogo } from './components/PulseLogo';
import { DemoModal } from './components/DemoModal';
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
    description: 'A professional 60-second AI audio briefing prepares the teacher with lesson context, key vocabulary, and delivery tips — before the bell rings.',
    icon: Mic2,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    number: '02',
    title: 'Cinematic Hook',
    description: 'An AI-generated 4K video opens the lesson with a visual that stops students in their tracks and activates curiosity before a single word is spoken.',
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
    description: 'Students photograph their work. AI vision delivers instant "Glow & Grow" feedback — personalized, precise, and ephemeral. Zero student data stored.',
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

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">

      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PulseLogo size={44} />
            <span className="font-serif text-2xl font-semibold tracking-tight">Pulse Pedagogies</span>
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
                  Engineering <br />
                  <span className="italic font-medium text-brand-orange">Inspiration.</span>
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
                    <p className="text-white/60 text-sm leading-relaxed">
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
                <p className="text-brand-paper/50 text-sm leading-relaxed">
                  Every product we build is led by educators who have stood in front of students. We don't guess what schools need — we know.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">Custom Built</h3>
                <p className="text-brand-paper/50 text-sm leading-relaxed">
                  No off-the-shelf templates. We build purpose-designed apps tailored to the exact needs of your district, site, or program.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-brand-paper/5 border border-brand-paper/10">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif mb-3">AI-Powered</h3>
                <p className="text-brand-paper/50 text-sm leading-relaxed">
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
                  AI-generated 4K video sequences open every lesson with a visual that commands student attention — setting the creative tone before a single word is spoken.
                </p>
              </div>
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Real-Time AI Feedback</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  Students photograph their artwork and receive instant "Glow & Grow" feedback powered by AI vision — personalized, pedagogically sound, and 100% COPPA/FERPA compliant by design.
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
                    <h4 className="font-bold text-sm mb-2">{act.title}</h4>
                    <p className="text-brand-ink/50 text-xs leading-relaxed">{act.description}</p>
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
                    A 26-year veteran of California public education, Emil has served as teacher, researcher, director, and administrator across LAUSD, the San Diego County Office of Education, the California Department of Education, and the Imperial County Office of Education. As Director at SDCOE, he led a 13-person unit producing online professional development, high-end video, and mobile applications for educators statewide. At the California Department of Education, he administered TechSETS.org — the state's flagship education technology service for school CIOs and CTOs across California. He holds an Ed.D. and serves concurrently as a professor in fine art and education. He is the architect of the Pulse Pedagogical Engine.
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
                    A career educator with over 17 years of experience in Glendale Unified School District, Satenik has spent her career serving students with disabilities as a Special Education Teacher and Teacher Specialist. She served as Department Chairperson for Special Education and Committee Member for Inclusive Settings — developing district-wide systems that ensure every student has access to rigorous, equitable instruction. She also serves as a Board Member of Friends of Warm Hearth, a humanitarian organization supporting children in Armenia and the United States. As COO of Pulse Pedagogies, Satenik brings a practitioner's lens to every product decision — ensuring that VAPA Pulse and all future tools are truly accessible, inclusive, and effective for every learner.
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
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-fit">
                <PulseLogo size={36} />
                <span className="font-serif text-xl font-semibold">Pulse Pedagogies</span>
              </a>
              <p className="text-brand-ink/50 max-w-sm mb-8">
                K–12 education technology built by educators. Solving the national arts gap — one district at a time.
              </p>
              <a href="mailto:coo@vapapulse.com" className="text-brand-ink/40 hover:text-brand-orange transition-colors inline-block">
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
                  <a
                    href="https://vapapulse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange transition-colors inline-flex items-center gap-1"
                  >
                    Proof of Concept <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <button onClick={() => setShowDemo(true)} className="hover:text-brand-orange transition-colors">
                    Schedule a Demo
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-30">
            <div>© 2026 Pulse Pedagogies, LLC. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-ink transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-ink transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-ink transition-colors">COPPA/FERPA</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

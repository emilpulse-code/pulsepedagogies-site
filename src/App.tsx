/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mic2, 
  Video, 
  Layout, 
  Camera, 
  Share2, 
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import { cn } from './lib/utils';

const NAV_LINKS = [
  { name: 'Mission', href: '#mission' },
  { name: 'VAPA Pulse', href: '#vapa-pulse' },
  { name: 'The 5-Act Loop', href: '#sequence' },
  { name: 'Founders', href: '#founders' },
];

const ACTS = [
  {
    id: 'act-1',
    title: 'The Briefing Agent',
    description: 'Professional audio PD briefings that prepare teachers in under 60 seconds.',
    icon: Mic2,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    id: 'act-2',
    title: 'The Creative Agent',
    description: 'Cinematic 4K video hooks generated via Veo 3 to command student attention.',
    icon: Video,
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    id: 'act-3',
    title: 'The Studio Engine',
    description: 'Dynamic React-based slide component facilitating step-by-step instruction.',
    icon: Layout,
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    id: 'act-4',
    title: 'The Critic Agent',
    description: 'Real-time "Glow & Grow" feedback using Gemini 1.5 Pro vision analysis.',
    icon: Camera,
    color: 'bg-green-500/10 text-green-600',
  },
  {
    id: 'act-5',
    title: 'The Advocacy Agent',
    description: 'Automated parent-communication payloads to ensure program visibility.',
    icon: Share2,
    color: 'bg-pink-500/10 text-pink-600',
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-paper/80 backdrop-blur-md border-b border-brand-ink/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight">Pulse Pedagogies</span>
          </div>

          {/* Desktop Nav */}
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
            <button className="bg-brand-ink text-brand-paper px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-orange transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
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
            <button className="bg-brand-ink text-brand-paper px-6 py-3 rounded-full text-sm font-medium">
              Get Started
            </button>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-6 overflow-hidden">
          {/* Background Blobs for depth */}
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
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                  </span>
                  Engineering Inspiration
                </div>
                <h1 className="text-7xl md:text-9xl font-light leading-[0.85] mb-8 tracking-tighter">
                  Engineering <br />
                  <span className="italic font-medium text-brand-orange">Inspiration.</span>
                </h1>
                <p className="text-xl text-brand-ink/70 max-w-xl mb-10 leading-relaxed">
                  Bridging the K-6 arts gap with the world’s first <span className="font-bold text-brand-ink">Artistic Intelligence Engine.</span> 
                  Empowering generalist educators to deliver MFA-level instruction.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="group bg-brand-ink text-brand-paper px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-orange transition-all flex items-center gap-2 shadow-2xl shadow-brand-ink/20">
                    Schedule a Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 rounded-full text-lg font-medium border border-brand-ink/20 hover:border-brand-ink transition-all backdrop-blur-sm">
                    Prop 28 Compliance Guide
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:col-span-5 relative lg:-ml-24 z-10"
              >
                <div className="relative aspect-[4/5] lg:aspect-square rounded-[60px] overflow-hidden bg-brand-ink shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                  {/* Hero Video Placeholder - Generated via Veo 3 */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover opacity-70"
                  >
                    <source src="https://storage.googleapis.com/firebasestorage.v0.b/cl-dev-agent-assets/o/vapa-pulse-hero-placeholder.mp4?alt=media" type="video/mp4" />
                    <img 
                      src="https://picsum.photos/seed/art-tech/1200/1200" 
                      alt="VAPA Pulse AI" 
                      className="w-full h-full object-cover"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-ink/90 via-transparent to-brand-orange/20" />
                  
                  {/* Overlapping UI Elements */}
                  <div className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Live Feedback Active</span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 p-8 bg-brand-paper/10 backdrop-blur-md rounded-3xl border border-white/10 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
                        <Video className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">AI-Generated Hook (Veo 3)</span>
                    </div>
                    <p className="font-serif text-2xl italic mb-2">"Capturing student imagination instantly."</p>
                  </div>
                </div>
                
                {/* Floating Decorative Element */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="relative py-32 bg-brand-ink text-brand-paper overflow-hidden -mt-16 z-20 rounded-t-[80px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-5xl md:text-6xl font-light mb-12">
                  Solving the <span className="italic">National Arts Gap</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-brand-orange mb-4">The Crisis</h3>
                    <p className="text-brand-paper/70 leading-relaxed">
                      TK-6 arts education is often a "patchwork" of incomplete resources. 
                      Generalist teachers are expected to deliver specialist-level instruction 
                      without the necessary training or tools.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-brand-orange mb-4">The Solution</h3>
                    <p className="text-brand-paper/70 leading-relaxed">
                      We provide a "Co-Teacher" experience using the Google Frontier AI stack. 
                      From cinematic hooks to real-time feedback, we make high-quality arts 
                      education scalable and accessible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center border-l border-brand-paper/10 pl-12">
                <div className="text-8xl font-serif italic text-brand-orange mb-4">20%</div>
                <p className="text-sm font-bold uppercase tracking-widest opacity-50">
                  Prop 28 Compliance: Unlock the Strategic Partnership Fund
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VAPA Pulse Showcase */}
        <section id="vapa-pulse" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-6xl font-light mb-6">Introducing <span className="italic text-brand-orange">VAPA Pulse</span></h2>
              <p className="text-xl text-brand-ink/60">
                A mobile-first Progressive Web App engineered to eliminate the arts gap. 
                Replacing disjointed tools with a unified, high-fidelity pedagogical pathway.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">AI-First Pivot</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  Utilizing Google Frontier AI (Gemini, Veo, Lyria) to provide real-time 
                  "Glow & Grow" feedback and cinematic lesson hooks.
                </p>
              </div>
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Zero-PII Privacy</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  100% COPPA/FERPA compliance by design. Student work analysis is ephemeral, 
                  ensuring privacy without compromising on feedback quality.
                </p>
              </div>
              <div className="p-10 bg-white rounded-[32px] border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-8">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif mb-4">District Scalability</h3>
                <p className="text-brand-ink/60 leading-relaxed">
                  "Zero Egress" architecture on Cloudflare ensures instant load times 
                  and institutional scalability with near-zero technical overhead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The 5-Act Sequence */}
        <section id="sequence" className="py-32 bg-brand-paper/50 border-y border-brand-ink/5 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="md:w-1/3 sticky top-32">
                <h2 className="text-5xl font-light mb-6">The <span className="italic text-brand-orange">5-Act</span> Pulse Sequence</h2>
                <p className="text-brand-ink/60 mb-8">
                  Our agentic workflow automates the complexities of arts instruction, 
                  allowing teachers to focus on student inspiration.
                </p>
                
                {/* Unified Bar Visualization */}
                <div className="hidden lg:flex h-2 w-full bg-brand-ink/5 rounded-full overflow-hidden mb-12">
                  <div className="w-1/5 h-full bg-blue-500" />
                  <div className="w-1/5 h-full bg-purple-500" />
                  <div className="w-1/5 h-full bg-orange-500" />
                  <div className="w-1/5 h-full bg-green-500" />
                  <div className="w-1/5 h-full bg-pink-500" />
                </div>

                <div className="space-y-4">
                  {ACTS.map((act, idx) => (
                    <div key={act.id} className="flex items-center gap-4 group cursor-default">
                      <div className="text-sm font-bold font-mono opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</div>
                      <div className="h-px flex-1 bg-brand-ink/10" />
                      <div className="text-sm font-bold uppercase tracking-widest opacity-40 group-hover:text-brand-orange transition-colors">{act.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-2/3 grid gap-12">
                {ACTS.map((act, idx) => (
                  <motion.div 
                    key={act.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "group p-12 bg-white rounded-[40px] border border-brand-ink/5 flex flex-col md:flex-row gap-10 items-center hover:border-brand-orange/20 transition-all shadow-sm hover:shadow-2xl",
                      idx % 2 === 1 ? "lg:-ml-12 lg:mr-12" : "lg:ml-12 lg:-mr-12" // Overlap effect
                    )}
                  >
                    <div className={cn("w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-lg", act.color)}>
                      <act.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/30 mb-2">Act 0{idx + 1}</div>
                      <h3 className="text-3xl font-serif mb-4">{act.title}</h3>
                      <p className="text-lg text-brand-ink/60 leading-relaxed">{act.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* For Administrators / The Moat */}
        <section id="admin" className="py-32 px-6 bg-brand-paper">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-light mb-8">Built for <span className="italic text-brand-orange">Institutional Scale</span></h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Layout className="text-brand-orange w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">The Google Marketplace Shortcut</h3>
                      <p className="text-brand-ink/60">
                        Bypass lengthy RFP cycles. Districts can purchase VAPA Pulse with a single click 
                        using existing Google Cloud credits or budgets via our "Private Offer" shortcut.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Camera className="text-brand-orange w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Zero-PII Privacy Posture</h3>
                      <p className="text-brand-ink/60">
                        100% COPPA/FERPA compliance. Student work analysis is ephemeral; 
                        we process "in-flight" and never store student faces or names.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <Share2 className="text-brand-orange w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Zero-Egress Architecture</h3>
                      <p className="text-brand-ink/60">
                        Deployed on Cloudflare R2 and Pages. Instant load times on restricted school 
                        networks with zero data transfer fees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-brand-ink p-12 rounded-[48px] text-brand-paper relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4">Technical Architecture</div>
                  <h3 className="text-3xl font-serif mb-6">The "Frontier" Stack</h3>
                  <div className="space-y-4 font-mono text-sm opacity-70">
                    <div className="flex justify-between border-b border-brand-paper/10 pb-2">
                      <span>Intelligence</span>
                      <span className="text-brand-orange">Gemini 1.5 Pro / Veo 3</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-paper/10 pb-2">
                      <span>Edge Delivery</span>
                      <span className="text-brand-orange">Cloudflare Pages</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-paper/10 pb-2">
                      <span>Media Storage</span>
                      <span className="text-brand-orange">Cloudflare R2</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-paper/10 pb-2">
                      <span>Security</span>
                      <span className="text-brand-orange">Google Identity SSO</span>
                    </div>
                  </div>
                  <div className="mt-12 p-6 bg-brand-paper/5 rounded-2xl border border-brand-paper/10">
                    <p className="text-sm italic">"A unified, high-fidelity pedagogical pathway that prioritizes accessibility and equity."</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* Resources & Documentation */}
        <section id="resources" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-light mb-6">Strategic <span className="italic text-brand-orange">Documentation</span></h2>
                <p className="text-brand-ink/60">
                  Access our master blueprints, business plans, and pitch decks. 
                  Designed for transparency and institutional alignment.
                </p>
              </div>
              <button className="text-brand-orange font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all">
                View All Resources <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Business Plan v6.0', type: 'PDF', size: '2.4 MB' },
                { title: 'Pitch Deck v5.3', type: 'PPTX', size: '12.8 MB' },
                { title: 'Technical Blueprint', type: 'DOCX', size: '1.1 MB' },
              ].map((doc) => (
                <div key={doc.title} className="p-8 bg-white border border-brand-ink/5 rounded-3xl hover:border-brand-orange/30 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-brand-paper rounded-xl flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                      <Layout className="w-6 h-6 text-brand-ink/40 group-hover:text-brand-orange" />
                    </div>
                    <span className="text-[10px] font-bold bg-brand-ink/5 px-2 py-1 rounded text-brand-ink/40 uppercase tracking-widest">{doc.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                  <p className="text-sm text-brand-ink/40 mb-6">{doc.size} • Updated April 2026</p>
                  <button className="text-sm font-bold text-brand-orange uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Download File
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section id="founders" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-light">A Partnership of <br /><span className="italic text-brand-orange">Pedagogy & Operations</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                whileHover={{ y: -10 }}
                className="p-12 bg-brand-ink text-brand-paper rounded-[48px] relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h3 className="text-4xl font-serif mb-2">Emil Ahangarzadeh, Ed.D.</h3>
                  <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-8">CEO & CTO</p>
                  <p className="text-brand-paper/60 leading-relaxed mb-8">
                    26-year educator, artist, and technologist leading the pedagogical and technical vision. 
                    The architect of the "Pulse Pedagogical Engine."
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-brand-paper/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:emil@vapapulse.com" className="w-10 h-10 rounded-full border border-brand-paper/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl group-hover:bg-brand-orange/20 transition-all" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="p-12 bg-white border border-brand-ink/10 rounded-[48px] relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h3 className="text-4xl font-serif mb-2 text-brand-ink">Satenik Ahangarzadeh, M.Ed.</h3>
                  <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-8">COO</p>
                  <p className="text-brand-ink/60 leading-relaxed mb-8">
                    Operations and scalability expert, bridging curriculum with district-wide deployment. 
                    Managing the logistics of the K-12 market.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-brand-ink/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-brand-ink/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all text-brand-ink">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-all" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brand-orange rounded-[64px] p-16 md:p-24 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-6xl md:text-7xl font-light mb-8">Ready to <span className="italic">Pulse?</span></h2>
                <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">
                  Join the districts transforming arts education with VAPA Pulse. 
                  Secure, scalable, and AI-powered.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <button className="bg-white text-brand-orange px-10 py-5 rounded-full text-xl font-bold hover:bg-brand-ink hover:text-white transition-all">
                    Contact Sales
                  </button>
                  <button className="bg-brand-ink text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-brand-orange transition-all">
                    Request Demo
                  </button>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-ink/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-paper border-t border-brand-ink/10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-semibold">Pulse Pedagogies</span>
              </div>
              <p className="text-brand-ink/50 max-w-sm mb-8">
                Engineering Inspiration through AI-powered pedagogy. 
                Solving the national arts gap for every student.
              </p>
              <div className="flex gap-4">
                <Linkedin className="w-5 h-5 text-brand-ink/40 hover:text-brand-orange cursor-pointer" />
                <Mail className="w-5 h-5 text-brand-ink/40 hover:text-brand-orange cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#mission" className="hover:text-brand-orange transition-colors">Mission</a></li>
                <li><a href="#founders" className="hover:text-brand-orange transition-colors">Founders</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Press Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Product</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#vapa-pulse" className="hover:text-brand-orange transition-colors">VAPA Pulse</a></li>
                <li><a href="#sequence" className="hover:text-brand-orange transition-colors">The 5-Act Loop</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-orange transition-colors">Security</a></li>
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

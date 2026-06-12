import {Captions, EyeOff, KeyRound, ShieldCheck} from 'lucide-react';
import {PageShell, SectionLabel} from './PageShell';

interface LayerItem {
  title: string;
  note: string;
}

interface Layer {
  id: string;
  name: string;
  blurb: string;
  items: LayerItem[];
}

const LAYERS: Layer[] = [
  {
    id: 'Layer 1',
    name: 'Client',
    blurb:
      'A single-page web app — runs in any modern browser on any device, with no install required.',
    items: [
      {title: 'Browser-Native SPA', note: 'No install · no app store'},
      {title: 'Component UI Framework', note: 'Responsive mobile-first layout'},
      {title: 'Animated Transitions', note: 'Smooth, calm user experience'},
      {title: 'WCAG 2.1 AA', note: 'Audited contrast + focus rings'},
      {title: 'Auth Client SDK', note: 'Secure session management'},
    ],
  },
  {
    id: 'Layer 2',
    name: 'Secure Cloud Backend',
    blurb:
      'All application logic runs within enterprise-grade cloud infrastructure — authentication, data, serverless functions, and asset delivery.',
    items: [
      {title: 'Cloud Authentication', note: 'Managed single sign-on'},
      {title: 'Identity Store', note: 'Auth sessions + user profiles'},
      {title: 'Serverless AI Logic', note: 'All AI calls brokered server-side'},
      {title: 'Origin-Locked Media', note: 'Access-controlled storage buckets'},
      {title: 'Global CDN Hosting', note: 'Auto SSL · edge-distributed'},
      {title: 'Managed AI Access', note: 'No raw API key shipped in the bundle'},
    ],
  },
  {
    id: 'Layer 3A',
    name: 'Frontier AI Intelligence',
    blurb:
      'Specialized AI models, each mapped to a specific product function. Every call is serverless-proxied. Zero sensitive data is ever transmitted or retained.',
    items: [
      {title: 'AI Audio Engine', note: 'Generated audio experiences'},
      {title: 'AI Video Engine', note: 'Cinematic video generation'},
      {title: 'Instruction AI', note: 'Step-by-step guided content'},
      {title: 'AI Vision Engine', note: 'Real-time image analysis'},
      {title: 'Summary AI', note: 'Stakeholder-ready narratives'},
      {title: 'Neural Voice Synthesis', note: 'Narration + voiceover'},
    ],
  },
  {
    id: 'Layer 3B',
    name: 'Edge Video CDN',
    blurb: 'All video served from a dedicated edge CDN with adaptive bitrate delivery.',
    items: [
      {title: 'Adaptive Bitrate Video', note: 'HLS streaming for any network'},
      {title: 'Accessibility Captions', note: 'WebVTT on every asset'},
      {title: 'Origin-Locked Buckets', note: 'Read-only content delivery'},
      {title: 'Engagement Analytics', note: 'Library viewing insights'},
    ],
  },
];

const POSTURE = [
  {
    icon: EyeOff,
    title: 'Zero-PII Posture',
    body: 'Images and media submitted for AI analysis are processed in-flight and immediately discarded — never stored, logged, or retained anywhere in our systems.',
  },
  {
    icon: KeyRound,
    title: 'Managed AI Access',
    body: 'Every AI call routes through a managed server-side layer — no raw API key is shipped in the bundle or exposed in network traffic.',
  },
  {
    icon: Captions,
    title: 'Accessibility Compliance',
    body: 'Always-on captions for every audio and video asset, WCAG 2.1 AA contrast and focus management, and differentiation strategies built into content from the start.',
  },
  {
    icon: ShieldCheck,
    title: 'Static Content CDN',
    body: 'All published media is pre-vetted and served read-only from origin-locked CDN buckets. No user-generated content is ever uploaded to or stored on the CDN.',
  },
];

export default function CompliancePage() {
  return (
    <PageShell
      eyebrow="Security · Architecture · Compliance"
      title={
        <>
          Engineered for <span className="italic text-brand-orange">trust.</span>
        </>
      }
      intro="Every Pulse Pedagogies product is built on the same architecture: three distinct layers engineered to operate cohesively with zero direct client-side exposure to any AI service or credential. Designed from the ground up for regulated environments — education, government, and enterprise — so sensitive data is never at risk, by design, not by policy."
    >
      {/* ── System architecture ── */}
      <section className="mb-24 md:mb-32">
        <SectionLabel n="01">System Architecture — 3-Layer Stack</SectionLabel>
        <div className="space-y-6">
          {LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="rounded-[28px] md:rounded-[36px] border border-brand-paper/10 bg-white/[0.03] p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-orange shrink-0">
                  {layer.id} — {layer.name}
                </h2>
              </div>
              <p className="text-brand-paper/55 italic leading-relaxed mb-8 max-w-3xl">{layer.blurb}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {layer.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-brand-paper/10 bg-brand-ink/60 px-5 py-4"
                  >
                    <p className="font-semibold text-brand-paper">{item.title}</p>
                    <p className="text-sm text-brand-paper/50">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Compliance posture ── */}
      <section className="mb-24 md:mb-32">
        <SectionLabel n="02">Security + Compliance Posture</SectionLabel>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {POSTURE.map((p) => (
            <div
              key={p.title}
              className="rounded-[28px] border border-brand-paper/10 bg-white/[0.03] p-8 hover:border-brand-orange/40 transition-colors duration-500"
            >
              <p.icon className="w-7 h-7 text-brand-orange mb-6" strokeWidth={1.5} />
              <h3 className="font-serif font-light text-2xl md:text-3xl mb-3">{p.title}</h3>
              <p className="text-brand-paper/55 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Privacy by design ── */}
      <section>
        <SectionLabel n="03">Privacy by Design, Across Every Product</SectionLabel>
        <div className="max-w-4xl space-y-6 text-lg text-brand-paper/65 leading-relaxed">
          <p>
            Regulatory frameworks are treated as architectural constraints, not legal
            review checkboxes. Where product architecture permits, we design for
            session-only processing: data that does not need to persist is never stored
            in the first place. Alerts are ephemeral by design, analysis happens in
            real time, and nothing is reconstructed from retained records.
          </p>
          <p>
            In education deployments this means COPPA and FERPA compliance by
            construction — accounts provisioned exclusively through
            organization-controlled rosters, never self-registration. The same posture
            carries to our workforce and HR products, where employee records stay
            scoped to the organization that owns them. Whatever the industry, the
            principle holds: the safest data is the data we never keep.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

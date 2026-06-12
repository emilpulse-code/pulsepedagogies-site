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
      'Teacher-facing single-page web app — runs in any modern browser on any device, with no install required.',
    items: [
      {title: 'Browser-Native SPA', note: 'No install · no app store'},
      {title: 'Component UI Framework', note: 'Responsive mobile-first layout'},
      {title: 'Animated Transitions', note: 'Smooth classroom experience'},
      {title: 'WCAG 2.1 AA', note: 'Audited contrast + focus rings'},
      {title: 'Auth Client SDK', note: 'Secure session management'},
    ],
  },
  {
    id: 'Layer 2',
    name: 'Google Cloud Backend',
    blurb:
      "All application logic runs within Google's secure cloud infrastructure — authentication, data, serverless functions, and asset delivery.",
    items: [
      {title: 'Cloud Authentication', note: 'Firebase Google Sign-In'},
      {title: 'Identity Store', note: 'Auth sessions + teacher profiles'},
      {title: 'Client-Side AI', note: 'Firebase AI Logic · Artistic Intelligence Engine'},
      {title: 'Origin-Locked Media', note: 'Cloudflare R2 buckets'},
      {title: 'Global CDN Hosting', note: 'Auto SSL · edge-distributed'},
      {title: 'Managed AI Access', note: 'No raw API key shipped in the bundle'},
    ],
  },
  {
    id: 'Layer 3A',
    name: 'Frontier AI Intelligence',
    blurb:
      'Five specialized AI models — each mapped to a specific act. All calls are serverless-proxied. Zero student data is ever transmitted or retained.',
    items: [
      {title: 'AI Audio Engine', note: 'Act 1 — in-situ teacher PD'},
      {title: 'AI Video Engine', note: 'Act 2 — cinematic hook'},
      {title: 'Instruction AI', note: 'Act 3 — studio step-by-step'},
      {title: 'AI Vision Engine', note: 'Act 4 — student work analysis'},
      {title: 'Advocacy AI', note: 'Act 5 — parent summary'},
      {title: 'Neural Voice Synthesis', note: 'Narration + teacher tips'},
    ],
  },
  {
    id: 'Layer 3B',
    name: 'Edge Video CDN',
    blurb: 'All video served from a dedicated edge CDN with adaptive bitrate delivery.',
    items: [
      {title: 'Adaptive Bitrate Video', note: 'HLS streaming for any network'},
      {title: 'Accessibility Captions', note: 'WebVTT — UDL compliant'},
      {title: 'Origin-Locked Buckets', note: 'Read-only curriculum from CDN'},
      {title: 'Engagement Analytics', note: 'PD library viewing insights'},
    ],
  },
];

const POSTURE = [
  {
    icon: EyeOff,
    title: 'Zero-PII Posture',
    body: 'Student images captured in Act 4 are sent to the Artistic Intelligence Engine in-flight and immediately discarded by VAPA Pulse — never stored, logged, or retained anywhere in our system.',
  },
  {
    icon: KeyRound,
    title: 'Managed AI Access',
    body: 'Artistic Intelligence calls route through Firebase AI Logic — no raw API key is shipped in the bundle or exposed in network traffic.',
  },
  {
    icon: Captions,
    title: 'UDL Compliance',
    body: 'Always-on captions for every audio and video asset, plus EL and GATE differentiation strategies built into every lesson.',
  },
  {
    icon: ShieldCheck,
    title: 'Static Curriculum CDN',
    body: 'All curriculum media is pre-vetted and served read-only from origin-locked CDN buckets. No student-generated content is ever uploaded to or stored on the CDN.',
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
      intro="Built from the ground up to meet K–12 district compliance requirements. No student data is ever at risk — by design, not by policy. Three distinct layers engineered to operate cohesively with zero direct client-side exposure to any AI service or credential."
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

      {/* ── Privacy-by-design across the suite ── */}
      <section>
        <SectionLabel n="03">Privacy by Design, Across Every Product</SectionLabel>
        <div className="max-w-4xl space-y-6 text-lg text-brand-paper/65 leading-relaxed">
          <p>
            COPPA and FERPA are treated as architectural constraints, not legal review
            checkboxes. Where product architecture permits, we design for session-only
            processing: FieldNote analyzes photos in real time and stores nothing between
            sessions, and FocusBridge check-in alerts are ephemeral by design. When data
            does not need to persist, we ensure it does not.
          </p>
          <p>
            Products that touch student records — like SkillVault — provision accounts
            exclusively through district-controlled SIS integration or spreadsheet upload.
            No student self-registers, and every credential is teacher- or mentor-granted.
            Employee-facing tools like Signet contain no student data at all.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

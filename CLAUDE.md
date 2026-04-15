# Pulse Pedagogies — Claude Handshake Document

> **Read this first. Every session starts here.**

---

## Step 1: Pull the Code (Do This Before Anything Else)

**IMPORTANT:** Before touching any file or making any suggestion, clone or pull the repository so you have the live codebase in front of you.

```bash
# First time on this device:
git clone https://github.com/emilpulse-code/pulsepedagogies-site.git .
npm install

# Already cloned? Pull latest:
git pull origin main
npm install
```

Then start the dev server to verify everything is working:
```bash
npm run dev
# Site runs at http://localhost:3000
```

**Do not suggest changes to any file you have not read first.**

---

## Step 2: Current Working Focus

**We are working on domain purchasing and suite naming for the Coming Soon products.**

The site is live at:
- **Production:** https://pulsepedagogies.com
- **Cloudflare Pages preview:** https://pulsepedagogies-site.pages.dev
- **GitHub repo:** https://github.com/emilpulse-code/pulsepedagogies-site

Pick up where we left off by reading `src/App.tsx` in full before making any suggestions.

### Domain Registry (locked April 15, 2026 — expires April 2029)
All registered via Cloudflare Registrar.

| Product | .app | .com |
|---|---|---|
| Pulse Pedagogies | — | pulsepedagogies.com ✓ |
| VAPA Pulse | vapapulse.app ✓ | vapapulse.com ✓ |
| CPQ | pulsecpq.app ✓ | pulsecpq.com ✓ |
| FieldNote | pulsefieldnote.app ✓ | pulsefieldnote.com ✓ |
| Meridian | pulsemeridian.app ✓ | — (taken by 3rd party) |
| SkillVault | pulseskillvault.app ✓ | pulseskillvault.com ✓ |
| FocusBridge | pulsefocusbridge.app ✓ | pulsefocusbridge.com ✓ |
| ClearEar | pulseclearear.app ✓ | pulseclearear.com ✓ |
| AdjunctCentral | adjunctcentral.app ✓, pulseadjunctcentral.app ✓ | adjunctcentral.com ✓, pulseadjunctcentral.com ✓ |
| Vitae | pulsevitae.app ✓, vitaepulse.app ✓ | — (pulsevitae.com taken by 3rd party) |.

---

## About This Project

### The Company
**Pulse Pedagogies, LLC** — K–12 education technology company based in Glendale, CA.
We design and build custom web and mobile applications for schools, school districts, and county offices of education.

### The Flagship Product
**VAPA Pulse** — The world's first Artistic Intelligence Engine. A mobile-first web and mobile app delivering a complete, grade-level VAPA (Visual and Performing Arts) curricular program aligned to:
- California's 5 VAPA content standards
- National Art Education Standards

Target market: TK–6 generalist educators, school sites, and California districts leveraging Prop 28 arts funding.
Proof of concept live at: **https://vapapulse.com**

### Coming Soon Product Suite
| Product | Audience | Primary Domain |
|---|---|---|
| CPQ | Administrators & Program Directors | pulsecpq.app |
| FieldNote | Special Education Teams | pulsefieldnote.app |
| Meridian | School Counselors | pulsemeridian.app |
| SkillVault | High School Students, Teachers & Mentors | pulseskillvault.app |
| FocusBridge | Teachers | pulsefocusbridge.app |
| ClearEar | Students & Teachers | pulseclearear.app |
| AdjunctCentral | Adjunct Professors | adjunctcentral.app |
| Vitae | College Faculty | pulsevitae.app |

**Note:** Grant Pulse was removed. ObserveIQ was renamed to FieldNote. All domains registered through April 2029.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Video | Cloudflare Stream |
| Hosting | Cloudflare Pages (auto-deploy from GitHub `main`) |
| Domain | pulsepedagogies.com (managed in Cloudflare) |

---

## Deployment Pipeline

```
Edit files locally
      ↓
git push origin main
      ↓
Cloudflare Pages auto-builds (npm run build → dist/)
      ↓
Live at pulsepedagogies.com (~2 min)
```

**Build command:** `npm run build`
**Output directory:** `dist`
**Node version:** 20

No environment variables are needed for the marketing site.

---

## File Structure

```
pulsepedagogies-site/
├── src/
│   ├── App.tsx                    ← Main page (single-page site)
│   ├── components/
│   │   ├── PulseLogo.tsx          ← SVG brand logo (nav + footer + favicon)
│   │   ├── DemoModal.tsx          ← "Schedule a Demo" modal form → coo@vapapulse.com
│   │   └── LegalModal.tsx         ← Privacy Policy, Terms of Service, COPPA/FERPA modals
│   └── lib/
│       └── utils.ts               ← cn() utility
├── public/
│   ├── favicon.svg                ← SVG favicon (same as PulseLogo icon)
│   └── satenik.jpg                ← Satenik founder photo
├── index.html                     ← Entry point (title: "Pulse Pedagogies")
├── vite.config.ts
├── tailwind.config (inline in vite.config)
└── wrangler.toml                  ← Cloudflare Pages config
```

---

## Key People & Contacts

| Person | Role | Email |
|---|---|---|
| Emil Ahangarzadeh, Ed.D. | CEO & CTO · Co-Founder | emil@vapapulse.com |
| Satenik Ahangarzadeh, M.Ed. | COO · Co-Founder | coo@vapapulse.com |

**Demo requests go to:** coo@vapapulse.com (Satenik)

**LinkedIn:**
- Emil: https://www.linkedin.com/in/emil-ahangarzadeh
- Satenik: https://www.linkedin.com/in/satenik-grigoryan-aa931731

---

## Page Sections (Current State)

1. **Nav** — Logo (links home), nav links, "Schedule a Demo" (opens DemoModal)
2. **Hero** — Headline, Cloudflare Stream video of VAPA Pulse project, two CTAs
3. **Mission** — Company mission: who Pulse Pedagogies is, what they build, 3 pillars
4. **VAPA Pulse** — Product teaser: 3 benefit cards + 5-Act learning experience
5. **Opportunity** — Prop 28 market info + pricing tiers
6. **Founders** — Emil + Satenik with photos, bios, LinkedIn/email links
7. **CTA** — Links to vapapulse.com and Schedule a Demo modal
8. **Footer** — Logo (links home), nav, mail icon only (no LinkedIn)

---

## Design System

Brand colors are defined in the Tailwind config:
- `brand-orange` — Primary accent (CTA buttons, highlights)
- `brand-ink` — Dark (near-black) for text and dark sections
- `brand-paper` — Light (off-white/cream) background

Typography:
- Serif: used for headings, founder names, feature titles
- Sans: used for body copy, labels, navigation

---

## Git Workflow

```bash
# Check what's changed
git status
git diff

# Stage and commit
git add <files>
git commit -m "description of change"

# Push to trigger Cloudflare deploy
git push origin main
```

Always push from the `main` branch. Cloudflare auto-deploys on every push.

---

## Working Notes

- The site is a **single-page React app** — all content lives in `src/App.tsx`
- Images are served from `/public/` (e.g. `/satenik.jpg`)
- The Cloudflare Stream video URL is embedded directly in `App.tsx`
- The demo form uses `mailto:` — no backend required
- `vapapulse.com` is a separate product site — links open in a new tab

---

## Pending Action Items

### TIER 2 — Account Setup
- [ ] **Cloudflare account email migration**
  - Log in with personal Gmail
  - My Profile → change primary email to vapapulse.com Google account
  - Enable Google SSO login while you're there

### TIER 3 — Infrastructure
- [ ] **Configure Firebase Hosting for primary domain**
  - Firebase Console → Hosting → Add custom domain
  - Add TXT verification record in Cloudflare (DNS only, gray cloud)
  - Add A records in Cloudflare (DNS only, gray cloud)
  - Firebase provisions SSL automatically (~24 hrs to fully propagate)
- [ ] **Set up domain redirects in Cloudflare**
  - Non-primary domains redirect to primary via Cloudflare Redirect Rules (free, instant)
  - e.g. `vapa.app/*` → `vapapulse.com/$1`
- [ ] **Update GitHub Actions to deploy to Firebase**
  - Add `FIREBASE_SERVICE_ACCOUNT` secret in GitHub repo settings
  - Replace GitHub Pages deploy action with `FirebaseExtended/action-hosting-deploy@v0`
  - Confirm push to main still triggers deploy
- [ ] **Test PowerPoint → MP4 → Cloudflare Stream pipeline**
  - One lesson, 5 slides, one ElevenLabs narration, export to MP4
  - Upload to Cloudflare Stream, generate WebVTT from ElevenLabs timestamps
  - Confirm plays cleanly at 1080p with captions
  - Do this before committing to the workflow at scale

### TIER 4 — Google AI Startup Application Prep
- [ ] **Wire a real Gemini Vision call (Act 4)**
  - Highest-leverage item for the application — live API integration in production carries more weight than a demo
  - Estimated 2–3 hrs of coding
- [ ] **Document AI integration map** (for Google application)
  - Gemini Vision → Act 4 student work analysis
  - Gemini Flash → lesson content generation
  - Lyria → Act 1 in-situ PD audio generation
  - Veo → Act 2 Hook video generation
  - Google Workspace for Education → district SSO + Google Slides integration
  - Firebase → full backend infrastructure
- [ ] **Register on Google for Startups** — https://startup.google.com

---

*Last updated: April 15, 2026 — Omnibook session (end of night)*
*Next session device: Desktop1325*
*Next session focus: Tier 2 (Cloudflare email migration) → Tier 3 (Firebase Hosting, DNS, GitHub Actions, PowerPoint pipeline) → Tier 4 (Gemini Vision Act 4, Google for Startups registration)*

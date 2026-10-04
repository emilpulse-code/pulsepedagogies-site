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

**Next focus: Signet and CPQ. Signet ships soon.**

Signet is in final development and expected to be ready shortly; CPQ is the other active product.
When Signet ships, the site changes in more places than it looks — the checklist is under
"Shipping Signet" below, written while the code was fresh so the flip is mechanical rather than
archaeological.

Most recent work (October 4, 2026): section 02 of the landing page is now a pinned, sideways
journey along the full-weight orange ribbon — one held "moment" per product, with real screenshots
of vapapulse.com and clearams.app — and the Reveal sphere shatters later and holds its phrase. See
the top entry in `DEVLOG.md` before touching either. The product detail lives on `/products`.

The site is live at:
- **Production:** https://pulsepedagogies.com
- **Cloudflare Pages preview:** https://pulsepedagogies-site.pages.dev
- **GitHub repo:** https://github.com/emilpulse-code/pulsepedagogies-site

**This is no longer a single-page app, and `src/App.tsx` is no longer the landing page.** It is the
`/company` page. The landing page is `src/portfolio/PortfolioPage.tsx`, which composes the sections
in `src/portfolio/sections/`. Read the one you actually mean before making suggestions.

### Domain Registry (locked April 15, 2026 — expires April 2029)
All held in the same Cloudflare Registrar account. The April 2026 / April 2029 window covers the
original batch; `clearams.app` and the two Signet `.net` domains were confirmed to be in the
account but their own registration dates have not been checked against that window.

| Product | .app | .com |
|---|---|---|
| Pulse Pedagogies | — | pulsepedagogies.com ✓ |
| VAPA Pulse | vapapulse.app ✓ | vapapulse.com ✓ |
| clearAMS | clearams.app ✓ (live) | — (not confirmed) |
| CPQ | pulsecpq.app ✓ | pulsecpq.com ✓ |
| FieldNote | pulsefieldnote.app ✓ | pulsefieldnote.com ✓ |
| Meridian | pulsemeridian.app ✓ | — (taken by 3rd party) |
| SkillVault | pulseskillvault.app ✓ | pulseskillvault.com ✓ |
| FocusBridge | pulsefocusbridge.app ✓ | pulsefocusbridge.com ✓ |
| ClearEar | pulseclearear.app ✓ | pulseclearear.com ✓ |
| AdjunctCentral | adjunctcentral.app ✓, pulseadjunctcentral.app ✓ | adjunctcentral.com ✓, pulseadjunctcentral.com ✓ |
| Vitae | pulsevitae.app ✓, vitaepulse.app ✓ | — (pulsevitae.com taken by 3rd party) |.

**Signet** sits outside the `.app` / `.com` pattern above: **`signetsystem.net` ✓** and
**`signetsystems.net` ✓**, both in the same Cloudflare account. Registered but **not yet mapped** —
no DNS record, nothing deployed, so there is still nothing to link a visitor to. That is the only
reason the Signet station on the landing page and its section on `/products` carry no outbound
link; map one and the link becomes ordinary.

Note that `signet.app` is **not** registered. It appears ~37 times inside the Signet repo as a
placeholder host (and in the badge-designer mockup's email-signature snippet); do not treat those
occurrences as a domain the company owns.

**clearAMS** serves a full site of its own at `clearams.app` — marketing, pricing and signup. Same
Cloudflare Registrar account as the rest, confirmed September 30, 2026. Whether `clearams.com` was
also taken has not been checked. This site
links out to `clearams.app` rather than re-selling the product — see `data/spotlight.ts`.

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
**Live in production** at **https://vapapulse.com** — not a proof of concept. The site's copy was
corrected to match on September 30, 2026; if you find "in development" or "proof of concept"
anywhere against VAPA Pulse, it is stale.

### Also Shipped
**clearAMS** — site expenditure planning and audit evidence for California's Arts & Music in
Schools program. Audience: district and site administrators. Live at **https://clearams.app**,
which does its own selling; this site links out rather than duplicating it.

### Shipping Next
**Signet** — registration, attendance and verifiable credentials for professional learning.
Audience: professional learning departments. Final development. Domains held
(`signetsystem.net`, `signetsystems.net`) but unmapped, so nothing to link to yet. Anything
written about Signet is bound by the licence note at the top of `src/data/signet.ts` — no customer,
district, or deployment may be named or implied.

#### Shipping Signet — what actually has to change

Not one flag. The product's status is spelled out in several places that do not reference each
other, so grep `Signet` across `src/` and work the list:

1. **Map a domain first.** `signetsystem.net` or `signetsystems.net` in Cloudflare. Nothing below
   that adds a link is honest until one resolves.
2. **`src/data/apps.ts`** — the `signet` entry: `status: 'next'` → `'live'`, and add
   `href: 'https://<domain>'`. The status pill on `/company` reads this.
3. **`src/data/signet.ts`** — `NEXT_UP.status` is `'Final development'`. The file header says that
   when Signet ships it becomes the SPOTLIGHT and whatever is behind it moves into `NEXT_UP`.
   Decide whether that still applies now that section 02 is three moments rather than a
   spotlight + next-up pair; the simpler read is that `signet.ts` just becomes a third peer of
   `spotlight.ts`.
4. **`src/portfolio/sections/Flagships.tsx`** — the `signet` entry in `MOMENTS`: `status: 'Final development'`
   → `'Live in production'` and `live: false` → `true` (that flag drives the pulsing dot). Its hero
   object is the seal, not a screenshot, because the only running deployment is titled with the
   licensee's name; if a neutral screen becomes available, `HeroObject` is where it goes.
5. **Same file, the section heading** — currently "Two in production. / One landing." Becomes three
   in production, so the line needs rewriting, not just a number swap.
6. **`src/pages/ProductsPage.tsx`** — the Signet section ends in a `mailto:` CTA instead of an
   `OutLink`, with a comment explaining why. Swap it for `<OutLink>` and update the file-header
   comment that says Signet "has no outbound link".
7. ~~`src/portfolio/sections/Work.tsx` — Signet is in `LIST_IDS`~~ **Done September 30, 2026.**
   Signet was removed from the Development Pipeline list, so it is featured in section 02 and on
   `/products` and nowhere else. The list is four; the orbit is four; the three featured products
   make ten catalog entries, none orphaned.
8. **Counts — these are consistent today; keep them that way.** `apps.ts` holds **ten** catalog
   entries, which is the "Three suites. Ten tools." on `/company` (`App.tsx`). VAPA Pulse is the
   flagship and is *not* in that catalog, so ten + one = the **eleven** in Work.tsx's "Eleven
   products." and in Manifesto's stat grid. Shipping Signet changes none of these — it is already
   counted. Adding or removing a product changes all three.
9. **The licence note stays in force** regardless. Shipping a product does not grant the right to
   name the district running it.

### Also In Focus
**CPQ** (Categorical Program Qualifier) — instant, rule-based categorical funding eligibility
determinations with the audit documentation written at the point of decision. Audience:
administrators and program directors. Domains held (`pulsecpq.app`, `pulsecpq.com`), unmapped.

Where CPQ currently appears on the site, for when it has something to show:
- `src/data/apps.ts` — full catalog entry (`id: 'cpq'`), `pricing: 'freemium'`, no student data.
- `src/portfolio/sections/RingGallery.tsx` — CPQ is in the `ORBIT` array, rendered `shell: 'bare'`
  (not in a laptop frame — it is not presented as a web app there). Its mockup is
  `/public/pipeline/cpq.webp`.
- It is **not** in `LIST_IDS` in `Work.tsx`, so it does not appear in the Development Pipeline
  list — only in the orbit. If CPQ gets promoted, that is the array to add it to.
- Nothing CPQ-specific exists on `/products`; that page is the three shipped/shipping products.

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

**Note:** Grant Pulse was removed. ObserveIQ was renamed to FieldNote. The eight domains in the
table above are registered through April 2029; see the Domain Registry for the three later
additions, whose dates were not checked against that window.

**Product count:** eleven, which is what the landing page claims. Three shipped or shipping
(VAPA Pulse, clearAMS, Signet) plus the eight above.

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

Six HTML entry points, each with its own React root. All are declared in `vite.config.ts` under
`build.rollupOptions.input` — **add a page there and to the `prettyUrls` list in the same file, or
it will not build and will not resolve without the `.html`.**

```
pulsepedagogies-site/
├── index.html          → src/portfolio/main.tsx  → PortfolioPage   ← THE LANDING PAGE
├── company.html        → src/main.tsx            → App.tsx         ← long-form company page
├── products.html       → src/pages/products-main.tsx → ProductsPage ← product detail
├── prop28.html         → src/pages/prop28-main.tsx
├── compliance.html     → src/pages/compliance-main.tsx
├── builder.html        → src/builder/main.tsx
└── src/
    ├── portfolio/            ← the landing page, and only the landing page
    │   ├── PortfolioPage.tsx ← composes the sections, in order
    │   ├── sections/         ← Hero, Reveal, Marquee, Manifesto, Flagships (02),
    │   │                       Work (03), RingGallery, Studio, Founders,
    │   │                       Capabilities, Contact
    │   ├── components/       ← concepts.tsx (the three product marks), the demo
    │   │                       widgets, Nav, Cursor, Loader, WebGL scenes
    │   └── lib/              ← gsapSetup, useLenis, scramble
    ├── pages/                ← PageShell + the standalone info pages
    ├── data/
    │   ├── apps.ts           ← the eleven-product catalog
    │   ├── spotlight.ts      ← clearAMS copy, guardrail config, walkthroughs
    │   └── signet.ts         ← Signet copy + demo configs (READ ITS LICENCE NOTE)
    └── components/           ← DemoModal, LegalModal (shared with /company)
```

**The orange line spans two sections and is drawn by two files.** `sections/Flagships.tsx` draws
the ribbon along section 02's sideways track (its `ROUTE`) and exits the bottom at x = 0.3155 of the
width, at 0.072 of the width thick; `sections/Work.tsx` draws section 03's ribbon, which enters at
the same x with the same 72/1000 stroke. Move one and move the other.

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

- **Not a single-page app.** Six entry points — see File Structure above. `src/App.tsx` is the
  `/company` page, not the landing page.
- Images are served from `/public/` (e.g. `/satenik.jpg`)
- The VAPA Pulse Cloudflare Stream video now lives on `/products`, not on the landing page
- `vapapulse.com` and `clearams.app` are separate product sites — links open in a new tab, and this
  site links out rather than re-selling either one
- The landing page runs GSAP ScrollTrigger + Lenis smooth scroll. Two consequences worth knowing
  before debugging it: `window.scrollTo` does **not** drive ScrollTrigger (Lenis owns the scroll —
  use real wheel events or `lenis.scrollTo`), and anything that changes document height can
  invalidate the cached pin positions below it.
- Don't animate transforms on SVG shapes in `concepts.tsx` — GSAP bakes an origin compensation that
  doesn't resolve back to zero. Tween `r` / `width` / opacity instead. Translation is safe.

---

## Pending Action Items

_Tier 2 / Tier 3 / Tier 4 items closed May 20, 2026 — see `DEVLOG.md`._

Open, none blocking, none assigned:

- **Map a Signet domain.** `signetsystem.net` / `signetsystems.net` are held but unmapped. Until one
  resolves, the Signet moment and its `/products` section carry no outbound link. This is the
  first item on the Shipping Signet checklist and gates most of the rest.
- ~~Section 03's ribbon is 72px while section 02's line is a hairline~~ **Resolved October 4,
  2026** — section 02 now runs the ribbon at the same full weight.
- **`AdjunctCentral` clips to "AdjunctCent"** in the Development Pipeline list around 1264px wide.
- ~~Signet appears twice on the landing page~~ **Resolved September 30, 2026** — removed from the
  Development Pipeline list in `Work.tsx`.
- **`DemoModal.tsx` placeholder names a real district** ("Your school, district, or county office").
  It's a form example rather than a customer claim, but it is the one place on the public site that
  names them. One-word fix if wanted.
- 17 Dependabot advisories on the default branch (7 high, 7 moderate, 3 low).

---

*Last updated: September 30, 2026*
*Next session focus: **Signet and CPQ.** Signet ships soon — see "Shipping Signet" for what the
site has to change when it does.*

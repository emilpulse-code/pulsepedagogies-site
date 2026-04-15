# Pulse Pedagogies — Port Handshake: Omnibook → Desktop1325

> **Read this first. This is the session continuity doc from the Omnibook session (April 14, 2026).**
> Pick up exactly where we left off. Do not suggest changes to any file you have not read first.

---

## Step 1: Load the Repo (Do This Before Anything Else)

```bash
# Already cloned on Desktop1325? Pull latest:
git pull origin main
npm install

# First time on Desktop1325:
git clone https://github.com/emilpulse-code/pulsepedagogies-site.git .
npm install
```

Start the dev server to verify everything works:
```bash
npm run dev
# Site runs at http://localhost:3000
```

Then read `src/App.tsx` in full before making any suggestions.

---

## Step 2: What Was Done This Session (Omnibook, April 14 2026)

All changes are uncommitted — everything is in the working tree, not pushed yet.

### Files Changed

| File | What Changed |
|---|---|
| `src/App.tsx` | Major content and layout updates (see below) |
| `src/components/DemoModal.tsx` | Replaced mailto with Web3Forms POST |
| `src/components/PulseLogo.tsx` | New logo design |
| `public/favicon.svg` | Matches new logo |
| `src/components/LegalModal.tsx` | **New file** — Privacy Policy, Terms of Service, COPPA/FERPA |

### App.tsx Changes — Full List

**Logo & Hero**
- Nav and footer: "Pulse Pedagogies" wordmark removed — icon only
- Hero headline changed from "Engineering Inspiration." → "Pulse Pedagogies."

**5-Act section**
- Act 01: Removed "AI audio briefing" → just "professional 60-second briefing"
- Act 02: "AI-generated 4K video" → "high-quality video"
- Act 04: Reworked — teacher photographs student artwork, teacher receives real-time standards-based instructional scripts. AI removed.
- Benefit card "Real-Time AI Feedback" → renamed "Real-Time Teacher Guidance", description rewritten

**Emil's bio** — fully rewritten in three paragraphs:
1. Educator, performing arts pro, technologist. "He has served as Administrator of Visual and Performing Arts for a southern California school district." Ed.D. Professor.
2. Entertainment industry: decade producing/directing **live stunt shows** — Six Flags Chicago, **Six Flags Magic Mountain**, **Universal Studios Hollywood**, MGM Grand Las Vegas. Award-winning technical provider for theatre, professional lighting designer.
3. Ed-tech: LAUSD, San Diego County Office of Education (SDCOE), Imperial County Office of Education. Director at SDCOE (13-person unit). TechSETS — "one of the longest-running technology support services for the education sector" (no longer active). K–12 High Speed Network statewide cybersecurity program. Architect of the Pulse Pedagogical Engine.

**Satenik's bio**
- "Glendale Unified School District" → "southern California schools"

**Emails**
- Demo modal → `emil@vapapulse.com`
- Footer mail icon → `emil@vapapulse.com`
- Footer "Contact" link → `emil@vapapulse.com`
- Satenik's founder card: `coo@vapapulse.com` (intentionally kept)

**Footer**
- Company and Product link columns removed entirely
- Simplified: logo + tagline left, phone + email right
- Phone number added: **(619) 663-8382** (tappable `tel:` link)
- Legal links now open LegalModal (not dead `#` links)

**Coming Soon section** (new — inserted between Founders and CTA)

| App | Audience | Summary |
|---|---|---|
| **Categorical Program Qualifier** *(featured, full-width)* | Administrators & Program Directors | Rule-based eligibility for Title I, Title III, Prop 28, SpEd requisitions. Audit-trail docs. |
| **ObserveIQ** | Special Education Teams | Photograph student work/environment → structured observation notes via visual processing. No stored data. |
| **Meridian** | School Counselors | ASCA National Model + CASEL SEL + multicultural frameworks. Adjustable case "temperature" dial (clinical → exploratory). Culturally responsive action plans. |
| **Grant Pulse** | District Program Directors | Raw program data → audit-ready categorical compliance reports. Prop 28, Title I, Title III, SpEd. |
| **FocusBridge** | Teachers | Visual countdown for transitions. Discreet sensory check-in pings teacher tablet privately. |
| **SkillVault** | High School Students, Teachers, Mentors | COPPA-compliant micro-credentialing. Cryptographically verified skill stamps. Portable digital resume. |
| **ClearEar** | Students & Teachers | Real-time speech isolation. Teacher speaks into device; clean audio to student earbuds. No hardware needed. |

### DemoModal.tsx
- Replaced `mailto:` with `fetch()` POST to Web3Forms API
- Web3Forms key: `32c86377-fb57-4110-a513-67fd523cf413`
- Sends to: `emil@vapapulse.com`
- Loading spinner, success screen ("You're on our radar."), error fallback with direct email
- School/District: no longer required
- Message: now required
- Form resets on close

### PulseLogo.tsx (new design)
- Two gradient arcs: top (cyan #29ABE2 → green #8DC63F), bottom (purple #662D91 → orange #FF6321)
- EKG pulse line in brand-ink (#1A1A1A)
- Brand-orange node at peak (#FF6321)
- Favicon (public/favicon.svg) matches exactly

### LegalModal.tsx (new file)
- Type: `'privacy' | 'terms' | 'coppa' | null`
- Triggered by footer buttons
- Scrollable overlay, mobile-friendly
- Full legal text: Privacy Policy, Terms of Service, COPPA/FERPA Compliance

---

## Step 3: What Is NOT Done Yet — Next Steps

- [ ] **Nothing has been committed or pushed.** All changes are local. First thing on Desktop1325:
  ```bash
  git add src/App.tsx src/components/DemoModal.tsx src/components/PulseLogo.tsx src/components/LegalModal.tsx public/favicon.svg HANDSHAKE-Desktop1325.md
  git commit -m "Omnibook session: content, logo, Web3Forms, legal modals, Coming Soon section"
  git push origin main
  ```
- [ ] **Test Web3Forms** — submit a demo request on production and confirm delivery to `emil@vapapulse.com`
- [ ] **Review Coming Soon apps** — Emil may want to refine descriptions or reorder cards
- [ ] **Update CLAUDE.md** — pre-dates this session; does not reflect LegalModal.tsx, new logo, or current page section list

---

## Key Reference

| Item | Value |
|---|---|
| Repo | https://github.com/emilpulse-code/pulsepedagogies-site |
| Production | https://pulsepedagogies.com |
| Dev server | http://localhost:3000 |
| Product demo | https://vapapulse.com |
| Web3Forms key | `32c86377-fb57-4110-a513-67fd523cf413` |
| Primary email | emil@vapapulse.com |
| Satenik email | coo@vapapulse.com |
| Phone | (619) 663-8382 |
| Brand orange | `#FF6321` |
| Brand ink | `#1A1A1A` |
| Brand paper | `#F5F2ED` |

---

*Generated: April 14, 2026 — Omnibook session*
*Next device: Desktop1325*

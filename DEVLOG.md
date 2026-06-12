# Pulse Pedagogies — Dev Log

---

## Session: June 11, 2026 (later) — Project Builder

**New `/builder` page** — interactive "Digital Web Wizard" (`builder.html` → `src/builder/`): split-screen layout with a 5-step card-based wizard on the left (Vertical → Persona → Engine → Capabilities multi-select → Integrations multi-select) and a sticky live device mockup on the right (mobile/desktop toggle). Selections re-theme the mockup (sky/indigo/emerald per vertical), swap the persona dashboard, rebuild the nav per engine, and inject capability widgets (AI panel, chat bubble, live video tile, badges, biometric chip, signature row) plus integration pills in real time via Framer Motion (`motion/react`). Completing the wizard reveals a glowing "Construct & Compile App Blueprint" button → 3-second compile sequence (progress bar + terminal lines + mockup pulse) → lead-capture email form with the trust hand-off note. Submissions post the full blueprint (vertical/persona/engine/capabilities/integrations) to Web3Forms. Data structures in `src/builder/data.ts`; slate/indigo/violet dark aesthetic.

**Start a Project CTAs** now route to `/builder`: the nav pill is prominent (solid orange, glow, scale-on-hover, no longer blend-differenced), the hero secondary button links there, and the PageShell header CTA matches. The DemoModal form remains wired to "Start the conversation" (Work end-card, Contact) and the investment banner.

Build green (5 HTML entries), `tsc --noEmit` clean. Note: this project has no direct `@types/react` dep; custom components receiving `key` need it declared in props (see `ChoiceCard`).

---

## Session: June 11, 2026 — Portfolio becomes the landing page

Branch: `claude/kind-ramanujan-hb3j99` — **merged to `main` and deployed June 11, 2026.** All four pages (/, /company, /compliance, /prop28) verified live in production. Follow-up commits on the branch before shipping: Capabilities accordion content, industry-agnostic compliance page, flagship video moved under the pills, Studio nav link removed, inquiry form wired to 5 CTAs, full-color animated nav emblem, hero investment banner, all emails unified to emil@pulsepedagogies.com.

**Open item:** the Web3Forms access key in `DemoModal.tsx` was provisioned for emil@vapapulse.com — form submissions still deliver to that inbox. Generate a new key at web3forms.com for emil@pulsepedagogies.com and swap it in.

### Changes

**The portfolio page is now the site root.** `index.html` mounts `src/portfolio/main.tsx`; the original marketing site moved to `company.html` (served at `/company`). `portfolio.html` deleted. A small Vite plugin rewrites `/company`, `/compliance`, `/prop28` in dev to mirror Cloudflare Pages pretty URLs.

**Copy**
- Hero badge: "UI/UX Studio · K–12 EdTech · Glendale, CA" → "Digital Development Studio · Glendale, CA"; nav subtitle "Design Portfolio" → "Digital Development Studio"
- Manifesto replaced with: "We build web and mobile applications for education organizations — led by educators, built for education."
- Removed the "05 arts disciplines covered, TK–6" stat (stats grid now 3-up)

**Products**
- Added **Signet** to `src/data/apps.ts` (Compliance & Operations): gamified micro-credential badges for employees — K–12, corporate & government HR; never student-facing. Gallery now numbers 01–09 + CTA card 10 (CTA number computed from `CARDS.length`).
- "Nine products" → "Ten products"; hero strip "09 Products" → "10 Products"; company site "Eight tools" → "Nine tools"

**Sections**
- **Removed Process** ("From classroom to launch") — `sections/Process.tsx` deleted
- **New Studio section** (03): "Built by educators. Built for schools." — Who We Are, What We Build, 26+ stat, Education First / Custom Built / AI-Powered pillars
- **New Founders section** (04): Emil + Satenik cards ported from the company site `#founders`
- Capabilities renumbered 05, Contact 06; nav links now Work / Studio / Founders / Capabilities

**Flagship video** — Work-section flagship visual is now the playable Cloudflare Stream iframe (poster preserved, no autoplay) instead of a static thumbnail; parallax tween removed.

**New standalone pages** (linked from the Contact footer menu)
- `/compliance` — Security, Architecture & Compliance: the 3-layer stack (Client / Google Cloud Backend / Frontier AI + Edge Video CDN), the four-card posture grid (Zero-PII, Managed AI Access, UDL, Static Curriculum CDN), privacy-by-design notes. Source: vapapulse.com/compliance.
- `/prop28` — Proposition 28 research: mandate numbers, the 80/20/1 compliance framework, the staffing/trust gap, and how VAPA Pulse + CPQ respond. Source: "Strategic Software Development Pipeline for Proposition 28 Compliance and Arts Education Optimization" (May 2026).
- Shared chrome in `src/pages/PageShell.tsx`; entries `compliance.html` / `prop28.html` added to `vite.config.ts`.

### Verification
- `npm run build` green (4 HTML entries); `npx tsc --noEmit` clean except the two pre-existing DemoModal/LegalModal errors
- `/`, `/company`, `/compliance`, `/prop28` all return 200 on the dev server

---

## Session: June 12, 2026

### New: UI/UX Design Portfolio landing page (`/portfolio`)

A standalone, award-style portfolio landing page built as a second Vite entry — the main site at `/` is untouched.

**Stack additions:** `gsap@3.15` (ScrollTrigger), `three@0.184` (+ `@types/three`).

**Files**
- `portfolio.html` — second Vite entry (served at `/portfolio` via Cloudflare Pages pretty URLs, `/portfolio.html` in dev).
- `vite.config.ts` — multi-page `rollupOptions.input` (main + portfolio).
- `src/portfolio/` — page source:
  - `PortfolioPage.tsx` — shell; generic `.pp-reveal` ScrollTrigger batch; font-load refresh.
  - `components/PulseScene.tsx` — Three.js GPU particle field (custom shaders) that beats like an EKG; pointer-reactive; lazy-loaded in its own chunk; lighter grid on mobile; static frame under reduced motion; pauses offscreen.
  - `components/Loader.tsx`, `Cursor.tsx`, `Nav.tsx` (mix-blend-difference, auto-hides on scroll down), `Chars.tsx`.
  - `sections/` — Hero (char-split reveal over WebGL), Marquee, Manifesto (word-scrub + stat counters), Work (flagship VAPA Pulse + GSAP-pinned horizontal suite gallery on desktop / snap-scroll on mobile, cards driven by `src/data/apps.ts`), Process (scrubbed progress line), Capabilities, Contact.
  - `portfolio.css` — grain overlay, marquee keyframes, cursor, animation initial states gated behind `prefers-reduced-motion: no-preference`.

**Verification** — headless Chromium (Playwright) against the production build at 1440×900, 390×844 (iPhone emulation), and with `reducedMotion: reduce`: zero console/page errors, zero horizontal overflow on mobile, WebGL canvas renders, pinned gallery scrubs correctly, reduced-motion users get a fully visible static page. Portfolio entry is 145 kB JS (54 kB gzip) with Three.js code-split into a deferred 500 kB chunk.

**Known pre-existing issue (untouched):** `npm run lint` fails on `DemoModal.tsx` / `LegalModal.tsx` (`Cannot find namespace 'React'`) — present before this session.

---

## Session: May 27, 2026

### Changes
- `src/App.tsx` — Removed "Friends of Warm Hearth" board-member sentence from Satenik's founder bio (line 664). LinkedIn URL was already `linkedin.com/in/satenik-grigoryan-aa931731`; no change required there or in `CLAUDE.md`.
- `package-lock.json` — Ran `npm audit fix` to resolve 7 advisories (1 critical, 6 moderate) flagged by Dependabot: `protobufjs` (RCE GHSA-xq3m-2v4x-88gg + 7 related), `postcss` (XSS), `qs` (DoS, cascading to `express` + `body-parser`), `ws` (memory disclosure), `@protobufjs/utf8` (overlong UTF-8). All transitive; no breaking changes. `npm run build` verified green (402 kB JS, 37.6 kB CSS).

### Status
- Both changes committed and pushed to `main`. Cloudflare Pages auto-deploy triggered.
- Verified via `gh api repos/.../dependabot/alerts`: all 13 prior alerts now in `state: fixed`, 0 open. The "13 vulnerabilities" banner shown in `git push` output is a stale cached message from GitHub, not a current count.

---

## Session: May 20, 2026

### Status: Pending Action Items Closed

All Tier 2 / Tier 3 / Tier 4 items from CLAUDE.md have been completed out of band since the April 16 session. CLAUDE.md "Pending Action Items" section removed.

**Tier 2 — Account Setup**
- Cloudflare primary email migrated from personal Gmail to vapapulse.com Google Workspace account; Google SSO login enabled.

**Tier 3 — Infrastructure**
- Firebase Hosting configured for the primary domain (TXT verification + A records in Cloudflare, gray cloud / DNS-only, SSL provisioned).
- Cloudflare Redirect Rules in place for non-primary domains pointing back to the primary.
- GitHub Actions updated to deploy via `FirebaseExtended/action-hosting-deploy@v0`; `FIREBASE_SERVICE_ACCOUNT` secret set. Push-to-main deploy verified.
- PowerPoint → MP4 → Cloudflare Stream pipeline smoke-tested: 5-slide lesson with ElevenLabs narration, WebVTT generated from narration timestamps, 1080p playback confirmed with captions.

**Tier 4 — Google AI Startup Application Prep**
- Real Gemini Vision call wired into VAPA Pulse Act 4 (live API integration in production).
- AI integration map documented (Gemini Vision → Act 4, Gemini Flash → lesson content, Lyria → Act 1 audio, Veo → Act 2 hook video, Google Workspace for Education → district SSO + Slides, Firebase → backend).
- Registered on Google for Startups.

### Changes (this commit)
- `DEVLOG.md` — this entry added.
- `CLAUDE.md` — "Pending Action Items" section removed; footer date + next-session focus updated.

---

## Session: Desktop1325 — April 16, 2026

### Changes

**Hero video player (`src/App.tsx`)**

- Removed `muted=true` from Cloudflare Stream iframe URL — player now plays with audio when user hits play. (Browsers still require user interaction before audio plays; autoplay loop remains silent on first load per browser policy.)
- Removed `muted=true` from the iframe `src` query string.
- Watermark treatment: instead of an overlay block or CSS scale hack, the text card beneath the video (`bg-brand-ink`) is reshaped — it pulls up 52px into the video frame (`margin-top: -52px`) with `border-radius: 0 72px 0 0`, so the top-right corner arches up and covers the Cloudflare Stream watermark in the bottom-right corner of the player. No fake elements, no color-matching required.
- Iframe height set to `calc(100% - 52px)` so player controls render above the arch line and remain fully accessible.

### Status
- All changes committed and pushed to `main`
- Cloudflare Pages auto-deploy triggered — live at pulsepedagogies.com in ~2 min

---

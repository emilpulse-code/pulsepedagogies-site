# Handshake — Portfolio Landing Page Session (June 12, 2026)

> Read this to pick up where the previous (web) session left off.

---

## Where Things Stand

A new **UI/UX design portfolio landing page** was designed, built, verified, and pushed.
It is **NOT live yet** — it sits on a feature branch awaiting your review/merge.

| | |
|---|---|
| **Branch** | `claude/kind-ramanujan-hb3j99` (pushed to origin) |
| **URL when merged** | `pulsepedagogies.com/portfolio` (Cloudflare Pages pretty URL) |
| **URL in dev** | `http://localhost:3000/portfolio.html` |
| **Main site** | Untouched — `/` renders exactly as before |

## To Get It Running Locally

```bash
git fetch origin claude/kind-ramanujan-hb3j99
git checkout claude/kind-ramanujan-hb3j99
npm install          # picks up new deps: gsap, three, @types/three
npm run dev          # → http://localhost:3000/portfolio.html
```

## What Was Built

A standalone second Vite entry (award-site style, on-brand: `#FF6321` / `#F5F2ED` / `#1A1A1A`, Cormorant Garamond + Inter):

- **Loader** — 0→100% count + orange bar, wipes up to reveal hero
- **Hero** — Three.js GPU particle field (custom shaders) that beats like an EKG; mouse-reactive; "Design with a Pulse." char-split GSAP reveal
- **Marquee** — orange capability ticker
- **Manifesto** — word-by-word scroll-scrubbed statement + animated stat counters
- **Selected Work** — VAPA Pulse flagship feature (parallax, Stream thumbnail) + GSAP-pinned horizontal gallery of all 8 suite products (data from `src/data/apps.ts`), ends in orange CTA card
- **Process** — 5-act methodology with scrubbed orange progress line
- **Capabilities** — hover rows
- **Contact/Footer** — mailto emil@vapapulse.com, phone, links
- Extras: custom cursor (desktop), film-grain overlay, mix-blend-difference nav that auto-hides on scroll down

### File Map
```
portfolio.html                       ← second Vite entry
vite.config.ts                       ← multi-page rollupOptions.input added
src/portfolio/
├── main.tsx / PortfolioPage.tsx     ← shell, generic .pp-reveal batch
├── portfolio.css                    ← grain, marquee, cursor, motion-gated initial states
├── lib/gsapSetup.ts                 ← gsap + ScrollTrigger registration
├── components/
│   ├── PulseScene.tsx               ← Three.js scene (lazy chunk, mobile-lighter, reduced-motion static)
│   ├── Loader.tsx · Cursor.tsx · Nav.tsx · Chars.tsx
└── sections/
    ├── Hero · Marquee · Manifesto · Work · Process · Capabilities · Contact
```

## Verification Already Done (headless Chromium, production build + dev server)

- 1440×900 desktop, 390×844 iPhone emulation, `reducedMotion: reduce`
- ✅ Zero console/page errors · ✅ zero horizontal overflow on mobile · ✅ pinned gallery scrubs · ✅ reduced-motion users get fully visible static page · ✅ StrictMode double-mount leaves exactly one canvas
- Bundle: portfolio entry 145 kB JS (54 kB gzip); Three.js code-split into deferred 500 kB chunk

## Open Decision (the only thing blocking)

**Merge path not yet chosen.** Options discussed:
1. Open a PR from `claude/kind-ramanujan-hb3j99` → `main` (review diff on GitHub, merge when happy), or
2. Merge the branch into `main` directly — Cloudflare auto-deploys in ~2 min.

## Known Issues (pre-existing, intentionally untouched)

- `npm run lint` fails on `src/components/DemoModal.tsx` / `LegalModal.tsx` (`Cannot find namespace 'React'`) — predates this work.

## Notes

- Full session details in `DEVLOG.md` (June 12, 2026 entry).
- In the sandbox, Google Fonts + the Cloudflare Stream thumbnail were blocked (cert proxy) — fonts/images load fine locally and in production.
- After merging, consider linking the page from the main site nav (currently nothing links to `/portfolio`).

*Last updated: June 12, 2026*

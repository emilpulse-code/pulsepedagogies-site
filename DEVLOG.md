# Pulse Pedagogies — Dev Log

---

## Session: October 4, 2026 — The line is born in the marquee, and runs on mobile

**The brief.** Emil: the orange line should connect to the orange banner near the top of the site, as if it emanates from there; and on mobile the line did not appear for the three featured products.

**It now starts in section 01.** `Manifesto.tsx` draws the ribbon from the bottom edge of the marquee band — a flared root with concave fillets where the two meet, so it reads as pulled out of the band — down the right margin (`X_INTO_02` = 0.9 of the width, clear of the manifesto and stats on desktop) and straight into section 02. Section 02's route now enters at that x instead of 0.74. So the line runs unbroken from the marquee to the bottom of section 03.

**Mobile.** The stacked layout (under 1024px, and reduced motion) now carries the ribbon too. Its route is measured off the laid-out page rather than fixed, because the stacked heights depend on the copy and the screen: in at `X_INTO_02`, behind each hero object's centre, across each block of copy along alternating margins, out at `X_INTO_03` for section 03. Re-measured on resize.

**Shared module: `lib/ribbon.ts`.** The width (`RIBBON_W`), the two boundary x's, the Catmull-Rom path builder and the draw-to-the-screen-edge function used to be copied per section; now all three ribbons use them. Work's ribbon lost its `opacity-90` so the stroke is one colour from end to end.

**Seams, measured not eyeballed.** Two things showed at the 01→02 boundary. (1) A 1.7px step: a spline carries the previous point's tangent into the next segment, so a sway above the boundary bent the crossing off-x. Fixed by putting three consecutive points on the boundary x on each side, which makes the crossing segment exactly vertical — measured afterwards at 1296.0 / 1296.0 px. (2) A faint horizontal seam line where two sections meet at a fractional pixel and each antialiases its edge. Section 01 now sits above 02 (`z-[1]`, `overflow-x-clip` instead of `overflow-hidden`) and its ribbon overhangs the boundary by 3px.

**Reveal hold doubled.** At Emil's request the phrase "Basically, we build apps for education." holds longer: the timeline is now 3.8 units (was 3.1), so the still hold after the phrase lands is 1.4 units — about two screens of scroll instead of one. Pin length 434% → 532%.

Verified with headless captures at 1440×900 and 390×844: the root at the marquee, the 01→02 seam, all three mobile products, and the 02→03 seam on mobile. `tsc --noEmit` clean, build clean.

---

## Session: October 4, 2026 — Section 02 goes sideways; the sphere holds its line

**The brief.** Emil: section 02 was "less interesting than the rest of the site"; the line dropped to a hairline there for no reason and coming out of it was awkward; each of the three products should have its own moment rather than a straight scroll past all three. Separately, the Reveal sphere should shatter later, and "Basically, we build apps for education" should pause long enough to read.

**Section 02 is now a pinned, sideways track.** The section pins and the scroll turns horizontal: an intro screen, then one full screen per product. The ribbon runs the whole way at full weight — 0.072 of the width, which is exactly Work.tsx's 72/1000 — so there is no hairline and no swell, and it leaves the bottom of the stage at x = 0.3155 straight into section 03's ribbon. Its route (`ROUTE`, Catmull-Rom through viewport-unit points) threads behind every hero object and dips under both copy columns it would otherwise cross. It draws to the edge of the screen: the tip sits just off the bottom while the section rises, just off the right edge while the track slides, and off the bottom again on the way out.

**Each product gets a moment.** Its hero object swings in out of perspective (rotateY ~32° → 0, scale 0.82 → 1) and settles flat as it arrives, then leans away as the next one takes the frame. Front pieces (`.m-float`) parallax further than the object behind them, and a giant italic name drifts behind the ribbon the other way. The copy staggers in, the concept mark strikes the first time its product holds the frame, and a small pill at the bottom tracks which of the three you are on.

- **VAPA Pulse** — the real vapapulse.com in a browser frame, with the phone layout in front and the strands mark on a card.
- **clearAMS** — the real clearams.app hero in a browser frame, guardrail mark on a card.
- **Signet** — the seal itself, set on a solid medallion so the ribbon passes behind it. **No screenshot, deliberately:** the only running deployment (signet-system.fly.dev) is titled with the licensee's name, and the licence note in `data/signet.ts` forbids naming or implying a deployment.

Screenshots were captured headless at 2× from the live sites and are in `public/flagships/` (213 kB total, lazy-loaded).

**Holds instead of snap.** ScrollTrigger's `snap` was tried first and fought Lenis — both want to own the scroll position, and in testing the page jumped backwards to the intro. The holds are written into the scrubbed timeline instead: the track eases into each product (`power2.inOut`), sits still for 0.7 units of scroll, then eases on. Because the slide is no longer linear, `containerAnimation` cannot be used (it requires a linear container tween), so a ticker reads the track's actual offset each frame and sets the progress of paused tweens. That one function also draws the ribbon.

**Concept marks take a `play` prop.** On the sideways track all three marks sit at the same vertical position, so their usual vertical ScrollTrigger would have fired all three the moment the stage pinned. When `play` is passed, the mark ignores scroll and strikes the first time it turns true; omitted, it behaves as before.

**Under 1024px or with reduced motion** there is no pin and no ribbon in section 02: the same three moments stack vertically with `pp-reveal`. Section 03's ribbon still starts at its own top.

**Reveal.** The timeline is now 3.1 units at the same ~140% of a viewport per unit (pin length 280% → 434%). The zoom is unchanged; the shatter starts at 1.35 (was ~0.68), once the frame has nearly filled the screen; the phrase lands at 1.95–2.4; then 0.7 units (~a screen of scroll) of nothing moving before the pin releases.

Verified with headless captures at 1440×900 across the whole track and the seam, and at 390×844 for the stacked fallback; the Reveal checked at five points along its timeline. No console errors. `tsc --noEmit` clean, build clean.

---

## Session: September 30, 2026 — Section 02 rebuilt as stations on the orange line

**The brief:** the product detail added in the previous session was interrupting the page. Emil's words — the flow "is what makes it gorgeous," and section 02 had become "stilted." So: put the apps *on* the orange line, replace the detail with graphics that carry each product's concept, and move the actual information to its own page.

**What the landing page shows now.** Section 02 is three stations threaded by a single orange curve that draws itself as you scroll. Each station is a concept mark, a name, one claim, one sentence, one link. Nothing to read, nothing to operate. `components/concepts.tsx` holds the three marks:

- **VAPA Pulse** — five strands braid into one line. Five disciplines, one engine.
- **clearAMS** — a split meter with a hard stop at the 80% floor; the spend that would cross it is refused and bounces back. The product blocks the save, so the mark blocks the bar.
- **Signet** — a seal is struck, then verified by a check that sits *outside* the seal, because verification happens against a published key rather than by asking the issuer.

Section 03 lost the VAPA Pulse narrative, the flagship video and the clearAMS row — all three now live on `/products` — so it is the pipeline and nothing else. That block of copy was what buried the ribbon the section draws down itself.

**The line is now one gesture across both sections.** Section 02's hairline exits at x≈330/1000, which is where section 03's ribbon enters (`M 330 -80`). Move one and move the other. Between them the hairline *swells*: a stroke cannot change width along its length, so the swell is a filled polygon built at runtime by walking the tail of the curve and offsetting each sample perpendicular to the direction of travel. Two earlier attempts are worth not repeating — stacking four strokes of increasing width rendered as four round-capped lozenges, a caterpillar rather than a taper; and revealing the polygon with a clip rect read as a wedge floating free of the line, because a horizontal edge has nothing to do with where the curve is. It is masked by a fat stroke of the same curve carrying the same dash offset, so the reveal travels *along* the line.

**Do not animate transforms on SVG shapes here.** The first cut scaled circles with `transformOrigin: 'center'` and GSAP baked an origin compensation into the element matrix that did not resolve back to zero — every scaled circle sat ~23px off its own centre, which on a concentric seal is the entire mark. `svgOrigin` did not fix it either. The marks tween `r`, `width` and opacity instead; translation is still safe, being origin-independent.

**A paused `fromTo` timeline renders its from-state immediately**, so an un-triggered mark is not merely unanimated — it is collapsed to zero width / zero radius / dash-hidden, i.e. invisible. Correct below the fold, wrong for a reload that restores scroll position or a Back from `/products`. `useConcept` lands the timeline finished when its root is already above the trigger point.

**`lib/useHeightSync.ts` is gone.** It existed because toggling a demo widget grew the document and invalidated ScrollTrigger's cached pin positions below it. The widgets are no longer on a pinned page — they are on `/products`, which has no pins — so the hook was a no-op there, and its import was pulling the whole 115 kB GSAP bundle (45 kB gzipped) into that page for nothing. Removed, and noted here so the pin bug is not rediscovered the next time a widget goes back onto the landing page: if one does, it needs a `ScrollTrigger.refresh()` on height change.

**New page: `/products`.** Three sections, anchored `#vapa-pulse` / `#clearams` / `#signet`, which the stations link straight into. Everything cut from the landing page lands here at full size — the flagship video, the live 80/20 guardrail, all four clearAMS walkthroughs (the landing page showed one), and both Signet widgets. It is deliberately not a marketing site for any of them: clearAMS and VAPA Pulse have their own, and the link out sits where someone ready to buy will find it. Signet still carries no outbound link, by licence.

---

## Session: September 30, 2026 — Signet promoted in `02 Now Shipping`

A "Next to ship" block under the clearAMS teaser, with two small interactive demos. Source material read from `C:\Users\emila\Signet` — the project brief, the application overview, and the design mockups.

**The site was describing a different product.** `apps.ts` had Signet as *"a gamification utility for human resources teams... for K–12 districts as well as corporate and government HR,"* tagline *"Gamified micro-credentials that turn employee growth into visible, verifiable recognition."* Signet is a professional-learning operations platform: published calendar → registration → approval → attendance → payable hours → signed credential. The seat control, the waitlist, the Meet-report import and the payable-hours rounding — the actual product — were absent. Entry rewritten from the brief, with a corrected subtitle (*Professional Learning Credentials*) and audience (*Professional Learning Departments*, not corporate HR).

**The licence constrains what this page may say, and that is written down now.** Signet ToS §3.1 waives any right to use a licensee's name, logo, **or the existence of their deployment** as a marketing reference, case study, testimonial, customer-list entry, or sales demonstration without separate written authorization, and it survives termination. So: no district named, no deployment hinted at, no "already running in production" claim, and the licensee seal art in the Signet repo's `public/brand/` stays out. Signet is positioned as **Final development**, sold on what it does. The constraint is documented at the top of `src/data/signet.ts` and again on the `apps.ts` entry so the next person editing either does not have to rediscover it.

The internal design mockups in `design/shots/` are also unusable here for a separate reason: every one is branded with a real organization's name and a named staff member. Internally that is placeholder seed data; published on this site it reads as a customer that isn't one. Nothing was copied from them.

**Two widgets instead of a screenshot**, the same call clearAMS got. `CredentialDemo` checks a seal against the issuer's published key, then revokes it — the revoked credential still resolves, still shows its signature sound, and says it was withdrawn, because revocation is recorded rather than deleted. `SeatDemo` demonstrates the decision the brief says shapes everything else: registering is a request, not a reservation. Approving issues the seat, the confirmation and the calendar invitation in one act; approving into a full room waitlists rather than failing; releasing a seat promotes the longest-waiting person automatically. Both are labelled illustrative, both put their outcome in an `aria-live` region, and no key material or crypto ships to the page.

Laid out deliberately unlike the clearAMS block above — narrative full width, demos below — so the shipped product keeps the heavier treatment. No outbound link: Signet has no public site, and the only honest CTA for an unshipped product is the inquiry form, so `Spotlight` now takes `onOpenForm`.

**Bug found and fixed while testing — `useHeightSync`.** Clicking a widget grew the document by 43 px, and every ScrollTrigger below section 02 — including the pinned RingGallery — was still holding pixel positions measured before the change. The page lurched on the next scroll. Measured it (`deltaDoc: 43`, scroll drift 43 → 0 after the fix), then added `src/portfolio/lib/useHeightSync.ts`, which refreshes ScrollTrigger on the frame after a height-changing state change. Applied to both new widgets **and to `GuardrailDemo`**, which has carried the same latent bug since it shipped — its verdict box grows with the number of blocking reasons.

Verified in-browser at 1280px and ~640px: approve → confirmed, approve into a full room → waitlisted, release → longest-waiting promoted, roster heading stops saying "Awaiting approval" once nobody is; check → valid, revoke → struck through with the revocation dated in the chain and the signature still sound. Zero overflow inside section 02 at narrow width, zero scroll drift. `tsc --noEmit` clean, build clean. Landing bundle +17.7 kB raw / +4.1 kB gzipped for both widgets.

**Open, not done here:** ~~Signet has no registered domain~~ — **wrong, corrected September 30, 2026.** Signet holds `signetsystem.net` and `signetsystems.net` in Cloudflare; they are simply not mapped yet. The `signet.app` host that appears ~37 times across the Signet repo is a placeholder and is not owned, which is what misled this entry. Both domains are now recorded in `CLAUDE.md`. The outbound link stays off the site until one of them actually resolves. Separately, Signet still appears twice on the landing page: featured in 02 and listed at position 03 of the Development Pipeline in Work. Defensible — it is in development — but worth a decision.

---

## Session: September 30, 2026 — Cut `02 Now Shipping` back to a teaser

The clearAMS section shipped yesterday was the tallest thing on the landing page — roughly the height of all of Selected Work — and it collided with the section above it. Trimmed to a teaser and pointed outward.

**What was wrong.** Two near-identical stat grids back to back: Philosophy's 3-up (`Manifesto.tsx`) and the spotlight's 4-up used the same `border-t` + giant-serif-numeral treatment, same background, nothing between them but an eyebrow — they read as duplicate scoreboards. Four prose layers at four sizes in the narrative column, with the live URL linked twice. "80%" stated five times in one section (intro paragraph, stats row, meter floor marker, verdict copy, share readout) — the intro restated both rules the widget already labels in place. Three competing label systems under one `h2`. `Walkthroughs.tsx` said "Three takes" while rendering four. And `lg:sticky lg:top-32` on the narrative column did nothing, because that column was taller than the guardrail card.

**What it is now.** Status pill, name, headline, one-line tagline, chips, the live guardrail demo, one walkthrough (Act I, "Plan it"), and a single outbound CTA. The stat grid is gone, the long body is gone, three of the four videos are gone, and the duplicate hostname link is gone. The narrative column is now shorter than the demo, so the sticky finally does what it was written to do.

**Why not a `/clearams` page.** Built one first — `PageShell`-based, carrying the long body, all four walkthroughs, and the stats — then checked what `clearams.app` actually serves and deleted it. clearams.app is a full marketing site with Product, How It Works, **Pricing**, Security, and Request Access, opening on the identical headline and tagline. A page here would have been a weaker copy with no pricing and no signup, intercepting people on the way to the real thing. It was also off-pattern: VAPA Pulse gets a teaser block plus a link out to vapapulse.com, and clearAMS should work the same way. `src/data/spotlight.ts` keeps `body` and `stats` as the long-form record even though the section no longer renders them.

**`Walkthroughs.tsx` is now just `WalkthroughStage`.** The heading block, the three-act grid, and the unnumbered fourth card are deleted; the click-to-load facade is unchanged and still the only thing that touches YouTube, still only on activation. Playback state moved to the caller.

**VAPA Pulse is in production, not in development.** Corrected four places that said otherwise: the "Flagship · In Development" pills in `Work.tsx` and `App.tsx` (two of them), and three "proof of concept" CTAs in `Work.tsx`, `App.tsx`, and `Prop28Page.tsx`. Two products are live now, so the spotlight's framing changed from "the one product you can open" to "the newest product to reach production."

**Other knock-ons.** Hero's primary CTA now goes to `#shipping` rather than `#work` — the first click should reach something openable. clearAMS added to `apps.ts` as a catalog entry with a new optional `status: 'live'` and `href`; safe because `PIPELINE` is only ever read through explicit id lookups (`LIST_IDS` in Work, `ORBIT` in RingGallery, whose spin geometry depends on exactly four shots). That made `/company` read "Nine tools" when it had ten — fixed, and live products now get a `LIVE` pill in the suite rows. `Work.tsx` gained a single full-width clearAMS row under the flagship, linking out, so the "Eleven products" headline reconciles on screen without putting a shipped product inside a list headed "The Development Pipeline." `Prop28Page.tsx` section 04 leads with clearAMS as the shipped answer to the compliance framework in sections 02–03; the VAPA Pulse and CPQ cards below are untouched.

Verified in-browser: teaser renders and the sticky column behaves, guardrail still toggles and blocks on both rules, the single facade swaps to a player on click with nothing requested from YouTube before that, pipeline list still 01–05 + end-cap, `/company` reads "Ten tools" with the pill, `/prop28` card renders. `tsc --noEmit` clean, build clean at five HTML entry points.

**Pre-existing, not fixed:** the landing page scrolls horizontally by ~15px. `document.scrollWidth` is 1264 against a 1249px client width, and the offenders are the GSAP `pin-spacer`, the Reveal stage, and the cursor layers — all `100vw`-based sizing that includes the scrollbar. Predates this session. Also: `AdjunctCentral` is clipped to "AdjunctCent" in the pipeline list at 1264px.

---

## Session: September 29, 2026 — clearAMS spotlight on the landing page

New landing-page section **`02 · Now Shipping`** featuring clearAMS (live at clearams.app), placed between Philosophy (01) and Selected Work.

**Why there.** Everything in Work is flagship-in-development or pipeline. clearAMS is the one product a visitor can open right now, so burying it under ten unshipped things wasted the page's strongest proof. Kept on `brand-paper` rather than `brand-ink` for two reasons: Work's rounded dark cap needs a light section above it to read, and "shipped" should look different from the dark pipeline that follows.

**Swappable by design.** Content lives in `src/data/spotlight.ts` as one `SPOTLIGHT` object, not a list — the section exists to feature the ONE newest live product, which is a different claim from the pipeline in `apps.ts`. When the next product ships, replace the object. `demo` and `walkthroughs` are both optional; a future spotlight without a spend rule renders the narrative half and skips the widget.

**The dynamic part — `GuardrailDemo.tsx`.** A working client-side re-creation of the clearAMS 80/20 guardrail, not an animation. Toggling the sample plan lines re-runs both Prop 28 rules live: the allocation ceiling and the 80% arts-staffing floor. Default $109,500/$120,000 at 91.3% is compliant; adding the theatre residency trips the ceiling by $500; dropping the music teacher trips the floor at 40.6%. Empty plan is a neutral state, not a divide-by-zero. Real checkboxes inside real labels (keyboard-operable), verdict in an `aria-live` region. Red is the only non-brand hue and only ever means blocked.

**Walkthroughs — `Walkthroughs.tsx`.** All four clearAMS videos: three numbered Acts in a row, plus "And the desk it all runs from" as a wide unnumbered card below a rule. Unnumbered is deliberate and encoded in the type (`act: string | null`) — the three Acts are one plan's lifecycle in order, so numbering the coordinator video `04` would imply a fourth step in a sequence that ends at three. This mirrors the reasoning already commented into `clearAMS/website/src/pages/index.html`.

**Click-to-load facades, not embeds.** Nothing is requested from YouTube until someone asks for a video. Each card is a local poster over a plain link to youtube.com; activation swaps in a `youtube-nocookie` iframe and moves focus into it. Modified clicks fall through to YouTube; with JS off the link just works. This page already ships a 500 kB Three.js chunk — four eager players would have been the heaviest thing on it. Cost instead: 113 kB of lazy posters, +1.7 kB gzipped JS. Only one plays at a time; starting a second returns the first to its poster.

Posters copied from `clearAMS/website/assets/video/` into `public/walkthrough/` with the build hashes stripped (that dir isn't content-hashed by Vite, so the clearAMS hashes were noise).

**Knock-ons.** Inserting a numbered section shifted everything below it: Work 02→03, Studio 03→04, Founders 04→05, Capabilities 05→06, Contact 06→07. clearAMS is also an eleventh product, which made five copy claims wrong — Hero meta bar, Manifesto stat counter, Work headline ("Ten products." → "Eleven products."), and two lines in Capabilities.

Verified in-browser at 1440px and 624px: posters load, both guardrail failure modes trip correctly, playback swaps in place and one-at-a-time, zero console errors, no horizontal overflow. `tsc --noEmit` clean, build clean.

**Stale docs, not touched:** `CLAUDE.md` still names domain purchasing as the focus and claims an empty queue; `HANDSHAKE-PORTFOLIO.md` still describes the portfolio as unmerged on a feature branch. Both predate this session. Also unaddressed: `npm audit` reports 12 vulnerabilities (5 high) from deps that arrived with the portfolio merge.

---

## Session: June 12, 2026 — Reveal zoom polish + pipeline swap

- **Reveal**: artwork starts fit just inside the frame (99% height, fallback padding dropped); a second `.pp-reveal-media` layer zooms the art 1×→1.5× across the whole pin on top of the frame growth (frame now clips overflow); shatter softened — flight 4.4→2.3, tumble ~⅓, spread tightened. Holds-intact-first-third unchanged.
- **Pipeline swap**: works list is now FieldNote, AdjunctCentral, Signet, Vitae, Meridian (explicit `LIST_IDS`); orbit is SkillVault → CPQ → ClearEar → FocusBridge (`ORBIT` config with per-app shell). CPQ (tablet-framed art) and FocusBridge (phone-framed art) orbit **bare** in their native form factors; the two web apps keep the 3D laptop shells.
- **Builder: AR + computer-game options**: two new widgets (`ar`, `game`) wired through the full pipeline — widget vocabulary + interview copy (`src/builder/data.ts`), Gemini schema enum + prompt rules (`functions/api/imagine.ts`; `game` = the product is playable, distinct from `gamification` = badges layered on), local keyword fallback (`src/builder/imagine.ts`; bare "game" moved from the gamification trigger to the game widget), and two new canvas tiles (AR camera-scan tile, gamepad "Continue — Level 3" tile) in `ProjectBuilder.tsx`.

---

## Session: June 11–12, 2026 — Award-site motion overhaul + narrative Project Builder

Two major workstreams shipped together.

### 1. Narrative Project Builder (`/builder` reimagined)

The category wizard is gone. The builder is now a plain-language interview:
- **Intro card first**: honest framing — a simple planning tool, no commitment; specs (the visitor's answers + generated blueprint) are saved and we reach out by email to discuss possibilities and development costs.
- **Five open questions** (The Idea / The People / The Moment / The Magic / The Fit) in free-text, any kind of app welcome (`src/builder/data.ts` rewritten).
- **Gemini imagines the app live**: new Cloudflare Pages Function `functions/api/imagine.ts` (model `gemini-2.5-flash`, structured-JSON output, thinking disabled for latency) turns the answers into a renderable Blueprint (name, palette, nav, stats, work rows, widgets, integrations, insight, summary). Client (`src/builder/imagine.ts`) re-imagines ~1.4s after typing pauses with abort/stale-guard; canvas shows an "Imagining…" shimmer and an "Imagined by Gemini" / "Studio sketch" badge. **Local keyword fallback** (`localImagine`) keeps the page fully functional with no key.
- Web3Forms submission now carries all five answers verbatim + blueprint JSON.
- ~~ACTION REQUIRED: set `GEMINI_API_KEY`~~ **Done June 12, 2026** — key set in Cloudflare Pages secrets, redeployed (`92aa2fa`), verified live in production: `/api/imagine` generated FieldTripFlow (education prompt) and PinPal (bowling-league prompt, correct chat+gamification widgets, no education bias). Builder badge now reads "Imagined by Gemini."
- **Web3Forms (June 12, 2026):** instead of a new key (paid feature), the account email was changed to emil@pulsepedagogies.com — same key `32c86…`, no code change. Pending: one live-form submission to confirm the inbox reroute (server-side test posts are blocked on the free plan).

### 2. Landing page: lukebaffait.fr-class scroll & 3D effects

Inspected lukebaffait.fr (GSAP + ScrollTrigger + Lenis) and a screen recording of it; replicated the vocabulary with Pulse content:
- **Lenis smooth scroll** (`lib/useLenis.ts`) driven by GSAP's ticker; anchors eased; reduced-motion no-op. `scroll-behavior: smooth` removed from CSS.
- **Hero**: pulse wave made dramatic (bigger lub-dub rings, hot crest glow, larger points, faster cycle); fbm **ember aurora backdrop plane** in the same WebGL scene; scroll dive (camera descends, `uBoost` swells the wave) + hero copy parallax-out.
- **Reveal section** (new, after hero): pinned corner-bracketed frame scales to fullscreen over new edtech-sphere artwork (`public/reveal-shatter.webp`, checkerboard stripped to real alpha via `scripts/prep-reveal.mjs`). Inside is `ShatterScene.tsx`: the image tessellated into **3D blocks (random depth) + triangle splinters** that hold intact for the first ⅓ of the pin (global breathing + sway only), then tear off and tumble toward the viewer. depthWrite ON is load-bearing (sides otherwise overpaint front faces).
- **Work section**: Development Pipeline became a **flipping works list** (first 5 apps; roll-up name flip on hover, sticky preview card swaps mockups, click → `AppDetail` dialog with full description) + flagship video block retained. **Orange ribbon** draws down the section with progressively wilder curves, exiting right (rerouted to avoid the CTA row; CTA lettering switched to paper to never melt into it).
- **RingGallery** (new): remaining 4 apps orbit in a CSS preserve-3d ring, pinned full revolution; each app housed in a **3D laptop/browser shell** (back slab translateZ, chrome bar, real domain, deck+hinge); click opens AppDetail. At the 4th app's pass the whole ring **flies toward the viewer and dissolves** into the next section.
- **Founders** (04): cinematic pinned deck — Satenik first, large and in focus; Emil behind in the distance (scaled, blurred, dimmed). Subtle drift → **dramatic mid-pin focus flip** (z-order swap) → subtle settle. Landscape cards show far more portrait; mobile/reduced-motion stack normally. Pin triggers off the stage so the heading scrolls away and cards lock dead-center.
- **Chrome**: scramble-text nav hover (`lib/scramble.ts`), `(42)` scroll percentage + filling timeline bar (`ScrollProgress.tsx`), ASCII **EKG heartbeat** footer art (`AsciiPulse.tsx`) + giant "Pulse Pedagogies." wordmark in Contact.
- `src/data/apps.ts`: new `PIPELINE` flat export (suite label attached) shared by Work/RingGallery/AppDetail.

Build: 5 entries + Pages Function; `tsc --noEmit` clean; three.js split into shared chunk (no >500kB warning).

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

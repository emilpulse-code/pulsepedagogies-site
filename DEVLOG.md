# Pulse Pedagogies — Dev Log

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

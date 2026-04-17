# Pulse Pedagogies — Dev Log

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

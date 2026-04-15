# Pulse Pedagogies Website

This is the company website for Pulse Pedagogies, LLC.

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Deployment**: Cloudflare Pages

## Customization
- **Logo**: The logo is located in `src/App.tsx` pointing to your hosted asset.
- **Videos**: The Hero section uses a `<video>` tag. Replace the `src` in `App.tsx` with your Cloudflare R2 URLs.
- **Resources**: The "Strategic Documentation" section in `App.tsx` can be updated with direct links to your PDF/DOCX files.

## Deployment to pulsepedagogies.com

### 1. Local Setup
If you are using **Claude Code** (the CLI tool), you can run:
```bash
npm run build
```

### 2. Cloudflare Pages Deployment
You can deploy directly via the Cloudflare Dashboard by connecting your GitHub repository, or via the CLI:

```bash
npx wrangler pages deploy dist --project-name pulse-pedagogies-website
```

### 3. Custom Domain
In the Cloudflare Pages dashboard:
1. Go to **Custom Domains**.
2. Add `pulsepedagogies.com`.
3. Cloudflare will handle the DNS and SSL automatically.

## AI Content Pipeline
This site is designed to showcase content generated via:
- **Veo 3**: For cinematic hero hooks.
- **Gemini 1.5 Pro**: For pedagogical analysis.
- **Lyria 3**: For teacher briefings.

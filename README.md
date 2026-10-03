# Quantex AI Solutions

Marketing site for Quantex, a Beirut studio for websites, AI assistants and business software. Built with Next.js 16, React 19, Tailwind CSS 4, and a live 3D hero using React Three Fiber.

## Environment

Copy `.env.example` to `.env.local` and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for canonicals, Open Graph and the sitemap |
| `GEMINI_API_KEY` | Powers the site chat assistant. Get a free key from [Google AI Studio](https://aistudio.google.com) |
| `GEMINI_MODEL` | Optional. Overrides the default chat model |
| `CHAT_RATE_LIMIT_PER_HOUR` | Optional. Messages per visitor per hour (default 20) |

Add `GEMINI_API_KEY` in Vercel (Production and Preview) and redeploy for the chat assistant to work. Without it the chat shows a friendly fallback to WhatsApp.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

## Where things live

- `src/app/globals.css` is the design system: colour tokens, liquid-glass surfaces, buttons, type, and the pinned hero stage.
- `src/components/hero/` is the 3D hero. `chrome-geometry.ts` rebuilds the logo's triangle spiral as chrome rings, `chrome-environment.ts` builds the studio lighting in code, and `ChromeScene.tsx` drives the scroll morph. `HeroStage.tsx` handles scrolling, loading and fallbacks.
- `public/hero/chrome-mark.webp` is the still image shown before the 3D loads, and when WebGL is unavailable or reduced motion is on. Regenerate it if the scene's look changes.
- Copy lives in `src/lib/` (`services/data.ts`, `site/about.ts`, `site/process.ts`, `seo/faq.ts`) so the chat assistant, metadata and pages stay in sync.

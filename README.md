# Quantex AI Solutions

Marketing site for QUANTEX — Next.js 16, React 19, Tailwind CSS 4, GSAP.

## Environment

Copy `.env.local` if you need a Gemini key. Canonical URLs, Open Graph, JSON-LD, robots.txt, and the sitemap always use `https://quantexai.solutions` — preview hosts are ignored so they cannot leak into production metadata.

```bash
GEMINI_API_KEY=your_google_ai_studio_key
```

Get a free API key from [Google AI Studio](https://aistudio.google.com). Add `GEMINI_API_KEY` in Vercel (Production and Preview) and redeploy for the site chat assistant to work.

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

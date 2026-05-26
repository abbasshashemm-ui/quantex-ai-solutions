# Quantex AI Solutions

Marketing site for Quantex AI Solutions — Next.js 16, React 19, Tailwind CSS 4, GSAP, Spline.

## Environment

Copy `.env.example` to `.env.local` and set your production URL for SEO (canonicals, Open Graph, sitemap):

```bash
NEXT_PUBLIC_SITE_URL=https://www.quantexai.solutions
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

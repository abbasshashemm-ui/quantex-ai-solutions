export const FOUNDER = {
  name: "Abbas Hachem",
  role: "Full Stack Developer",
  title: "Founder",
} as const;

export const ABOUT_HERO = {
  eyebrow: "About Quantex AI Solutions",
  title: "A studio that ships products, not decks.",
  lead: "Quantex AI Solutions launched in 2024 in Beirut. We ship Next.js sites on Vercel, tuned for Core Web Vitals and Google Search Console, plus Gemini-powered chatbots on WhatsApp and the web—alongside custom software, technical SEO, and automation.",
} as const;

export const ABOUT_STORY = {
  eyebrow: "Background",
  title: "Who is behind Quantex AI Solutions?",
  paragraphs: [
    "Abbas Hachem started Quantex AI Solutions after years of full-stack work across startups and client projects. The pattern was always the same—lots of talk about growth and visibility, but slow sites, weak crawlability, brittle chatbots, and codebases that were painful to extend after launch.",
    "Quantex is the opposite of that cycle. We scope in plain language, prototype the risky parts early, and deliver systems your team can run: technical SEO engineered at the source, Next.js sites tuned for Core Web Vitals, assistants trained on your content, internal tools shaped around real workflows, and integrations that remove manual steps instead of adding dashboards nobody opens.",
    {
      before:
        "Since 2024 we have partnered with ",
      highlight: "10+ businesses",
      after:
        " across Lebanon and the wider region—on AI chatbots, marketing sites, bespoke apps, and workflow automation. You work directly with the people writing the code, not a layer of coordinators.",
    },
  ],
} as const;

export const ABOUT_STATS = [
  { value: "2024", label: "Year founded" },
  { value: "10+", label: "Clients served" },
  { value: "6", label: "Practice areas" },
  { value: "24h", label: "First reply target" },
] as const;

export const ABOUT_VALUES = [
  {
    index: "01",
    title: "Ship what runs in production",
    body: "We optimize for go-live: tested flows, monitoring hooks, and handover docs—not slide decks that stall after sign-off.",
  },
  {
    index: "02",
    title: "Your repo, your data, your keys",
    body: "Repositories, hosting access, and training materials go to you. We are partners on the build, not gatekeepers on the outcome.",
  },
  {
    index: "03",
    title: "AI with context and limits",
    body: "Bots and automations are grounded in your documents, products, and policies—with clear fallbacks when a human should take over.",
  },
  {
    index: "04",
    title: "Milestones you can track",
    body: "Work breaks into visible phases with demos you can click through, so budget and timeline stay understandable before they become problems.",
  },
] as const;

export const ABOUT_CAPABILITIES = {
  eyebrow: "Capabilities",
  title: "What can Quantex build?",
  lead: "Pick one lane or combine several—we design, build, and launch across the stack so your brand, product, and AI touchpoints stay aligned.",
} as const;

export const ABOUT_CTA = {
  eyebrow: "Next step",
  title: "How do I start a project with Quantex?",
  lead: "Share a short brief. We will respond with scope options and a realistic first milestone—no generic retainer pitch.",
  primaryLabel: "Send a brief",
  primaryHref: "/contact",
  secondaryLabel: "Explore services",
} as const;

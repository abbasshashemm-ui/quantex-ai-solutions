export const FOUNDER = {
  name: "Abbas Hachem",
  role: "Full-stack developer",
  title: "Founder",
} as const;

export const ABOUT_HERO = {
  eyebrow: "About Quantex",
  title: "A Beirut studio that builds what it promises.",
  lead: "Quantex is a Beirut studio founded in 2024. We build websites that win customers, AI assistants that answer them, and the software and automation behind your business—and we explain everything in plain language, from the first call.",
} as const;

export const ABOUT_STORY = {
  eyebrow: "Background",
  title: "Who is behind Quantex?",
  paragraphs: [
    "Abbas Hachem started Quantex in 2024 after years of building software for startups and businesses. The pattern was always the same: plenty of talk about growth, but slow websites, chatbots that gave wrong answers, and systems that were hard to change once the builders had left.",
    "Quantex is built to break that pattern. We explain things in plain language, test the risky parts early, and hand over work your team can actually run. We choose the right tools for each project instead of forcing every client into the same template.",
    {
      before: "Since 2024 we have worked with ",
      highlight: "10+ paying clients",
      after:
        " across Lebanon and the wider region, on websites, AI assistants, custom software and automation. When you get in touch, you speak directly with Abbas, the person leading the work.",
    },
  ],
} as const;

export const ABOUT_STATS = [
  { value: "2024", label: "Year founded" },
  { value: "10+", label: "Paying clients" },
  { value: "6", label: "Services" },
  { value: "24h", label: "Reply time" },
] as const;

export const ABOUT_VALUES = [
  {
    index: "01",
    title: "You own everything",
    body: "Your code, domain, accounts and content are handed over to you. We are partners on the build, not gatekeepers of the result.",
  },
  {
    index: "02",
    title: "A direct line",
    body: "You talk to the person doing the work, on WhatsApp or email. No account managers, and no waiting for messages to be passed along.",
  },
  {
    index: "03",
    title: "A reply within 24 hours",
    body: "Message us and you get a reply from a real person within 24 hours, not an automatic response.",
  },
  {
    index: "04",
    title: "Honest AI",
    body: "Our assistants answer only from your information, say so when they don't know, and hand over to a person when it matters.",
  },
] as const;

export const ABOUT_CAPABILITIES = {
  eyebrow: "Services",
  title: "What can Quantex build?",
  lead: "Pick one service or combine several. Everything is designed to work together, from your website to your assistant to the systems behind them.",
} as const;

export const ABOUT_CTA = {
  eyebrow: "Next step",
  title: "Ready to start a project?",
  lead: "Tell us what you need. We will reply within 24 hours with options and a realistic first step.",
  primaryLabel: "Start a project",
  primaryHref: "/contact",
  secondaryLabel: "See what we build",
} as const;

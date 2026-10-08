// Prices are "from" prices in USD, confirmed after a short call.
// Benchmarks (Lebanon + UAE agencies, 2026) are in the PR description.

export type PricePlan = {
  id: string;
  name: string;
  price: string; // e.g. "$700"
  period?: string; // e.g. "/ month"
  setup?: string; // one-off fee shown under the price
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type PriceGroup = {
  id: string;
  serviceSlug: string;
  title: string;
  intro: string;
  plans: PricePlan[];
  note?: string;
};

export const PRICE_GROUPS: PriceGroup[] = [
  {
    id: "websites",
    serviceSlug: "high-converting-websites",
    title: "Websites",
    intro: "One-off projects. You own the site, the code and the domain.",
    plans: [
      {
        id: "business",
        name: "Business Site",
        price: "From $700",
        blurb: "A clear, fast site that explains what you do and gets enquiries.",
        features: [
          "Up to 7 pages, mobile-first design",
          "WhatsApp button and contact form",
          "Speed and basic search setup",
          "Analytics so you can see what works",
          "2 rounds of revisions",
          "Live in about 2 weeks",
        ],
      },
      {
        id: "growth",
        name: "Growth Site",
        price: "From $1,400",
        blurb: "For businesses that want leads, in English and Arabic.",
        featured: true,
        features: [
          "Everything in Business Site",
          "Up to 15 pages, English and Arabic",
          "Pages you can edit yourself",
          "Full search setup: structure, schema, sitemap",
          "Lead tracking on forms, calls and WhatsApp",
          "A handover session so you can run it",
          "Live in 3 to 4 weeks",
        ],
      },
      {
        id: "store",
        name: "Online Store",
        price: "From $2,200",
        blurb: "Sell products online, with checkout that works on a phone.",
        features: [
          "Everything in Growth Site",
          "Product catalogue and mobile checkout",
          "Payment setup for your provider",
          "First 20 products uploaded for you",
          "Order emails and stock basics",
          "Live in 4 to 6 weeks",
        ],
      },
    ],
    note: "Optional care plan from $40 a month: updates, backups and small edits.",
  },
  {
    id: "seo",
    serviceSlug: "seo",
    title: "SEO and AI search",
    intro:
      "Monthly work, no long contract. Get found on Google, and by ChatGPT, Gemini and Perplexity.",
    plans: [
      {
        id: "seo-foundation",
        name: "SEO",
        price: "$250",
        period: "/ month",
        blurb: "Get found on Google in Lebanon and nearby markets.",
        features: [
          "Full audit and a clear priority list",
          "Google Business Profile set up and tuned",
          "Technical fixes and speed",
          "Up to 10 tracked keywords",
          "1 piece of content each month",
          "Monthly report in plain words",
        ],
      },
      {
        id: "seo-ai",
        name: "SEO + AI search",
        price: "$800",
        period: "/ month",
        blurb: "Everything in SEO, plus being the answer AI assistants give.",
        featured: true,
        features: [
          "Everything in SEO",
          "Pages rewritten so AI assistants can quote them",
          "Schema, FAQs and an llms.txt for AI crawlers",
          "Tracking of how ChatGPT, Gemini and Perplexity mention you",
          "4 pieces of content a month, English and Arabic",
          "Monthly call to go through results",
        ],
      },
    ],
    note: "Results usually take 3 to 6 months. Month to month, cancel any time.",
  },
  {
    id: "assistants",
    serviceSlug: "custom-intelligent-chatbots",
    title: "AI assistants",
    intro:
      "A subscription: we build it, host it and look after it. Setup once, then monthly.",
    plans: [
      {
        id: "assistant-web",
        name: "Website Assistant",
        price: "From $120",
        period: "/ month",
        setup: "Setup from $400",
        blurb: "Answers customers on your website, around the clock.",
        features: [
          "Trained on your own services, prices and policies",
          "Arabic, English and Arabizi",
          "Hands the chat to you when it matters",
          "Hosting, updates and fixes included",
          "Monthly report on what customers ask",
        ],
      },
      {
        id: "assistant-whatsapp",
        name: "Website + WhatsApp",
        price: "From $250",
        period: "/ month",
        setup: "Setup from $600",
        blurb: "The same assistant on your website and your WhatsApp number.",
        featured: true,
        features: [
          "Everything in Website Assistant",
          "Connected to your WhatsApp Business number",
          "Collects names, numbers and requests for your team",
          "Bookings and quote requests sent to you",
          "Priority fixes",
        ],
      },
    ],
    note: "WhatsApp and AI usage fees are passed on at cost. Most small businesses pay little.",
  },
];

export const CUSTOM_SCOPES = [
  {
    title: "Business automation",
    slug: "business-process-automation",
    text: "Priced after we map your process, because every workflow is different.",
  },
  {
    title: "Custom software",
    slug: "custom-software-development",
    text: "Fixed quote after a short scoping call. No surprises mid-project.",
  },
  {
    title: "System design",
    slug: "custom-system-architectures",
    text: "Scoped to your systems and goals, with a fixed quote up front.",
  },
] as const;

export const PRICING_FAQ = [
  {
    question: "Why are the prices \"from\" prices?",
    answer:
      "Every business is a little different, so the final price is confirmed after a short call. A 'from' price is the real starting point, not a bait price.",
  },
  {
    question: "What currency are the prices in?",
    answer: "US dollars.",
  },
  {
    question: "Why are automation, custom software and system design not priced here?",
    answer:
      "Those projects depend completely on your process and systems. We scope them first and give a fixed quote, so you know the cost before work begins.",
  },
  {
    question: "What is not included?",
    answer:
      "Third-party costs such as your domain renewal, ad spend, payment-provider fees and WhatsApp or AI usage fees. We tell you each one up front.",
  },
  {
    question: "Do I own what you build?",
    answer:
      "Yes. You own your code, domain, accounts and content on every website and software project.",
  },
] as const;

export function formatPricingForAssistants(): string {
  const lines: string[] = ["Prices in USD (from prices, confirmed after a short call):"];
  for (const group of PRICE_GROUPS) {
    lines.push(`${group.title}:`);
    for (const plan of group.plans) {
      const parts = [`${plan.name}: ${plan.price}${plan.period ? ` ${plan.period}` : ""}`];
      if (plan.setup) parts.push(plan.setup);
      lines.push(`- ${parts.join(", ")}`);
    }
  }
  lines.push(
    "Automation, custom software and system design are scoped per project with a fixed quote.",
  );
  return lines.join("\n");
}

import type { FaqItem } from "@/lib/seo/faq";

export const AI_SOLUTIONS_PATH = "/ai-solutions";

export const AI_SOLUTIONS_HERO = {
  eyebrow: "AI solutions in Lebanon and worldwide",
  title: "AI solutions that make your business faster, sharper and easier to run.",
  lead: "Quantex is a Beirut studio that builds AI systems for real businesses: assistants that answer customers on your website and WhatsApp, automation that removes repetitive work, and custom AI software built around how you operate. We serve companies across Lebanon and around the world.",
} as const;

export const AI_SOLUTIONS_ANSWER = {
  question: "What are AI solutions for business?",
  answer:
    "AI solutions are software systems that use artificial intelligence to handle work that normally takes people time: answering customer questions, sorting and routing requests, reading documents, writing first drafts, and spotting patterns in your data. Quantex designs and builds them for businesses in Lebanon and worldwide, trained on your own information and connected to the tools you already use.",
} as const;

export type AiUseCase = {
  title: string;
  body: string;
  href?: string;
};

export const AI_USE_CASES: AiUseCase[] = [
  {
    title: "AI assistants and chatbots",
    body: "An assistant trained on your products, prices and policies that replies to customers in Arabic, French and English, on your website and WhatsApp, 24 hours a day. It says so when it does not know, and hands the conversation to a person when it matters.",
    href: "/services/custom-intelligent-chatbots",
  },
  {
    title: "Business process automation",
    body: "Quotes, invoices, order follow-ups, reports and data entry that run by themselves. AI reads the incoming message or document, decides what it is, and moves it to the right place without someone copying and pasting.",
    href: "/services/business-process-automation",
  },
  {
    title: "Custom AI software",
    body: "Internal tools and customer-facing products with AI built in: search across your documents, tools that draft replies for your team, and dashboards that explain what changed in your numbers.",
    href: "/services/custom-software-development",
  },
  {
    title: "Lead capture and sales support",
    body: "AI that answers first questions, qualifies enquiries, collects contact details and books the next step, so your team spends its time on people who are ready to buy.",
    href: "/services/high-converting-websites",
  },
  {
    title: "Search visibility for the AI era",
    body: "More customers now ask Google, ChatGPT and other AI tools who to hire. We structure your website so search engines and AI assistants can find you and describe you accurately.",
    href: "/services/seo",
  },
  {
    title: "AI system design",
    body: "Not sure where AI fits? We map your workflows, pick the few places where it saves the most time, and plan how the pieces connect before anything is built.",
    href: "/services/custom-system-architectures",
  },
];

export const AI_BENEFITS = [
  {
    title: "Answer customers instantly",
    body: "Customers message at night and on weekends. An assistant replies in seconds, so enquiries do not go cold while you sleep.",
  },
  {
    title: "Give your team its time back",
    body: "Repetitive admin is the first thing to automate. Your people move to work that needs judgment, relationships and creativity.",
  },
  {
    title: "Grow without hiring at the same rate",
    body: "AI absorbs the extra volume when you get busier, so more customers do not automatically mean more headcount.",
  },
  {
    title: "Make fewer mistakes",
    body: "Systems follow the same rules every time. Prices, policies and steps are applied consistently, whoever is on shift.",
  },
] as const;

export const AI_LEBANON = {
  eyebrow: "Why Lebanon",
  title: "AI for Lebanese businesses, built by a Beirut team.",
  lead: "Businesses here operate under conditions that generic overseas tools were not designed for. We build with those conditions in mind.",
  points: [
    {
      title: "Arabic, French and English",
      body: "Customers switch languages mid-conversation, often writing Arabic in Latin letters. Your assistant should follow, not break.",
    },
    {
      title: "WhatsApp first",
      body: "In Lebanon, business happens on WhatsApp. We put AI where your customers already are, instead of asking them to learn a new app.",
    },
    {
      title: "Built for tight budgets and lean teams",
      body: "We start with the one workflow that pays back fastest, ship it, and expand only when it earns its place. No bloated enterprise packages.",
    },
    {
      title: "Local support, same time zone",
      body: "You speak directly with the founder in Beirut, on WhatsApp or by phone, and get a reply within 24 hours.",
    },
  ],
} as const;

export const AI_WORLDWIDE = {
  eyebrow: "Worldwide",
  title: "Working with businesses across the Middle East and beyond.",
  body: "Everything we build is delivered remotely, so distance is not a barrier. We work with companies in the Gulf, Europe, North America and anywhere else that needs a reliable AI partner, with the same direct contact and the same ownership terms for every client.",
} as const;

export const AI_STEPS = [
  {
    label: "Talk",
    detail:
      "A short call or WhatsApp chat about your business, your customers and where time is being lost.",
  },
  {
    label: "Pick one workflow",
    detail:
      "We choose the single use case with the clearest payoff and agree what success looks like.",
  },
  {
    label: "Build and test",
    detail:
      "We build it on your own information and test the risky parts early, before customers see it.",
  },
  {
    label: "Launch and improve",
    detail:
      "You go live, we watch real conversations and results, and tune the system from there.",
  },
] as const;

export const AI_SOLUTIONS_FAQ: FaqItem[] = [
  {
    question: "What AI solutions does Quantex offer in Lebanon?",
    answer:
      "Quantex builds AI assistants and chatbots for websites and WhatsApp, business process automation, custom AI software, AI-ready SEO, and system design. We are based in Beirut and work with businesses across Lebanon.",
  },
  {
    question: "Can AI chatbots work in Arabic, French and English?",
    answer:
      "Yes. We build assistants that understand and reply in Arabic, French and English, including customers who mix languages in one conversation.",
  },
  {
    question: "Is AI only for large companies?",
    answer:
      "No. Small and mid-sized businesses often benefit most, because one automated workflow can free up hours every week. We start small, with one clear use case, and grow from there.",
  },
  {
    question: "How much does an AI solution cost?",
    answer:
      "It depends on scope. A focused assistant or automation costs far less than a full custom platform. Tell us what you need on the contact page and we will reply within 24 hours with options and a realistic first step.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "A focused first version, such as a WhatsApp assistant or a single automated workflow, can usually be live within weeks rather than months. The timeline depends on the scope and how quickly we get your information.",
  },
  {
    question: "Will the AI make things up?",
    answer:
      "Our assistants answer only from the information you give them, say so when they do not know, and hand over to a person for anything sensitive. We test the risky answers before launch.",
  },
  {
    question: "Do I own what you build?",
    answer:
      "Yes. Your code, domain, accounts and content are handed over to you.",
  },
  {
    question: "Do you work with businesses outside Lebanon?",
    answer:
      "Yes. We work remotely with clients in the Middle East and worldwide.",
  },
];

export const AI_SOLUTIONS_CTA = {
  eyebrow: "Next step",
  title: "Ready to put AI to work in your business?",
  lead: "Tell us what slows you down. We will reply within 24 hours with where AI can help and a realistic first step.",
} as const;

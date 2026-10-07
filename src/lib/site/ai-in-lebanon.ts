export const AI_ARTICLE_PATH = "/insights/ai-in-lebanon";

export const AI_ARTICLE = {
  title: "AI in Lebanon: A Practical Guide for Businesses",
  seoTitle: "AI in Lebanon: A Practical Guide for Businesses (2026)",
  description:
    "How Lebanese businesses can use AI today: chatbots in Arabic, French and English, WhatsApp automation, where to start, what it costs, and the mistakes to avoid.",
  datePublished: "2026-10-07",
  dateModified: "2026-10-07",
  readingTime: "7 min read",
  summary:
    "AI is useful in Lebanon right now, and you do not need a large budget or a technical team to start. The best first projects are small and specific: a WhatsApp assistant that answers common questions, or one repetitive task that no longer needs a person. This guide explains where AI helps, what to watch out for, and how to begin.",
} as const;

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: { title: string; body: string }[];
};

export const AI_ARTICLE_SECTIONS: ArticleSection[] = [
  {
    id: "what-is-ai-for-business",
    heading: "What does AI actually mean for a business?",
    paragraphs: [
      "Strip away the hype and AI for business is software that can read, write, sort and answer in ordinary language. It can read a customer message and understand what they want. It can read an invoice and pull out the amount. It can draft a reply, summarise a long document, or notice that this week's sales look different from last week's.",
      "That is why it matters for ordinary companies. Most businesses lose hours every week to work that is repetitive but still needs a little understanding: replying to the same questions, copying details between systems, chasing follow-ups. This is the work AI is good at.",
    ],
  },
  {
    id: "why-lebanon",
    heading: "Why is AI worth considering in Lebanon specifically?",
    paragraphs: [
      "Lebanese businesses tend to run lean. Teams are small, everyone wears several hats, and the owner is often answering customers personally. In that setting, giving time back is worth more than almost any other improvement.",
      "Customers here also expect fast answers on WhatsApp, at any hour, in whichever language comes naturally. A small team cannot cover that around the clock. A well-built assistant can cover the routine questions and pass the rest to a person.",
      "The country also has strong technical talent and a long tradition of businesses serving the wider region. That makes it a good base for building AI systems that work for Arabic-speaking markets, not just English-speaking ones.",
    ],
  },
  {
    id: "where-ai-helps",
    heading: "Where can Lebanese businesses use AI today?",
    paragraphs: [
      "These are the areas where we see the clearest payoff for small and mid-sized companies.",
    ],
    list: [
      {
        title: "Customer questions on WhatsApp and your website",
        body: "An assistant trained on your products, prices, opening hours and policies answers the questions you get every day, and hands over to a person for anything unusual. Restaurants, clinics, real estate agencies, schools, retailers and service companies all receive the same questions repeatedly.",
      },
      {
        title: "Lead capture and follow-up",
        body: "AI can greet a new enquiry, ask a few qualifying questions, collect contact details and pass a clean summary to your sales team, so no enquiry sits unanswered overnight.",
      },
      {
        title: "Admin and back-office automation",
        body: "Quotes, order confirmations, invoice data entry, appointment reminders and weekly reports can run on their own, with AI handling the parts that used to need a person to read and decide.",
      },
      {
        title: "Internal knowledge search",
        body: "If your team keeps asking each other where a price list, contract or procedure is, an assistant that searches your own documents saves a surprising amount of time.",
      },
      {
        title: "Being found online",
        body: "More people now ask Google and AI assistants to recommend a provider. Clear, well-structured pages and honest answers to common questions help both search engines and AI tools describe your business correctly.",
      },
    ],
  },
  {
    id: "arabic-french-english",
    heading: "Does AI work in Arabic, French and English?",
    paragraphs: [
      "Yes, and this is where local knowledge matters. Customers in Lebanon often switch languages mid-conversation, and many write Arabic in Latin letters, often called Arabizi. A generic tool set up in one language can stumble on this.",
      "A good assistant is tested on real messages from your own customers, in the way they actually write, before it goes live. It should reply in the language the customer used, and it should never guess when it is unsure.",
    ],
  },
  {
    id: "how-to-start",
    heading: "How should a Lebanese business start with AI?",
    paragraphs: [
      "The most common mistake is trying to do everything at once. A better approach is short and practical:",
    ],
    list: [
      {
        title: "1. Find where time is lost",
        body: "List the tasks your team repeats most often, and the questions customers ask most often. The top few are your candidates.",
      },
      {
        title: "2. Pick one workflow",
        body: "Choose the one with the clearest payoff and the lowest risk. A WhatsApp assistant for common questions is a typical first project.",
      },
      {
        title: "3. Use your own information",
        body: "The assistant should answer from your real prices, policies and details, not from general knowledge. This is what keeps it accurate.",
      },
      {
        title: "4. Test the risky parts early",
        body: "Try the awkward questions first: refunds, complaints, prices that changed, requests it should not handle. Decide in advance when it hands over to a person.",
      },
      {
        title: "5. Launch, watch, improve",
        body: "Read real conversations after launch and fix the gaps. The first version is the starting point, not the finish line.",
      },
    ],
  },
  {
    id: "cost",
    heading: "How much does AI cost?",
    paragraphs: [
      "It depends on what you need. A focused assistant or a single automated workflow costs far less than a full custom platform, and most businesses should start with the former. Be wary of anyone who quotes a large package before understanding your business.",
      "Ask what is included, who owns the result, and what the ongoing costs are. Your code, accounts and content should belong to you, and you should always know which tools are being used.",
    ],
  },
  {
    id: "mistakes",
    heading: "What mistakes should you avoid?",
    paragraphs: [],
    list: [
      {
        title: "Letting the AI make things up",
        body: "An assistant that guesses a price or a policy damages trust. Insist that it answers only from your information and says so when it does not know.",
      },
      {
        title: "Removing the human completely",
        body: "Sensitive situations, such as complaints, payments and special cases, should reach a real person quickly.",
      },
      {
        title: "Starting too big",
        body: "Large projects stall. A small win in a few weeks builds confidence and shows you where to go next.",
      },
      {
        title: "Ignoring language and channel",
        body: "A tool that does not handle Arabic, French and English, or does not live on WhatsApp, will not be used by your customers.",
      },
      {
        title: "Being locked in",
        body: "Make sure you own what is built and can move it elsewhere.",
      },
    ],
  },
  {
    id: "next-step",
    heading: "What is the next step?",
    paragraphs: [
      "You do not need a grand AI strategy. You need one problem worth solving and a partner who explains things plainly. If you want to talk it through, Quantex is a Beirut studio that builds AI assistants, automation and custom software for businesses in Lebanon and worldwide. Message us and you will get a reply from the founder within 24 hours.",
    ],
  },
];

export const AI_ARTICLE_FAQ = [
  {
    question: "Is AI useful for small businesses in Lebanon?",
    answer:
      "Yes. Small teams often gain the most, because automating a single repetitive task or answering common questions automatically frees up hours each week.",
  },
  {
    question: "Can an AI chatbot reply on WhatsApp in Arabic?",
    answer:
      "Yes. A well-built assistant can understand and reply in Arabic, French and English, including messages that mix languages or write Arabic in Latin letters.",
  },
  {
    question: "What is the best first AI project for a business?",
    answer:
      "Usually a focused assistant that answers your most common customer questions on WhatsApp or your website, or the automation of one repetitive admin task.",
  },
] as const;

import { CONTACT } from "@/lib/site/contact";

export type FaqItem = {
  question: string;
  answer: string;
};

export const SITE_FAQ: FaqItem[] = [
  {
    question: "What does Quantex AI Solutions do?",
    answer:
      "Quantex AI Solutions is a Beirut-based studio founded in 2024. We engineer technical SEO, Core Web Vitals, and search visibility at the source—alongside custom software, high-converting websites, AI chatbots, business process automation, and system architecture for teams in Lebanon and internationally.",
  },
  {
    question: "Who founded Quantex?",
    answer:
      "The company was founded in 2024 by Abbas Hachem, a full-stack developer. Clients work directly with engineering throughout discovery, build, and launch.",
  },
  {
    question: "What services does Quantex offer?",
    answer:
      "Core modules include custom software development, business process automation, custom system architectures, high-converting websites, SEO, and custom intelligent chatbots integrated with tools like WhatsApp and internal dashboards.",
  },
  {
    question: "How many clients has Quantex worked with?",
    answer:
      "Quantex has partnered with more than ten businesses on projects ranging from AI assistants and marketing sites to bespoke operational applications.",
  },
  {
    question: "How do I contact Quantex AI Solutions?",
    answer:
      `Visit the contact page at quantexai.solutions/contact, email ${CONTACT.email}, or message the team on WhatsApp. Typical first response is within 24 hours.`,
  },
  {
    question: "Where is Quantex based?",
    answer:
      "Quantex AI Solutions is based in Beirut, Lebanon, and works with clients locally and remotely across the Middle East and worldwide.",
  },
  {
    question: "Does Quantex build AI chatbots for WhatsApp?",
    answer:
      "Yes. Quantex builds on-brand AI assistants trained on your documents and policies, with human handoff when needed, including WhatsApp, web chat, and internal tool integrations.",
  },
  {
    question: "What technologies does Quantex use for websites?",
    answer:
      "Marketing and product sites are typically built with Next.js for performance, SEO-ready structure, Core Web Vitals, analytics, and maintainable content workflows.",
  },
];

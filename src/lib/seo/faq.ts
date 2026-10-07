import { CONTACT } from "@/lib/site/contact";

export type FaqItem = {
  question: string;
  answer: string;
};

export const SITE_FAQ: FaqItem[] = [
  {
    question: "What does Quantex do?",
    answer:
      "Quantex is a Beirut studio. We build websites that turn visitors into customers, AI assistants that answer customer questions on your website and WhatsApp, and the custom software, automation and search work behind your business. We work with companies in Lebanon and abroad.",
  },
  {
    question: "Who is behind Quantex?",
    answer:
      "Quantex is led by its founder, Abbas Hachem, a full-stack developer. When you get in touch, you speak directly with him throughout the project.",
  },
  {
    question: "What services does Quantex offer?",
    answer:
      "Six services: websites, AI assistants and chatbots, business automation, custom software, search visibility (SEO), and system design. You can choose one or combine several.",
  },
  {
    question: "How many clients has Quantex worked with?",
    answer:
      "Ten or more paying clients, on projects ranging from AI assistants and business websites to custom software.",
  },
  {
    question: "How do I contact Quantex?",
    answer: `Use the contact page at quantexai.solutions/contact, email ${CONTACT.email}, or message us on WhatsApp. We reply within 24 hours.`,
  },
  {
    question: "Where is Quantex based?",
    answer:
      "Quantex is based in Beirut, Lebanon, and works with clients locally and remotely across the Middle East and worldwide.",
  },
  {
    question: "Can Quantex build a chatbot for WhatsApp?",
    answer:
      "Yes. We build assistants trained on your own information, such as your products, prices and policies. They reply on WhatsApp, your website, or both, and hand the conversation to a real person when needed.",
  },
  {
    question: "Will I own what you build?",
    answer:
      "Yes. Your code, domain, accounts and content are handed over to you. We are partners on the build, not gatekeepers of the result.",
  },
  {
    question: "Which tools and technologies do you use?",
    answer:
      "We pick the right tools for each project instead of forcing every client onto the same setup. You will always know what is being used, and you keep ownership of everything we build.",
  },
];

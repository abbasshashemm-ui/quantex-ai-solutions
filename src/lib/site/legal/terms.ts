import type { LegalSection } from "@/lib/site/legal/privacy-policy";

export const TERMS = {
  path: "/terms",
  title: "Terms of Use",
  lastUpdated: "October 8, 2026",
  intro:
    "These terms cover your use of the Quantex AI Solutions website and its free tools. Project work (websites, assistants, software and so on) is covered by the written quote or agreement we send you for that project.",
  sections: [
    {
      id: "use",
      title: "Using this website",
      paragraphs: [
        "You may use this website for lawful purposes. Please do not try to disrupt it, probe it for weaknesses, scrape it at a harmful rate, or use it to attack other systems.",
      ],
    },
    {
      id: "site-check",
      title: "The free site check",
      paragraphs: [
        "The free site check reads the public home page of the address you enter and reports what it finds. Only enter websites you own or are allowed to test. The check is automated and gives general guidance, not a guarantee of search rankings or AI recommendations. We may limit how often it can be used.",
      ],
    },
    {
      id: "prices",
      title: "Prices and quotes",
      paragraphs: [
        "Prices shown on this website are starting prices in US dollars and are not a binding offer. The price of a project is the one confirmed in our written quote. Third-party costs such as domain renewals, payment-provider fees, advertising spend, and WhatsApp or AI usage fees are not included unless the quote says so.",
      ],
    },
    {
      id: "content",
      title: "Content and guides",
      paragraphs: [
        "The guides and articles are provided for general information. They are not legal, financial or professional advice. Results from search or AI work depend on many factors outside our control.",
        "The text, design and code of this website belong to Quantex AI Solutions unless stated otherwise. You may quote short extracts with a link back to the source.",
      ],
    },
    {
      id: "assistant",
      title: "The on-site chat assistant",
      paragraphs: [
        "The chat assistant is an automated tool. It can make mistakes, so please check important details with us directly. It does not make binding offers; a price or commitment only exists once confirmed in writing.",
      ],
    },
    {
      id: "liability",
      title: "Limits of liability",
      paragraphs: [
        "This website and its tools are provided as they are, without warranties. To the extent the law allows, Quantex AI Solutions is not liable for indirect or consequential loss arising from your use of the website.",
      ],
    },
    {
      id: "changes",
      title: "Changes and contact",
      paragraphs: [
        "We may update these terms; the date above shows the latest version. Questions? Contact us at abbas@quantexai.solutions.",
      ],
    },
  ] satisfies LegalSection[],
} as const;

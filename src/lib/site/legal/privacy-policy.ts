export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: readonly string[];
};

export const PRIVACY_POLICY = {
  path: "/privacy",
  title: "Privacy Policy",
  lastUpdated: "May 26, 2026",
  intro:
    "This Privacy Policy explains how Quantex AI Solutions (“Quantex,” “we,” “us”) collects, uses, and protects personal information when you visit our website or contact us about our services.",
  sections: [
    {
      id: "controller",
      title: "Who we are",
      paragraphs: [
        "Quantex AI Solutions is operated from Beirut, Lebanon. For privacy-related questions or requests, contact us at hello@quantexai.info or through the contact details on this website.",
      ],
    },
    {
      id: "collect",
      title: "Information we collect",
      paragraphs: [
        "We may collect the following information when you interact with us:",
      ],
      list: [
        "Name",
        "Email address",
        "Mobile / phone number (when you provide it)",
        "Project message and any details you choose to include",
        "Service interest and budget range (if selected on our contact form)",
        "Technical data such as browser type, device information, and pages visited (through analytics tools)",
        "Messages you send through our on-site sales chat assistant",
      ],
    },
    {
      id: "how",
      title: "How we collect it",
      paragraphs: [
        "We collect information when you submit our contact form, email us, message us on WhatsApp, use our on-site chat assistant, or otherwise reach out. Our contact form prepares a message that you send through WhatsApp—we do not store form submissions on our own servers.",
        "When you use the chat assistant, your messages are sent to our servers and processed by Google’s Gemini API to generate replies. We do not store full chat transcripts on our own servers in the current version of the site; conversation history exists only in your browser session unless we add logging later (this policy would be updated).",
        "We also receive limited usage data through Vercel Analytics to understand how visitors use the site (for example, page views, referrers, and conversion events such as contact form submissions, chat opens, or WhatsApp button clicks). This helps us improve performance and content.",
      ],
    },
    {
      id: "use",
      title: "How we use your information",
      paragraphs: ["We use personal information to:"],
      list: [
        "Respond to inquiries and provide quotes or project information",
        "Communicate with you about services you asked about",
        "Operate, secure, and improve our website",
        "Comply with legal obligations where applicable",
      ],
    },
    {
      id: "legal-basis",
      title: "Legal basis",
      paragraphs: [
        "Where required by applicable law, we rely on your consent (for example, when you submit the contact form), our legitimate interest in operating our business and responding to leads, and any legal obligations we must meet.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing with third parties",
      paragraphs: [
        "We do not sell your personal information. We may share data only as needed to run our services:",
      ],
      list: [
        "WhatsApp / Meta — when you choose to send us a message through WhatsApp after using our form or chat handoff",
        "Google — processing on-site chat messages via the Gemini API (subject to Google’s terms and privacy practices)",
        "Vercel — website hosting and analytics",
        "Service providers who help us operate email, infrastructure, or professional tools, under confidentiality obligations",
        "Authorities — if required by law or to protect our legal rights",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      paragraphs: [
        "We keep inquiry details only as long as needed to respond, manage a potential project, maintain business records, or meet legal requirements. Messages you send via WhatsApp are also subject to WhatsApp’s own retention practices.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use reasonable technical and organizational measures to protect information. No method of transmission over the internet is completely secure; please avoid sending highly sensitive data unless necessary.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      paragraphs: [
        "Depending on where you live, you may have rights to access, correct, delete, or restrict use of your personal information, or to withdraw consent where processing is based on consent. To exercise these rights, email hello@quantexai.info. We will respond within a reasonable time.",
      ],
    },
    {
      id: "international",
      title: "International transfers",
      paragraphs: [
        "Our service providers may process data outside Lebanon (for example, in the United States or the European Union). Where required, we take steps intended to protect your information in line with applicable law.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Our website and services are not directed at children under 16. We do not knowingly collect personal information from children.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the updated policy.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "Questions about this Privacy Policy or your data: hello@quantexai.info",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

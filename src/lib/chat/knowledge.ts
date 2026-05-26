import { SERVICES } from "@/lib/services/data";
import { SITE_FAQ } from "@/lib/seo/faq";
import { ABOUT_HERO, ABOUT_STORY, FOUNDER } from "@/lib/site/about";
import { BUDGET_RANGES, CONTACT, COMPANY } from "@/lib/site/contact";

const MAX_OVERVIEW_CHARS = 420;
const MAX_CONTEXT_CHARS = 48_000;

function truncateText(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function formatServices(): string {
  return SERVICES.map((service) => {
    const overview = truncateText(service.overview, MAX_OVERVIEW_CHARS);
    return [
      `### ${service.nav.label} (/${service.slug})`,
      `Tagline: ${service.nav.tagline}`,
      `Description: ${service.description}`,
      `Overview: ${overview}`,
    ].join("\n");
  }).join("\n\n");
}

function formatFaq(): string {
  return SITE_FAQ.map(
    (item) => `Q: ${item.question}\nA: ${item.answer}`,
  ).join("\n\n");
}

function formatBudgetRanges(): string {
  return BUDGET_RANGES.filter((range) => range.value)
    .map((range) => `- ${range.label}`)
    .join("\n");
}

function formatStory(): string {
  const paragraphs = ABOUT_STORY.paragraphs
    .map((paragraph) => {
      if (typeof paragraph === "string") return paragraph;
      return `${paragraph.before}${paragraph.highlight}${paragraph.after}`;
    })
    .join("\n\n");

  return `${ABOUT_STORY.title}\n${paragraphs}`;
}

export function buildSiteKnowledge(): string {
  const sections = [
    `# ${COMPANY.name}`,
    COMPANY.tagline,
    "",
    "## About",
    ABOUT_HERO.lead,
    formatStory(),
    `Founder: ${FOUNDER.name} (${FOUNDER.role}, ${FOUNDER.title}, founded 2024).`,
    "",
    "## Services",
    formatServices(),
    "",
    "## FAQ",
    formatFaq(),
    "",
    "## Contact",
    `Email: ${CONTACT.email}`,
    `Phone / WhatsApp: ${CONTACT.phoneDisplay}`,
    `Location: ${CONTACT.location}`,
    `Typical first response: within 24 hours.`,
    "",
    "## Budget ranges (indicative — confirm on WhatsApp)",
    formatBudgetRanges(),
    "Exact pricing depends on scope; the assistant must not invent fixed prices.",
  ];

  const context = sections.join("\n");
  return truncateText(context, MAX_CONTEXT_CHARS);
}

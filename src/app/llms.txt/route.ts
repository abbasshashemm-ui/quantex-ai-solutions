import { getArticleListing, INSIGHTS_PATH } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo/metadata";
import { SERVICES } from "@/lib/services/data";
import { FOUNDER } from "@/lib/site/about";
import { EACML, EACML_PATH } from "@/lib/projects/eacml";
import { LEBANON_PATH } from "@/lib/site/lebanon";
import { COMPANY, CONTACT } from "@/lib/site/contact";

export const dynamic = "force-static";

/**
 * llms.txt, built from the same data as the site so it never drifts.
 * Format: https://llmstxt.org (an H1, a one-line summary, then H2 sections
 * that are lists of Markdown links with a short note each).
 */

const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

function link(label: string, path: string, note?: string): string {
  const text = `- [${oneLine(label)}](${absoluteUrl(path)})`;
  return note ? `${text}: ${oneLine(note)}` : text;
}

function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${COMPANY.name}`,
    "",
    "> Beirut studio that builds websites that win customers, AI assistants that answer them on your website and WhatsApp, and the custom software, automation and search work behind your business.",
    "",
    `Quantex (${COMPANY.name}) works with businesses in Lebanon and worldwide. Founder: ${FOUNDER.name} (${FOUNDER.role}). Location: ${CONTACT.location}. Clients own their code, domain, accounts and content. Replies within 24 hours. Pages are available in English and Arabic.`,
    "",
    `Contact: [${CONTACT.email}](mailto:${CONTACT.email}), [WhatsApp ${CONTACT.phoneDisplay}](${CONTACT.whatsapp}), [LinkedIn](${CONTACT.linkedin}).`,
    "",
    "## Main pages",
    "",
    link("Home", "/", "What Quantex builds and how to get in touch"),
    link("AI solutions", "/ai-solutions", "AI assistants, automation and custom AI software for businesses in Lebanon and worldwide"),
    link("AI solutions in Lebanon", LEBANON_PATH.en, "AI chatbots, automation and custom AI for businesses across Lebanon, with the cities served"),
    link("Pricing", "/pricing", "Starting prices in USD: websites from $700, SEO from $250 a month, AI assistants on subscription; custom work is quoted per project"),
    link("About", "/about", "The studio, its founder and how it works with clients"),
    link(EACML.title, EACML_PATH, EACML.pitch),
    link("Contact", "/contact", "Start a project; replies within 24 hours"),
    "",
    "## Services",
    "",
    ...SERVICES.map((service) =>
      link(service.nav.label, `/services/${service.slug}`, service.description),
    ),
    "",
    "## Guides",
    "",
    link("All guides", INSIGHTS_PATH.en, "Index of AI and search guides"),
    ...getArticleListing("en").map((guide) =>
      link(guide.title, guide.href, guide.description),
    ),
    "",
    "## Arabic pages (العربية)",
    "",
    link("حلول الذكاء الاصطناعي", "/ar/ai-solutions", "AI solutions, Arabic version"),
    link("حلول الذكاء الاصطناعي في لبنان", LEBANON_PATH.ar, "AI solutions in Lebanon, Arabic version"),
    link("كل الأدلة", INSIGHTS_PATH.ar, "Index of the Arabic guides"),
    ...getArticleListing("ar").map((guide) =>
      link(guide.title, guide.href, guide.description),
    ),
    "",
    "## Optional",
    "",
    link("Privacy policy", "/privacy"),
    link("Sitemap", "/sitemap.xml", "Every public page"),
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import { absoluteUrl } from "@/lib/seo/metadata";
import { COMPANY, CONTACT } from "@/lib/site/contact";

export const dynamic = "force-static";

/**
 * ai.txt: an explicit policy for AI crawlers, kept in step with robots.ts
 * (all AI crawlers may read the public site; /api/ is off limits).
 */

function buildAiTxt(): string {
  return [
    `# ai.txt for ${COMPANY.name}`,
    "# Policy for AI crawlers and assistants. Mirrors robots.txt.",
    "",
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    "# AI search, answering and training crawlers are welcome to use public pages,",
    "# with attribution and a link back to the source page.",
    "",
    `Contact: ${CONTACT.email}`,
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `LLMs: ${absoluteUrl("/llms.txt")}`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildAiTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import { getArticleListing, getArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo/metadata";
import { AI_ARTICLE } from "@/lib/site/ai-in-lebanon";
import { COMPANY } from "@/lib/site/contact";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const dates = new Map<string, string>();
  dates.set("ai-in-lebanon", AI_ARTICLE.datePublished);
  for (const a of getArticles("en")) dates.set(a.slug, a.datePublished);

  const items = getArticleListing("en")
    .map((g) => {
      const date = new Date(`${dates.get(g.slug) ?? "2026-10-07"}T08:00:00Z`);
      return `    <item>
      <title>${esc(g.title)}</title>
      <link>${absoluteUrl(g.href)}</link>
      <guid isPermaLink="true">${absoluteUrl(g.href)}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description>${esc(g.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(COMPANY.name)}: AI and search guides</title>
    <link>${absoluteUrl("/insights")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Plain-language guides on using AI in your business and getting found on Google and in AI search.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

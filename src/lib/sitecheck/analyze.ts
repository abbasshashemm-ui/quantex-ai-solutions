import { safeFetchText, type FetchedPage } from "@/lib/sitecheck/safe-fetch";
import type {
  CheckGroup,
  CheckResult,
  CheckStatus,
  SiteCheckReport,
} from "@/lib/sitecheck/types";

const AI_BOTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "OAI-SearchBot"];

type Tag = Record<string, string>;

function attrs(tag: string): Tag {
  const out: Tag = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    out[m[1].toLowerCase()] = (m[3] ?? m[4] ?? m[5] ?? "").trim();
  }
  return out;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function parseRobots(text: string): Map<string, string[]> {
  // agent (lowercase) -> list of Disallow values
  const rules = new Map<string, string[]>();
  let agents: string[] = [];
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-zA-Z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!lastWasAgent) agents = [];
      agents.push(value.toLowerCase());
      for (const a of agents) if (!rules.has(a)) rules.set(a, []);
      lastWasAgent = true;
    } else {
      if (key === "disallow") for (const a of agents) rules.get(a)?.push(value);
      lastWasAgent = false;
    }
  }
  return rules;
}

function blockedBots(robots: string): string[] {
  const rules = parseRobots(robots);
  const star = rules.get("*") ?? [];
  return AI_BOTS.filter((bot) => {
    const own = rules.get(bot.toLowerCase());
    return (own ?? star).includes("/");
  });
}

function check(
  id: string,
  group: CheckGroup,
  label: string,
  status: CheckStatus,
  detail: string,
  fix?: string,
): CheckResult {
  return { id, group, label, status, detail, ...(status !== "pass" && fix ? { fix } : {}) };
}

async function tryFetch(url: URL): Promise<FetchedPage | null> {
  try {
    return await safeFetchText(url, { accept: "text/plain,text/xml,*/*" });
  } catch {
    return null;
  }
}

function schemaTypes(html: string): string[] {
  const types = new Set<string>();
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (node: unknown): void => {
        if (Array.isArray(node)) return node.forEach(walk);
        if (node && typeof node === "object") {
          const obj = node as Record<string, unknown>;
          const t = obj["@type"];
          if (typeof t === "string") types.add(t);
          else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
          Object.values(obj).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch {
      /* ignore invalid JSON-LD */
    }
  }
  return [...types];
}

export async function analyzeSite(start: URL): Promise<SiteCheckReport> {
  const page = await safeFetchText(start);
  const finalUrl = new URL(page.url);
  const html = page.text;
  const origin = finalUrl.origin;

  const [robotsRes, llmsRes, sitemapRes] = await Promise.all([
    tryFetch(new URL("/robots.txt", origin)),
    tryFetch(new URL("/llms.txt", origin)),
    tryFetch(new URL("/sitemap.xml", origin)),
  ]);

  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? html.slice(0, 60_000);
  const title = decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const metaBy = (name: string) =>
    metas.find((m) => m.name?.toLowerCase() === name || m.property?.toLowerCase() === name)
      ?.content ?? "";
  const description = decode(metaBy("description"));
  const robotsMeta = metaBy("robots").toLowerCase();
  const canonical = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => attrs(m[0]))
    .find((l) => l.rel?.toLowerCase() === "canonical")?.href;
  const viewport = metaBy("viewport");
  const lang = html.match(/<html\b[^>]*>/i)?.[0].match(/\blang\s*=\s*["']?([a-zA-Z-]+)/i)?.[1];
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const missingAlt = imgs.filter((i) => i.alt === undefined || i.alt === "").length;
  const bodyText = decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
  const words = bodyText ? bodyText.split(" ").length : 0;
  const types = schemaTypes(html);
  const og = metaBy("og:title") && metaBy("og:description");
  const xRobots = (page.headers.get("x-robots-tag") ?? "").toLowerCase();
  const noindex = robotsMeta.includes("noindex") || xRobots.includes("noindex");

  const checks: CheckResult[] = [];

  // --- Search basics
  checks.push(
    check("indexable", "search", "Allowed to appear in search", noindex ? "fail" : "pass",
      noindex ? "The page tells search engines not to index it." : "Search engines are allowed to index this page.",
      "Remove the noindex tag or header so Google can list the page."),
  );
  checks.push(
    title.length === 0
      ? check("title", "search", "Page title", "fail", "No title found.", "Add a clear title with your service and city, about 30 to 60 characters.")
      : check("title", "search", "Page title", title.length >= 20 && title.length <= 65 ? "pass" : "warn",
          `“${title.slice(0, 80)}” (${title.length} characters)`,
          "Aim for about 30 to 60 characters, naming what you do and where."),
  );
  checks.push(
    description.length === 0
      ? check("description", "search", "Search description", "fail", "No meta description found.", "Write a 70 to 160 character summary that makes people want to click.")
      : check("description", "search", "Search description", description.length >= 70 && description.length <= 170 ? "pass" : "warn",
          `${description.length} characters`,
          "Aim for 70 to 160 characters that say what you offer and why to choose you."),
  );
  checks.push(
    check("h1", "search", "Main heading", h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warn",
      h1Count === 1 ? "One main heading, as it should be." : `${h1Count} main headings found.`,
      "Use exactly one H1 that states what the page is about."),
  );
  checks.push(
    check("content", "search", "Enough readable text", words >= 300 ? "pass" : words >= 120 ? "warn" : "fail",
      `About ${words} words of text on the page.`,
      "Add clear, useful text about your services, prices, location and answers to common questions. Pages with very little text rarely rank."),
  );
  checks.push(
    check("canonical", "search", "Canonical link", canonical ? "pass" : "warn",
      canonical ? "Set." : "Not found.",
      "Add a canonical link so Google knows the one true address of the page."),
  );
  checks.push(
    check("sitemap", "search", "Sitemap", sitemapRes && sitemapRes.status === 200 && /<urlset|<sitemapindex/i.test(sitemapRes.text) ? "pass" : "warn",
      sitemapRes && sitemapRes.status === 200 ? "A sitemap was found." : "No sitemap found at /sitemap.xml.",
      "Publish a sitemap.xml and submit it in Google Search Console."),
  );

  // --- AI search
  const robotsOk = robotsRes && robotsRes.status === 200;
  const blocked = robotsOk ? blockedBots(robotsRes.text) : [];
  checks.push(
    check("ai-bots", "ai", "AI crawlers allowed", blocked.length ? "fail" : "pass",
      blocked.length ? `robots.txt blocks: ${blocked.join(", ")}.` : robotsOk ? "ChatGPT, Claude, Perplexity and Google AI crawlers are not blocked." : "No robots.txt, so nothing is blocked.",
      "Allow GPTBot, ClaudeBot, PerplexityBot and Google-Extended in robots.txt. If they cannot read your site, AI assistants cannot recommend you."),
  );
  checks.push(
    check("llms", "ai", "llms.txt for AI assistants", llmsRes && llmsRes.status === 200 && llmsRes.text.trim().startsWith("#") ? "pass" : "warn",
      llmsRes && llmsRes.status === 200 ? "Found." : "Not found.",
      "Add an llms.txt file: a short, clean map of your business and key pages written for AI assistants."),
  );
  const hasBusiness = types.some((t) => /Organization|LocalBusiness|ProfessionalService|Store|Restaurant/i.test(t));
  checks.push(
    check("schema", "ai", "Structured data (schema)", types.length === 0 ? "fail" : hasBusiness ? "pass" : "warn",
      types.length ? `Found: ${types.slice(0, 6).join(", ")}.` : "No structured data found.",
      "Add Organization or LocalBusiness schema with your name, address, phone and services, so search and AI can state facts about you correctly."),
  );
  checks.push(
    check("faq", "ai", "Questions and answers", types.includes("FAQPage") || /<details\b/i.test(html) ? "pass" : "warn",
      types.includes("FAQPage") ? "FAQ markup found." : "No FAQ content or markup found.",
      "Add a short FAQ answering what customers actually ask. AI assistants quote clear question-and-answer content."),
  );

  // --- Trust and basics
  checks.push(
    check("https", "trust", "Secure connection (HTTPS)", finalUrl.protocol === "https:" ? "pass" : "fail",
      finalUrl.protocol === "https:" ? "The site uses HTTPS." : "The site loads over plain http.",
      "Install an SSL certificate and redirect all pages to https."),
  );
  checks.push(
    check("mobile", "trust", "Mobile-ready", viewport.includes("width=device-width") ? "pass" : "fail",
      viewport ? "Mobile viewport is set." : "No mobile viewport tag.",
      "Add the viewport meta tag and a mobile-friendly layout. Most of your customers are on phones."),
  );
  checks.push(
    check("lang", "trust", "Language declared", lang ? "pass" : "warn",
      lang ? `Language: ${lang}.` : "No language set on the page.",
      "Set the page language (for example en or ar) so search engines serve it to the right people."),
  );
  checks.push(
    check("alt", "trust", "Image descriptions", imgs.length === 0 || missingAlt === 0 ? "pass" : missingAlt / imgs.length > 0.5 ? "fail" : "warn",
      imgs.length === 0 ? "No images found." : `${missingAlt} of ${imgs.length} images have no description.`,
      "Describe each meaningful image in its alt text. It helps accessibility and image search."),
  );
  checks.push(
    check("social", "trust", "Link previews (Open Graph)", og ? "pass" : "warn",
      og ? "Set." : "Missing, so shared links look bare.",
      "Add Open Graph title, description and image so links look good on WhatsApp, LinkedIn and Facebook."),
  );

  const points = (s: CheckStatus) => (s === "pass" ? 1 : s === "warn" ? 0.5 : 0);
  const score = (items: CheckResult[]) =>
    items.length ? Math.round((items.reduce((n, c) => n + points(c.status), 0) / items.length) * 100) : 0;
  const by = (g: CheckGroup) => checks.filter((c) => c.group === g);

  return {
    url: start.toString(),
    finalUrl: finalUrl.toString(),
    score: score(checks),
    groups: { search: score(by("search")), ai: score(by("ai")), trust: score(by("trust")) },
    checks,
  };
}

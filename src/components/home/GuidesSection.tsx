import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { articlePath, getArticleListing, INSIGHTS_PATH } from "@/lib/articles";
import { AI_ARTICLE_PATH } from "@/lib/site/ai-in-lebanon";

// Shown in this order; AI search first, then the general guide and industries.
const FEATURED = [
  articlePath("en", "get-recommended-by-chatgpt-and-ai-search"),
  articlePath("en", "seo-aeo-geo-explained"),
  AI_ARTICLE_PATH,
  articlePath("en", "ai-for-restaurants-lebanon"),
  articlePath("en", "ai-for-clinics-lebanon"),
  articlePath("en", "ai-for-real-estate-lebanon"),
];

export function GuidesSection() {
  const all = getArticleListing("en");
  const guides = FEATURED.flatMap((href) => all.filter((g) => g.href === href));

  return (
    <section
      id="guides"
      className="alu-section"
      aria-labelledby="guides-heading"
    >
      <div className="alu-section__inner">
        <div data-reveal>
          <PageEyebrow>Guides</PageEyebrow>
          <h2 id="guides-heading" className="alu-display alu-section__title">
            AI and search guides
          </h2>
          <p className="alu-lede max-w-2xl">
            Plain-language guides on using AI in your business and getting found
            on Google and in AI search like ChatGPT, Gemini and Perplexity.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.href} data-reveal>
              <Link
                href={guide.href}
                data-interactive
                className="alu-glass page-panel flex h-full flex-col"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {guide.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-foreground/80">
                  {guide.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-foreground underline underline-offset-4">
                  Read the guide
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href={INSIGHTS_PATH.en}
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            All guides
          </Link>
          <Link
            href={INSIGHTS_PATH.ar}
            hrefLang="ar"
            lang="ar"
            dir="rtl"
            data-interactive
            className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
          >
            الأدلة بالعربية
          </Link>
        </p>
      </div>
    </section>
  );
}

import { HomePage } from "@/components/pages/HomePage";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildFaqPageSchema } from "@/lib/seo/json-ld";
import { SITE } from "@/lib/seo/site";

export const metadata = createPageMetadata({
  title: SITE.name,
  description:
    "Crawl. Index. Rank. QUANTEX engineers technical SEO, Core Web Vitals, and search visibility—plus software, sites, and automation built at the source.",
  path: "/",
  keywords: [
    "technical SEO Lebanon",
    "Core Web Vitals",
    "search visibility audit",
    "QUANTEX",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema()} />
      <HomePage />
      <FaqSection />
    </>
  );
}

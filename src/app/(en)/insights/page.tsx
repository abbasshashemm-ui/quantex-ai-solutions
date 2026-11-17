import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { InsightsIndex } from "@/components/sections/InsightsIndex";
import { createPageMetadata, absoluteUrl } from "@/lib/seo/metadata";
import { getArticleListing } from "@/lib/articles";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Guides: AI and Search for Businesses in Lebanon",
  description:
    "All Quantex guides in one place: using AI in your business, guides for restaurants, clinics and real estate in Lebanon, and how to be found on Google and in AI search like ChatGPT.",
  path: "/insights",
  languages: {
    en: absoluteUrl("/insights"),
    ar: absoluteUrl("/ar/insights"),
    "x-default": absoluteUrl("/insights"),
  },
  keywords: ["AI guides Lebanon", "AI for business Lebanon"],
});

export default function InsightsPage() {
  const guides = getArticleListing("en");
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/insights")}#page`,
            url: absoluteUrl("/insights"),
            name: "Guides",
            inLanguage: "en",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: guides.length,
              itemListElement: guides.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: guide.title,
                url: absoluteUrl(guide.href),
              })),
            },
          },
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/insights" },
          ]),
        ]}
      />
      <InsightsIndex lang="en" />
    </>
  );
}

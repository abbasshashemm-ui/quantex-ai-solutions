import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { InsightsIndex } from "@/components/sections/InsightsIndex";
import { createPageMetadata, absoluteUrl } from "@/lib/seo/metadata";
import { getArticleListing } from "@/lib/articles";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "الأدلة: الذكاء الاصطناعي والبحث للشركات في لبنان",
  description:
    "كل أدلة كوانتكس في مكان واحد: استخدام الذكاء الاصطناعي في عملك، وأدلة للمطاعم والعيادات والعقارات في لبنان، وكيف تظهر في غوغل وفي البحث بالذكاء الاصطناعي مثل ChatGPT.",
  path: "/ar/insights",
  locale: "ar_LB",
  languages: {
    en: absoluteUrl("/insights"),
    ar: absoluteUrl("/ar/insights"),
    "x-default": absoluteUrl("/insights"),
  },
  keywords: ["أدلة الذكاء الاصطناعي لبنان", "الذكاء الاصطناعي للشركات"],
});

export default function InsightsPageAr() {
  const guides = getArticleListing("ar");
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/ar/insights")}#page`,
            url: absoluteUrl("/ar/insights"),
            name: "الأدلة",
            inLanguage: "ar",
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
            { name: "الرئيسية", path: "/" },
            { name: "الأدلة", path: "/ar/insights" },
          ]),
        ]}
      />
      <InsightsIndex lang="ar" />
    </>
  );
}

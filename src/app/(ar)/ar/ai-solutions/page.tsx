import type { Metadata } from "next";
import { AiSolutionsPageContentAr } from "@/components/sections/AiSolutionsPageContentAr";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site";
import { AI_SOLUTIONS_PATH } from "@/lib/site/ai-solutions";
import {
  AI_SOLUTIONS_AR_PATH,
  AR_ANSWER,
  AR_FAQ,
} from "@/lib/site/ai-solutions-ar";

export const dynamic = "force-static";

const TITLE = "حلول الذكاء الاصطناعي في لبنان والعالم";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description:
    "حلول الذكاء الاصطناعي للأعمال: روبوتات دردشة ذكية ومساعدون على واتساب وأتمتة وأنظمة مخصصة. تبنيها كوانتكس في بيروت للشركات في لبنان والعالم.",
  path: AI_SOLUTIONS_AR_PATH,
  locale: "ar_LB",
  languages: {
    en: absoluteUrl(AI_SOLUTIONS_PATH),
    ar: absoluteUrl(AI_SOLUTIONS_AR_PATH),
    "x-default": absoluteUrl(AI_SOLUTIONS_PATH),
  },
  keywords: [
    "حلول الذكاء الاصطناعي",
    "الذكاء الاصطناعي في لبنان",
    "حلول ذكاء اصطناعي لبنان",
    "شركة ذكاء اصطناعي بيروت",
    "روبوت دردشة لبنان",
    "أتمتة الأعمال لبنان",
    "الذكاء الاصطناعي للشركات",
  ],
});

export default function AiSolutionsArPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${absoluteUrl(AI_SOLUTIONS_AR_PATH)}#webpage`,
            url: absoluteUrl(AI_SOLUTIONS_AR_PATH),
            name: TITLE,
            description: AR_ANSWER.answer,
            inLanguage: "ar",
            isPartOf: { "@id": `${getSiteUrl()}/#website` },
            about: { "@id": `${getSiteUrl()}/#organization` },
            translationOfWork: { "@id": `${absoluteUrl(AI_SOLUTIONS_PATH)}#webpage` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-answer", ".faq-section"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${absoluteUrl(AI_SOLUTIONS_AR_PATH)}#service`,
            name: "حلول الذكاء الاصطناعي للأعمال",
            serviceType: "حلول الذكاء الاصطناعي",
            description: AR_ANSWER.answer,
            url: absoluteUrl(AI_SOLUTIONS_AR_PATH),
            provider: { "@id": `${getSiteUrl()}/#organization` },
            areaServed: [
              { "@type": "Country", name: "Lebanon" },
              "Middle East",
              "Worldwide",
            ],
          },
          buildFaqPageSchema(AR_FAQ),
          buildBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "حلول الذكاء الاصطناعي", path: AI_SOLUTIONS_AR_PATH },
          ]),
        ]}
      />
      <AiSolutionsPageContentAr />
    </>
  );
}

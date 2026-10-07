import type { Metadata } from "next";
import { AiSolutionsPageContent } from "@/components/sections/AiSolutionsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, absoluteUrl } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
} from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site";
import { AI_SOLUTIONS_AR_PATH } from "@/lib/site/ai-solutions-ar";
import {
  AI_SOLUTIONS_ANSWER,
  AI_SOLUTIONS_FAQ,
  AI_SOLUTIONS_PATH,
} from "@/lib/site/ai-solutions";

export const dynamic = "force-static";

const TITLE = "AI Solutions in Lebanon & Worldwide";

export const metadata: Metadata = createPageMetadata({
  title: TITLE,
  description:
    "AI solutions for business: AI chatbots, WhatsApp assistants, automation and custom AI systems. Built by Quantex in Beirut for companies in Lebanon and worldwide.",
  path: AI_SOLUTIONS_PATH,
  languages: {
    en: absoluteUrl(AI_SOLUTIONS_PATH),
    ar: absoluteUrl(AI_SOLUTIONS_AR_PATH),
    "x-default": absoluteUrl(AI_SOLUTIONS_PATH),
  },
  keywords: [
    "AI solutions",
    "AI solutions Lebanon",
    "AI systems",
    "AI Lebanon",
    "AI company Beirut",
    "AI chatbot Lebanon",
    "AI automation Lebanon",
    "artificial intelligence Lebanon",
    "AI for business",
  ],
});

export default function AiSolutionsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${absoluteUrl(AI_SOLUTIONS_PATH)}#webpage`,
            url: absoluteUrl(AI_SOLUTIONS_PATH),
            name: TITLE,
            description: AI_SOLUTIONS_ANSWER.answer,
            isPartOf: { "@id": `${getSiteUrl()}/#website` },
            about: { "@id": `${getSiteUrl()}/#organization` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".aeo-answer", ".faq-section"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${absoluteUrl(AI_SOLUTIONS_PATH)}#service`,
            name: "AI solutions for business",
            serviceType: "Artificial intelligence solutions",
            description: AI_SOLUTIONS_ANSWER.answer,
            url: absoluteUrl(AI_SOLUTIONS_PATH),
            provider: { "@id": `${getSiteUrl()}/#organization` },
            areaServed: [
              { "@type": "Country", name: "Lebanon" },
              "Middle East",
              "Worldwide",
            ],
          },
          buildFaqPageSchema(AI_SOLUTIONS_FAQ),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Solutions", path: AI_SOLUTIONS_PATH },
          ]),
        ]}
      />
      <AiSolutionsPageContent />
    </>
  );
}

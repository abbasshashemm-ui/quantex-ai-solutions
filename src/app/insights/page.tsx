import type { Metadata } from "next";
import { InsightsIndex } from "@/components/sections/InsightsIndex";
import { createPageMetadata, absoluteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "AI Guides for Businesses in Lebanon",
  description:
    "Practical guides on using AI in Lebanese businesses: restaurants, clinics, real estate and more. Written by the Quantex team in Beirut.",
  path: "/insights",
  languages: {
    en: absoluteUrl("/insights"),
    ar: absoluteUrl("/ar/insights"),
    "x-default": absoluteUrl("/insights"),
  },
  keywords: ["AI guides Lebanon", "AI for business Lebanon"],
});

export default function InsightsPage() {
  return <InsightsIndex lang="en" />;
}

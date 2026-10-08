import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildPersonSchema,
} from "@/lib/seo/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Quantex is a Beirut studio led by its founder, Abbas Hachem. We build websites, AI assistants, custom software and automation for 10+ paying clients across Lebanon and the region.",
  path: "/about",
  languages: {
    en: absoluteUrl("/about"),
    ar: absoluteUrl("/ar/about"),
    fr: absoluteUrl("/fr/about"),
    "x-default": absoluteUrl("/about"),
  },
  keywords: ["Abbas Hachem", "Quantex founder", "web studio Beirut"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          buildPersonSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <AboutPageContent />
    </>
  );
}

import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildPersonSchema,
} from "@/lib/seo/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Quantex is a Beirut studio founded in 2024 by Abbas Hachem. We build websites, AI assistants, custom software and automation for 10+ paying clients across Lebanon and the region.",
  path: "/about",
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

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
    "Beirut-based studio founded in 2024 by full-stack developer Abbas Hachem. Quantex AI Solutions is an AI studio that builds AI assistants, automation, and search-ready websites and software for 10+ businesses.",
  path: "/about",
  keywords: ["Abbas Hachem", "Quantex founder", "technical SEO Beirut"],
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

import type { Metadata } from "next";
import { AboutPageShell } from "@/components/layout/AboutPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Beirut-based studio founded in 2024 by full-stack developer Abbas Hachem. QUANTEX engineers technical SEO, search visibility, software, and automation for 10+ businesses.",
  path: "/about",
  keywords: ["Abbas Hachem", "QUANTEX founder", "technical SEO Beirut"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPageShell />
    </>
  );
}

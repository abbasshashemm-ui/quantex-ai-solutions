import type { Metadata } from "next";
import { AboutPageShell } from "@/components/layout/AboutPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Beirut-based studio founded in 2024 by full-stack developer Abbas Hachem. Quantex ships AI chatbots, custom apps, web development, and automation for 10+ businesses.",
  path: "/about",
  keywords: ["Abbas Hachem", "Quantex founder", "software studio Beirut"],
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

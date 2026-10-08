import type { Metadata } from "next";
import Link from "next/link";
import { SiteCheckTool } from "@/components/sections/SiteCheckTool";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/json-ld";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Free website visibility check: Google and AI search",
  description:
    "Free check of how visible your website is on Google and to AI assistants like ChatGPT: titles, schema, llms.txt, AI crawler access and mobile speed, with a plain-words fix list.",
  path: "/site-check",
  keywords: ["free SEO check", "website visibility checker", "AI search readiness"],
});

export default function SiteCheckPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Free site check", path: "/site-check" },
          ]),
        ]}
      />
      <article id="site-check-page" className="page-shell min-h-[100dvh]">
        <div className="page-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/" data-interactive className="page-back">
            ← Home
          </Link>
          <header className="mt-8 sm:mt-10">
            <PageEyebrow>Free tool</PageEyebrow>
            <h1 className="alu-display page-title page-title--sm mt-4">
              Can customers and AI find your website?
            </h1>
            <p className="alu-lede max-w-2xl">
              Enter your address. In about 20 seconds you get a score, what is
              holding you back on Google and AI search, and how to fix each
              item. Free, no sign-up.
            </p>
          </header>
          <div className="mt-10">
            <SiteCheckTool />
          </div>
        </div>
      </article>
    </>
  );
}

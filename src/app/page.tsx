import { HomePage } from "@/components/pages/HomePage";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildFaqPageSchema } from "@/lib/seo/json-ld";
import { SITE } from "@/lib/seo/site";

export const metadata = createPageMetadata({
  title: SITE.name,
  description:
    "Custom software, AI chatbots, high-converting websites, and automation—built in Beirut by Quantex AI Solutions for businesses that need production-ready delivery.",
  path: "/",
  keywords: [
    "AI solutions Lebanon",
    "custom software Beirut",
    "WhatsApp chatbot development",
    "Next.js web agency",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema()} />
      <HomePage />
      <FaqSection />
    </>
  );
}

import { HomePage } from "@/components/pages/HomePage";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildFaqPageSchema } from "@/lib/seo/json-ld";
import { SITE } from "@/lib/seo/site";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: SITE.name,
  description:
    "Web. Chatbots. Ship. Quantex AI Solutions builds high-converting websites and on-brand AI chatbots—plus software and automation that ship.",
  path: "/",
  keywords: [
    "web development Lebanon",
    "AI chatbots Beirut",
    "Next.js websites",
    "Quantex AI Solutions",
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

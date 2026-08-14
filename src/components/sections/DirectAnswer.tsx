import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

const PILLARS = [
  {
    href: "/services/high-converting-websites",
    label: "High-converting websites",
  },
  {
    href: "/services/custom-intelligent-chatbots",
    label: "Intelligent chatbots",
  },
  { href: "/services/seo", label: "SEO" },
  { href: "/about", label: "About the studio" },
  { href: "/contact", label: "Start a project" },
] as const;

export function DirectAnswer() {
  return (
    <section
      className="aeo-block relative border-t border-white/8 px-4 py-14 sm:px-6 sm:py-16"
      aria-labelledby="aeo-heading"
    >
      <div className="mx-auto max-w-3xl">
        <PageEyebrow>Direct answer</PageEyebrow>
        <h2 id="aeo-heading" className="section-heading mt-3 text-metallic-gradient">
          What does Quantex AI Solutions build?
        </h2>
        <div className="aeo-answer mt-5 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
          <p>
            Quantex AI Solutions is a Beirut studio founded in 2024. We build
            high-converting websites and on-brand AI chatbots, plus custom
            software, automation, and technical SEO.
          </p>
          <p>
            Marketing sites ship on Next.js and Vercel, tuned for Core Web
            Vitals and measured in Google Search Console. Assistants are
            grounded with Gemini on your documents and policies, then deployed
            on the website or WhatsApp with a human handoff when the answer
            needs a person.
          </p>
          <p>
            You work with the engineers writing the code—not a layer of
            coordinators.
          </p>
        </div>
        <ul className="aeo-pillars mt-6 flex flex-wrap gap-2">
          {PILLARS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-interactive
                className="inline-flex min-h-11 items-center rounded-full border border-white/12 bg-surface px-4 text-sm text-foreground/85 transition-colors hover:border-white/30 hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/contact" data-interactive className="btn-primary">
            Send a brief
          </Link>
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { MACHINES } from "@/lib/site/machines";

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

const readout = MACHINES.readout;

export function DirectAnswer() {
  return (
    <section
      className="instrument-split"
      aria-labelledby="aeo-heading"
    >
      <div className="instrument-split__copy">
        <PageEyebrow>Direct answer</PageEyebrow>
        <h2 id="aeo-heading" className="section-heading mt-3">
          What does Quantex AI Solutions build?
        </h2>
        <div className="mt-5 max-w-xl space-y-4 text-sm leading-relaxed sm:text-base">
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
          <p>You work with the engineers writing the code.</p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {PILLARS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-interactive
                className="instrument-pill"
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
      <div className="instrument-split__media">
        <Image
          src={readout.src}
          alt={readout.alt}
          fill
          quality={90}
          sizes="(max-width: 900px) 100vw, 40vw"
          className="poster__photo"
        />
      </div>
    </section>
  );
}

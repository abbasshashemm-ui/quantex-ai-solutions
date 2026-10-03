import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

const PILLARS = [
  { href: "/services/high-converting-websites", label: "Websites" },
  { href: "/services/custom-intelligent-chatbots", label: "AI assistants" },
  { href: "/services/seo", label: "SEO" },
  { href: "/about", label: "About Quantex" },
] as const;

/** A plain, quotable answer to "what does Quantex do?" for readers and search tools. */
export function AeoBlock() {
  return (
    <section className="aeo-block alu-section" aria-labelledby="aeo-heading">
      <div className="alu-section__inner alu-split alu-split--top">
        <div>
          <PageEyebrow>The studio</PageEyebrow>
          <h2 id="aeo-heading" className="alu-display alu-section__title">
            What does Quantex do?
          </h2>
        </div>
        <div>
          <div className="aeo-answer space-y-4 text-base leading-[1.75] text-foreground/85 sm:text-[1.0625rem]">
            <p>
              Quantex is a Beirut studio founded in 2024. We build websites that
              turn visitors into customers, and AI assistants that answer
              customer questions on your website and WhatsApp—plus the custom
              software, automation and search work behind your business.
            </p>
            <p>
              Assistants are trained on your own information, such as your
              products, prices and policies, and they hand the conversation to a
              real person whenever one is needed. Websites are fast, clear and
              easy to find on Google.
            </p>
            <p>
              We use the right tools for each project, you own everything we
              build, and you work directly with the person leading the work.
            </p>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2">
            {PILLARS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-interactive
                  className="alu-chip alu-chip--link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

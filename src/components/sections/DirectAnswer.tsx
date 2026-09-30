import Link from "next/link";

const PILLARS = [
  { href: "/services/high-converting-websites", label: "Websites" },
  { href: "/services/custom-intelligent-chatbots", label: "Chatbots" },
  { href: "/services/seo", label: "SEO" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function DirectAnswer() {
  return (
    <section className="spec-band" aria-labelledby="aeo-heading">
      <div className="spec-band__inner spec-prose">
        <h2 id="aeo-heading">What does Quantex AI Solutions build?</h2>
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
        <ul className="spec-links">
          {PILLARS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} data-interactive>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
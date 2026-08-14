import Link from "next/link";

const ITEMS = [
  { label: "Websites", href: "/services/high-converting-websites" },
  { label: "AI chatbots", href: "/services/custom-intelligent-chatbots" },
  { label: "Custom software", href: "/services/custom-software-development" },
  { label: "Automation", href: "/services/business-process-automation" },
  { label: "Technical SEO", href: "/services/seo" },
  { label: "System architecture", href: "/services/custom-system-architectures" },
] as const;

export function CapabilityMarquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="capability-marquee">
      <div className="capability-marquee__track">
        {loop.map((item, index) => (
          <Link
            key={`${item.href}-${index}`}
            href={item.href}
            className="capability-marquee__item"
            data-interactive
          >
            {item.label}
            <span className="capability-marquee__dot" />
          </Link>
        ))}
      </div>
    </div>
  );
}

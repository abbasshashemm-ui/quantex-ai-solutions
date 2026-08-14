const ITEMS = [
  "Websites",
  "AI chatbots",
  "Custom software",
  "Automation",
  "Technical SEO",
  "Core Web Vitals",
] as const;

export function CapabilityMarquee() {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="capability-marquee" aria-hidden>
      <div className="capability-marquee__track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="capability-marquee__item">
            {item}
            <span className="capability-marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

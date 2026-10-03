const ITEMS = [
  "Websites",
  "AI assistants",
  "Automation",
  "Custom software",
  "SEO",
  "System design",
] as const;

/** Decorative service ticker. The same services are listed in full below. */
export function Ticker() {
  return (
    <div className="alu-ticker" aria-hidden>
      <div className="alu-ticker__track">
        {[0, 1].map((group) => (
          <div key={group} className="alu-ticker__group">
            {ITEMS.map((item) => (
              <span key={item} className="alu-ticker__item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { ABOUT_STATS } from "@/lib/site/about";

export function StatBand() {
  return (
    <section
      className="alu-section alu-section--tight"
      aria-label="Quantex at a glance"
    >
      <dl className="alu-section__inner alu-stats">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label} className="alu-stat alu-glass" data-reveal>
            <dd className="alu-stat__value">{stat.value}</dd>
            <dt className="alu-stat__label">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

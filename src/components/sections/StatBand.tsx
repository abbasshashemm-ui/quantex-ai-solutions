import { ABOUT_STATS } from "@/lib/site/about";

/** Three figures, set as large as the page allows. */
export function StatBand() {
  return (
    <section className="alu-section stat-wall" aria-label="Quantex at a glance">
      <dl className="alu-section__inner stat-wall__row">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label} className="stat-wall__item" data-reveal>
            <dd className="stat-wall__value">{stat.value}</dd>
            <dt className="stat-wall__label">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

import { ABOUT_STATS } from "@/lib/site/about";

/** Three figures, set as large as the page allows. */
export function StatBand({
  stats = ABOUT_STATS,
  label = "Quantex at a glance",
}: {
  stats?: readonly { value: string; label: string }[];
  label?: string;
}) {
  return (
    <section className="alu-section stat-wall" aria-label={label}>
      <dl className="alu-section__inner stat-wall__row">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-wall__item" data-reveal>
            <dd className="stat-wall__value" dir="ltr">
              {stat.value}
            </dd>
            <dt className="stat-wall__label">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

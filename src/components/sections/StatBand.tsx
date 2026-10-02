import { ABOUT_STATS } from "@/lib/site/about";

export function StatBand() {
  return (
    <section
      className="stat-band relative border-y border-white/8 px-4 py-14 sm:px-6 sm:py-16"
      aria-label="Quantex at a glance"
    >
      <dl className="stat-band__grid mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label} className="stat-band__item" data-reveal>
            <dd className="stat-band__value">{stat.value}</dd>
            <dt className="stat-band__label">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

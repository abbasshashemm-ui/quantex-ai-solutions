import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import type { PriceGroup } from "@/lib/pricing/data";

// Keep "$700" reading left-to-right inside Arabic text.
function Money({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\$[\d,]+)/).map((part, i) =>
        part.startsWith("$") ? (
          <bdi key={i} dir="ltr">
            {part}
          </bdi>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function PricingPlans({
  group,
  headingLevel = 2,
  lang = "en",
}: {
  group: PriceGroup;
  headingLevel?: 2 | 3;
  lang?: "en" | "ar" | "fr";
}) {
  const ar = lang === "ar";
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section aria-labelledby={`price-${group.id}`}>
      <Heading
        id={`price-${group.id}`}
        className="alu-display text-[2.4rem] sm:text-[3rem]"
      >
        {group.title}
      </Heading>
      <p className="mt-3 max-w-2xl text-base text-foreground/80">{group.intro}</p>
      <ul
        className={`mt-6 grid gap-4 ${
          group.plans.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {group.plans.map((plan) => (
          <li
            key={plan.id}
            className={`alu-glass page-panel flex flex-col ${
              plan.featured ? "ring-1 ring-foreground/40" : ""
            }`}
          >
            <p className="page-label">
              {plan.name}
              {plan.featured ? (ar ? " · الأكثر اختياراً" : lang === "fr" ? " · Le plus choisi" : " · Most chosen") : ""}
            </p>
            <p className="alu-display mt-3 text-[2.6rem] leading-none">
              <Money text={plan.price} />
              {plan.period ? (
                <span className="ml-1 text-base normal-case text-foreground/70">
                  {plan.period}
                </span>
              ) : null}
            </p>
            {plan.setup ? (
              <p className="mt-1 text-sm text-foreground/70"><Money text={plan.setup} /></p>
            ) : null}
            <p className="mt-4 text-sm text-foreground/85">{plan.blurb}</p>
            <ul className="mt-4 space-y-2 text-[0.92rem] leading-relaxed text-foreground/88">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                  <span><Money text={f} /></span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              data-interactive
              data-conversion={CONVERSION_EVENTS.PRICING_PLAN_CLICK}
              data-conversion-location={`pricing_${plan.id}`}
              className={`mt-6 w-full text-center ${plan.featured ? "btn-primary" : "btn-secondary"}`}
            >
              {ar ? "ابدأ الآن" : lang === "fr" ? "Commencer" : "Get started"}
            </Link>
          </li>
        ))}
      </ul>
      {group.note ? (
        <p className="mt-4 text-sm text-foreground/70"><Money text={group.note} /></p>
      ) : null}
    </section>
  );
}

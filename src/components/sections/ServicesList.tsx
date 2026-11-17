"use client";

import { SERVICES } from "@/lib/services/data";
import { getProfile, type ProfileLocale } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";
import { ServiceCard } from "./ServiceCard";

type ServicesListProps = {
  locale?: ProfileLocale;
  /** Translated wording per service slug; English pages leave this out. */
  cards?: Record<string, { href: string; label: string; description: string }>;
  learnMore?: string;
  arrow?: string;
};

/** The six services, in the order that matters to the visitor's kind of business. */
export function ServicesList({
  locale = "en",
  cards,
  learnMore,
  arrow,
}: ServicesListProps) {
  const answer = useVisitorAnswer();
  const profile = answer ? getProfile(answer.profile, locale) : null;
  const ordered = profile
    ? [...SERVICES].sort(
        (a, b) => rank(profile.services, a.slug) - rank(profile.services, b.slug),
      )
    : SERVICES;

  return (
    <>
      {profile?.servicesNote ? (
        <p className="page-label services-note" aria-live="polite">
          {profile.servicesNote}
        </p>
      ) : null}
      <ul className="alu-offers">
        {ordered.map((service, position) => {
          const card = cards?.[service.slug];
          return (
            <li key={service.id} data-reveal>
              <ServiceCard
                service={service}
                position={position}
                locale={locale}
                href={card?.href}
                label={card?.label}
                description={card?.description}
                learnMore={learnMore}
                arrow={arrow}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

function rank(order: string[], slug: string) {
  const index = order.indexOf(slug);
  return index === -1 ? order.length : index;
}

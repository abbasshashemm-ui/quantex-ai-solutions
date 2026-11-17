"use client";

import { SERVICES } from "@/lib/services/data";
import { getProfile } from "@/lib/visitor/profiles";
import { useVisitorAnswer } from "@/lib/visitor/store";
import { ServiceCard } from "./ServiceCard";

/** The six services, in the order that matters to the visitor's kind of business. */
export function ServicesList() {
  const answer = useVisitorAnswer();
  const profile = answer ? getProfile(answer.profile) : null;
  const ordered = profile
    ? [...SERVICES].sort(
        (a, b) => rank(profile.services, a.slug) - rank(profile.services, b.slug),
      )
    : SERVICES;

  return (
    <>
      {profile && profile.id !== "general" ? (
        <p className="page-label services-note" aria-live="polite">
          In the order that matters for {profile.noun}
        </p>
      ) : null}
      <ul className="alu-offers">
        {ordered.map((service, position) => (
          <li key={service.id} data-reveal>
            <ServiceCard service={service} position={position} />
          </li>
        ))}
      </ul>
    </>
  );
}

function rank(order: string[], slug: string) {
  const index = order.indexOf(slug);
  return index === -1 ? order.length : index;
}

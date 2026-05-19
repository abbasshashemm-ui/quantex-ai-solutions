"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import type { Service } from "@/lib/services/data";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

const accentMap = {
  white: "service-card",
  grey: "service-card--grey",
  metallic: "service-card--metallic",
} as const;

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * 10;
    const rotateX = ((50 - y) / 50) * 10;

    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
    el.style.setProperty("--tilt-x", `${rotateX}deg`);
    el.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <Link
      href={`/services/${service.slug}`}
      data-interactive
      className={`block ${className}`.trim()}
    >
      <article
        ref={cardRef}
        data-service-card
        data-service-index={service.index}
        className={`service-card ${accentMap[service.accent]}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="service-card__inner">
          <span className="service-card__index">
            {String(service.index + 1).padStart(2, "0")}
          </span>
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__description">{service.description}</p>
        </div>
      </article>
    </Link>
  );
}

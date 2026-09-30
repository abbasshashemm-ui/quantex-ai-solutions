import { MachinePlate } from "@/components/sections/MachinePlate";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { SERVICES } from "@/lib/services/data";
import {
  HOME_SERVICE_ORDER,
  MACHINES,
  SERVICE_PLATES,
} from "@/lib/site/machines";

export function ServicesSection() {
  const ordered = HOME_SERVICE_ORDER.flatMap((id) => {
    const service = SERVICES.find((item) => item.id === id);
    return service ? [service] : [];
  });

  return (
    <section id="solutions" className="solutions-stack" aria-labelledby="services-heading">
      <header className="stack-index">
        <p className="poster__index">Solutions</p>
        <h2 id="services-heading" className="stack-index__title">
          What services does Quantex offer?
        </h2>
      </header>
      {ordered.map((service, index) => {
        const plate = SERVICE_PLATES[service.id];
        const machine = plate?.machine ? MACHINES[plate.machine] : null;
        return (
          <MachinePlate
            key={service.id}
            machine={machine}
            index={String(index + 1).padStart(2, "0")}
            title={plate?.slogan ?? service.nav.label}
            body={service.description}
            href={`/services/${service.slug}`}
            cta="Open"
            conversion={CONVERSION_EVENTS.SERVICE_CLICK}
            conversionLocation="services_plate"
          />
        );
      })}
    </section>
  );
}

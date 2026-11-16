import Image from "next/image";
import Link from "next/link";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import type { Service } from "@/lib/services/data";

type ServiceCardProps = {
  service: Service;
  /** Overrides for translated pages. */
  href?: string;
  label?: string;
  description?: string;
  learnMore?: string;
  arrow?: string;
  locale?: "en" | "ar" | "fr";
};

/** A cropped client site, standing in for "this is what you get". */
function SiteVisual() {
  return (
    <span className="offer-visual offer-visual--site" aria-hidden>
      <span className="offer-visual__bar">
        <i />
        <i />
        <i />
      </span>
      <Image
        src="/projects/chandelier-solderie.png"
        alt=""
        width={1024}
        height={487}
        quality={70}
        sizes="(max-width: 1023px) 90vw, 320px"
      />
    </span>
  );
}

const CHAT_LINES = {
  en: ["Are you open on Sunday?", "Yes, 10 to 6. Want me to book you a table?", "For four, at 1pm."],
  ar: ["هل تفتحون يوم الأحد؟", "نعم، من 10 إلى 6. هل أحجز لك طاولة؟", "لأربعة أشخاص، الساعة 1."],
  fr: ["Êtes-vous ouverts dimanche ?", "Oui, de 10 h à 18 h. Je vous réserve une table ?", "Pour quatre, à 13 h."],
} as const;

/** A short exchange, drawn in CSS, for the assistant card. */
function ChatVisual({ locale }: { locale: keyof typeof CHAT_LINES }) {
  const [ask, answer, reply] = CHAT_LINES[locale];
  return (
    <span className="offer-visual offer-visual--chat" aria-hidden>
      <span className="offer-bubble offer-bubble--in">{ask}</span>
      <span className="offer-bubble offer-bubble--out">{answer}</span>
      <span className="offer-bubble offer-bubble--in">{reply}</span>
      <span className="offer-bubble offer-bubble--typing">
        <i />
        <i />
        <i />
      </span>
    </span>
  );
}

export function ServiceCard({
  service,
  href = `/services/${service.slug}`,
  label = service.nav.label,
  description = service.description,
  learnMore = "Learn more",
  arrow = "→",
  locale = "en",
}: ServiceCardProps) {
  const index = String(service.index + 1).padStart(2, "0");
  const lead = service.index < 2;

  return (
    <Link
      href={href}
      data-interactive
      data-conversion={CONVERSION_EVENTS.SERVICE_CLICK}
      data-conversion-location="services_grid"
      className={lead ? "offer offer--lead alu-glass" : "offer"}
    >
      <span className="offer__text">
        <span className="offer__index">{index}</span>
        <h3 className="alu-display offer__title">{label}</h3>
        <p className="offer__body">{description}</p>
        <span className="alu-link">
          {learnMore} <span aria-hidden>{arrow}</span>
        </span>
      </span>
      {lead ? service.index === 0 ? <SiteVisual /> : <ChatVisual locale={locale} /> : null}
    </Link>
  );
}

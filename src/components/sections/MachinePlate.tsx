import Image from "next/image";
import Link from "next/link";
import type { Machine } from "@/lib/site/machines";

type MachinePlateProps = {
  machine?: Machine | null;
  index: string;
  title: string;
  body?: string;
  href?: string;
  cta?: string;
  priority?: boolean;
  titleAs?: "h1" | "h2";
  conversion?: string;
  conversionLocation?: string;
};

export function MachinePlate({
  machine,
  index,
  title,
  body,
  href,
  cta,
  priority = false,
  titleAs = "h2",
  conversion,
  conversionLocation,
}: MachinePlateProps) {
  const tone = machine?.tone ?? "ink";
  const Heading = titleAs;
  const className = `poster poster--${tone}${machine ? "" : " poster--type"}${
    machine?.cover === "full" ? " poster--full" : ""
  }`;

  const content = (
    <>
      {machine ? (
        <div className="poster__media">
          <Image
            src={machine.src}
            alt={machine.alt}
            fill
            priority={priority}
            quality={70}
            sizes="100vw"
            className="poster__photo"
            style={{ ["--plate-position" as string]: machine.position }}
          />
        </div>
      ) : (
        <span className="poster__led" aria-hidden />
      )}
      <div className="poster__scrim" aria-hidden />
      <div className="poster__copy">
        <p className="poster__index">{index}</p>
        <Heading className="poster__title">{title}</Heading>
        {body ? <p className="poster__body">{body}</p> : null}
        {cta ? <span className="poster__cta">{cta}</span> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        data-interactive
        data-conversion={conversion}
        data-conversion-location={conversionLocation}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return <section className={className}>{content}</section>;
}

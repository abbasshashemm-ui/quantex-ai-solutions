import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

/** Horizontal QUANTEX wordmark */
const FULL_LOGO = "/quantex-logo.png";
/** Triangle mark only — user-provided asset */
const MARK_LOGO = "/quantex-mark-reference.png";

export function BrandLogo({
  className,
  priority = false,
  variant = "full",
}: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src={MARK_LOGO}
        alt="Quantex"
        width={40}
        height={46}
        sizes="40px"
        priority={priority}
        className={className ?? "h-9 w-auto"}
      />
    );
  }

  return (
    <Image
      src={FULL_LOGO}
      alt="Quantex AI Solutions"
      width={360}
      height={72}
      sizes="(max-width: 768px) 180px, 220px"
      priority={priority}
      className={className ?? "h-8 w-auto max-w-[min(220px,50vw)]"}
    />
  );
}

import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

/** Full horizontal lockup (triangle + QUANTEX) — user-provided asset */
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
        priority={priority}
        className={className ?? "h-9 w-auto"}
      />
    );
  }

  return (
    <Image
      src={FULL_LOGO}
      alt="Quantex AI Solutions"
      width={200}
      height={48}
      priority={priority}
      className={className ?? "h-8 w-auto max-w-[min(200px,42vw)]"}
    />
  );
}

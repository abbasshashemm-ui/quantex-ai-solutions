import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

const FULL_LOGO = "/quantex-logo.png";
const MARK_LOGO = "/quantex-mark.png";

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
        height={40}
        sizes="40px"
        quality={70}
        priority={priority}
        className={className ?? "h-9 w-auto"}
      />
    );
  }

  return (
    <Image
      src={FULL_LOGO}
      alt="QUANTEX"
      width={360}
      height={72}
      sizes="(max-width: 768px) 200px, 260px"
      quality={70}
      priority={priority}
      className={className ?? "h-8 w-auto max-w-[min(260px,58vw)]"}
    />
  );
}

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

export function BrandLogo({
  className,
  variant = "full",
}: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <span className={`brand-logo-text ${className ?? ""}`.trim()} aria-label="Quantex">
        <span className="brand-logo-text__bracket">[</span>Q
        <span className="brand-logo-text__bracket">]</span>
      </span>
    );
  }

  return (
    <span
      className={`brand-logo-text text-sm sm:text-base ${className ?? ""}`.trim()}
      aria-label="Quantex"
    >
      <span className="brand-logo-text__bracket">[</span>
      QUANTEX
      <span className="brand-logo-text__bracket">]</span>
    </span>
  );
}

import { useId } from "react";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

export function BrandLogo({
  className,
  variant = "full",
}: BrandLogoProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `qg${rawId}`;

  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 40 46"
        role="img"
        aria-label="Quantex"
        className={className ?? "h-9 w-auto"}
      >
        <defs>
          <linearGradient id={gradId} x1="20" y1="2" x2="20" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.42" stopColor="#d7dbe3" />
            <stop offset="1" stopColor="#8b909c" />
          </linearGradient>
        </defs>
        <polygon
          points="20,3.5 37.5,42.5 2.5,42.5"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <polygon points="20,11 30.8,38.2 9.2,38.2" fill={`url(#${gradId})`} opacity="0.22" />
        <polygon points="20,11 20,38.2 9.2,38.2" fill={`url(#${gradId})`} opacity="0.12" />
        <path
          d="M11 36.5h18"
          stroke={`url(#${gradId})`}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 72"
      role="img"
      aria-label="QUANTEX"
      className={className ?? "h-8 w-auto max-w-[min(220px,50vw)]"}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="8" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#d7dbe3" />
          <stop offset="1" stopColor="#9aa1ad" />
        </linearGradient>
      </defs>
      <text
        x="180"
        y="52"
        textAnchor="middle"
        fill={`url(#${gradId})`}
        fontFamily="var(--font-syne), var(--font-outfit), system-ui, sans-serif"
        fontSize="48"
        fontWeight="800"
        letterSpacing="0.04em"
      >
        QUANTEX
      </text>
    </svg>
  );
}

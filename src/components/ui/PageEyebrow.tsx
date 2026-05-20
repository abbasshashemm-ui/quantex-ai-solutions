import type { ReactNode } from "react";

type PageEyebrowProps = {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function PageEyebrow({
  children,
  align = "left",
  className = "",
}: PageEyebrowProps) {
  const alignClass = align === "center" ? "page-eyebrow--center" : "";

  return (
    <p
      className={`page-eyebrow text-[0.65rem] font-medium tracking-[0.28em] text-foreground uppercase sm:text-xs sm:tracking-[0.35em] ${alignClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}

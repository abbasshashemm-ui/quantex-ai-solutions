import type { HTMLAttributes, ReactNode } from "react";

type PageEyebrowProps = {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children" | "className">;

export function PageEyebrow({
  children,
  align = "left",
  className = "",
  ...rest
}: PageEyebrowProps) {
  const alignClass = align === "center" ? "page-eyebrow--center" : "";

  return (
    <p
      className={`page-eyebrow text-[0.65rem] font-medium tracking-[0.28em] text-muted uppercase sm:text-xs sm:tracking-[0.32em] ${alignClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </p>
  );
}

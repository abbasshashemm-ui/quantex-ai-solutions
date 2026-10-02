import type { HTMLAttributes, ReactNode } from "react";

type PageEyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  align?: "left" | "center";
};

export function PageEyebrow({
  children,
  align = "left",
  className = "",
  ...props
}: PageEyebrowProps) {
  const alignClass = align === "center" ? "page-eyebrow--center" : "";

  return (
    <p
      {...props}
      className={`page-eyebrow text-[0.7rem] font-medium tracking-[0.22em] text-metallic uppercase sm:text-xs sm:tracking-[0.28em] ${alignClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}

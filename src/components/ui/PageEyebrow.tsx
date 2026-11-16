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
      className={`page-eyebrow text-xs font-medium text-metallic ${alignClass} ${className}`.trim()}
    >
      {children}
    </p>
  );
}

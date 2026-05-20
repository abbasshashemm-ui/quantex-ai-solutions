import type { NavServiceIcon } from "@/lib/services/icons";

type ServiceNavIconProps = {
  icon: NavServiceIcon;
  className?: string;
};

export function ServiceNavIcon({ icon, className = "h-5 w-5" }: ServiceNavIconProps) {
  const stroke = "currentColor";
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "code":
      return (
        <svg {...props}>
          <path d="M9 8L5 12l4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...props}>
          <path d="M6 6h4v4H6zM14 6h4v4h-4zM10 14h4v4h-4z" />
          <path d="M10 8h4M12 10v4" />
        </svg>
      );
    case "layers":
      return (
        <svg {...props}>
          <path d="M12 4 4 8l8 4 8-4-8-4z" />
          <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </svg>
      );
    case "chat":
      return (
        <svg {...props}>
          <path d="M6 8a6 6 0 0112 0v5a6 6 0 01-12 0V8z" />
          <path d="M8 18l2 2 2-2" />
        </svg>
      );
    default:
      return null;
  }
}

"use client";

import { useId } from "react";
import type { NavServiceIcon } from "@/lib/services/data";

type ServiceNavIconProps = {
  icon: NavServiceIcon;
  className?: string;
};

function MetallicGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
      <stop stopColor="currentColor" stopOpacity="0.95" />
      <stop offset="0.55" stopColor="currentColor" stopOpacity="0.72" />
      <stop offset="1" stopColor="currentColor" stopOpacity="0.38" />
    </linearGradient>
  );
}

export function ServiceNavIcon({ icon, className = "h-5 w-5" }: ServiceNavIconProps) {
  const gradId = `${useId()}-metallic`;

  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "code":
      return (
        <svg {...props}>
          <defs>
            <MetallicGradient id={gradId} />
          </defs>
          <path
            d="M8.5 7.5 12 5.5l3.5 2v7L12 16.5l-3.5-2v-7Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path
            d="M12 5.5v11M8.5 7.5l3.5 2 3.5-2M8.5 14.5l3.5 2 3.5-2"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <path
            d="M5 10.5 3.5 12 5 13.5M19 10.5 20.5 12 19 13.5"
            stroke={`url(#${gradId})`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "workflow":
      return (
        <svg {...props}>
          <defs>
            <MetallicGradient id={gradId} />
          </defs>
          <rect
            x="3.5"
            y="4"
            width="5.5"
            height="5.5"
            rx="1.25"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <rect
            x="15"
            y="4"
            width="5.5"
            height="5.5"
            rx="1.25"
            fill={`url(#${gradId})`}
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <rect
            x="9.25"
            y="14.5"
            width="5.5"
            height="5.5"
            rx="1.25"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path
            d="M9 6.75h6M12 9.5v5M9 17.25h6"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="m14.25 6.75 1.1-1.1M9.75 17.25l-1.1 1.1"
            stroke={`url(#${gradId})`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "layers":
      return (
        <svg {...props}>
          <defs>
            <MetallicGradient id={gradId} />
          </defs>
          <path
            d="M12 4 4.5 8 12 12l7.5-4L12 4Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 12 12 16l7.5-4"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          <path
            d="M4.5 16 12 20l7.5-4"
            stroke={`url(#${gradId})`}
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" opacity="0.85" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...props}>
          <defs>
            <MetallicGradient id={gradId} />
          </defs>
          <rect
            x="3"
            y="5"
            width="18"
            height="12"
            rx="1.75"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path
            d="M3 9h18"
            stroke="currentColor"
            strokeWidth="1.35"
            opacity="0.35"
          />
          <rect
            x="6"
            y="11.5"
            width="5.5"
            height="2.25"
            rx="0.5"
            fill={`url(#${gradId})`}
            fillOpacity="0.22"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M13.5 12h4M13.5 14h3"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M10 21h4M12 17v4"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <defs>
            <MetallicGradient id={gradId} />
          </defs>
          <path
            d="M5 16V13M8.5 16v-4M12 16V9M15.5 16V11"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle
            cx="14.5"
            cy="9.5"
            r="4.25"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path
            d="M17.5 12.5 20.5 15.5"
            stroke={`url(#${gradId})`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          <path
            d="M13.25 9.5h2.5M14.5 8.25v2.5"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      );
    case "chat":
      return (
        <svg {...props}>
          <defs>
            <MetallicGradient id={gradId} />
          </defs>
          <path
            d="M5.5 7.5a6.25 6.25 0 0113 0v4.25a6.25 6.25 0 01-13 0V7.5Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 17.25 12 19.5l2.5-2.25"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9.25" cy="10.75" r="0.85" fill="currentColor" opacity="0.75" />
          <circle cx="12" cy="10.75" r="0.85" fill="currentColor" opacity="0.55" />
          <circle cx="14.75" cy="10.75" r="0.85" fill={`url(#${gradId})`} />
          <path
            d="M16.75 8.25 18.5 6.5"
            stroke={`url(#${gradId})`}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

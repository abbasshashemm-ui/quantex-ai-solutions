"use client";

import { useEffect } from "react";
import {
  CONVERSION_EVENTS,
  isMailtoHref,
  isTelHref,
  isWhatsAppHref,
  trackConversion,
} from "@/lib/analytics/events";

function getLocation(element: Element): string {
  return (
    element.getAttribute("data-conversion-location") ??
    element.closest("section[id]")?.id ??
    element.closest("header, footer, main, nav")?.tagName.toLowerCase() ??
    "site"
  );
}

export function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-conversion]");
      if (tracked) {
        const name = tracked.getAttribute("data-conversion");
        if (name) {
          trackConversion(name as (typeof CONVERSION_EVENTS)[keyof typeof CONVERSION_EVENTS], {
            location: getLocation(tracked),
          });
        }
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const location = getLocation(anchor);

      if (isWhatsAppHref(href)) {
        trackConversion(CONVERSION_EVENTS.WHATSAPP_CLICK, { location });
        return;
      }

      if (isMailtoHref(href)) {
        trackConversion(CONVERSION_EVENTS.EMAIL_CLICK, { location });
        return;
      }

      if (isTelHref(href)) {
        trackConversion(CONVERSION_EVENTS.PHONE_CLICK, { location });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

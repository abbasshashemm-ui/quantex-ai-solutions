"use client";

import { useEffect } from "react";
import {
  CONVERSION_EVENTS,
  trackConversion,
} from "@/lib/analytics/events";

export function ContactPageTracker() {
  useEffect(() => {
    trackConversion(CONVERSION_EVENTS.CONTACT_PAGE_VIEW, {
      location: "contact_page",
    });
  }, []);

  return null;
}

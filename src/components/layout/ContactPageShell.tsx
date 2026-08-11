"use client";

import { ContactPageTracker } from "@/components/analytics/ContactPageTracker";
import { ContactSection } from "@/components/sections/ContactSection";

export function ContactPageShell() {
  return (
    <>
      <ContactPageTracker />
      <ContactSection />
    </>
  );
}

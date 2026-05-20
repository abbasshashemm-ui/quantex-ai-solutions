import type { Metadata } from "next";
import { ContactPageShell } from "@/components/layout/ContactPageShell";

export const metadata: Metadata = {
  title: "Contact | Quantex AI Solutions",
  description:
    "Get in touch about web design, custom software, automation, and AI solutions. We respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactPageShell />;
}

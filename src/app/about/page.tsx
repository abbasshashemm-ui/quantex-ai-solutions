import type { Metadata } from "next";
import { AboutPageShell } from "@/components/layout/AboutPageShell";

export const metadata: Metadata = {
  title: "About | Quantex AI Solutions",
  description:
    "Beirut-based studio founded in 2024 by full-stack developer Abbas Hachem. Quantex ships AI chatbots, custom apps, web development, and automation for 10+ businesses.",
};

export default function AboutPage() {
  return <AboutPageShell />;
}

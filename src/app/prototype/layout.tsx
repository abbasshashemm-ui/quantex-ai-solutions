import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./prototype.css";

const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Design prototype",
  robots: { index: false, follow: false },
};

export default function PrototypeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={`alu-root ${condensed.variable}`}>{children}</div>;
}

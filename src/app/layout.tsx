import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { MainLayout } from "@/components/layout/MainLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030303",
};

export const metadata: Metadata = {
  title: "Quantex AI Solutions",
  description:
    "High-performance AI solutions with immersive 3D experiences and scroll-driven storytelling.",
  icons: {
    icon: "/quantex-mark-reference.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link
          rel="preconnect"
          href="https://prod.spline.design"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-void text-foreground"
      >
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}

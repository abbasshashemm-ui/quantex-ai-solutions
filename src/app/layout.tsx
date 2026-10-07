import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Barlow_Condensed, Cairo, Outfit } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { MainLayout } from "@/components/layout/MainLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGlobalSchemas } from "@/lib/seo/json-ld";
import { rootMetadata } from "@/lib/seo/metadata";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "@/lib/theme/theme";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const condensed = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
});

// Arabic pages only: not preloaded, and the browser fetches it only when
// Arabic glyphs are actually rendered.
const arabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
  weight: ["400", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${condensed.variable} ${arabic.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="llms-txt" href="/llms.txt" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-void text-foreground"
      >
        <JsonLd data={buildGlobalSchemas()} />
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

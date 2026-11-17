import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProviders } from "@/components/providers/AppProviders";
import { MainLayout } from "@/components/layout/MainLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGlobalSchemas } from "@/lib/seo/json-ld";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "@/lib/theme/theme";
import { fontVariables } from "./fonts";
import "./globals.css";

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

/**
 * The document every page is rendered into. Each language has its own root
 * layout (the (en), (ar) and (fr) route groups) so that <html lang> is right
 * in the HTML the server sends; they all render this.
 */
export function RootShell({
  lang,
  children,
}: Readonly<{
  lang: "en" | "ar" | "fr";
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="Quantex guides" href="/feed.xml" />
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

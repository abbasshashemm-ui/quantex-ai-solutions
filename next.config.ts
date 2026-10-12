import type { NextConfig } from "next";

const immutableAssetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=604800, stale-while-revalidate=86400",
  },
];

const isDev = process.env.NODE_ENV === "development";

// The site is statically rendered, so a per-request nonce is out; inline
// scripts (theme init, Next's own bootstrap) need 'unsafe-inline'. Everything
// else is locked to same-origin, which already covers Vercel Analytics and
// Speed Insights (served from /_vercel/*) and the self-hosted next/font files.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["ai", "@ai-sdk/react"],
    staleTimes: {
      dynamic: 30,
      static: 1800,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [70],
  },
  async redirects() {
    return [{ source: "/prototype", destination: "/", permanent: false }];
  },
  async headers() {
    const immutableSources = [
      "/projects/:path*",
      "/quantex-logo.png",
      "/quantex-mark.png",
      "/quantex-logo-dark.png",
      "/quantex-mark-dark.png",
      "/og.png",
      "/hero/:path*",
      "/favicon-16x16.png",
      "/favicon-32x32.png",
      "/apple-touch-icon.png",
      "/icon-192.png",
      "/icon-512.png",
    ];

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      ...immutableSources.map((source) => ({
        source,
        headers: immutableAssetHeaders,
      })),
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

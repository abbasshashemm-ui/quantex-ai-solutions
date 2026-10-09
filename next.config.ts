import type { NextConfig } from "next";

const immutableAssetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=604800, stale-while-revalidate=86400",
  },
];

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

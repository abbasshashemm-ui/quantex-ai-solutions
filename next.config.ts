import type { NextConfig } from "next";

const immutableAssetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
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
  async headers() {
    const immutableSources = [
      "/projects/:path*",
      "/quantex-logo.png",
      "/quantex-mark.png",
      "/favicon-16x16.png",
      "/favicon-32x32.png",
      "/apple-touch-icon.png",
      "/icon-192.png",
      "/icon-512.png",
      "/globe.svg",
      "/next.svg",
    ];

    return [
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
  async redirects() {
    const origin = "https://quantexai.solutions";
    const hosts = [
      "www.quantexai.solutions",
      "quantexai.info",
      "www.quantexai.info",
    ];

    return hosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${origin}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;

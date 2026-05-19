import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@splinetool/react-spline",
    "@splinetool/runtime",
    "three",
  ],
};

export default nextConfig;

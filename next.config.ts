import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/random-hours",
  assetPrefix: "/random-hours",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
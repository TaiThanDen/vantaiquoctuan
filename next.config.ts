import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    domains: ["suckhoedoisong.qltns.mediacdn.vn"],
  },

  productionBrowserSourceMaps: false,
};

export default nextConfig;

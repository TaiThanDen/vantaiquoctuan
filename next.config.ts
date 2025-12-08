import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "suckhoedoisong.qltns.mediacdn.vn",
      // thêm các domain khác nếu cần
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;

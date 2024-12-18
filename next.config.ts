import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9090",
        pathname: "/api/v1/image/**", // Autorise tous les chemins sous /api/v1/image
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:
    `${process.env.NODE_ENV}` === "development" ? undefined : "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9090",
        pathname: "/api/v1/image/**",
      },
      {
        protocol: "https",
        hostname: "api.cassavamarketplace.com",
        pathname: "/api/v1/image/**",
      },
      {
        protocol: "https",
        hostname: "api-uat.cassavamarketplace.com",
        pathname: "/api/v1/image/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/keycloak/:path*",
        destination: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/:path*`,
      },
    ];
  },
};

export default nextConfig;

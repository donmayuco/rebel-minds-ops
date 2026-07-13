import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Security workshops line retired 2026-07-13 — preserve any indexed/linked URLs
      {
        source: "/cybersecurity",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

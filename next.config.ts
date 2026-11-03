import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.2", "192.168.1.2:3000", "localhost:3000"],
  devIndicators: false,
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;

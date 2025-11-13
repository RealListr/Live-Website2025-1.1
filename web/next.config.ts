import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // optional: silence the “workspace root” warning if you still see it
  experimental: {
    turbopack: { root: __dirname },
  },
};

export default config;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep development output separate so production builds cannot invalidate
  // the live development module cache.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;

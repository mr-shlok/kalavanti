import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting (no server needed)
  output: "export",
  trailingSlash: true, // generates /page/index.html — works best with Firebase Hosting
  devIndicators: false,
  images: {
    unoptimized: true, // no Next.js image server in static export
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

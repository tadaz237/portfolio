/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Strip console.* in production builds (keep errors/warnings).
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // three.js ships ESM; transpile the R3F ecosystem for Next.
  transpilePackages: ["three"],
  eslint: {
    // Don't fail production builds on lint; `npm run lint` still works.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

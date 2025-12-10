import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        include: /src\/assets/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.svg$/,
        include: /public/,
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
};

export default nextConfig;

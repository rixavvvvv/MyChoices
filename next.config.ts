import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
        ],
    },
    webpack(config, { isServer }) {
        if (isServer) {
            // Next.js 15.5.x outputs server chunks to server/chunks/ but the
            // webpack-runtime resolves them as ./[id].js — align the two by
            // making the runtime path include the subdirectory prefix.
            config.output = {
                ...config.output,
                chunkFilename: "chunks/[id].js",
            };
        }
        return config;
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AWS_BUCKET_PATH: process.env.AWS_BUCKET_PATH,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

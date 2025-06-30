import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from 'next';
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  distDir: '.build',
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {},
        },
      ],
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname)],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_PARTICIPANT_API || '')
          .hostname,
        pathname: '/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);

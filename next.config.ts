import type { NextConfig } from 'next';
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  distDir: '.build',
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
  /* experimental: {
    turbo: {
      root: path.join(__dirname),
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  }, */
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_PARTICIPANT_API}/**`)],
  },
};

export default withBundleAnalyzer(nextConfig);

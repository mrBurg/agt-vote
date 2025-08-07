import type { NextConfig } from 'next';
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';

function patchNextjsWebpackImageLoaderForInline(config: any) {
  // https://github.com/vercel/next.js/discussions/36981#discussioncomment-3167331
  config.module.generator['asset/resource'] = config.module.generator.asset;
  config.module.generator['asset/source'] = config.module.generator.asset;
  delete config.module.generator.asset;

  const imageRule = config.module.rules.find(
    (rule: any) => rule.loader === 'next-image-loader'
  );

  imageRule.resourceQuery.not.push(/inline/);

  config.module.rules.push({
    test: /\.(jpg|gif|png|webp)$/i,
    resourceQuery: /inline/,
    type: 'asset/inline',
  });
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  distDir: '.build',
  output: 'standalone',
  webpack(config) {
    patchNextjsWebpackImageLoaderForInline(config);

    config.module.rules.push(
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'assets'),
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, 'assets'),
        use: [
          {
            loader: '@svgr/webpack',
            options: { svgo: false },
          },
        ],
      }
    );

    return config;
  },
  sassOptions: { includePaths: [path.join(__dirname)] },
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

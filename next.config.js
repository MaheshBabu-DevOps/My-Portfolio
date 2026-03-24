const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // Apply to ALL compilations (server + client).
    // The stub uses `typeof window` so webpack's dead-code elimination
    // removes the real iconify from server bundles at compile time.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@iconify/react': path.join(__dirname, 'src/lib/iconify-stub.js'),
      // Points directly to the real package, bypassing the alias above.
      '@iconify/react-impl': require.resolve('@iconify/react'),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github-production-user-asset-6210df.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

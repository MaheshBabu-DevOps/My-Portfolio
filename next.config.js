const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Safety net: replace @iconify/react with a null stub in the server
      // bundle. Primary protection is ClientIcon using useEffect so the
      // real module is never imported server-side at all.
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@iconify/react': path.join(__dirname, 'src/lib/iconify-stub.js'),
      };
    }
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

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  webpack: (config) => {
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true,
  },
};

const config = withPlugins(
  [
    [
      optimizedImages,
    ],
  ],
  nextConfig
);

module.exports = config;

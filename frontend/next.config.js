/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add custom webpack configuration
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;

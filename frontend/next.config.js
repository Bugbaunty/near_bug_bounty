/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add custom webpack configuration
  webpack: (config) => {
    config.resolve.alias["@"] = require("path").resolve(__dirname, "src");
    return config;
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_ID:
      process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_BUGBOUNTY_GITHUB_REDIRECT_URI:
      process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_REDIRECT_URI,
    NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_SECRET_KEY:
      process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_SECRET_KEY,
  },
  transpilePackages: [
    "antd",
    "@ant-design/plots",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-list",
    "@ant-design/pro-descriptions",
    "@ant-design/pro-form",
    "@ant-design/pro-skeleton",
    "@ant-design/pro-field",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "@ant-design/pro-card",
    "@ant-design/pro-table",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-tooltip",
  ],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    BASE_API: process.env.BACK_BASE_API,
  },
  publicRuntimeConfig: {
    BASE_API: process.env.FRONT_BASE_API,
    MAP_KEY: process.env.GOOGLE_MAP_KEY,
  },
};

module.exports = nextConfig;

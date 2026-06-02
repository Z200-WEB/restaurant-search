/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hotpepper.jp',
      },
      {
        protocol: 'http',
        hostname: '**.hotpepper.jp',
      },
    ],
  },
};

module.exports = nextConfig;

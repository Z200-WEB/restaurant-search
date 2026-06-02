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
            {
                      protocol: 'https',
                      hostname: 'imgfp.hotp.jp',
            },
            {
                      protocol: 'http',
                      hostname: 'imgfp.hotp.jp',
            },
            {
                      protocol: 'https',
                      hostname: '**.hotp.jp',
            },
            {
                      protocol: 'http',
                      hostname: '**.hotp.jp',
            },
                ],
    },
};

module.exports = nextConfig;

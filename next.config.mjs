/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['192.168.29.91'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.29.91',
        port: '9000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;

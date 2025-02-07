/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.91.214',
        port: '9000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.zatayo.com',
        pathname: '/zatayo-backend/uploads/**', // ✅ Updated to match the actual path
      },
    ],
  },
};

export default nextConfig;

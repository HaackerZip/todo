/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'skateshop-25.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**', // Permite cualquier hostname (¡solo para desarrollo!)
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/admin/upload/**',
      },
    ],
  },
};

export default nextConfig;
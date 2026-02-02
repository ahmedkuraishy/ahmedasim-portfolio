/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    allowedDevOrigins: ['192.168.18.158', 'localhost:3000']
  },
  async rewrites() {
    return [
      {
        source: '/secure/pixel9/admin-panel/:path*',
        destination: '/admin/:path*',
      },
    ]
  },
};

export default nextConfig;

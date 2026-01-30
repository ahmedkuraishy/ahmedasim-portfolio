/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
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

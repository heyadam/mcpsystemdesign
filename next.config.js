/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep /api/ folder as Vercel serverless functions
  experimental: {
    serverComponentsExternalPackages: ['@modelcontextprotocol/sdk']
  },
  // Match Vercel rewrites for local development
  async rewrites() {
    return [
      {
        source: '/sse',
        destination: '/api/sse',
      },
    ];
  },
};

export default nextConfig;

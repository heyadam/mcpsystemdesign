/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep /api/ folder as Vercel serverless functions
  experimental: {
    serverComponentsExternalPackages: ['@modelcontextprotocol/sdk']
  }
};

export default nextConfig;

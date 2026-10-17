import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return []
    const backend =
      process.env.DEV_BACKEND_ORIGIN?.trim() ||
      process.env.VITE_DEV_BACKEND_ORIGIN?.trim() ||
      'http://127.0.0.1:8081'
    return [
      {
        source: '/api/trivaller-backend/:path*',
        destination: `${backend.replace(/\/$/, '')}/api/:path*`,
      },
    ]
  },
}

export default nextConfig

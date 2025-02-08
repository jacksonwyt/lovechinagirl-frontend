import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    domains: ['lovechinagirldesign-assets.s3.us-west-1.amazonaws.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'lovechinagirldesign-assets.s3.us-west-1.amazonaws.com',
      pathname: '/uploads/**'
    }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default config
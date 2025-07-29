import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  // Webpack configuration removed for Turbopack compatibility
  // If you want to use Turbopack, uncomment the lines below and comment out the webpack config
  // experimental: {
  //   turbo: {
  //     // Turbopack-specific configuration can go here
  //   },
  // },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.devtool = 'source-map'
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)\\.(js|css)\\.map$',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/(.*)',
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
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: *.clerk.accounts.dev *.clerk.com data: blob:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https: fonts.googleapis.com data:; img-src 'self' data: https: *.clerk.com *.clerk.accounts.dev; font-src 'self' data: https: fonts.gstatic.com; connect-src 'self' https: *.clerk.accounts.dev *.clerk.com ws: wss:; manifest-src 'self'; frame-src 'self' *.clerk.accounts.dev *.clerk.com; object-src 'none'; base-uri 'self'",
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig

import { createMDX } from 'fumadocs-mdx/next'
import BLOG from './blog.config.js'

const defaultLocale = BLOG.lang ? BLOG.lang.split('-')[0] : 'en'
const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  env: {
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || ''
  },
  serverExternalPackages: ['postgres', 'drizzle-orm'],
  experimental: {
    optimizePackageImports: ['@heroicons/react']
  },
  allowedDevOrigins: [process.env.REPLIT_DEV_DOMAIN].filter(Boolean),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.craft.do' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          }
        ]
      }
    ]
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/notes/:pathname',
          destination: '/api/htmlrewrite?pathname=:pathname'
        },
        {
          source: '/notes/:pathname/b/:slug*',
          destination: '/api/htmlrewrite?pathname=:pathname&slug=/b/:slug*'
        },
        {
          source: '/notes/:pathname/x/:slug*',
          destination: '/api/htmlrewrite?pathname=:pathname&slug=/x/:slug*'
        },
        {
          source: '/share/static/js/:slug*',
          destination:
            '/api/jsrewrite?url=https://www.craft.do/share/static/js/:slug*'
        },
        {
          source: '/share/static/css/:slug*',
          destination: 'https://www.craft.do/share/static/css/:slug*'
        },
        {
          source: '/share/static/fonts/:slug*',
          destination: 'https://www.craft.do/share/static/fonts/:slug*'
        },
        {
          source: '/share/static/media/:slug*',
          destination: 'https://www.craft.do/share/static/media/:slug*'
        },
        {
          source: '/share/static/craft.webmanifest',
          destination: 'https://www.craft.do/share/static/craft.webmanifest'
        },
        {
          source: '/assets/js/analytics2.js',
          destination: 'https://www.craft.do/404'
        }
      ],
      fallback: [
        {
          source: '/api/:slug*',
          destination: 'https://www.craft.do/api/:slug*'
        }
      ]
    }
  }
}

// Keep defaultLocale available for middleware/docs without next i18n routing
void defaultLocale

export default withMDX(config)

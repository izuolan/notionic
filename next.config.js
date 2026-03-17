module.exports = {
  productionBrowserSourceMaps: false,
  env: {
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '',
    NOTION_SPACES_ID: process.env.NOTION_SPACES_ID || '',
    NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '',
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '',
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: false
  },
  transpilePackages: ['dayjs'],
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
    serverComponentsExternalPackages: [
      'notion-client',
      'notion-utils',
      'notion-types',
      'react-notion-x',
      'got',
      'p-map',
      'p-memoize',
      'is-url-superb',
      'memoize',
      'normalize-url',
      'p-queue',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize heavy ESM packages for server bundle
      // These are loaded natively by Node.js at runtime, not bundled by webpack
      const esmPackages = [
        'notion-client', 'notion-utils', 'notion-types',
        'got', 'p-map', 'p-memoize', 'p-queue',
        'is-url-superb', 'memoize', 'normalize-url',
        'unified', 'rehype', 'remark', 'hast-util-to-html'
      ]
      const origExternals = config.externals || []
      config.externals = [
        ...(Array.isArray(origExternals) ? origExternals : [origExternals]),
        ({ request }, callback) => {
          if (esmPackages.some(p => request === p || request.startsWith(p + '/'))) {
            return callback(null, 'commonjs ' + request)
          }
          callback()
        }
      ]
    }
    return config
  },
  images: {
    domains: ['api.craft.do', 'www.notion.so', 'images.unsplash.com', 's3.us-west-2.amazonaws.com']
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
    return [
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
        source: '/api/:slug*',
        destination: 'https://www.craft.do/api/:slug*'
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
    ]
  }
}

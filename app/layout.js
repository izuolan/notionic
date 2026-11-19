import { headers } from 'next/headers'
import { Suspense } from 'react'
import BLOG from '@/blog.config'
import AppShell from '@/components/AppShell'
import { DEFAULT_LOCALE, LOCALE_HEADER } from '@/lib/locale'
import '@/styles/fuma-comment.css'
import '@/styles/globals.css'
import '@/styles/nprogress.css'

export const metadata = {
  title: {
    default: BLOG.title,
    template: `%s | ${BLOG.title}`
  },
  description: BLOG.description,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/favicon.png'
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed'
    }
  }
}

export const viewport = {
  themeColor:
    BLOG.appearance === 'dark'
      ? BLOG.darkBackground
      : BLOG.appearance === 'light'
        ? BLOG.lightBackground
        : [
            {
              media: '(prefers-color-scheme: light)',
              color: BLOG.lightBackground
            },
            {
              media: '(prefers-color-scheme: dark)',
              color: BLOG.darkBackground
            }
          ]
}

export default async function RootLayout({ children }) {
  const headerStore = await headers()
  const locale = headerStore.get(LOCALE_HEADER) || DEFAULT_LOCALE

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : BLOG.lang} suppressHydrationWarning>
      <body className='bg-day dark:bg-night'>
        <Suspense fallback={null}>
          <AppShell locale={locale}>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  )
}

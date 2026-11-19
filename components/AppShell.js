'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { ThemeProvider } from 'next-themes'
import BLOG from '@/blog.config'
import Header from '@/components/NavBar/Header'
import Footer from '@/components/NavBar/Footer'
import PostCover from '@/components/Post/PostCover'
import TransitionEffect from '@/components/Common/TransitionEffect'
import dynamic from 'next/dynamic'
import Scripts from '@/components/Common/Scripts'
import { LocaleProvider } from '@/components/LocaleProvider'
import {
  PageChromeProvider,
  usePageChrome
} from '@/components/PageChromeProvider'

const Ackee = dynamic(() => import('@/components/Common/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Common/Gtag'), { ssr: false })

function ShellInner({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { navBarTitle, fullWidth, cover } = usePageChrome()

  useEffect(() => {
    NProgress.done()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, searchParams])

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return
      if (anchor.target === '_blank' || event.metaKey || event.ctrlKey) return
      try {
        const url = new URL(href, window.location.origin)
        if (url.origin === window.location.origin) {
          NProgress.start()
        }
      } catch {
        // ignore invalid URLs
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <ThemeProvider attribute='class'>
      <div className='relative'>
        <PostCover src={cover} alt={navBarTitle || ''} />
        <Header navBarTitle={navBarTitle} fullWidth={fullWidth} />
        <TransitionEffect>
          <div
            className={`min-h-[calc(100vh-14rem)] md:min-h-[calc(100vh-18rem)] ${
              BLOG.font === 'serif' ? 'font-serif' : 'font-sans'
            }`}
          >
            {children}
          </div>
        </TransitionEffect>
        <Footer fullWidth={fullWidth} />
      </div>
    </ThemeProvider>
  )
}

export default function AppShell({ locale, children }) {
  return (
    <LocaleProvider locale={locale}>
      <PageChromeProvider>
        <Scripts />
        {BLOG.isProd && BLOG?.analytics?.provider === 'ackee' && (
          <Ackee
            ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
            ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
          />
        )}
        {BLOG.isProd && BLOG?.analytics?.provider === 'ga' && <Gtag />}
        <ShellInner>{children}</ShellInner>
      </PageChromeProvider>
    </LocaleProvider>
  )
}

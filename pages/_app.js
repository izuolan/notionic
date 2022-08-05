// import 'prismjs'
// import 'prismjs/components/prism-bash'
// import 'prismjs/components/prism-diff'
// import 'prismjs/components/prism-go'
// import 'prismjs/components/prism-yaml'
// import 'prismjs/components/prism-rust'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-markup'
// import 'prismjs/components/prism-typescript'
// import 'prismjs/themes/prism-tomorrow.min.css' // prism-okaidia.min.css
import 'react-notion-x/src/styles.css'
import 'katex/dist/katex.min.css'
import '@/styles/globals.css'
import '@/styles/notion.css'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import Scripts from '@/components/Scripts'
import { ThemeProvider } from 'next-themes'
import TransitionEffect from '@/components/TransitionEffect'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '@/styles/nprogress.css'

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })

function MyApp({ Component, pageProps }) {
  // https://github.com/vercel/next.js/blob/canary/examples/with-loading/pages/_app.js
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      // console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Scripts />
      {BLOG.isProd && BLOG?.analytics?.provider === 'ackee' && (
        <Ackee
          ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
          ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
        />
      )}
      {BLOG.isProd && BLOG?.analytics?.provider === 'ga' && <Gtag />}
      <TransitionEffect>
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
      </TransitionEffect>
    </>
  )
}

export default MyApp

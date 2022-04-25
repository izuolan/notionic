// import 'prismjs'
// import 'prismjs/components/prism-bash'
// import 'prismjs/components/prism-diff'
// import 'prismjs/components/prism-go'
// import 'prismjs/components/prism-yaml'
// import 'prismjs/components/prism-rust'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-markup'
// import 'prismjs/components/prism-typescript'
// import 'prismjs/themes/prism.css'
import 'react-notion-x/src/styles.css'
import 'katex/dist/katex.min.css'
import '@/styles/globals.css'
import '@/styles/notion.css'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import Scripts from '@/components/Scripts'
import { ThemeProvider } from 'next-themes'

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })

function MyApp({ Component, pageProps }) {
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
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp

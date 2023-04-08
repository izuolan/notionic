import Script from 'next/script'
import BLOG from '@/blog.config'

const Scripts = () => (
  <>
    {BLOG.analytics && BLOG.analytics.provider === 'cf' && (
      <Script
        src={BLOG.analytics.cfConfig.scriptUrl}
        strategy='afterInteractive'
        data-cf-beacon={BLOG.analytics.cfConfig.token}
      />
    )}
    {BLOG.analytics && BLOG.analytics.provider === 'umami' && (
      <Script
        src={BLOG.analytics.umamiConfig.scriptUrl}
        strategy='afterInteractive'
        data-website-id={BLOG.analytics.umamiConfig.websiteId}
      />
    )}
    {BLOG.analytics && BLOG.analytics.provider === 'ackee' && (
      <Script
        src={BLOG.analytics.ackeeConfig.tracker}
        strategy='afterInteractive'
        data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
        data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
      />
    )}
    {BLOG.analytics && BLOG.analytics.provider === 'ga' && (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
        />
        <Script strategy='lazyOnload' id='ga'>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
              page_path: window.location.pathname,
            });`}
        </Script>
      </>
    )}
  </>
)

export default Scripts

import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={BLOG.lang}>
        <Head>
          <link key='favicon-ico' rel='icon' href='/favicon.ico' />
          <link key='favicon-svg' rel='icon' href='/favicon.svg' type='image/svg+xml' />
          <link
            key='apple-touch-icon'
            rel='apple-touch-icon'
            sizes='192x192'
            href='/favicon.png'
          />
          <link
            key='rss'
            rel='alternate'
            type='application/rss+xml'
            title='RSS 2.0'
            href='/feed'
          />
          {BLOG.appearance === 'auto' ? (
            <meta
              key='theme-color-light'
              name='theme-color'
              content={BLOG.lightBackground}
              media='(prefers-color-scheme: light)'
            />
          ) : (
            <meta
              key='theme-color'
              name='theme-color'
              content={
                BLOG.appearance === 'dark'
                  ? BLOG.darkBackground
                  : BLOG.lightBackground
              }
            />
          )}
          {BLOG.appearance === 'auto' && (
            <meta
              key='theme-color-dark'
              name='theme-color'
              content={BLOG.darkBackground}
              media='(prefers-color-scheme: dark)'
            />
          )}
        </Head>
        <body className='bg-day dark:bg-night'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

import BLOG from '@/blog.config'
import Head from 'next/head'
import { useRouter } from 'next/router'

const SEO = ({ meta }) => {
  const ogImage = `https://${BLOG.ogImageGenerateHost}/api/default?logo=${
    BLOG.link
  }/favicon.png&siteName=${encodeURIComponent(
    BLOG.title?.trim()
  )}&description=${encodeURIComponent(
    BLOG.description?.trim()
  )}&title=${encodeURIComponent(
    meta.title?.trim()
  )}&summary=${encodeURIComponent(
    meta.description?.trim()
  )}&theme=light&border=solid`

  const router = useRouter()
  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  return (
    <Head>
      <title key='title'>{meta.title}</title>
      <meta key='robots' name='robots' content='follow, index' />
      <meta key='charset' charSet='UTF-8' />
      {BLOG.seo.googleSiteVerification && (
        <meta
          key='google-site-verification'
          name='google-site-verification'
          content={BLOG.seo.googleSiteVerification}
        />
      )}
      {BLOG.seo.keywords && (
        <meta key='keywords' name='keywords' content={BLOG.seo.keywords.join(', ')} />
      )}
      <meta key='description' name='description' content={meta.description} />
      <meta key='og:locale' property='og:locale' content={BLOG.lang} />
      <meta key='og:title' property='og:title' content={meta.title} />
      <meta key='og:description' property='og:description' content={meta.description} />
      <meta
        key='og:url'
        property='og:url'
        content={meta.slug ? `${url}/${meta.slug}` : `${url}${router.asPath}`}
      />
      <meta
        key='og:image'
        property='og:image'
        content={ogImage || BLOG.defaultCover}
      />
      <meta key='og:type' property='og:type' content={meta.type} />
      <meta key='twitter:card' name='twitter:card' content='summary_large_image' />
      <meta key='twitter:description' name='twitter:description' content={meta.description} />
      <meta key='twitter:title' name='twitter:title' content={meta.title} />
      <meta
        key='twitter:image'
        name='twitter:image'
        content={ogImage || BLOG.defaultCover}
      />
      {meta.type === 'article' && (
        <meta
          key='article:published_time'
          property='article:published_time'
          content={meta.date}
        />
      )}
      {meta.type === 'article' && (
        <meta key='article:author' property='article:author' content={BLOG.author} />
      )}
    </Head>
  )
}

export default SEO

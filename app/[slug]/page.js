import { notFound } from 'next/navigation'
import Layout from '@/layouts/layout'
import { getAllPosts, getPageBySlug, toPost } from '@/lib/posts'
import BLOG from '@/blog.config'

export function generateStaticParams() {
  const posts = getAllPosts({ onlyNewsletter: false })
  // Also include pages (about/friends/...) which are type Page
  const pages = getAllPosts({})
  const slugs = new Set([
    ...posts.map((p) => p.slug),
    ...pages.map((p) => p.slug)
  ])
  // Exclude reserved routes handled by dedicated app pages
  ;['newsletter', 'notes', 'contact', 'search', 'feed', 'page'].forEach((s) =>
    slugs.delete(s)
  )
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getPageBySlug(slug)
  if (!page) return {}
  const post = toPost(page)
  return {
    title: post.title,
    description: post.summary || BLOG.description
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const page = getPageBySlug(slug)
  if (!page) notFound()

  const post = toPost(page)
  // Hidden heroes are not standalone article pages
  if (post.type?.[0] === 'Hidden') notFound()

  const MDX = page.data.body
  const toc = page.data.toc || []

  return (
    <Layout frontMatter={post} toc={toc} fullWidth={post.fullWidth}>
      <div className='markdown-body'>
        <MDX />
      </div>
    </Layout>
  )
}

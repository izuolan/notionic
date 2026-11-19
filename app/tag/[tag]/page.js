import { notFound } from 'next/navigation'
import SearchLayout from '@/layouts/search'
import { getAllPosts, getAllTagsFromPosts } from '@/lib/posts'

export function generateStaticParams() {
  const posts = getAllPosts({ onlyNewsletter: false })
  const tags = getAllTagsFromPosts(posts)
  return Object.keys(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }) {
  const { tag } = await params
  return {
    title: `#${tag}`,
    description: `Posts tagged ${tag}`
  }
}

export default async function TagPage({ params }) {
  const { tag } = await params
  const posts = getAllPosts({ onlyNewsletter: false })
  const tags = getAllTagsFromPosts(posts)
  if (!tags[tag]) notFound()

  const filteredPosts = posts.filter(
    (post) => post && post.tags && post.tags.includes(tag)
  )

  return (
    <SearchLayout tags={tags} posts={filteredPosts} currentTag={tag} />
  )
}

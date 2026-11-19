import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/posts'
import BLOG from '@/blog.config'

export function generateStaticParams() {
  const posts = getAllPosts({ onlyPost: true })
  const totalPages = Math.ceil(posts.length / BLOG.postsPerPage)
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
    page: String(i + 2)
  }))
}

export default async function PaginatedPage({ params }) {
  const { page: pageParam } = await params
  const page = Number(pageParam)
  if (!Number.isFinite(page) || page < 2) notFound()

  const posts = getAllPosts({ onlyPost: true })
  const totalPages = Math.ceil(posts.length / BLOG.postsPerPage)
  if (page > totalPages) notFound()

  const postsToShow = posts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  )
  const showNext = page * BLOG.postsPerPage < posts.length

  return (
    <Container>
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      <Pagination page={page} showNext={showNext} />
    </Container>
  )
}

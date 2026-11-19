import SearchLayout from '@/layouts/search'
import { getAllPosts, getAllTagsFromPosts } from '@/lib/posts'
import BLOG from '@/blog.config'

export const metadata = {
  title: 'Search',
  description: BLOG.description
}

export default function SearchPage() {
  const posts = getAllPosts({ onlyNewsletter: false })
  const tags = getAllTagsFromPosts(posts)
  return <SearchLayout tags={tags} posts={posts} />
}

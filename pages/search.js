import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export default function search({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />
}
export async function getStaticProps() {
  const posts = await getAllPosts({ allTypes: true })
  const tags = getAllTagsFromPosts(posts)
  return {
    props: {
      tags,
      posts
    },
    revalidate: 1
  }
}

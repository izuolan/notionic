// import BLOG from '@/blog.config'
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export default function filterPublishedPosts({
  posts,
  allTypes,
  onlyNewsletter
}) {
  if (!posts || !posts.length) return []
  const publishedPosts = posts
    .filter((post) =>
      onlyNewsletter
        ? post?.type?.[0] === 'Newsletter'
        : post?.type?.[0] === 'Post' ||
          post?.type?.[0] === 'Page' ||
          post?.type?.[0] === 'Newsletter'
    )
    .filter((post) =>
      allTypes
        ? post?.type?.[0] === 'Post' ||
          post?.type?.[0] === 'Page' ||
          post?.type?.[0] === 'Newsletter'
        : post?.type?.[0] === 'Post'
    )
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime)
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        postDate < tomorrow
      )
    })
  return publishedPosts
}

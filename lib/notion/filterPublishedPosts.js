// import BLOG from '@/blog.config'
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export default function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyHidden
}) {
  if (!posts || !posts.length) return []
  const publishedPosts = posts
    .filter((post) =>
      onlyNewsletter
        ? post?.type?.[0] === 'Newsletter'
        : post
    )
    .filter((post) =>
      onlyPost
        ? post?.type?.[0] === 'Post'
        : post
    )
    .filter((post) =>
      onlyHidden
        ? post?.type?.[0] === 'Hidden'
        : post?.type?.[0] !== 'Hidden'
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

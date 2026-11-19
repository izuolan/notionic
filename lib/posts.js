import dayjs from '@/lib/day'
import BLOG from '@/blog.config'
import { blog } from '@/lib/source'

/**
 * Normalize a Fumadocs page into the legacy post shape used by list UI.
 */
export function toPost(page) {
  const data = page.data
  const slug = page.slugs[0]
  const rawDate = data.date
  const date = rawDate
    ? dayjs(rawDate).valueOf()
    : Date.now()

  return {
    id: `md-${slug}`,
    title: data.title || slug,
    slug,
    type: [data.type || 'Post'],
    status: [data.status || 'Published'],
    date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: data.summary || data.description || '',
    page_cover: data.cover || BLOG.defaultCover || null,
    fullWidth: Boolean(data.fullWidth),
    source: 'markdown',
    url: page.url
  }
}

export function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyHidden
}) {
  if (!posts || !posts.length) return []
  return posts
    .filter((post) =>
      onlyNewsletter ? post?.type?.[0] === 'Newsletter' : post
    )
    .filter((post) => (onlyPost ? post?.type?.[0] === 'Post' : post))
    .filter((post) =>
      onlyHidden
        ? post?.type?.[0] === 'Hidden'
        : post?.type?.[0] !== 'Hidden'
    )
    .filter((post) => {
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        post.date <= Date.now()
      )
    })
}

export function getAllPosts({
  onlyNewsletter = false,
  onlyPost = false,
  onlyHidden = false
} = {}) {
  const pages = blog.getPages()
  const posts = pages.map(toPost)
  const filtered = filterPublishedPosts({
    posts,
    onlyNewsletter,
    onlyPost,
    onlyHidden
  })

  if (BLOG.sortByDate) {
    filtered.sort((a, b) => b.date - a.date)
  }

  return filtered
}

export function getAllTagsFromPosts(posts) {
  const taggedPosts = posts.filter((post) => post?.tags)
  const tags = [...taggedPosts.map((p) => p.tags).flat()]
  const tagObj = {}
  tags.forEach((tag) => {
    if (tag in tagObj) {
      tagObj[tag]++
    } else {
      tagObj[tag] = 1
    }
  })
  return tagObj
}

export function getPageBySlug(slug) {
  return blog.getPage([slug]) || null
}

export function getPostBySlug(slug) {
  const page = getPageBySlug(slug)
  return page ? toPost(page) : null
}

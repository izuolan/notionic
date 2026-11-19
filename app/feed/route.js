import { getAllPosts } from '@/lib/posts'
import { generateRss } from '@/lib/rss'

export async function GET() {
  const posts = getAllPosts({ onlyNewsletter: false })
  const latestPosts = posts.slice(0, 10)
  const xmlFeed = generateRss(latestPosts)

  return new Response(xmlFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}

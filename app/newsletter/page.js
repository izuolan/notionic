import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import NewsletterHero from '@/components/Hero/Newsletter'
import { getAllPosts, getPageBySlug } from '@/lib/posts'
import BLOG from '@/blog.config'

export const metadata = {
  title: BLOG.newsletter,
  description: BLOG.description
}

export default function NewsletterPage() {
  const posts = getAllPosts({ onlyNewsletter: true })
  const heroPage = getPageBySlug('newsletter')
  const HeroMDX = heroPage?.data?.body

  return (
    <Container title={BLOG.newsletter} description={BLOG.description}>
      <NewsletterHero>
        {HeroMDX ? (
          <div className='markdown-body'>
            <HeroMDX />
          </div>
        ) : null}
      </NewsletterHero>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

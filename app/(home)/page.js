import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Hero from '@/components/Hero/Home'
import Pagination from '@/components/Pagination'
import { getAllPosts, getPageBySlug } from '@/lib/posts'
import BLOG from '@/blog.config'

export const metadata = {
  title: BLOG.title,
  description: BLOG.description
}

export default function HomePage() {
  const posts = getAllPosts({ onlyPost: true })
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const showNext = posts.length > BLOG.postsPerPage
  const heroPage = getPageBySlug('index')
  const HeroMDX = heroPage?.data?.body

  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <Hero>
        {HeroMDX ? (
          <div className='markdown-body'>
            <HeroMDX />
          </div>
        ) : null}
      </Hero>
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={1} showNext={showNext} />}
    </Container>
  )
}

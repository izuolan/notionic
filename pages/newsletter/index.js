import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import NewsletterHero from '@/components/Hero/Newsletter'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps() {
  const posts = await getAllPosts({ allTypes: true, onlyNewsletter: true })
  return {
    props: {
      posts
    },
    revalidate: 1
  }
}

const newsletter = ({ posts }) => {
  return (
    <Container title={BLOG.newsletter} description={BLOG.description}>
      <NewsletterHero />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default newsletter

import Container from '@/components/Container' // 导入Container组件
import BlogPost from '@/components/BlogPost' // 导入BlogPost组件
import NewsletterHero from '@/components/Hero/Newsletter' // 导入NewsletterHero组件
import { getAllPosts, getPostBlocks } from '@/lib/notion' // 导入getAllPosts和getPostBlocks函数
import BLOG from '@/blog.config' // 导入BLOG配置

export async function getStaticProps() {
  // 获取所有只包含Newsletter的帖子
  const posts = await getAllPosts({ onlyNewsletter: true })

  // 获取所有隐藏的帖子
  const heros = await getAllPosts({ onlyHidden: true })
  // 找到slug为'newsletter'的帖子
  const hero = heros.find((t) => t.slug === 'newsletter')

  let blockMap
  try {
    // 获取hero的blockMap
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      posts,
      blockMap
    },
    revalidate: 1
  }
}

// 定义newsletter函数
const newsletter = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.newsletter} description={BLOG.description}>
      <NewsletterHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default newsletter // 导出newsletter函数
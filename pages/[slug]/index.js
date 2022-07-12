import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
// import { createHash } from 'crypto'

const BlogPost = ({ post, blockMap }) => {
  if (!post) return null
  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ allTypes: true, onlyNewsletter: false })
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts({ allTypes: true, onlyNewsletter: false })
  const post = posts.find((t) => t.slug === slug)
  const blockMap = await getPostBlocks(post.id)
  // const emailHash = createHash('md5')
  //   .update(BLOG.email)
  //   .digest('hex')
  //   .trim()
  //   .toLowerCase()

  return {
    props: { post, blockMap },
    revalidate: 1
  }
}

export default BlogPost

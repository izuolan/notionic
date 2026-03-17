import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { getMarkdownContent } from '@/lib/markdown/getMarkdownContent'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'

const Post = ({ post, blockMap, content }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Loading />
    )
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }
  return (
    <Layout blockMap={blockMap} content={content} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts({ onlyNewsletter: false })
  const post = posts.find((t) => t.slug === slug)

  if (!post) {
    return { props: { post: null, blockMap: null, content: null } }
  }

  if (post.source === 'markdown') {
    try {
      const content = await getMarkdownContent(slug)
      return {
        props: { post, blockMap: null, content },
        revalidate: 60
      }
    } catch (err) {
      console.error(err)
      return { props: { post: null, blockMap: null, content: null } }
    }
  }

  try {
    const blockMap = await getPostBlocks(post.id)
    return {
      props: { post, blockMap, content: null },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
    return {
      props: { post: null, blockMap: null, content: null }
    }
  }
}

export default Post

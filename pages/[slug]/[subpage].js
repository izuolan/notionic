import BLOG from '@/blog.config'
import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'

const BlogPost = ({ post, blockMap }) => {
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
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params: { slug, subpage } }) {
  const posts = await getAllPosts({ allTypes: true, onlyNewsletter: false })
  const post = posts.find((t) => t.slug === slug)

  let blockMap
  try {
    blockMap = await getPostBlocks(subpage)
  } catch (err) {
    console.error(err)
    return { props: { post: null, blockMap: null } }
  }

  const NOTION_SPACES_ID = BLOG.notionSpacesId
  const pageAllowed = (page) => {
    // see if any page.block[key].value.space_id is in NOTION_SPACES_ID
    let allowed = false
    Object.values(page.block).forEach(block => {
      if (!allowed && block.value && block.value.space_id) {
        allowed = NOTION_SPACES_ID.includes(block.value.space_id)
      }
    })
    return allowed
  }

  if (!pageAllowed(blockMap)) {
    return { props: { post: null, blockMap: null } }
  } else {
    return {
      props: { post, blockMap },
      revalidate: 1
    }
  }
}

export default BlogPost

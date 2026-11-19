import Container from '@/components/Container'
import Content from '@/components/Post/Content'
import Aside from '@/components/Post/Aside'
import Comments from '@/components/Post/Comments'
import PostFooter from '@/components/Post/PostFooter'
import PageChromeSync from '@/components/PageChromeSync'

const Layout = ({
  children,
  toc = [],
  frontMatter,
  fullWidth = false
}) => {
  return (
    <>
      <PageChromeSync
        navBarTitle={frontMatter.title}
        fullWidth={fullWidth}
        cover={frontMatter.page_cover}
      />
      <Container
        title={frontMatter.title}
        description={frontMatter.summary}
        type='article'
        fullWidth={fullWidth}
      >
        <div className='flex flex-row'>
          <Content frontMatter={frontMatter}>{children}</Content>
          <Aside frontMatter={frontMatter} toc={toc} />
        </div>
        <PostFooter />
        <Comments frontMatter={frontMatter} />
      </Container>
    </>
  )
}

export default Layout

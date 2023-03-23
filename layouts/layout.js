import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
// import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NotionRenderer } from 'react-notion-x'
import { getPageTitle } from 'notion-utils'

import Aside from '@/components/Post/Aside'
import Comments from '@/components/Post/Comments'
import Container from '@/components/Container'
import PostFooter from '@/components/Post/PostFooter'
import TagItem from '@/components/Common/TagItem'

import { ChevronLeftIcon } from '@heroicons/react/outline'
import { motion } from 'framer-motion'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-yaml.js'),
      import('prismjs/components/prism-javascript.js'),
      import('prismjs/components/prism-typescript.js')
    ])
    return m.Code
  }), { ssr: true }
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then((m) => m.Collection), { ssr: true }
)

// const Equation = dynamic(() =>
//   import('react-notion-x/build/third-party/equation').then((m) => m.Equation), { ssr: true }
// )

// const Modal = dynamic(
//   () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal), { ssr: false }
// )

// TODO: Dirty code! 也许是上游 Notion-X 的一个 bug, 不太确定. 暂时通过监控 DOM 变化来删除重复出现的代码块内容.
// Watch DOM changes, detail here: https://github.com/tangly1024/NotionNext/pull/227
function domWatcher(subPage) {
  // Select nodes that need to observe the change
  const targetNode = document?.getElementsByTagName('article')[0]
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  }
  // The callback function executed when observing the change
  const mutationCallback = (mutations) => {
    for (const mutation of mutations) {
      const type = mutation.type
      switch (type) {
        case 'childList':
          if (mutation.target.className === 'notion-code-copy') {
            delRepeatCode(mutation.target, subPage)
          } else if (mutation.target.className?.indexOf('language-') > -1) {
            const copyCode = mutation.target.parentElement?.firstElementChild
            if (copyCode) {
              delRepeatCode(copyCode, subPage)
            }
          }
          // console.log('A child node has been added or removed.')
          break
        case 'attributes':
          // console.log(`The ${mutation.attributeName} attribute was modified.`)
          // console.log(mutation.attributeName)
          break
        case 'subtree':
          // console.log('The subtree was modified.')
          break
        default:
          break
      }
    }
  }
  const observer = new MutationObserver(mutationCallback)
  observer.observe(targetNode, config)
  // observer.disconnect()
}

function delRepeatCode(codeCopy, subPage) {
  const codeEnd = codeCopy.parentElement.lastElementChild
  const length = codeEnd.childNodes.length
  const codeLast = codeEnd.lastChild
  const codeSecondLast = codeEnd.childNodes[length - 2]
  // console.log('codeSecondLast', codeSecondLast)
  // console.log('codeLast', codeLast)
  if (subPage && codeEnd.childNodes.length > 1 && codeLast.nodeName === '#text' && codeSecondLast.nodeName === '#text') {
    codeLast.nodeValue = null
  }
  if (!subPage && codeEnd.childNodes.length > 1 && codeLast.nodeName === '#text') {
    codeLast.nodeValue = null
  }
}

const Layout = ({ children, blockMap, frontMatter, fullWidth = false, subPage = false }) => {
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)
  const { locale } = useRouter()

  const mapPageUrl = (id) => {
    // console.log('mapPageUrl', BLOG.lang.split('-')[0])
    if (locale === BLOG.lang.split('-')[0]) {
      return '/s/' + id.replace(/-/g, '')
    } else {
      return '/' + locale + '/s/' + id.replace(/-/g, '')
    }
  }

  // console.log('notion page', {
  //   frontMatter,
  //   blockMap
  // })

  const subPageTitle = getPageTitle(blockMap)
  useEffect(() => {
    if (frontMatter.title !== subPageTitle) {
      setShowSubPageTitle(true)
    }
    domWatcher(subPage)
  }, [frontMatter, subPageTitle, subPage])

  return (
    <Container
      title={`${frontMatter.title}${showSubPageTitle ? ' | ' + subPageTitle : ''}`}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type='article'
      fullWidth={fullWidth}
    >
      <motion.div className='flex flex-row'>
        <article className='flex-none md:overflow-x-visible overflow-x-scroll w-full'>
          {showSubPageTitle && (
            <Link
              passHref
              href={`${BLOG.path}/${frontMatter.slug}`}
              scroll={false}
              className='text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition duration-100'
            >
              <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />
              <span className='m-1'>{frontMatter.title}</span>
            </Link>
          )}
          <h1 className='font-bold text-3xl text-black dark:text-white'>
            {subPageTitle}
          </h1>
          {frontMatter.type[0] !== 'Page' && (
            <nav className='flex mt-5 mb-10 items-start text-gray-500 dark:text-gray-400'>
              <div className='mr-2 mb-4 md:ml-0'>
                {formatDate(
                  frontMatter?.date?.start_date || frontMatter.createdTime,
                  locale
                )}
              </div>
              {frontMatter.tags && (
                <div className='flex flex-nowrap max-w-full overflow-x-auto article-tags'>
                  {frontMatter.tags.map((tag) => (
                    <TagItem key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </nav>
          )}
          {children}
          {blockMap && (
            <div className='-mt-4'>
              <NotionRenderer
                recordMap={blockMap}
                mapPageUrl={mapPageUrl}
                previewImages={BLOG.previewImagesEnabled}
                components={{
                  Code,
                  Collection,
                  nextLink: Link
                  // nextImage: Image
                }}
              />
            </div>
          )}
        </article>
        <Aside subPageTitle={subPageTitle} frontMatter={frontMatter} />
      </motion.div>

      <PostFooter />
      <Comments frontMatter={frontMatter} />
    </Container>
  )
}

export default Layout

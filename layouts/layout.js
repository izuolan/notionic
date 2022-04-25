import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { lang } from '@/lib/lang'
import {
  NotionRenderer,
  Equation,
  Code,
  Collection,
  CollectionRow
} from 'react-notion-x'
import Container from '@/components/Container'
import TagItem from '@/components/TagItem'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import Comments from '@/components/Comments'
import { ArrowUpIcon, MailIcon, ThumbUpIcon } from '@heroicons/react/outline'

const mapPageUrl = (id) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

const Layout = ({ children, blockMap, frontMatter, fullWidth = false }) => {
  const [showButton, setShowButton] = useState(false)
  const [showPay, setShowPay] = useState(false)

  const { locale } = useRouter()
  const t = lang[locale]
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 900) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  return (
    <Container
      layout='blog'
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type='article'
      fullWidth={fullWidth}
    >
      <div className='flex flex-row'>
        <article className='flex-none md:overflow-x-visible overflow-x-scroll w-full'>
          <h1 className='font-bold text-3xl text-black dark:text-white'>
            {frontMatter.title}
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
                components={{
                  equation: Equation,
                  code: Code,
                  collection: Collection,
                  collectionRow: CollectionRow
                }}
                mapPageUrl={mapPageUrl}
              />
            </div>
          )}
        </article>
        {frontMatter.type[0] !== 'Page' && (
          <aside className='hidden sticky md:flex md:flex-col md:items-center md:self-start md:ml-8 md:inset-y-1/2'>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-gray-100 dark:bg-gray-700 grid rounded-lg block p-2 gap-y-5 nav'>
                <button
                  onClick={() => setShowPay((showPay) => !showPay)}
                  className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
                >
                  <ThumbUpIcon className='w-5 h-5' />
                </button>
                {showButton && (
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
                  >
                    <ArrowUpIcon className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
      <div className='w-full pb-12 justify-between font-medium text-gray-500 dark:text-gray-400'>
        <div className='flex flex-wrap sm:flex-nowrap sm:justify-between items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 relative gap-3 px-4 py-3'>
          <div className='w-full sm:w-auto max-w-screen-sm inline-block text-sm font-light md:text-base mb-2 sm:mb-0'>
            {t.LAYOUT.NOTICE_TEXT}
          </div>
          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => setShowPay((showPay) => !showPay)}
              className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
            >
              <ThumbUpIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
              {t.LAYOUT.PAY_BUTTON}
            </button>
            <button
              onClick={() => router.push(BLOG.path || '/contact')}
              className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
            >
              <MailIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
              {t.LAYOUT.NOTICE_BUTTON}
            </button>
          </div>
        </div>

        {showButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='md:hidden fixed inline-flex z-10 shadow bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg bottom-5 right-5'
          >
            <ArrowUpIcon className='text-gray-600 dark:text-day w-5 h-5' />
          </button>
        )}

        {showPay && (
          <div className='fixed inline-flex z-10 shadow-lg bg-gray-100 dark:bg-gray-400 p-5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Image
              src='/wechat-pay.png'
              alt='WeChat Pay'
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
      <Comments frontMatter={frontMatter} />
    </Container>
  )
}

export default Layout

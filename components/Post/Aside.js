import BLOG from '@/blog.config'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import TableOfContents from '@/components/Post/TableOfContents'
import WechatPay from '@/components/Post/WechatPay'
import { HandThumbUpIcon, ChevronLeftIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

const Aside = ({ pageTitle, blockMap, frontMatter }) => {
  const [showPay, setShowPay] = useState(false)
  const [showScrollElement, setShowScrollElement] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setShowScrollElement(true)
      } else {
        setShowScrollElement(false)
      }
    })
  }, [frontMatter, pageTitle])
  return (
    <>
      <aside className='hidden sticky md:flex md:flex-col md:items-center md:self-start md:ml-8 md:inset-y-1/2'>
        <div className='flex flex-col items-center text-center'>
          <div className='bg-gray-100 dark:bg-gray-700 grid rounded-lg p-2 gap-y-5 nav'>
            {BLOG.showWeChatPay && (
              <button
                onClick={() => setShowPay((showPay) => !showPay)}
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400 cursor-pointer'
              >
                <HandThumbUpIcon className='w-5 h-5' />
              </button>
            )}
            {pageTitle && (
              <Link
                passHref
                href={`${BLOG.path}/${frontMatter.slug}`}
                scroll={false}
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
              >
                <ChevronLeftIcon className='w-5 h-5' />
              </Link>
            )}
            {showScrollElement && (
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400 cursor-pointer'
              >
                <ArrowUpIcon className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>
        <TableOfContents
          blockMap={blockMap}
          pageTitle={pageTitle}
          frontMatter={frontMatter}
          showScrollElement={showScrollElement}
        />
      </aside>
      {showPay && <WechatPay onClose={() => setShowPay(false)} />}
      {showScrollElement && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='md:hidden fixed inline-flex bottom-5 right-5 p-2 rounded-lg z-10 shadow bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer'
        >
          <ArrowUpIcon className='text-gray-600 dark:text-day w-5 h-5' />
        </button>
      )}
    </>
  )
}

export default Aside

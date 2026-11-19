'use client'

import PropTypes from 'prop-types'
import Link from 'next/link'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import BLOG from '@/blog.config'

export default function TableOfContents({
  toc = [],
  frontMatter,
  pageTitle,
  showScrollElement
}) {
  if (!toc?.length || !showScrollElement) return null

  const getLevelStyles = (depth) => {
    const styles = {
      1: 'pl-2 text-gray-700 dark:text-gray-300 font-medium',
      2: 'pl-6 text-gray-600 dark:text-gray-400',
      3: 'pl-10 text-gray-500 dark:text-gray-500 text-xs'
    }
    return styles[depth] || styles[3]
  }

  function scrollTo(url) {
    const id = (url || '').replace(/^#/, '')
    if (!id) return
    const target =
      document.getElementById(id) ||
      document.querySelector(`[id="${CSS.escape(id)}"]`)
    if (!target) return
    const top =
      document.documentElement.scrollTop +
      target.getBoundingClientRect().top -
      65
    document.documentElement.scrollTo({
      top,
      behavior: 'smooth'
    })
  }

  return (
    <div className='table-of-contents toc-fade-in'>
      {pageTitle && (
        <Link
          passHref
          href={`${BLOG.path}/${frontMatter.slug}`}
          scroll={false}
          className='block -ml-6 mb-2 p-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg'
        >
          <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />
          <span className='ml-1'>{frontMatter.title}</span>
        </Link>
      )}
      {toc.map((node) => {
        const depth = Math.min(Math.max(node.depth || 1, 1), 3)
        const levelStyles = getLevelStyles(depth)
        const key = node.url || node.title

        return (
          <div
            key={key}
            className='hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg transition-colors relative'
          >
            <a
              data-target-id={node.url}
              className={`block py-1.5 px-2 cursor-pointer transition-colors relative ${levelStyles}`}
              onClick={() => scrollTo(node.url)}
              title={typeof node.title === 'string' ? node.title : undefined}
            >
              {depth > 1 && (
                <span
                  className='absolute top-1/2 transform -translate-y-1/2 w-1 h-1 bg-current rounded-full opacity-60'
                  style={{ left: `${depth === 2 ? '12px' : '24px'}` }}
                />
              )}
              <span className={depth > 1 ? 'truncate block' : ''}>
                {node.title}
              </span>
            </a>
          </div>
        )
      })}
    </div>
  )
}

TableOfContents.propTypes = {
  toc: PropTypes.array,
  frontMatter: PropTypes.object.isRequired,
  pageTitle: PropTypes.string,
  showScrollElement: PropTypes.bool.isRequired
}

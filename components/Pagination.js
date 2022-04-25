import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

const Pagination = ({ page, showNext }) => {
  const { locale } = useRouter()
  const t = lang[locale]
  const currentPage = +page
  let additionalClassName = 'justify-between'
  if (currentPage === 1 && showNext) additionalClassName = 'justify-end'
  if (currentPage !== 1 && !showNext) additionalClassName = 'justify-start'
  return (
    <div
      className={`flex font-medium text-black dark:text-gray-100 ${additionalClassName}`}
    >
      {currentPage !== 1 && (
        <Link
          href={
            currentPage - 1 === 1
              ? `${BLOG.path || '/'}`
              : `/page/${currentPage - 1}`
          }
        >
          <a>
            <button rel='prev' className='block cursor-pointer'>
              <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />{' '}
              {t.PAGINATION.PREV}
            </button>
          </a>
        </Link>
      )}
      {showNext && (
        <Link href={`/page/${currentPage + 1}`}>
          <a>
            <button rel='next' className='block cursor-pointer'>
              {t.PAGINATION.NEXT}{' '}
              <ChevronRightIcon className='inline-block mb-1 h-5 w-5' />
            </button>
          </a>
        </Link>
      )}
    </div>
  )
}

export default Pagination

import Link from 'next/link'
import NotionAvatar from '../NotionAvatar.js'
import Social from '../Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  NewspaperIcon,
  CollectionIcon,
  MailIcon,
  RssIcon
} from '@heroicons/react/outline'

const Hero = () => {
  const [showLoading, setShowLoading] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]
  return (
    <>
      <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
        <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left'>
          <p className='leading-relaxed'>
            {t.HERO.HOME.TEXT_HEAD}
          </p>
          <ul className='m-4 leading-relaxed'>
            <li className='list-disc'>
              {t.HERO.HOME.TEXT_1}
              <Link passHref href='/newsletter'>
                <a className='text-gray-600 dark:text-gray-400'>
                  <NewspaperIcon className='inline-block ml-1 mb-1 h-5 w-5' />{' '}
                  {t.NAV.NEWSLETTER}
                </a>
              </Link>
            </li>
            <li className='list-disc'>
              {t.HERO.HOME.TEXT_2}
              <Link passHref href='/notes'>
                <a className='text-gray-600 dark:text-gray-400'>
                  <CollectionIcon className='inline-block ml-1 mb-1 h-5 w-5' />{' '}
                  {t.NAV.NOTES}
                </a>
              </Link>
            </li>
            <li className='list-disc'>{t.HERO.HOME.TEXT_3}</li>
          </ul>
          <Social />
          <div className='flex flex-col sm:flex-row sm:justify-center gap-4 mt-6'>
            <Link passHref href='/contact'>
              <button className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'>
                <MailIcon className='inline-block text-gray-600 dark:text-day h-7 w-7' />
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.HOME.CONTACT_BUTTON_DES}
                  </span>
                  <span className='font-medium'>{t.HERO.HOME.CONTACT_BUTTON}</span>
                </span>
              </button>
            </Link>
            {showLoading ? (
              <button
                disabled
                className='bg-gray-200 dark:bg-gray-600 cursor-not-allowed inline-flex py-3 px-5 rounded-lg items-center'
              >
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600 dark:text-day'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='gray'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES_LOADING}
                  </span>
                  <span className='font-medium'>
                    {t.HERO.RSS_BUTTON_LOADING}
                  </span>
                </span>
              </button>
            ) : (
              <Link passHref href='/feed'>
                <button
                  onClick={() => setShowLoading(true)}
                  className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
                >
                  <RssIcon className='inline-block text-gray-600 dark:text-day h-7 w-7' />
                  <span className='ml-4 flex items-start flex-col leading-none'>
                    <span className='text-xs text-gray-600 dark:text-day mb-1'>
                      {t.HERO.RSS_BUTTON_DES}
                    </span>
                    <span className='font-medium'>{t.HERO.HOME.RSS_BUTTON}</span>
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className='w-2/5'>
          <NotionAvatar className='text-gray-800 dark:text-gray-200' />
        </div>
      </div>
    </>
  )
}

export default Hero

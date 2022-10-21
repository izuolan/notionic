import BLOG from '@/blog.config'
import Link from 'next/link'
import Avatar from './Avatar.js'
import Social from '../Common/Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  NewspaperIcon,
  CollectionIcon,
  MailIcon,
  RssIcon,
  ClipboardCheckIcon
} from '@heroicons/react/outline'

const Hero = () => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

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
              <Link passHref href='/newsletter' scroll={false}>
                <a className='text-gray-600 dark:text-gray-400'>
                  <NewspaperIcon className='inline-block ml-1 mb-1 h-5 w-5' />{' '}
                  {t.NAV.NEWSLETTER}
                </a>
              </Link>
            </li>
            <li className='list-disc'>
              {t.HERO.HOME.TEXT_2}
              <Link passHref href='/notes' scroll={false}>
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
            <Link passHref href='/contact' scroll={false}>
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
            {showCopied ? (
              <button
                disabled
                className='bg-gray-200 dark:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
              >
                <ClipboardCheckIcon className='inline-block text-gray-600 dark:text-day h-7 w-7' />
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES_COPIED}
                  </span>
                  <span className='font-medium'>
                    {t.HERO.RSS_BUTTON_COPIED}
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => clickCopy()}
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
            )}
          </div>
        </div>
        <div className='w-2/5'>
          <Avatar className='text-gray-600 dark:text-gray-300' />
        </div>
      </div>
    </>
  )
}

export default Hero

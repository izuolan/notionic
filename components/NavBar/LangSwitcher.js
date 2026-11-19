'use client'

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/components/LocaleProvider'
import { addLocalePrefix, DEFAULT_LOCALE, stripLocalePrefix } from '@/lib/locale'

const LangSwitcher = () => {
  const locale = useLocale()
  const pathname = usePathname() || '/'
  const { pathname: barePath } = stripLocalePrefix(pathname)
  const nextLocale = locale === 'en' ? 'zh' : 'en'
  const href = addLocalePrefix(barePath, nextLocale === DEFAULT_LOCALE ? DEFAULT_LOCALE : nextLocale)

  return (
    <>
      <Link passHref href={href} scroll={false}>
        <button
          aria-label='LangSwitcher'
          className='p-2 nav-hover cursor-pointer rounded-lg dark:text-gray-100'
        >
          <LanguageIcon className='h-5 w-5' />
        </button>
      </Link>
    </>
  )
}

export default LangSwitcher

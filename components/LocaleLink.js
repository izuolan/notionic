'use client'

import Link from 'next/link'
import { useLocale } from '@/components/LocaleProvider'
import { addLocalePrefix, DEFAULT_LOCALE } from '@/lib/locale'

export default function LocaleLink({ href, children, ...props }) {
  const locale = useLocale()
  const localizedHref =
    typeof href === 'string' ? addLocalePrefix(href, locale) : href

  return (
    <Link href={localizedHref || (locale === DEFAULT_LOCALE ? '/' : `/${locale}`)} {...props}>
      {children}
    </Link>
  )
}

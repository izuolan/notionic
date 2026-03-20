import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const LOCALE_MAP = {
  zh: 'zh-cn',
  en: 'en'
}

function toDayjsLocale (locale) {
  if (!locale) return LOCALE_MAP[BLOG.lang.slice(0, 2)] || BLOG.lang.slice(0, 2)
  return LOCALE_MAP[locale] || locale
}

export default function FormattedDate ({ date }) {
  const { locale } = useRouter()
  const [formattedDate, setFormattedDate] = useState(null)

  useEffect(() => {
    const dayjsLocale = toDayjsLocale(locale)
    import(`dayjs/locale/${dayjsLocale}`)
      .then(() => {
        dayjs.locale(dayjsLocale)
        setFormattedDate(dayjs(date).format('ll'))
      })
      .catch(() => {
        setFormattedDate(dayjs(date).format('ll'))
      })
  }, [locale, date])

  if (!formattedDate) {
    return null
  }
  return <span>{formattedDate}</span>
}

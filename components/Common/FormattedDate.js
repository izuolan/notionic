import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

// Set the default language to BLOG.lang
dayjs.extend(localizedFormat)
const lang = BLOG.lang.slice(0, 2)
import(`dayjs/locale/${lang}`)
  .then(() => {
    dayjs.locale(BLOG.lang.slice(0, 2))
  })
  .catch(() => console.warn(`dayjs locale \`${lang}\` not found`))

export default function FormattedDate ({ date }) {
  const [ hasMounted, setHasMounted ] = useState(false)
  const { locale } = useRouter()

  // When switching languages, the date format will also change correspondingly.
  const formattedDate = useMemo(() => {
    try {
      import(`dayjs/locale/${locale}`)
      dayjs.locale(locale)
    } catch (err) {
      console.warn(`dayjs locale \`${locale}\` not found`)
    }
    return dayjs(date).format('ll')
  }, [locale, date])

  // Solving the problem of inconsistent rendering between server-side and client-side.
  useEffect(() => {
    setHasMounted(true)
  }, [locale])

  if (!hasMounted) {
    return null
  }
  return <span>{formattedDate}</span>
}

'use client'

import { createContext, useContext, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { DEFAULT_LOCALE, stripLocalePrefix } from '@/lib/locale'

const LocaleContext = createContext(DEFAULT_LOCALE)

export function LocaleProvider({ locale: serverLocale, children }) {
  const pathname = usePathname() || '/'
  const locale = useMemo(() => {
    const fromPath = stripLocalePrefix(pathname).locale
    return fromPath || serverLocale || DEFAULT_LOCALE
  }, [pathname, serverLocale])

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext) || DEFAULT_LOCALE
}

export const LOCALES = ['en', 'zh']
export const DEFAULT_LOCALE = 'en'
export const LOCALE_HEADER = 'x-locale'

export function isLocale(value) {
  return LOCALES.includes(value)
}

export function stripLocalePrefix(pathname) {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) {
      return { locale, pathname: '/' }
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return {
        locale,
        pathname: pathname.slice(locale.length + 1) || '/'
      }
    }
  }
  return { locale: DEFAULT_LOCALE, pathname }
}

export function addLocalePrefix(pathname, locale) {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (!locale || locale === DEFAULT_LOCALE) return path
  if (path === '/') return `/${locale}`
  return `/${locale}${path}`
}

import { NextResponse } from 'next/server'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_HEADER,
  stripLocalePrefix
} from '@/lib/locale'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip next internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/share') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const { locale, pathname: barePath } = stripLocalePrefix(pathname)

  // Non-default locale: rewrite to unprefixed route and pass locale header
  if (locale !== DEFAULT_LOCALE && pathname !== barePath) {
    const url = request.nextUrl.clone()
    url.pathname = barePath
    const response = NextResponse.rewrite(url)
    response.headers.set(LOCALE_HEADER, locale)
    return response
  }

  const response = NextResponse.next()
  response.headers.set(LOCALE_HEADER, DEFAULT_LOCALE)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}

// Silence unused import in some bundlers
void LOCALES

'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useLocale } from '@/components/LocaleProvider'
import LocaleLink from '@/components/LocaleLink'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import NewspaperIcon from '@heroicons/react/24/outline/NewspaperIcon'
import RectangleStackIcon from '@heroicons/react/24/outline/RectangleStackIcon'
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import Social from '../Common/Social.js'
import ThemeSwitcher from './ThemeSwitcher.js'
import LangSwitcher from './LangSwitcher.js'
import Logo from '@/components/Common/Logo'
import { stripLocalePrefix } from '@/lib/locale'

const NavBar = () => {
  const pathname = usePathname() || '/'
  const locale = useLocale()
  const t = lang[locale]
  const [showMenu, setShowMenu] = useState(false)
  const { pathname: barePath } = stripLocalePrefix(pathname)

  let activeMenu = barePath
  // Treat /about etc as slug menus
  if (barePath !== '/' && !barePath.startsWith('/page/')) {
    // keep barePath as activeMenu
  }

  const links = [
    {
      id: 0,
      name: t.NAV.INDEX,
      to: BLOG.path || '/',
      icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 1,
      name: t.NAV.NEWSLETTER,
      to: '/newsletter',
      icon: <NewspaperIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.newsletter
    },
    {
      id: 2,
      name: t.NAV.NOTES,
      to: '/notes',
      icon: <RectangleStackIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.notes
    },
    {
      id: 3,
      name: t.NAV.PROJECTS,
      to: '/projects',
      icon: <SparklesIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.projects
    },
    {
      id: 4,
      name: t.NAV.SEARCH,
      to: '/search',
      icon: <MagnifyingGlassIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    }
  ]
  return (
    <div className='flex nav-bar-pill backdrop-blur-sm md:p-1 bg-gray-100/40 dark:bg-gray-800/40 rounded-xl'>
      <ul className='hidden md:flex md:gap-1'>
        {links.map(
          (link) =>
            link.show && (
              <LocaleLink passHref href={link.to} key={link.id} scroll={false}>
                <li
                  className={`${
                    activeMenu === link.to ? 'bg-gray-500/10 dark:bg-gray-300/10' : ''
                  } nav-hover cursor-pointer rounded-lg block nav py-1 px-2`}
                >
                  <div className='font-light'>
                    {link.icon}
                    <span className='inline-block m-1'>{link.name}</span>
                  </div>
                </li>
              </LocaleLink>
            )
        )}
      </ul>

      <div className='nav-func-btn block'>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>

      <div className='md:hidden block mr-2'>
        <button
          type='button' aria-label='Menu'
          onClick={() => setShowMenu((showMenu) => !showMenu)}
          className='nav-hover cursor-pointer rounded-lg block p-1 m-1 -mr-1'
        >
          <Bars3Icon className='inline-block mb-1 h-5 w-5' />
        </button>
        {showMenu && (
          <div className='absolute right-0 w-40 mr-1 mt-1 bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg outline-none'>
            <div className='py-1'>
              {links.map(
                (link) =>
                  link.show && (
                    <LocaleLink passHref key={link.id} href={link.to} scroll={false}>
                      <button
                        onClick={() => setShowMenu((showMenu) => !showMenu)}
                        className='text-left hover:bg-gray-100 dark:hover:bg-gray-600 font-light block justify-between w-full px-4 py-2 leading-5'
                      >
                        {link.icon}
                        <span className='m-1'>{link.name}</span>
                      </button>
                    </LocaleLink>
                  )
              )}
            </div>
            <div className='px-4 py-4'>
              <Social />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const [showTitle, setShowTitle] = useState(false)
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const handler = useCallback(([entry]) => {
    if (useSticky && navRef.current) {
      navRef.current?.classList.toggle('sticky-nav-full', !entry.isIntersecting)
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }, [useSticky])

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler)
    if (sentinelEl) observer.observe(sentinelEl)

    const readPastThreshold = () => window.pageYOffset > 400
    let lastPast = readPastThreshold()
    setShowTitle(lastPast)
    let raf = 0
    const flush = () => {
      raf = 0
      const next = readPastThreshold()
      if (next !== lastPast) {
        lastPast = next
        setShowTitle(next)
      }
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(flush)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [handler])
  return (
    <>
      <div className='observer-element h-4 md:h-12' ref={sentinelRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id='sticky-nav'
        ref={navRef}
      >
        <div className='flex items-center'>
          <LocaleLink passHref href='/' scroll={false} aria-label={BLOG.title}>
            <div>
              <Logo className='h-6 hover:text-blue-500 fill-current' />
            </div>
          </LocaleLink>
          {navBarTitle ? (
            <p
              className={`ml-5 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {navBarTitle}
            </p>
          ) : (
            <p
              className={`ml-5 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {BLOG.title},{' '}
              <span className='font-normal'>{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header

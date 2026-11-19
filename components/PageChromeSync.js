'use client'

import { useEffect } from 'react'
import { usePageChrome } from '@/components/PageChromeProvider'

/**
 * Sync article chrome (title, cover, fullWidth) into the shared header context.
 */
export default function PageChromeSync({ navBarTitle, fullWidth, cover }) {
  const { setChrome } = usePageChrome()

  useEffect(() => {
    setChrome({
      navBarTitle: navBarTitle || null,
      fullWidth: Boolean(fullWidth),
      cover: cover || null
    })
    return () => {
      setChrome({
        navBarTitle: null,
        fullWidth: false,
        cover: null
      })
    }
  }, [navBarTitle, fullWidth, cover, setChrome])

  return null
}

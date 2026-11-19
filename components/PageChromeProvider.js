'use client'

import { createContext, useContext, useMemo, useState } from 'react'

const PageChromeContext = createContext({
  navBarTitle: null,
  fullWidth: false,
  cover: null,
  setChrome: () => {}
})

export function PageChromeProvider({ children }) {
  const [chrome, setChrome] = useState({
    navBarTitle: null,
    fullWidth: false,
    cover: null
  })

  const value = useMemo(
    () => ({
      ...chrome,
      setChrome
    }),
    [chrome]
  )

  return (
    <PageChromeContext.Provider value={value}>
      {children}
    </PageChromeContext.Provider>
  )
}

export function usePageChrome() {
  return useContext(PageChromeContext)
}

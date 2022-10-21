import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])
  return (
    <>
      <button
        // title={`Toggle theme - current ${theme}`}
        onClick={() =>
          setTheme(
            theme === 'light' ? 'dark' : theme === 'system' ? 'dark' : 'light'
          )
        }
        className='ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 cursor-pointer rounded-lg dark:text-gray-50'
      >
        {hasMounted && theme === 'dark' ? (
          <MoonIcon className='h-5 w-5' />
        ) : (
          <SunIcon className='h-5 w-5' />
        )}
      </button>
    </>
  )
}

export default ThemeSwitcher

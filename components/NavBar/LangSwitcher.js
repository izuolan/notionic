import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LangSwitcher = () => {
  const { locale, asPath } = useRouter()

  return (
    <>
      <Link passHref href={asPath} locale={locale === 'en' ? 'zh' : 'en'} scroll={false}>
        <button
          aria-label='LangSwitcher'
          className='p-2 hover:bg-gray-200/30 dark:hover:bg-gray-700/30 cursor-pointer rounded-lg dark:text-gray-100'
className = 'p-2 hover:bg-gray-200/20 dark:hover:bg-gray-700/20 cursor-pointer rounded-lg dark:text-gray-100'  
        >
          <LanguageIcon className='h-5 w-5' />
        </button>
      </Link>
    </>
  )
}

export default LangSwitcher

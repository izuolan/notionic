'use client'

import { lang } from '@/lib/lang'
import { useLocale } from '@/components/LocaleProvider'
import Social from '../Common/Social.js'
import Avatar from './Avatar.js'

const NoteHero = ({ children }) => {
  const locale = useLocale()
  const t = lang[locale]
  return (
    <>
      <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
        <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left min-h-[8rem]'>
          {children}
          <Social />
          <div className='text-gray-400 text-xs font-light py-4'>
            {t.HERO.NOTES.TEXT_FOOTER}
          </div>
        </div>
        <Avatar className='flex items-center justify-center' />
      </div>
    </>
  )
}

export default NoteHero

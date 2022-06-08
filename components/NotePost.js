import Link from 'next/link'
import ImageFallback from './ImageFallback.js'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

const NotePost = ({ note }) => {
  const { locale } = useRouter()
  const t = lang[locale]
  const craftSlug = note.link.slice(23)

  if (note.title === 'NULL') {
    return (
      <div className='text-gray-400 text-xs font-light py-4'>
        {t.ERROR.CRAFTDOCS_ERROR}
      </div>
    )
  }

  return (
    <Link passHref href={`${BLOG.link}/notes/${note.path}`}>
      <a
        key={craftSlug}
        target="_blank"
        className='mb-10 group h-60 flex items-end bg-gray-100 rounded-lg overflow-hidden relative p-4'
      >
        <ImageFallback
          className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition duration-200'
          src={`https://api.craft.do/render/preview/${craftSlug}`}
          fallbackSrc = '/secret_preview.png'
          alt={`${note.title}`}
          layout='fill'
        />
        <div className='md:hidden bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80 absolute inset-0 pointer-events-none'></div>
        <div className='md:hidden flex flex-col relative'>
          <span className='text-white text-lg lg:text-xl font-semibold'>
            {note.title}
          </span>
        </div>
      </a>
    </Link>
  )
}

export default NotePost

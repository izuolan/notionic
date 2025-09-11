import BLOG from '@/blog.config.js'
import Link from 'next/link'
import ImageFallback from './Common/ImageFallback.js'

const NotePost = ({ note }) => {
  const craftSlug = note.url.slice(23)
  return (
    <Link
      passHref
      href={`/notes/${note.slug}`}
      key={craftSlug} className='mb-10 group h-60 flex items-end bg-gray-100 rounded-lg overflow-hidden relative p-4'
    >
      <ImageFallback
        className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition duration-200'
        src={`https://api.craft.do/render/preview/${craftSlug}`}
        fallbackSrc={BLOG.defaultCover}
        alt={`${note.title}`}
        layout='fill'
      />
      <div className='md:hidden sm-cover absolute inset-0'></div>
      <div className='md:hidden flex flex-col relative'>
        <span className='text-white text-lg lg:text-xl font-semibold'>{note.title}</span>
      </div>
    </Link>
  )
}

export default NotePost

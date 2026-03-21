import Image from 'next/image'

const PostCover = ({ src, alt }) => {
  if (!src) return null

  return (
    <div className='relative w-full aspect-[3/1] md:aspect-[4/1] overflow-hidden'>
      <Image
        fill
        src={src}
        alt={alt || ''}
        className='object-cover object-center'
        sizes='100vw'
        priority
      />
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950' />
    </div>
  )
}

export default PostCover

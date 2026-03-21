import Image from 'next/image'

const PostCover = ({ src, alt }) => {
  if (!src) return null

  return (
    <div
      className='absolute top-0 left-0 right-0 h-48 md:h-72 overflow-hidden'
      style={{ zIndex: -1 }}
    >
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

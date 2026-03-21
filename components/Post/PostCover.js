import Image from 'next/image'
import BLOG from '@/blog.config'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const PostCover = ({ src, alt }) => {
  const { resolvedTheme } = useTheme()
  const [bgColor, setBgColor] = useState(BLOG.lightBackground || '#F6F8FA')

  useEffect(() => {
    setBgColor(
      resolvedTheme === 'dark'
        ? (BLOG.darkBackground || '#212936')
        : (BLOG.lightBackground || '#F6F8FA')
    )
  }, [resolvedTheme])

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
      <div
        className='absolute inset-0'
        style={{
          background: `linear-gradient(to bottom, transparent 40%, ${bgColor} 100%)`
        }}
      />
    </div>
  )
}

export default PostCover

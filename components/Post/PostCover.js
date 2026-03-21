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
      className='absolute top-0 left-0 right-0 h-56 md:h-80'
      style={{ zIndex: -1 }}
    >
      <div
        className='w-full h-full bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${src})` }}
        role='img'
        aria-label={alt || ''}
      />
      <div
        className='absolute inset-0'
        style={{
          background: `linear-gradient(to bottom, transparent 30%, ${bgColor} 100%)`
        }}
      />
    </div>
  )
}

export default PostCover

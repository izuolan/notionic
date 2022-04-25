import BLOG from '@/blog.config'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SupaComments = () => {
  const { locale, asPath } = useRouter()
  useEffect(() => {
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute('src', `/comments/comments-${locale}.js`)
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', true)
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ''
    }
  }, [locale, asPath])
  return (
    <>
      {/* 针对 supacomments 的魔法, 让评论功能组件共享已有 tailwind css 样式, 省去再额外引入一个 css 文件. */}
      <div className='hidden mt-10 space-y-4 mt-2 rounded-full w-8 h-8 w-10 h-10' />
      <div className='hidden animate-pulse space-x-4 flex-1 h-2 w-20 rounded grid-cols-3 gap-4 col-span-1 col-span-2' />
      <div
        id='comments'
        // data-url='localhost:3000'
        data-url={BLOG.link.split('/').slice(2)}
        supabase-url={BLOG.comment.supaCommentsConfig.supabaseUrl}
        anon-key={BLOG.comment.supaCommentsConfig.supabaseAnonKey}
      ></div>
    </>
  )
}

export default SupaComments

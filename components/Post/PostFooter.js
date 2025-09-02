import BLOG from '@/blog.config'
import { useState } from 'react'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

import WechatPay from '@/components/Post/WechatPay'
import { EnvelopeIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'

const PostFooter = () => {
  const [showPay, setShowPay] = useState(false)
  const { locale } = useRouter()
  const router = useRouter()
  const t = lang[locale]

  return (
    <div className='w-full pb-12 justify-between font-medium text-gray-500 dark:text-gray-400'>
      <div className='flex flex-wrap sm:flex-nowrap sm:justify-between items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 relative gap-3 px-4 py-3'>
        <div className='w-full sm:w-auto max-w-screen-sm inline-block text-sm font-light md:text-base mb-2 sm:mb-0'>
          {t.LAYOUT.NOTICE_TEXT}
        </div>
        <div className='flex flex-wrap gap-3'>
          {BLOG.showWeChatPay && (
            <button
              onClick={() => setShowPay((showPay) => !showPay)}
              className='flex gap-1 cursor-pointer bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
            >
              <HandThumbUpIcon className='flex flex-col justify-center items-center select-none relative w-5 h-5' />
              {t.LAYOUT.PAY_BUTTON}
            </button>
          )}
          <button
            onClick={() => router.push(BLOG.path || '/contact')}
            className='flex gap-1 cursor-pointer bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
          >
            <EnvelopeIcon className='flex flex-col justify-center items-center select-none relative w-5 h-5' />
            {t.LAYOUT.NOTICE_BUTTON}
          </button>
        </div>
      </div>
      {showPay && <WechatPay onClose={() => setShowPay(false)} />}
    </div>
  )
}

export default PostFooter

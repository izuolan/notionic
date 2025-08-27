import Image from 'next/image'
import { useRef, useEffect } from 'react'

const WechatPay = ({ onClose }) => {
  const wechatPayRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wechatPayRef.current && !wechatPayRef.current.contains(event.target)) {
        onClose && onClose()
      }
    }

    // 延迟添加事件监听器，避免立即触发
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div 
        ref={wechatPayRef}
        className='inline-flex shadow-lg bg-gray-100 dark:bg-gray-400 p-5 rounded-full'
      >
        <Image
          src='/wechat-pay.png'
          alt='WeChat Pay'
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}

export default WechatPay

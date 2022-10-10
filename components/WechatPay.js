import Image from 'next/image'

// export default function WechatPay() {
const WechatPay = () => {
  return (
    <div className='fixed inline-flex z-10 shadow-lg bg-gray-100 dark:bg-gray-400 p-5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Image
        src='/wechat-pay.png'
        alt='WeChat Pay'
        width={200}
        height={200}
      />
    </div>
  )
}

export default WechatPay

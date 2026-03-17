import { useRouter } from 'next/router'

const TransitionEffect = ({ children }) => {
  const { asPath } = useRouter()

  return (
    <div key={asPath} className='effect-1 page-transition'>
      {children}
    </div>
  )
}

export default TransitionEffect

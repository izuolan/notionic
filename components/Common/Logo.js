// https://react-svgr.com/playground/
import * as React from 'react'
import Image from 'next/image'
import svg from '@/public/favicon.svg'

const Logo = (props) => (
  <Image
    {...props}
    src={svg}
    style={{
      height: '3rem',
      width: '3rem',
      borderRadius: '50%'
    }}
    alt='logo'
  />
)

export default Logo

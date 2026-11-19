'use client'

import { signIn } from 'next-auth/react'
import { Comments } from '@fuma-comment/react'
import { useLocale } from '@/components/LocaleProvider'

const FumaComments = ({ frontMatter }) => {
  const locale = useLocale()
  const page = `${locale}-${frontMatter.slug || frontMatter.id || 'default'}`

  return (
    <div className='mt-10'>
      <Comments
        page={page}
        auth={{
          type: 'api',
          signIn: () => signIn('github')
        }}
      />
    </div>
  )
}

export default FumaComments

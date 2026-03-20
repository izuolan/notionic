import { signIn } from 'next-auth/react'
import { Comments } from '@fuma-comment/react'
import { useRouter } from 'next/router'

const FumaComments = ({ frontMatter }) => {
  const { locale } = useRouter()
  const page = `${locale}-${frontMatter.slug || frontMatter.id || 'default'}`

  return (
    <div className='mt-10'>
      <Comments
        page={page}
        auth={{
          type: 'api',
          signIn: () => signIn('github'),
        }}
      />
    </div>
  )
}

export default FumaComments

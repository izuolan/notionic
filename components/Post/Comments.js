import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'

const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Post/Utterances')
  },
  { ssr: false }
)
const SupaCommentsComponent = dynamic(
  () => {
    return import('@/components/Post/SupaComments')
  },
  { ssr: false }
)
const FumaCommentsComponent = dynamic(
  () => {
    return import('@/components/Post/FumaComments')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }) => {
  return (
    <div>
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'supacomments' && (
        <SupaCommentsComponent />
      )}
      {BLOG.comment && BLOG.comment.provider === 'fuma' && (
        <FumaCommentsComponent frontMatter={frontMatter} />
      )}
    </div>
  )
}

export default Comments

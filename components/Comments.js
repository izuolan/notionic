import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { fetchCusdisLang } from '@/lib/cusdisLang'
import 'gitalk/dist/gitalk.css'

const GitalkComponent = dynamic(
  () => {
    return import('gitalk/dist/gitalk-component')
  },
  { ssr: false }
)
const UtterancesComponent = dynamic(
  () => {
    return import('@/components/Utterances')
  },
  { ssr: false }
)
const SupaCommentsComponent = dynamic(
  () => {
    return import('@/components/SupaComments')
  },
  { ssr: false }
)
const CusdisComponent = dynamic(
  () => {
    return import('react-cusdis').then((m) => m.ReactCusdis)
  },
  { ssr: false }
)

const Comments = ({ frontMatter }) => {
  const router = useRouter()

  return (
    <div>
      {BLOG.comment && BLOG.comment.provider === 'gitalk' && (
        <GitalkComponent
          options={{
            id: frontMatter.id,
            title: frontMatter.title,
            clientID: BLOG.comment.gitalkConfig.clientID,
            clientSecret: BLOG.comment.gitalkConfig.clientSecret,
            repo: BLOG.comment.gitalkConfig.repo,
            owner: BLOG.comment.gitalkConfig.owner,
            admin: BLOG.comment.gitalkConfig.admin,
            distractionFreeMode: BLOG.comment.gitalkConfig.distractionFreeMode
          }}
        />
      )}
      {BLOG.comment && BLOG.comment.provider === 'utterances' && (
        <UtterancesComponent issueTerm={frontMatter.id} />
      )}
      {BLOG.comment && BLOG.comment.provider === 'supacomments' && (
        <SupaCommentsComponent />
      )}
      {BLOG.comment && BLOG.comment.provider === 'cusdis' && (
        <CusdisComponent
          lang={fetchCusdisLang()}
          attrs={{
            host: BLOG.comment.cusdisConfig.host,
            appId: BLOG.comment.cusdisConfig.appId,
            pageId: frontMatter.id,
            pageTitle: frontMatter.title,
            pageUrl: BLOG.link + router.asPath,
            theme: 'auto'
          }}
        />
      )}
    </div>
  )
}

export default Comments

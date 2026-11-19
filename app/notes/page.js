import Container from '@/components/Container'
import NotePost from '@/components/NotePost'
import NotesHero from '@/components/Hero/Notes'
import { getBlocksMaps } from '@/lib/getBlocksMaps'
import { getPageBySlug } from '@/lib/posts'

export async function generateMetadata() {
  try {
    const { siteConfigObj } = await getBlocksMaps()
    return {
      title: siteConfigObj['Site Name'] || 'Notes',
      description: siteConfigObj['Site Description'] || ''
    }
  } catch {
    return { title: 'Notes' }
  }
}

export default async function NotesPage() {
  let blocksJson = []
  let siteConfigObj = {
    'Site Name': 'Notes',
    'Site Description': ''
  }

  try {
    const maps = await getBlocksMaps()
    blocksJson = maps.pagesJson || []
    siteConfigObj = maps.siteConfigObj || siteConfigObj

    for (let i = 0; i < blocksJson.length; i++) {
      if (blocksJson[i]?.title === 'Title') {
        blocksJson.splice(i, 1)
        i--
        continue
      }
      if (blocksJson[i]?.slug === 'index') {
        blocksJson.splice(i, 1)
        i--
      }
    }
  } catch (err) {
    console.error('[notes] Failed to load Craft maps:', err)
  }

  const heroPage = getPageBySlug('notes')
  const HeroMDX = heroPage?.data?.body

  return (
    <Container
      title={siteConfigObj['Site Name']}
      description={siteConfigObj['Site Description']}
      siteConfigObj={siteConfigObj}
    >
      <NotesHero>
        {HeroMDX ? (
          <div className='markdown-body'>
            <HeroMDX />
          </div>
        ) : null}
      </NotesHero>
      {blocksJson.map((block) => (
        <NotePost key={block.slug} note={block} />
      ))}
    </Container>
  )
}

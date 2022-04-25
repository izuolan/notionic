import Container from '@/components/Container'
import NotePost from '@/components/NotePost'
import { getAllNotes } from '@/lib/craft'
import BLOG from '@/blog.config'
import NotesHero from '@/components/Hero/Notes'

export async function getStaticProps() {
  const notes = await getAllNotes()
  return {
    props: {
      notes
    },
    revalidate: 10
  }
}

const Notes = ({ notes }) => {
  return (
    <Container title={BLOG.notes} description={BLOG.description}>
      <NotesHero />
      {notes.map((note) => (
        <NotePost key={note.link} note={note} />
      ))}
    </Container>
  )
}

export default Notes

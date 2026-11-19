import Container from '@/components/Container'
import ContactForm from '@/components/ContactForm'
import ContactIntro from '@/components/ContactIntro'
import BLOG from '@/blog.config'

export const metadata = {
  title: 'Contact',
  description: BLOG.description
}

export default function ContactPage() {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <ContactIntro />
      <ContactForm />
    </Container>
  )
}

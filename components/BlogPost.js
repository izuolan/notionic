import Link from 'next/link'
import BLOG from '@/blog.config'
import formatDate from '@/lib/formatDate'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const BlogPost = ({ post }) => {
  const { locale } = useRouter()
  return (
    <motion.div>
      <Link passHref href={`${BLOG.path}/${post.slug}`} scroll={false}>
        <article
          key={post.id}
          className='mb-5 md:mb-8 cursor-pointer rounded-lg p-5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 '
        >
          <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
            <a className='text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100'>
              {post.title}
            </a>
            <time className='font-light flex-shrink-0 text-gray-600 dark:text-gray-400'>
              {formatDate(post?.date?.start_date || post.createdTime, locale)}
            </time>
          </header>
          <main>
            <p className='font-light hidden md:block leading-8 text-gray-700 dark:text-gray-300'>
              {post.summary}
            </p>
          </main>
        </article>
      </Link>
    </motion.div>
  )
}

export default BlogPost

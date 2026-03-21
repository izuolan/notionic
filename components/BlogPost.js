import BLOG from '@/blog.config'
import Link from 'next/link'
import Image from 'next/image'
import FormattedDate from '@/components/Common/FormattedDate'

const BlogPost = ({ post }) => {
  return (
    <div>
      <Link passHref href={`${BLOG.path}/${post.slug}`} scroll={false}>
        <article
          key={post.id}
          className='group flex flex-col overflow-hidden relative mb-5 md:mb-8 cursor-pointer rounded-xl p-5 h-[120px] md:h-[140px] bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
        >
          <Image
            fill
            alt={`${post.title}`}
            src={post?.page_cover}
            className='w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300 ease-in-out'
          />
          <div className='relative mt-auto'>
            <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
              <h2 className='text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100 transition-colors duration-300'>{post.title}</h2>
              <span className='font-light shrink-0 text-gray-600 dark:text-gray-400 transition-colors duration-300'>
                <FormattedDate date={post.date} />
              </span>
            </header>
            <p className='font-light hidden md:block leading-6 line-clamp-2 text-gray-700 dark:text-gray-300 transition-colors duration-300'>{post.summary}</p>
          </div>
        </article>
      </Link>
    </div>
  )
}

export default BlogPost
